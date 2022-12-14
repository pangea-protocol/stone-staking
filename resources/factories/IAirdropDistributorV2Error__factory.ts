/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IAirdropDistributorV2Error,
  IAirdropDistributorV2ErrorInterface,
} from "../IAirdropDistributorV2Error";

const _abi = [
  {
    inputs: [],
    name: "NotAllowedToken",
    type: "error",
  },
  {
    inputs: [],
    name: "NotExists",
    type: "error",
  },
  {
    inputs: [],
    name: "NotYet",
    type: "error",
  },
];

export class IAirdropDistributorV2Error__factory {
  static readonly abi = _abi;
  static createInterface(): IAirdropDistributorV2ErrorInterface {
    return new utils.Interface(_abi) as IAirdropDistributorV2ErrorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAirdropDistributorV2Error {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IAirdropDistributorV2Error;
  }
}
