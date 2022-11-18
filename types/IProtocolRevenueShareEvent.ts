/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { BaseContract, BigNumber, Signer, utils } from "ethers";
import { EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IProtocolRevenueShareEventInterface extends utils.Interface {
  functions: {};

  events: {
    "Collect(address,address,uint256)": EventFragment;
    "SetDaoFund(address)": EventFragment;
    "SetFactoryGrowthFundRate(address,uint256)": EventFragment;
    "SetGrowthFund(address)": EventFragment;
    "SetGrowthFundRate(address,uint256)": EventFragment;
    "SetMinimumRevenue(uint256)": EventFragment;
    "SetRevenueToken(address)": EventFragment;
    "Share(address,address,uint256,uint256,uint256,uint256)": EventFragment;
    "VerifyBroker(address,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Collect"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetDaoFund"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetFactoryGrowthFundRate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetGrowthFund"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetGrowthFundRate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetMinimumRevenue"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetRevenueToken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Share"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VerifyBroker"): EventFragment;
}

export type CollectEvent = TypedEvent<
  [string, string, BigNumber],
  { pool: string; token: string; amount: BigNumber }
>;

export type CollectEventFilter = TypedEventFilter<CollectEvent>;

export type SetDaoFundEvent = TypedEvent<[string], { fund: string }>;

export type SetDaoFundEventFilter = TypedEventFilter<SetDaoFundEvent>;

export type SetFactoryGrowthFundRateEvent = TypedEvent<
  [string, BigNumber],
  { factory: string; rate: BigNumber }
>;

export type SetFactoryGrowthFundRateEventFilter =
  TypedEventFilter<SetFactoryGrowthFundRateEvent>;

export type SetGrowthFundEvent = TypedEvent<[string], { fund: string }>;

export type SetGrowthFundEventFilter = TypedEventFilter<SetGrowthFundEvent>;

export type SetGrowthFundRateEvent = TypedEvent<
  [string, BigNumber],
  { pool: string; rate: BigNumber }
>;

export type SetGrowthFundRateEventFilter =
  TypedEventFilter<SetGrowthFundRateEvent>;

export type SetMinimumRevenueEvent = TypedEvent<
  [BigNumber],
  { amount: BigNumber }
>;

export type SetMinimumRevenueEventFilter =
  TypedEventFilter<SetMinimumRevenueEvent>;

export type SetRevenueTokenEvent = TypedEvent<[string], { token: string }>;

export type SetRevenueTokenEventFilter = TypedEventFilter<SetRevenueTokenEvent>;

export type ShareEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, BigNumber, BigNumber],
  {
    feeToken: string;
    revenueToken: string;
    amount: BigNumber;
    output: BigNumber;
    growthFundShare: BigNumber;
    daoFundShare: BigNumber;
  }
>;

export type ShareEventFilter = TypedEventFilter<ShareEvent>;

export type VerifyBrokerEvent = TypedEvent<
  [string, boolean],
  { broker: string; isVerified: boolean }
>;

export type VerifyBrokerEventFilter = TypedEventFilter<VerifyBrokerEvent>;

export interface IProtocolRevenueShareEvent extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IProtocolRevenueShareEventInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "Collect(address,address,uint256)"(
      pool?: string | null,
      token?: string | null,
      amount?: null
    ): CollectEventFilter;
    Collect(
      pool?: string | null,
      token?: string | null,
      amount?: null
    ): CollectEventFilter;

    "SetDaoFund(address)"(fund?: null): SetDaoFundEventFilter;
    SetDaoFund(fund?: null): SetDaoFundEventFilter;

    "SetFactoryGrowthFundRate(address,uint256)"(
      factory?: null,
      rate?: null
    ): SetFactoryGrowthFundRateEventFilter;
    SetFactoryGrowthFundRate(
      factory?: null,
      rate?: null
    ): SetFactoryGrowthFundRateEventFilter;

    "SetGrowthFund(address)"(fund?: null): SetGrowthFundEventFilter;
    SetGrowthFund(fund?: null): SetGrowthFundEventFilter;

    "SetGrowthFundRate(address,uint256)"(
      pool?: null,
      rate?: null
    ): SetGrowthFundRateEventFilter;
    SetGrowthFundRate(pool?: null, rate?: null): SetGrowthFundRateEventFilter;

    "SetMinimumRevenue(uint256)"(amount?: null): SetMinimumRevenueEventFilter;
    SetMinimumRevenue(amount?: null): SetMinimumRevenueEventFilter;

    "SetRevenueToken(address)"(token?: null): SetRevenueTokenEventFilter;
    SetRevenueToken(token?: null): SetRevenueTokenEventFilter;

    "Share(address,address,uint256,uint256,uint256,uint256)"(
      feeToken?: string | null,
      revenueToken?: string | null,
      amount?: null,
      output?: null,
      growthFundShare?: null,
      daoFundShare?: null
    ): ShareEventFilter;
    Share(
      feeToken?: string | null,
      revenueToken?: string | null,
      amount?: null,
      output?: null,
      growthFundShare?: null,
      daoFundShare?: null
    ): ShareEventFilter;

    "VerifyBroker(address,bool)"(
      broker?: null,
      isVerified?: null
    ): VerifyBrokerEventFilter;
    VerifyBroker(broker?: null, isVerified?: null): VerifyBrokerEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}