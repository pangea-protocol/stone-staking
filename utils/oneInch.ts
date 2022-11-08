import {constants, BigNumber, BigNumberish} from "ethers";
import fetch from "node-fetch";
import {addressEqual} from "./utils";

export class OneInchFetcher {

  constructor(
      private readonly wklayAddress: string,
      private readonly revenueTokenAddress: string
      ) {
  }
  /**
   * 원인치을 통해 fetch 정보 가져오기
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
      fromToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    }

    const url = new URL("https://api.1inch.io/v4.0/8217/swap");
    url.searchParams.set("fromTokenAddress", fromToken);
    url.searchParams.set("toTokenAddress", toToken);
    url.searchParams.set("amount", amount.toString());
    url.searchParams.set("fromAddress", fromAddress);
    url.searchParams.set("slippage", "50");
    url.searchParams.set("disableEstimate", "true");

    try {
      const result = await this.api<{
        toTokenAmount: string;
        tx: {
          from: string;
          to: string;
          data: string;
          value: string;
        };
      }>(url);

      return {
        estimatedAmount: BigNumber.from(result.toTokenAmount), // 예상 output 갯수
        from: result.tx.from, // 호출하는 계정
        to: result.tx.to, // 호출해야 하는 스마트 컨트랙트 (1인치 네트워크 컨트랙트 주소)
        data: result.tx.data, // 담아야 하는 data
        value: BigNumber.from(result.tx.value), // 담아야 하는 value
      };
    } catch (e) {
      return {
        estimatedAmount: BigNumber.from(0),
        from: fromAddress,
        to: constants.AddressZero,
        data: "0x",
        value: BigNumber.from(0),
      };
    }
  }

  private async api<T>(url: URL): Promise<T> {
    return fetch(url.toString()).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}
