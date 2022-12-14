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

export interface IMasterDeployerInterface extends utils.Interface {
  functions: {
    "airdropDistributor()": FunctionFragment;
    "deployPool(address,bytes)": FunctionFragment;
    "getFactoryAddress(address)": FunctionFragment;
    "getPoolAddress(uint256)": FunctionFragment;
    "pools(address)": FunctionFragment;
    "protocolFeeTo()": FunctionFragment;
    "totalPoolsCount()": FunctionFragment;
  };

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
  encodeFunctionData(functionFragment: "pools", values: [string]): string;
  encodeFunctionData(
    functionFragment: "protocolFeeTo",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalPoolsCount",
    values?: undefined
  ): string;

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
  decodeFunctionResult(functionFragment: "pools", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "protocolFeeTo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalPoolsCount",
    data: BytesLike
  ): Result;

  events: {
    "AddToWhitelistFactory(address)": EventFragment;
    "DeployPool(address,address,bytes)": EventFragment;
    "ProtocolFeeToUpdated(address)": EventFragment;
    "RemoveFromWhitelistFactory(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddToWhitelistFactory"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DeployPool"): EventFragment;
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

export interface IMasterDeployer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IMasterDeployerInterface;

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
    airdropDistributor(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deployPool(
      factory: string,
      deployData: BytesLike,
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

    pools(pool: string, overrides?: CallOverrides): Promise<[boolean]>;

    protocolFeeTo(overrides?: CallOverrides): Promise<[string]>;

    totalPoolsCount(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { total: BigNumber }>;
  };

  airdropDistributor(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deployPool(
    factory: string,
    deployData: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getFactoryAddress(pool: string, overrides?: CallOverrides): Promise<string>;

  getPoolAddress(idx: BigNumberish, overrides?: CallOverrides): Promise<string>;

  pools(pool: string, overrides?: CallOverrides): Promise<boolean>;

  protocolFeeTo(overrides?: CallOverrides): Promise<string>;

  totalPoolsCount(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    airdropDistributor(overrides?: CallOverrides): Promise<string>;

    deployPool(
      factory: string,
      deployData: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    getFactoryAddress(pool: string, overrides?: CallOverrides): Promise<string>;

    getPoolAddress(
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    pools(pool: string, overrides?: CallOverrides): Promise<boolean>;

    protocolFeeTo(overrides?: CallOverrides): Promise<string>;

    totalPoolsCount(overrides?: CallOverrides): Promise<BigNumber>;
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
    airdropDistributor(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deployPool(
      factory: string,
      deployData: BytesLike,
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

    pools(pool: string, overrides?: CallOverrides): Promise<BigNumber>;

    protocolFeeTo(overrides?: CallOverrides): Promise<BigNumber>;

    totalPoolsCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    airdropDistributor(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deployPool(
      factory: string,
      deployData: BytesLike,
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

    pools(
      pool: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    protocolFeeTo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalPoolsCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
