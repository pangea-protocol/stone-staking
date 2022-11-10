# Pangeaswap Stone Staking

### Objective

판게아스왑의 프로토콜 수익들을 STONE 홀더들에게 분배하는 시스템

## StakedStone 컨트랙트

### 1. 예치 프로세스

StakedStone에 예치함으로써, STONE 홀더는 Pangeaswap에서 발생하는 수익들을 공유받는다. 유저가 예치한 자산을 빼려면 unstake을 호출 후, cooldown 기간이후에 withdraw할 수 있다. unstake 호출 후에는 유저는 claim할 수 없다.

**StakedStone의 상태 흐름**
````
     stake() => unstake() =====> withdraw()
                        ----------
                       | cooldown | 기간 필요
````                        

**Holder Side**

#### 스톤 스테이킹 수행하기
amount만큼의 STONE을 예치
````solidity
function stake(uint256 amount) external;
````` 

#### 스톤 unstake 요청하기
예치된 STONE에서 amount 만큼 인출 요청, cooldown 시간이 경과된 이후 인출할 수 있음.

````solidity
function unstake(uint256 amount) external;
```` 

#### 스톤 인출하기
cooldown 기간이 지난 unstaking request 호출해서 가져오기

````solidity
function withdraw(uint256 requestId) external;
```` 

#### 예치된 자산 조회하기
스테이킹한 자산 조회

````solidity
function balanceOf(address owner) external view returns (uint256 amount);
````

#### unstake 요청 조회하기

````solidity
// unstake 요청 갯수
function unstakingRequestCounts(address owner) external view returns (uint256);

// 요청한 unstaking 정보 조회
function unstakingRequestByIndex(
    address owner, 
    uint256 index
) external view returns (UnstakingRequest memory);
````

**Manager Side**
unstake에서 withdraw까지의 기간을 지정. default : 7 days 소요

````solidity
function setCooldownPeriod(uint256 period) external;
````

#### 2. 배당 프로세스

`배당`은 비정기적으로 프로토콜 수익을 Holder들에게 환원하는 프로세스로, 유저의 예치량과 예치 기간에 비례하여 프로토콜 수익을 나눈다.

**배당 상태 흐름**

````
      배당금 집행일 확정         배당금 납입                      배당금 집행
      setDividendRecordDate() => depositDividend(token,amount) => executeDividend();
                              <= resetDividendRecordDate() : 집행전 배당금 취소;
````

**Holder Side**

#### 배당금 조회하기
해당 epoch에서 owner에게 할당된 배당금 토큰 조회

````solidity
function allocatedDividend(address owner, uint256 epoch) external view returns (bool isPaid, address[] memory tokens, uint256[] memory amounts)
````

#### 배당금 받기
해당 epoch에 배치된 배당금을 수령

````solidity
function claimDividend(uint256 epoch) external;
````

**Manager Side**


#### 배당 시작일 지정

배당금 지분율을 산정할 기준 시각과 전체 지분양을 결정. (호출 시각 기준으로 배당 지분 계산)
````solidity
function setDividendRecordDate() external;
````

#### 배당금 납입하기
해당 배당시각에 토큰과 amount를 예치. ( setDividendRecordDate 이후 호출 가능)

````solidity
function depositDividend(address token, uint256 amount) external;
````

#### 배당 취소하기

집행 전까지 언제든 resetDividendRecordDate을 호출할 수 있으며, 납입된 배당금은 회수처리.

````solidity
function resetDividendRecordDate() external;
````

#### 배당 집행하기

배당금 분배 시작 ( 납입된 배당금 전액을 해당 배당에 사용)

````solidity
function executeDividend() external;
````



#### 리워드 프로세스

`리워드`는 매주 배치되어 있는 거버넌스 토큰을 예치한 홀더에게 제공하는 프로세스로,매 블럭마다 선형적으로 분배된다.

**Holder Side**

- `claimableReward(owner)` : 현재 받을 수 있는 리워드 량 조회

- `accumulativeUserReward(owner)` : 누적 수령 리워드 크기 조회

- `claimReward()` : 리워드 수령

- `reStake()` : 리워드를 재예치

**Manager Side**

- `depositReward(amount, startTime)` : 리워드 납입 (startTime에서 부터 1주일간 분배)

- `cancelReward(amount, startTime)` : 분배되지 않은 주차의 리워드 회수


## ProtocolRevenueShare 컨트랙트

2 단계로 나뉘어 호출됩니다. 주기적으로 풀에서 수수료 토큰들을 수취한 후,
revenueToken으로 일괄적으로 스왑하여, GrowthFund와 DaoFund로 분배합니다.

### 1. 각 풀 별 수수료 수취

````solidity
function collectByPage(uint256 start, uint256 limit) external;
````

* masterDeployer에 등록된 판게아스왑의 모든 풀들을 순회하며 호출
* `collectFrom(pool)`을 호출하여 protocol 수수료 수취

### 2. revenueToken으로 스왑 후 GrowthFund와 DaoFund로 분배

````solidity
function share(address feeToken, uint256 minimumOutput, address payable broker, bytes calldata data) external;
````

* feeToken을 `broker`을 통해서, revenue 토큰(스테이블 코인)으로 스왑하여, GrowthFund와 Dao Fund로 분배

* `growthFund`에 할당될 비율은 기본적으로 풀 별 growthFundRate가 지정되어 있는 경우에는 해당 값 기준으로 분배하고, 없는 경우에는 팩토리 별 growthFundRate를 사용
