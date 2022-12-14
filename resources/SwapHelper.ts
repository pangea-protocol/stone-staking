/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface SwapHelperInterface extends utils.Interface {
  functions: {
    "calculateExactInput(address[],address,uint256)": FunctionFragment;
    "calculateExactInputSingle(address,address,uint256)": FunctionFragment;
    "calculateExactOutput(address[],address,uint256)": FunctionFragment;
    "calculateExactOutputSingle(address,address,uint256)": FunctionFragment;
    "wETH()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calculateExactInput",
    values: [string[], string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateExactInputSingle",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateExactOutput",
    values: [string[], string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateExactOutputSingle",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "wETH", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "calculateExactInput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateExactInputSingle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateExactOutput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateExactOutputSingle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wETH", data: BytesLike): Result;

  events: {};
}

export interface SwapHelper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SwapHelperInterface;

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
    calculateExactInput(
      path: string[],
      tokenIn: string,
      exactAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountOut: BigNumber; price: BigNumber }
    >;

    calculateExactInputSingle(
      pool: string,
      tokenIn: string,
      exactAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountOut: BigNumber; price: BigNumber }
    >;

    calculateExactOutput(
      path: string[],
      tokenIn: string,
      exactAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountIn: BigNumber; price: BigNumber }
    >;

    calculateExactOutputSingle(
      pool: string,
      tokenIn: string,
      exactAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountIn: BigNumber; price: BigNumber }
    >;

    wETH(overrides?: CallOverrides): Promise<[string]>;
  };

  calculateExactInput(
    path: string[],
    tokenIn: string,
    exactAmountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amountOut: BigNumber; price: BigNumber }
  >;

  calculateExactInputSingle(
    pool: string,
    tokenIn: string,
    exactAmountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amountOut: BigNumber; price: BigNumber }
  >;

  calculateExactOutput(
    path: string[],
    tokenIn: string,
    exactAmountOut: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amountIn: BigNumber; price: BigNumber }
  >;

  calculateExactOutputSingle(
    pool: string,
    tokenIn: string,
    exactAmountOut: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amountIn: BigNumber; price: BigNumber }
  >;

  wETH(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    calculateExactInput(
      path: string[],
      tokenIn: string,
      exactAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountOut: BigNumber; price: BigNumber }
    >;

    calculateExactInputSingle(
      pool: string,
      tokenIn: string,
      exactAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountOut: BigNumber; price: BigNumber }
    >;

    calculateExactOutput(
      path: string[],
      tokenIn: string,
      exactAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountIn: BigNumber; price: BigNumber }
    >;

    calculateExactOutputSingle(
      pool: string,
      tokenIn: string,
      exactAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountIn: BigNumber; price: BigNumber }
    >;

    wETH(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    calculateExactInput(
      path: string[],
      tokenIn: string,
      exactAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateExactInputSingle(
      pool: string,
      tokenIn: string,
      exactAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateExactOutput(
      path: string[],
      tokenIn: string,
      exactAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateExactOutputSingle(
      pool: string,
      tokenIn: string,
      exactAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    wETH(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    calculateExactInput(
      path: string[],
      tokenIn: string,
      exactAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateExactInputSingle(
      pool: string,
      tokenIn: string,
      exactAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateExactOutput(
      path: string[],
      tokenIn: string,
      exactAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateExactOutputSingle(
      pool: string,
      tokenIn: string,
      exactAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    wETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
