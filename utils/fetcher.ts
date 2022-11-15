import { BigNumber, BigNumberish, constants } from "ethers";

export type FetchOutput = {
  estimatedAmount: BigNumber;
  from: string;
  to: string;
  data: string;
  value: BigNumber;
};

export interface IFetcher {
  swap(
    fromToken: string,
    toToken: string,
    fromAddress: string,
    amount: BigNumberish
  ): Promise<{
    estimatedAmount: BigNumber;
    from: string;
    to: string;
    data: string;
    value: BigNumber;
  }>;
}

export class FetchAggregator {
  private readonly fetchers: IFetcher[];
  constructor(...fetchers: IFetcher[]) {
    this.fetchers = fetchers;
  }

  async fetch(
    fromToken: string,
    toToken: string,
    fromAddress: string,
    amount: BigNumberish
  ) {
    let calls: Promise<FetchOutput>[] = [];
    for (let fetcher of this.fetchers) {
      calls.push(fetcher.swap(fromToken, toToken, fromAddress, amount));
    }

    const results = await Promise.all(calls);
    return results.sort((a, b) =>
      a.estimatedAmount.lt(b.estimatedAmount) ? 1 : -1
    )[0];
  }
}
