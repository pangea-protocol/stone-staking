// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;

interface IStakedStone {
    struct UnstakingRequest {
        uint256 id;
        uint256 amount;
        uint256 requestTs;
        bool isClaimed;
    }

    struct RewardSnapshot {
        uint256 _growthGlobalLast;
        uint256 _owed;
    }

    event Stake(address indexed owner, uint256 amount);
    event Unstake(address indexed owner, uint256 amount);
    event Withdraw(address indexed owner, uint256 amount);
    event Claim(address indexed owner, uint256 amount);

    event UpdateCoolDown(uint256 prev, uint256 curr);

    event DepositForDistribution(address indexed operator, uint256 indexed weekStartTime, uint256 amount);
    event CancelDistribution(address indexed operator, uint256 indexed weekStartTime, uint256 amount);
}
