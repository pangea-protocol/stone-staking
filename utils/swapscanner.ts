import {constants, BigNumber, BigNumberish, ethers} from "ethers";
import fetch from "node-fetch";
import crypto from "node:crypto";
import { signTypedData, SignTypedDataVersion } from '@metamask/eth-sig-util';
import {addressEqual} from "./utils";

export class SwapScannerFetcher {
  private readonly referrer:string;
  private readonly privateKey: Buffer;

  constructor(
      privateKey: string,
      private readonly wklayAddress: string,
      private readonly revenueTokenAddress: string
  ) {
    this.referrer = (new ethers.Wallet(privateKey).address).toLowerCase();
    this.privateKey = Buffer.from(privateKey, 'hex');
  }

  /**
   * 스왑스캐너를 통해 fetch 정보 가져오기
   *
   * @param fromToken
   * @param toToken
   * @param fromAddress
   * @param amount
   */
  async swap(
      fromToken: string,
      toToken: string,
      fromAddress: string,
      amount: BigNumberish
  ) {
    if (addressEqual(fromToken, this.revenueTokenAddress)) {
      return {
        estimatedAmount: BigNumber.from(amount),
        from: fromAddress,
        to: constants.AddressZero,
        data: "0x",
        value: BigNumber.from(0),
      }
    }

    if (addressEqual(fromToken, this.wklayAddress)) {
      fromToken = ethers.constants.AddressZero;
    }

    const url = new URL("https://api.swapscanner.io/api/v1/quote");

    const salt = this.generateSalt();
    const message = this.createMessage(fromToken, toToken, fromAddress, amount);
    const signature = this.signMessage(salt, message);

    url.searchParams.set('salt', salt);
    url.searchParams.set('referrer', this.referrer);
    url.searchParams.set('signature', signature);
    Object.entries(message).forEach(([key, value]) =>
        url.searchParams.set(key, value.toString()),
    );

    try {
      const result = await this.api<{
        quote: {
          estimatedAmountOut: string;
          tx: {
            from: string;
            to: string;
            data: string;
            value: string;
          }
        }
      }>(url);
      return {
        estimatedAmount: BigNumber.from(result.quote.estimatedAmountOut), // 예상 output 갯수
        from: result.quote.tx.from, // 호출하는 계정
        to: result.quote.tx.to, // 호출해야 하는 스마트 컨트랙트
        data: result.quote.tx.data, // 담아야 하는 data
        value: BigNumber.from(result.quote.tx.value), // 담아야 하는 value
      };
    } catch (e) {
      console.error(e);
      return {
        estimatedAmount: BigNumber.from(0),
        from: fromAddress,
        to: constants.AddressZero,
        data: "0x",
        value: BigNumber.from(0),
      };
    }
  }

  private createMessage(fromToken:string, toToken:string, fromAddress:string, amount: BigNumberish) {
    return {
      issuedAt: Math.floor(Date.now() / 1000),
      from: fromAddress.toLowerCase(),
      tokenInAddress: fromToken.toLowerCase(),
      tokenOutAddress: toToken.toLowerCase(),
      amount: amount.toString(),
      slippageNumerator: '1',
      slippageDenominator: '100',
      mode: 'gasEfficient',
      skipGasEstimation: true,
    }
  }

  private signMessage(salt:any, message: { [key:string]: string | number | boolean }) {
    return signTypedData({
      privateKey: this.privateKey,
      data: {
        message,
        // all the entries in the domain field are fixed constants for now, except for the salt.
        domain: {
          name: 'Swapscanner Navigator',
          version: 'v1',
          chainId: 8217,
          verifyingContract: '0x8888888888888888888888888888888888888888',
          salt,
        },
        // all the remaining fields are fixed constants.
        primaryType: 'QuoteRequestV1',
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
            { name: 'salt', type: 'bytes32' },
          ],
          QuoteRequestV1: [
            { name: 'issuedAt', type: 'uint256' },
            { name: 'from', type: 'address' },
            { name: 'tokenInAddress', type: 'address' },
            { name: 'tokenOutAddress', type: 'address' },
            { name: 'amount', type: 'uint256' },
            { name: 'slippageNumerator', type: 'uint256' },
            { name: 'slippageDenominator', type: 'uint256' },
            { name: 'mode', type: 'string' },
            { name: 'skipGasEstimation', type: 'bool' },
          ],
        },
      },
      version: SignTypedDataVersion.V4,
    })
  }

  async api<T>(url: URL): Promise<T> {
    return fetch(url.toString()).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  private generateSalt() {
    const salt = crypto.randomBytes(32);
    return '0x' + salt.toString('hex');
  }
}
