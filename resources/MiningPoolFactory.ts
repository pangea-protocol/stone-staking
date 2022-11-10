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

export interface MiningPoolFactoryInterface extends utils.Interface {
  functions: {
    "availableConfigs(bytes32)": FunctionFragment;
    "configAddress(bytes32)": FunctionFragment;
    "defaultProtocolFee()": FunctionFragment;
    "deployPool(bytes)": FunctionFragment;
    "getPoolAddress(uint256)": FunctionFragment;
    "getPools(address,address,uint256,uint256)": FunctionFragment;
    "initialize(address,address,address)": FunctionFragment;
    "isPool(address)": FunctionFragment;
    "manager()": FunctionFragment;
    "masterDeployer()": FunctionFragment;
    "owner()": FunctionFragment;
    "poolLogger()": FunctionFragment;
    "pools(address,address,uint256)": FunctionFragment;
    "poolsCount(address,address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAvailableParameter(address,address,address,uint24,uint24)": FunctionFragment;
    "setDefaultProtocolFee(uint256)": FunctionFragment;
    "setManager(address)": FunctionFragment;
    "setPoolImplementation(address)": FunctionFragment;
    "setProtocolFee(address,uint256)": FunctionFragment;
    "totalPoolsCount()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "upgradePools(address[])": FunctionFragment;
    "upgradePoolsAndCall(address[],bytes[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "availableConfigs",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "configAddress",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "defaultProtocolFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deployPool",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolAddress",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPools",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, string]
  ): string;
  encodeFunctionData(functionFragment: "isPool", values: [string]): string;
  encodeFunctionData(functionFragment: "manager", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "masterDeployer",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "poolLogger",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pools",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "poolsCount",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAvailableParameter",
    values: [string, string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setDefaultProtocolFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setManager", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setPoolImplementation",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtocolFee",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalPoolsCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradePools",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradePoolsAndCall",
    values: [string[], BytesLike[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "availableConfigs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "configAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defaultProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deployPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPoolAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPools", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "masterDeployer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolLogger", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pools", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolsCount", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAvailableParameter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDefaultProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setPoolImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalPoolsCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradePools",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradePoolsAndCall",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "UpdateDefaultProtocolFee(uint256)": EventFragment;
    "UpdatePoolImplementation(address,address)": EventFragment;
    "UpdateProtocolFee(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateDefaultProtocolFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatePoolImplementation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateProtocolFee"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type UpdateDefaultProtocolFeeEvent = TypedEvent<
  [BigNumber],
  { protocolFee: BigNumber }
>;

export type UpdateDefaultProtocolFeeEventFilter =
  TypedEventFilter<UpdateDefaultProtocolFeeEvent>;

export type UpdatePoolImplementationEvent = TypedEvent<
  [string, string],
  { previousImplementation: string; newImplementation: string }
>;

export type UpdatePoolImplementationEventFilter =
  TypedEventFilter<UpdatePoolImplementationEvent>;

export type UpdateProtocolFeeEvent = TypedEvent<
  [string, BigNumber],
  { pool: string; protocolFee: BigNumber }
>;

export type UpdateProtocolFeeEventFilter =
  TypedEventFilter<UpdateProtocolFeeEvent>;

export interface MiningPoolFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MiningPoolFactoryInterface;

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
    availableConfigs(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    configAddress(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    defaultProtocolFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    deployPool(
      _deployData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getPoolAddress(
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { pool: string }>;

    getPools(
      token0: string,
      token1: string,
      startIndex: BigNumberish,
      count: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]] & { pairPools: string[] }>;

    initialize(
      _implementation: string,
      _masterDeployer: string,
      _poolLogger: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isPool(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    manager(overrides?: CallOverrides): Promise<[string]>;

    masterDeployer(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    poolLogger(overrides?: CallOverrides): Promise<[string]>;

    pools(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    poolsCount(
      token0: string,
      token1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { count: BigNumber }>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAvailableParameter(
      tokenA: string,
      tokenB: string,
      rewardToken: string,
      swapFee: BigNumberish,
      tickSpacing: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDefaultProtocolFee(
      protocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setManager(
      _manager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPoolImplementation(
      nextImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setProtocolFee(
      pool: string,
      protocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalPoolsCount(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { total: BigNumber }>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    upgradePools(
      _pools: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    upgradePoolsAndCall(
      _pools: string[],
      datas: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  availableConfigs(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  configAddress(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;

  defaultProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

  deployPool(
    _deployData: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getPoolAddress(idx: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getPools(
    token0: string,
    token1: string,
    startIndex: BigNumberish,
    count: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  initialize(
    _implementation: string,
    _masterDeployer: string,
    _poolLogger: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isPool(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  manager(overrides?: CallOverrides): Promise<string>;

  masterDeployer(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  poolLogger(overrides?: CallOverrides): Promise<string>;

  pools(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  poolsCount(
    token0: string,
    token1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAvailableParameter(
    tokenA: string,
    tokenB: string,
    rewardToken: string,
    swapFee: BigNumberish,
    tickSpacing: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDefaultProtocolFee(
    protocolFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setManager(
    _manager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPoolImplementation(
    nextImplementation: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setProtocolFee(
    pool: string,
    protocolFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalPoolsCount(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  upgradePools(
    _pools: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  upgradePoolsAndCall(
    _pools: string[],
    datas: BytesLike[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    availableConfigs(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    configAddress(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;

    defaultProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    deployPool(
      _deployData: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    getPoolAddress(
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getPools(
      token0: string,
      token1: string,
      startIndex: BigNumberish,
      count: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    initialize(
      _implementation: string,
      _masterDeployer: string,
      _poolLogger: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isPool(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    manager(overrides?: CallOverrides): Promise<string>;

    masterDeployer(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    poolLogger(overrides?: CallOverrides): Promise<string>;

    pools(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    poolsCount(
      token0: string,
      token1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setAvailableParameter(
      tokenA: string,
      tokenB: string,
      rewardToken: string,
      swapFee: BigNumberish,
      tickSpacing: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setDefaultProtocolFee(
      protocolFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setManager(_manager: string, overrides?: CallOverrides): Promise<void>;

    setPoolImplementation(
      nextImplementation: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setProtocolFee(
      pool: string,
      protocolFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    totalPoolsCount(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradePools(_pools: string[], overrides?: CallOverrides): Promise<void>;

    upgradePoolsAndCall(
      _pools: string[],
      datas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "UpdateDefaultProtocolFee(uint256)"(
      protocolFee?: null
    ): UpdateDefaultProtocolFeeEventFilter;
    UpdateDefaultProtocolFee(
      protocolFee?: null
    ): UpdateDefaultProtocolFeeEventFilter;

    "UpdatePoolImplementation(address,address)"(
      previousImplementation?: null,
      newImplementation?: null
    ): UpdatePoolImplementationEventFilter;
    UpdatePoolImplementation(
      previousImplementation?: null,
      newImplementation?: null
    ): UpdatePoolImplementationEventFilter;

    "UpdateProtocolFee(address,uint256)"(
      pool?: null,
      protocolFee?: null
    ): UpdateProtocolFeeEventFilter;
    UpdateProtocolFee(
      pool?: null,
      protocolFee?: null
    ): UpdateProtocolFeeEventFilter;
  };

  estimateGas: {
    availableConfigs(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    configAddress(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    defaultProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    deployPool(
      _deployData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getPoolAddress(
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPools(
      token0: string,
      token1: string,
      startIndex: BigNumberish,
      count: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _implementation: string,
      _masterDeployer: string,
      _poolLogger: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isPool(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    manager(overrides?: CallOverrides): Promise<BigNumber>;

    masterDeployer(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    poolLogger(overrides?: CallOverrides): Promise<BigNumber>;

    pools(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    poolsCount(
      token0: string,
      token1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAvailableParameter(
      tokenA: string,
      tokenB: string,
      rewardToken: string,
      swapFee: BigNumberish,
      tickSpacing: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDefaultProtocolFee(
      protocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setManager(
      _manager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPoolImplementation(
      nextImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setProtocolFee(
      pool: string,
      protocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalPoolsCount(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    upgradePools(
      _pools: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    upgradePoolsAndCall(
      _pools: string[],
      datas: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    availableConfigs(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    configAddress(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    defaultProtocolFee(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deployPool(
      _deployData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getPoolAddress(
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPools(
      token0: string,
      token1: string,
      startIndex: BigNumberish,
      count: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _implementation: string,
      _masterDeployer: string,
      _poolLogger: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isPool(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    manager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    masterDeployer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolLogger(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pools(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    poolsCount(
      token0: string,
      token1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAvailableParameter(
      tokenA: string,
      tokenB: string,
      rewardToken: string,
      swapFee: BigNumberish,
      tickSpacing: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDefaultProtocolFee(
      protocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setManager(
      _manager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPoolImplementation(
      nextImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setProtocolFee(
      pool: string,
      protocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalPoolsCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    upgradePools(
      _pools: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    upgradePoolsAndCall(
      _pools: string[],
      datas: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}