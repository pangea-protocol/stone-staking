// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./interfaces/IStakedStone.sol";
import "./libraries/FullMath.sol";
import "./libraries/FixedPoint.sol";

contract StakedStone is Multicall, AccessControlUpgradeable, IStakedStone {
    using SafeERC20 for IERC20;

    bytes32 public constant MANAGER_ROLE = keccak256(abi.encode("MANAGER"));

    mapping(uint256 => uint256) public totalRewardPerWeek;

    uint256 private _rewardGrowthGlobalLast;
    uint256 private _rewardCheckpoint;

    mapping(address => uint256) private _balanceOf;
    uint256 private _totalSupply;

    uint256 public cooldownPeriod;

    address public token;

    UnstakingRequest[] private _unstakingRequests;

    mapping(uint256 => address) private _requestOwnerOf;
    mapping(address => uint256) private _requestCounts;
    mapping(address => mapping(uint256 => uint256)) private _ownedRequests;
    mapping(uint256 => uint256) private _ownedRequestsIndex;

    mapping(address => RewardSnapshot) private _userRewardSnapshot;

    uint256 private initialCheckpoint;

    function initialize(address _token) external initializer {
        token = _token;
        cooldownPeriod = 7 days;

        initialCheckpoint = weekStartTime(block.timestamp);

        __AccessControl_init();
        _setupRole(AccessControlUpgradeable.DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier settleReward(address owner) {
        if (_totalSupply > 0) {
            // @dev _totalSupply = 0일때의 엣지케이스 헨들링 주의
            updateRewardGrowthGlobal();
        }
        updateRewardCheckpoint(owner);

        _;
    }

    /**
     * @notice deposit for distributing tokens linearly for 1 week from startTime
     */
    function depositForDistribution(uint256 amount, uint256 startTime) external onlyRole(MANAGER_ROLE) {
        require(startTime % 7 days == 0, "startTime % 7 days == 0");
        require(startTime + 7 days >= block.timestamp, "distribution is confirmed");

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

        totalRewardPerWeek[startTime] += amount;

        emit DepositForDistribution(msg.sender, startTime, amount);
    }

    /**
     * @notice Retrieve unallocated future tokens
     */
    function cancelDistribution(uint256 amount, uint256 startTime) external onlyRole(MANAGER_ROLE) {
        require(startTime + 7 days >= block.timestamp, "distribution is confirmed");

        totalRewardPerWeek[startTime] -= amount;

        IERC20(token).transfer(msg.sender, amount);

        emit CancelDistribution(msg.sender, startTime, amount);
    }

    function updateRewardGrowthGlobal() internal {
        if (_rewardCheckpoint != block.timestamp) {
            _rewardGrowthGlobalLast = rewardGrowthGlobal();
            _rewardCheckpoint = block.timestamp;
        }
    }

    function updateRewardCheckpoint(address owner) internal {
        uint256 _balance = _balanceOf[owner];
        if (_balance == 0) return;

        uint256 growthGlobal = _rewardGrowthGlobalLast;

        RewardSnapshot storage snapshot = _userRewardSnapshot[owner];

        snapshot._growthGlobalLast = growthGlobal;
        snapshot._owed += FullMath.mulDiv(growthGlobal - snapshot._growthGlobalLast, _balance, FixedPoint.Q96);
    }

    function rewardGrowthGlobal() public view returns (uint256) {
        uint256 amount = calculateRewardToDistribute();
        return _rewardGrowthGlobalLast + FullMath.mulDiv(amount, FixedPoint.Q96, _totalSupply);
    }

    function calculateRewardToDistribute() internal view returns (uint256 amount) {
        uint256 _checkpoint = _rewardCheckpoint;
        if (_checkpoint == 0) {
            _checkpoint = initialCheckpoint;
        }

        uint256 currentWeekStartTime = weekStartTime(block.timestamp);
        if (_checkpoint < currentWeekStartTime) {
            for (uint256 i = _checkpoint; i < currentWeekStartTime; i += 7 days) {
                amount += totalRewardPerWeek[i];
            }
            _checkpoint = currentWeekStartTime;
        }

        amount += (
            totalRewardPerWeek[currentWeekStartTime] * (block.timestamp - _checkpoint) / 7 days
        );
    }

    /**
     * @notice Sets period until un-staking requested amount is able to be withdrawn.
     */
    function setCooldownPeriod(uint256 period) external onlyRole(MANAGER_ROLE) {
        uint256 prev = cooldownPeriod;
        cooldownPeriod = period;

        emit UpdateCoolDown(prev, period);
    }

    /**
     * @notice calculate the balance staked by owner
     */
    function balanceOf(address owner) external view returns (uint256 amount) {
        return _balanceOf[owner];
    }

    /**
     * @notice total stone staked
     */
    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function unstakingRequest(uint256 requestId) external view returns (UnstakingRequest memory) {
        return _unstakingRequests[requestId];
    }

    function requestOwnerOf(uint256 requestId) external view returns (address) {
        return _requestOwnerOf[requestId];
    }

    /**
     * @notice Get the number of un-staking requests by owner
     */
    function unstakingRequestCounts(address owner) external view returns (uint256) {
        return _requestCounts[owner];
    }

    /**
     * @notice Get the information of un-staking requests by owner
     */
    function unstakingRequestByIndex(address owner, uint256 index) external view returns (UnstakingRequest memory) {
        uint256 requestId = _ownedRequests[owner][index];
        return _unstakingRequests[requestId];
    }

    /**
     * @notice Stakes Stone for msg.sender
     */
    function stake(uint256 amount) external settleReward(msg.sender) {
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

        _stake(msg.sender, amount);
    }

    function _stake(address owner, uint256 amount) internal {
        _balanceOf[owner] += amount;
        _totalSupply += amount;

        emit Stake(owner, amount);
    }

    /**
     * @notice request unstaking to msg.sender
     */
    function unstake(uint256 amount) external settleReward(msg.sender) {
        _balanceOf[msg.sender] -= amount;
        _totalSupply -= amount;

        uint256 requestId = _unstakingRequests.length;
        _unstakingRequests.push(UnstakingRequest(requestId, amount, block.timestamp, false));

        uint256 count = _requestCounts[msg.sender]++;

        _requestOwnerOf[requestId] = msg.sender;
        _ownedRequests[msg.sender][count] = requestId;
        _ownedRequestsIndex[requestId] = count;

        emit Unstake(msg.sender, amount);
    }

    /**
     * @notice withdraw unstaked Stone after cooldown
     */
    function withdraw(uint256 requestId) external {
        UnstakingRequest memory request = _unstakingRequests[requestId];
        require(!request.isClaimed, "ALREADY CLAIMED");
        require(_requestOwnerOf[requestId] == msg.sender, "NOT OWNER");
        require(request.requestTs + cooldownPeriod <= block.timestamp, "NEED COOLDOWN");

        IERC20(token).safeTransfer(msg.sender, request.amount);

        _unstakingRequests[requestId].isClaimed = true;

        uint256 lastRequestIndex = --_requestCounts[msg.sender];
        uint256 requestIndex = _ownedRequestsIndex[requestId];

        if (requestIndex != lastRequestIndex) {
            uint256 lastRequestId = _ownedRequests[msg.sender][lastRequestIndex];

            _ownedRequests[msg.sender][requestIndex] = lastRequestId;
            _ownedRequestsIndex[lastRequestId] = requestIndex;
        }

        delete _ownedRequestsIndex[requestIndex];
        delete _ownedRequests[msg.sender][lastRequestIndex];

        emit Withdraw(msg.sender, request.amount);
    }

    /**
     * @notice Re-stake claimable Stone
     */
    function reStake() external settleReward(msg.sender) {
        uint256 amount = _claimReward(msg.sender);
        _stake(msg.sender, amount);
    }

    function claimReward() external settleReward(msg.sender) {
        uint256 amount = _claimReward(msg.sender);
        IERC20(token).safeTransfer(msg.sender, amount);
    }

    function _claimReward(address owner) internal returns (uint256 amount){
        amount = _userRewardSnapshot[owner]._owed;
        _userRewardSnapshot[owner]._owed = 0;
        emit Claim(msg.sender, amount);
    }

    /**
     * calculate claimable STONE reward
     */
    function claimableReward(address owner) external view returns (uint256) {
        RewardSnapshot memory snapshot = _userRewardSnapshot[owner];

        return FullMath.mulDiv(
            rewardGrowthGlobal() - snapshot._growthGlobalLast, _balanceOf[owner], FixedPoint.Q96
        ) + snapshot._owed;
    }

    function weekStartTime(uint256 time) private pure returns (uint256) {
        return (time / 7 days) * 7 days;
    }
}
