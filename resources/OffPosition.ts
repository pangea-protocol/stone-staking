/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface OffPositionInterface extends utils.Interface {
  functions: {
    "IMAGE()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "IMAGE", values?: undefined): string;

  decodeFunctionResult(functionFragment: "IMAGE", data: BytesLike): Result;

  events: {};
}

export interface OffPosition extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OffPositionInterface;

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
    IMAGE(overrides?: CallOverrides): Promise<[string]>;
  };

  IMAGE(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    IMAGE(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    IMAGE(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    IMAGE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
