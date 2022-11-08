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

    struct Dividend {
        // @dev 배당금 분배 시작 시각
        uint256 startDate;
        // @dev 배당금 분배 마감 시각
        uint256 recordDate;
        // @dev 총 배당금 지분 크기 ( period * total Supply)
        uint256 totalShare;
        // @dev 지급된 배당금 토큰
        address[] tokens;
        // @dev 지급된 배당액
        uint256[] amounts;
    }

    struct DividendSnapshot {
        bool isPaid;
        // @dev staked period X staked period
        uint256 share;
    }

    event Stake(address indexed owner, uint256 amount);
    event Unstake(address indexed owner, uint256 amount, uint256 requestId);
    event Withdraw(address indexed owner, uint256 amount);
    event Claim(address indexed owner, uint256 amount);

    event UpdateCoolDown(uint256 prev, uint256 curr);

    event DepositReward(address indexed operator, uint256 indexed weekStartTime, uint256 amount);
    event CancelReward(address indexed operator, uint256 indexed weekStartTime, uint256 amount);

    event ClaimDividend(address indexed owner, uint256 indexed epoch, address token, uint256 amount);
}
