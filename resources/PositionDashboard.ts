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
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface PositionDashboardInterface extends utils.Interface {
  functions: {
    "getFees(uint256)": FunctionFragment;
    "getPrincipal(uint256)": FunctionFragment;
    "getTotal(uint256)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "poolManager()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getFees",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPrincipal",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotal",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "poolManager",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "getFees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPrincipal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTotal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "poolManager",
    data: BytesLike
  ): Result;

  events: {};
}

export interface PositionDashboard extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PositionDashboardInterface;

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
    getFees(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { fee0: BigNumber; fee1: BigNumber }>;

    getPrincipal(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
    >;

    getTotal(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
    >;

    initialize(
      _poolManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    poolManager(overrides?: CallOverrides): Promise<[string]>;
  };

  getFees(
    positionId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { fee0: BigNumber; fee1: BigNumber }>;

  getPrincipal(
    positionId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
  >;

  getTotal(
    positionId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
  >;

  initialize(
    _poolManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  poolManager(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getFees(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { fee0: BigNumber; fee1: BigNumber }>;

    getPrincipal(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
    >;

    getTotal(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
    >;

    initialize(_poolManager: string, overrides?: CallOverrides): Promise<void>;

    poolManager(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getFees(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPrincipal(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotal(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _poolManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    poolManager(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getFees(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPrincipal(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotal(
      positionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _poolManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    poolManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}