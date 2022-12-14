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

export interface MasterDeployerInterface extends utils.Interface {
  functions: {
    "addToWhitelistFactory(address)": FunctionFragment;
    "airdropDistributor()": FunctionFragment;
    "deployPool(address,bytes)": FunctionFragment;
    "getFactoryAddress(address)": FunctionFragment;
    "getPoolAddress(uint256)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "pools(address)": FunctionFragment;
    "protocolFeeTo()": FunctionFragment;
    "removeFromWhitelistFactory(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAirdropDistributor(address)": FunctionFragment;
    "setProtocolFeeTo(address)": FunctionFragment;
    "totalPoolsCount()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "whitelistedFactories(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addToWhitelistFactory",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "airdropDistributor",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deployPool",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getFactoryAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolAddress",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pools", values: [string]): string;
  encodeFunctionData(
    functionFragment: "protocolFeeTo",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeFromWhitelistFactory",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAirdropDistributor",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtocolFeeTo",
    values: [string]
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
    functionFragment: "whitelistedFactories",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "addToWhitelistFactory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "airdropDistributor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deployPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFactoryAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPoolAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pools", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "protocolFeeTo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeFromWhitelistFactory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAirdropDistributor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtocolFeeTo",
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
    functionFragment: "whitelistedFactories",
    data: BytesLike
  ): Result;

  events: {
    "AddToWhitelistFactory(address)": EventFragment;
    "DeployPool(address,address,bytes)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "ProtocolFeeToUpdated(address)": EventFragment;
    "RemoveFromWhitelistFactory(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddToWhitelistFactory"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DeployPool"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProtocolFeeToUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveFromWhitelistFactory"): EventFragment;
}

export type AddToWhitelistFactoryEvent = TypedEvent<
  [string],
  { factory: string }
>;

export type AddToWhitelistFactoryEventFilter =
  TypedEventFilter<AddToWhitelistFactoryEvent>;

export type DeployPoolEvent = TypedEvent<
  [string, string, string],
  { factory: string; pool: string; deployData: string }
>;

export type DeployPoolEventFilter = TypedEventFilter<DeployPoolEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type ProtocolFeeToUpdatedEvent = TypedEvent<
  [string],
  { protocolFeeTo: string }
>;

export type ProtocolFeeToUpdatedEventFilter =
  TypedEventFilter<ProtocolFeeToUpdatedEvent>;

export type RemoveFromWhitelistFactoryEvent = TypedEvent<
  [string],
  { factory: string }
>;

export type RemoveFromWhitelistFactoryEventFilter =
  TypedEventFilter<RemoveFromWhitelistFactoryEvent>;

export interface MasterDeployer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MasterDeployerInterface;

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
    addToWhitelistFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    airdropDistributor(overrides?: CallOverrides): Promise<[string]>;

    deployPool(
      _factory: string,
      _deployData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getFactoryAddress(
      pool: string,
      overrides?: CallOverrides
    ): Promise<[string] & { factory: string }>;

    getPoolAddress(
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { pool: string }>;

    initialize(
      _protocolFeeTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pools(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    protocolFeeTo(overrides?: CallOverrides): Promise<[string]>;

    removeFromWhitelistFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAirdropDistributor(
      _airdropDistributor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setProtocolFeeTo(
      _protocolFeeTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalPoolsCount(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { total: BigNumber }>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    whitelistedFactories(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  addToWhitelistFactory(
    _factory: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  airdropDistributor(overrides?: CallOverrides): Promise<string>;

  deployPool(
    _factory: string,
    _deployData: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getFactoryAddress(pool: string, overrides?: CallOverrides): Promise<string>;

  getPoolAddress(idx: BigNumberish, overrides?: CallOverrides): Promise<string>;

  initialize(
    _protocolFeeTo: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  pools(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  protocolFeeTo(overrides?: CallOverrides): Promise<string>;

  removeFromWhitelistFactory(
    _factory: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAirdropDistributor(
    _airdropDistributor: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setProtocolFeeTo(
    _protocolFeeTo: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalPoolsCount(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  whitelistedFactories(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    addToWhitelistFactory(
      _factory: string,
      overrides?: CallOverrides
    ): Promise<void>;

    airdropDistributor(overrides?: CallOverrides): Promise<string>;

    deployPool(
      _factory: string,
      _deployData: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    getFactoryAddress(pool: string, overrides?: CallOverrides): Promise<string>;

    getPoolAddress(
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    initialize(
      _protocolFeeTo: string,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    pools(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    protocolFeeTo(overrides?: CallOverrides): Promise<string>;

    removeFromWhitelistFactory(
      _factory: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setAirdropDistributor(
      _airdropDistributor: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setProtocolFeeTo(
      _protocolFeeTo: string,
      overrides?: CallOverrides
    ): Promise<void>;

    totalPoolsCount(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    whitelistedFactories(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "AddToWhitelistFactory(address)"(
      factory?: string | null
    ): AddToWhitelistFactoryEventFilter;
    AddToWhitelistFactory(
      factory?: string | null
    ): AddToWhitelistFactoryEventFilter;

    "DeployPool(address,address,bytes)"(
      factory?: string | null,
      pool?: string | null,
      deployData?: null
    ): DeployPoolEventFilter;
    DeployPool(
      factory?: string | null,
      pool?: string | null,
      deployData?: null
    ): DeployPoolEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "ProtocolFeeToUpdated(address)"(
      protocolFeeTo?: null
    ): ProtocolFeeToUpdatedEventFilter;
    ProtocolFeeToUpdated(protocolFeeTo?: null): ProtocolFeeToUpdatedEventFilter;

    "RemoveFromWhitelistFactory(address)"(
      factory?: string | null
    ): RemoveFromWhitelistFactoryEventFilter;
    RemoveFromWhitelistFactory(
      factory?: string | null
    ): RemoveFromWhitelistFactoryEventFilter;
  };

  estimateGas: {
    addToWhitelistFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    airdropDistributor(overrides?: CallOverrides): Promise<BigNumber>;

    deployPool(
      _factory: string,
      _deployData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getFactoryAddress(
      pool: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolAddress(
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _protocolFeeTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pools(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    protocolFeeTo(overrides?: CallOverrides): Promise<BigNumber>;

    removeFromWhitelistFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAirdropDistributor(
      _airdropDistributor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setProtocolFeeTo(
      _protocolFeeTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalPoolsCount(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    whitelistedFactories(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addToWhitelistFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    airdropDistributor(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deployPool(
      _factory: string,
      _deployData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getFactoryAddress(
      pool: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolAddress(
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _protocolFeeTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pools(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    protocolFeeTo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeFromWhitelistFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAirdropDistributor(
      _airdropDistributor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setProtocolFeeTo(
      _protocolFeeTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalPoolsCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    whitelistedFactories(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
