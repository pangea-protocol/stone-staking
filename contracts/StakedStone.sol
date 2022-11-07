// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract StakedStone is Multicall, AccessControlUpgradeable {
    using SafeERC20 for IERC20;

    bytes32 public constant MANAGER_ROLE = keccak256(abi.encode("MANAGER"));

    mapping(address => uint256) private _balanceOf;
    uint256 private _totalSupply;

    uint256 public cooldownPeriod;

    address public token;

    UnstakingRequest[] private _unstakingRequests;

    mapping(uint256 => address) private _requestOwnerOf;
    mapping(address => uint256) private _requestCounts;
    mapping(address => mapping(uint256 => uint256)) private _ownedRequests;
    mapping(uint256 => uint256) private _ownedRequestsIndex;

    struct UnstakingRequest {
        uint256 id;
        uint256 amount;
        uint256 requestTs;
        bool isClaimed;
    }

    event Stake(address indexed owner, uint256 amount);
    event Unstake(address indexed owner, uint256 amount);
    event Withdraw(address indexed owner, uint256 amount);
    event UpdateCoolDown(uint256 prev, uint256 curr);

    function initialize(address _token) external initializer {
        token = _token;
        cooldownPeriod = 7 days;

        __AccessControl_init();
        _setupRole(AccessControlUpgradeable.DEFAULT_ADMIN_ROLE, msg.sender);
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
    function stake(uint256 amount) external {
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

        _balanceOf[msg.sender] += amount;
        _totalSupply += amount;

        emit Stake(msg.sender, amount);
    }

    /**
     * @notice request unstaking to msg.sender
     */
    function unstake(uint256 amount) external {
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
}
