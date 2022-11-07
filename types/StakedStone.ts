/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type UnstakingRequestStruct = {
  id: BigNumberish;
  amount: BigNumberish;
  requestTs: BigNumberish;
  isClaimed: boolean;
};

export type UnstakingRequestStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  boolean
] & {
  id: BigNumber;
  amount: BigNumber;
  requestTs: BigNumber;
  isClaimed: boolean;
};

export interface StakedStoneInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "MANAGER_ROLE()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "cancelReward(uint256,uint256)": FunctionFragment;
    "claimReward()": FunctionFragment;
    "claimableReward(address)": FunctionFragment;
    "cooldownPeriod()": FunctionFragment;
    "depositReward(uint256,uint256)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "multicall(bytes[])": FunctionFragment;
    "reStake()": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "requestOwnerOf(uint256)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "rewardGrowthGlobal()": FunctionFragment;
    "setCooldownPeriod(uint256)": FunctionFragment;
    "stake(uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "token()": FunctionFragment;
    "totalRewardPerWeek(uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "unstake(uint256)": FunctionFragment;
    "unstakingRequest(uint256)": FunctionFragment;
    "unstakingRequestByIndex(address,uint256)": FunctionFragment;
    "unstakingRequestCounts(address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MANAGER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "cancelReward",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "claimReward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimableReward",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "cooldownPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositReward",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "multicall",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(functionFragment: "reStake", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "requestOwnerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "rewardGrowthGlobal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setCooldownPeriod",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "stake", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalRewardPerWeek",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "unstake",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unstakingRequest",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unstakingRequestByIndex",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unstakingRequestCounts",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MANAGER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimableReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cooldownPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "reStake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestOwnerOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rewardGrowthGlobal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCooldownPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalRewardPerWeek",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unstakingRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unstakingRequestByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unstakingRequestCounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "CancelReward(address,uint256,uint256)": EventFragment;
    "Claim(address,uint256)": EventFragment;
    "DepositReward(address,uint256,uint256)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "Stake(address,uint256)": EventFragment;
    "Unstake(address,uint256)": EventFragment;
    "UpdateCoolDown(uint256,uint256)": EventFragment;
    "Withdraw(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CancelReward"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DepositReward"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Stake"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unstake"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateCoolDown"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export type CancelRewardEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { operator: string; weekStartTime: BigNumber; amount: BigNumber }
>;

export type CancelRewardEventFilter = TypedEventFilter<CancelRewardEvent>;

export type ClaimEvent = TypedEvent<
  [string, BigNumber],
  { owner: string; amount: BigNumber }
>;

export type ClaimEventFilter = TypedEventFilter<ClaimEvent>;

export type DepositRewardEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { operator: string; weekStartTime: BigNumber; amount: BigNumber }
>;

export type DepositRewardEventFilter = TypedEventFilter<DepositRewardEvent>;

export type InitializedEvent = TypedEvent<[number], { version: number }>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  { role: string; previousAdminRole: string; newAdminRole: string }
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  { role: string; account: string; sender: string }
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  { role: string; account: string; sender: string }
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export type StakeEvent = TypedEvent<
  [string, BigNumber],
  { owner: string; amount: BigNumber }
>;

export type StakeEventFilter = TypedEventFilter<StakeEvent>;

export type UnstakeEvent = TypedEvent<
  [string, BigNumber],
  { owner: string; amount: BigNumber }
>;

export type UnstakeEventFilter = TypedEventFilter<UnstakeEvent>;

export type UpdateCoolDownEvent = TypedEvent<
  [BigNumber, BigNumber],
  { prev: BigNumber; curr: BigNumber }
>;

export type UpdateCoolDownEventFilter = TypedEventFilter<UpdateCoolDownEvent>;

export type WithdrawEvent = TypedEvent<
  [string, BigNumber],
  { owner: string; amount: BigNumber }
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface StakedStone extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StakedStoneInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amount: BigNumber }>;

    cancelReward(
      amount: BigNumberish,
      startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimableReward(
      owner: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    cooldownPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;

    depositReward(
      amount: BigNumberish,
      startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    reStake(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    requestOwnerOf(
      requestId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardGrowthGlobal(overrides?: CallOverrides): Promise<[BigNumber]>;

    setCooldownPeriod(
      period: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stake(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    token(overrides?: CallOverrides): Promise<[string]>;

    totalRewardPerWeek(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    unstake(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unstakingRequest(
      requestId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[UnstakingRequestStructOutput]>;

    unstakingRequestByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[UnstakingRequestStructOutput]>;

    unstakingRequestCounts(
      owner: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    withdraw(
      requestId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  MANAGER_ROLE(overrides?: CallOverrides): Promise<string>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  cancelReward(
    amount: BigNumberish,
    startTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimReward(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimableReward(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  cooldownPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  depositReward(
    amount: BigNumberish,
    startTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  multicall(
    data: BytesLike[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  reStake(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  requestOwnerOf(
    requestId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardGrowthGlobal(overrides?: CallOverrides): Promise<BigNumber>;

  setCooldownPeriod(
    period: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stake(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  token(overrides?: CallOverrides): Promise<string>;

  totalRewardPerWeek(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  unstake(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unstakingRequest(
    requestId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<UnstakingRequestStructOutput>;

  unstakingRequestByIndex(
    owner: string,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<UnstakingRequestStructOutput>;

  unstakingRequestCounts(
    owner: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdraw(
    requestId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<string>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    cancelReward(
      amount: BigNumberish,
      startTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    claimReward(overrides?: CallOverrides): Promise<void>;

    claimableReward(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cooldownPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    depositReward(
      amount: BigNumberish,
      startTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(_token: string, overrides?: CallOverrides): Promise<void>;

    multicall(data: BytesLike[], overrides?: CallOverrides): Promise<string[]>;

    reStake(overrides?: CallOverrides): Promise<void>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    requestOwnerOf(
      requestId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    rewardGrowthGlobal(overrides?: CallOverrides): Promise<BigNumber>;

    setCooldownPeriod(
      period: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stake(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    token(overrides?: CallOverrides): Promise<string>;

    totalRewardPerWeek(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    unstake(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    unstakingRequest(
      requestId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<UnstakingRequestStructOutput>;

    unstakingRequestByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<UnstakingRequestStructOutput>;

    unstakingRequestCounts(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(requestId: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "CancelReward(address,uint256,uint256)"(
      operator?: string | null,
      weekStartTime?: BigNumberish | null,
      amount?: null
    ): CancelRewardEventFilter;
    CancelReward(
      operator?: string | null,
      weekStartTime?: BigNumberish | null,
      amount?: null
    ): CancelRewardEventFilter;

    "Claim(address,uint256)"(
      owner?: string | null,
      amount?: null
    ): ClaimEventFilter;
    Claim(owner?: string | null, amount?: null): ClaimEventFilter;

    "DepositReward(address,uint256,uint256)"(
      operator?: string | null,
      weekStartTime?: BigNumberish | null,
      amount?: null
    ): DepositRewardEventFilter;
    DepositReward(
      operator?: string | null,
      weekStartTime?: BigNumberish | null,
      amount?: null
    ): DepositRewardEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;

    "Stake(address,uint256)"(
      owner?: string | null,
      amount?: null
    ): StakeEventFilter;
    Stake(owner?: string | null, amount?: null): StakeEventFilter;

    "Unstake(address,uint256)"(
      owner?: string | null,
      amount?: null
    ): UnstakeEventFilter;
    Unstake(owner?: string | null, amount?: null): UnstakeEventFilter;

    "UpdateCoolDown(uint256,uint256)"(
      prev?: null,
      curr?: null
    ): UpdateCoolDownEventFilter;
    UpdateCoolDown(prev?: null, curr?: null): UpdateCoolDownEventFilter;

    "Withdraw(address,uint256)"(
      owner?: string | null,
      amount?: null
    ): WithdrawEventFilter;
    Withdraw(owner?: string | null, amount?: null): WithdrawEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    cancelReward(
      amount: BigNumberish,
      startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimableReward(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cooldownPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    depositReward(
      amount: BigNumberish,
      startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    reStake(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    requestOwnerOf(
      requestId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardGrowthGlobal(overrides?: CallOverrides): Promise<BigNumber>;

    setCooldownPeriod(
      period: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stake(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    totalRewardPerWeek(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    unstake(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unstakingRequest(
      requestId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    unstakingRequestByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    unstakingRequestCounts(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      requestId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cancelReward(
      amount: BigNumberish,
      startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimableReward(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cooldownPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    depositReward(
      amount: BigNumberish,
      startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    multicall(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    reStake(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    requestOwnerOf(
      requestId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardGrowthGlobal(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setCooldownPeriod(
      period: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stake(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalRewardPerWeek(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    unstake(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unstakingRequest(
      requestId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    unstakingRequestByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    unstakingRequestCounts(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      requestId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
