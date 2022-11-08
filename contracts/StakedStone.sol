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

/**
 * StakedStone Contract created to distribute rewards to STONE holders
 */
contract StakedStone is Multicall, AccessControlUpgradeable, IStakedStone {
    using SafeERC20 for IERC20;

    bytes32 public constant MANAGER_ROLE = keccak256(abi.encode("MANAGER"));

    mapping(uint256 => uint256) public totalRewardPerWeek;

    uint256 private _rewardGrowthGlobalLast;
    uint256 private _rewardCheckpoint;
    uint256 private _pendingReward;

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

    uint256 private initialTime;

    function initialize(
        address _token,
        uint256 _initialTime
    ) external initializer {
        token = _token;
        cooldownPeriod = 7 days;

        initialTime = _initialTime;

        __AccessControl_init();
        _setupRole(AccessControlUpgradeable.DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier updateRewardCheckpoint(address owner) {
        uint256 growthGlobal;
        if (_rewardCheckpoint < block.timestamp) {
            uint256 amount = _calculateRewardToDistribute();

            // @dev Rewards accumulated while there is no staked supply
            // are distributed later
            amount = _updatePendingReward(amount);
            growthGlobal = _rewardGrowthGlobal(amount);

            _rewardGrowthGlobalLast = growthGlobal;
            _rewardCheckpoint = block.timestamp;
        } else {
            // @dev Skip if the block has been updated in advance. (gas efficient policy)
            growthGlobal = _rewardGrowthGlobalLast;
        }

        _updateRewardSnapshot(owner, growthGlobal);

        _;
    }

    /**
     * @notice deposit the STONE to be distributed linearly for 1 week
     * @param amount amount to deposit
     * @param startTime The start time of distribution. should always satisfy UTC 00:00. (startTime % 604,800 == 0)
     */
    function depositReward(uint256 amount, uint256 startTime) external onlyRole(MANAGER_ROLE) {
        require(startTime % 7 days == 0, "startTime % 7 days != 0");
        require(startTime >= block.timestamp, "too late");

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

        totalRewardPerWeek[startTime] += amount;

        emit DepositReward(msg.sender, startTime, amount);
    }

    /**
     * @notice Retrieve undistributed STONE
     */
    function cancelReward(uint256 amount, uint256 startTime) external onlyRole(MANAGER_ROLE) {
        require(startTime >= block.timestamp, "too late");

        totalRewardPerWeek[startTime] -= amount;

        IERC20(token).transfer(msg.sender, amount);

        emit CancelReward(msg.sender, startTime, amount);
    }


    function _updatePendingReward(uint256 amount) internal returns (uint256) {
        if (_totalSupply > 0) {
            if (_pendingReward > 0) {
                amount += _pendingReward;
                _pendingReward = 0;
            }
        } else {
            _pendingReward += amount;
        }
        return amount;
    }

    function _updateRewardSnapshot(address owner, uint256 growthGlobal) internal {
        RewardSnapshot storage snapshot = _userRewardSnapshot[owner];
        snapshot._owed += FullMath.mulDiv(
            growthGlobal - snapshot._growthGlobalLast, _balanceOf[owner], FixedPoint.Q96
        );
        snapshot._growthGlobalLast = growthGlobal;
    }

    function _rewardGrowthGlobal(uint256 amount) private view returns (uint256 growthGlobal) {
        growthGlobal = _rewardGrowthGlobalLast;

        if (_totalSupply > 0) {
            growthGlobal += FullMath.mulDiv(amount, FixedPoint.Q96, _totalSupply);
        }
    }

    function _calculateRewardToDistribute() private view returns (uint256 amount) {
        uint256 _checkpoint = _rewardCheckpoint;
        if (_checkpoint == 0) _checkpoint = weekStartTime(initialTime);

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
    function stake(uint256 amount) external updateRewardCheckpoint(msg.sender) {
        require(block.timestamp >= initialTime, "NOT START");
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
    function unstake(uint256 amount) external updateRewardCheckpoint(msg.sender) {
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
    function reStake() external updateRewardCheckpoint(msg.sender) {
        uint256 amount = _claimReward(msg.sender);
        _stake(msg.sender, amount);
    }

    function claimReward() external updateRewardCheckpoint(msg.sender) {
        uint256 amount = _claimReward(msg.sender);
        IERC20(token).safeTransfer(msg.sender, amount);
    }

    function _claimReward(address owner) internal returns (uint256 amount){
        amount = _userRewardSnapshot[owner]._owed;
        _userRewardSnapshot[owner]._owed = 0;
        emit Claim(msg.sender, amount);
    }

    /**
     * @notice calculate claimable STONE reward
     */
    function claimableReward(address owner) external view returns (uint256) {
        uint256 amount = _calculateRewardToDistribute() + _pendingReward;
        RewardSnapshot memory snapshot = _userRewardSnapshot[owner];

        return FullMath.mulDiv(
            _rewardGrowthGlobal(amount) - snapshot._growthGlobalLast, _balanceOf[owner], FixedPoint.Q96
        ) + snapshot._owed;
    }

    function weekStartTime(uint256 time) private pure returns (uint256) {
        return (time / 7 days) * 7 days;
    }
}
