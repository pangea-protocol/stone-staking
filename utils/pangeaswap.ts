import {Multicall, PoolRouter__factory, SwapHelper__factory} from "../resources";
import {BigNumber, BigNumberish, constants, ethers} from "ethers";
import { GraphQLClient, gql } from 'graphql-request'
import {addressEqual} from "./utils";

export type Pool = {
  address: string,
  token0: string,
  token1: string,
  totalValueLocked: number
}


const swapHelperInterface = SwapHelper__factory.createInterface();
function encodeCalculateExactInput(path:string[], tokenIn:string, amount:BigNumberish) {
  return swapHelperInterface.encodeFunctionData("calculateExactInput", [path, tokenIn, amount])
}

const routerInterface = PoolRouter__factory.createInterface();
function encodeExactInput(tokenIn:string, path:string[], amountIn:BigNumberish, amountOutMinimum:BigNumberish, to:string) {
  return routerInterface.encodeFunctionData("exactInputWithoutStruct",
      [tokenIn, amountIn, amountOutMinimum, path, to, false]
  )
}

export class PangeaswapFetcher {
  private pools: Pool[] = [];

  constructor(
      private readonly multicall: Multicall,
      private readonly wklayAddress: string,
      private readonly revenueTokenAddress: string,
      private baseTokens: string[] = [
        '0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167',
        '0x5096dB80B21Ef45230C9E423C373f1FC9C0198dd',
        '0x5c74070FDeA071359b86082bd9f9b3dEaafbe32b',
        '0x9eaeFb09fe4aABFbE6b1ca316a3c36aFC83A393F',
        '0x16D0e1fBD024c600Ca0380A4C5D57Ee7a2eCBf9c',
        '0xFF3e7cf0C007f919807b32b30a4a9E7Bd7Bc4121',
        '0x34d21b1e550D73cee41151c77F3c73359527a396',
        '0x754288077D0fF82AF7a5317C7CB8c444D421d103'
      ]
  ){
    this.baseTokens = this.baseTokens.map(e => e.toLowerCase())
  }

  /**
   * 판게아스왑 swapHelper를 통해 fetch 정보 가져오기
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

    if (this.pools.length == 0) {
      // if not initialized
      this.pools = await loadAllPools(1);
    }

    const tokenSets = new Set<string>([...this.baseTokens, fromToken.toLowerCase(), toToken.toLowerCase()]);
    const targetPools = this.pools.filter(pool => includeTokens(pool, tokenSets));

    const routes = computeAllRoutes(fromToken, toToken, targetPools);

    if (routes.length == 0) {
      return {
        estimatedAmount: BigNumber.from(0),
        from: fromAddress,
        to: constants.AddressZero,
        data: "0x",
        value: BigNumber.from(0),
      };
    }

    const calldata = routes.map(e => {
          return {
            // swap Helper 주소
            target: "0xe80FE14d4c67598A2a8F107f1b95FECC2Bb08E7D",
            gasLimit: 0,
            callData: encodeCalculateExactInput(e, fromToken, amount)
          }
    });

    const estimatedOutputs = (await this.multicall.callStatic.multicall(calldata))
        .returnData
        .map(e => e.returnData)
        .map(e => swapHelperInterface.decodeFunctionResult("calculateExactInput", e))
        .map(e => e[0]);

    let maximum = BigNumber.from(0);
    for (const output of estimatedOutputs) {
      if (output.gt(maximum)) {
        maximum = output;
      }
    }

    const i = estimatedOutputs.indexOf(maximum);
    const estimatedAmount = estimatedOutputs[i];
    const route = routes[i];

    fromToken = addressEqual(fromToken, this.wklayAddress) ? ethers.constants.AddressZero : fromToken;
    const data = encodeExactInput(fromToken, route, amount, estimatedAmount.mul(99).div(100), fromAddress);
    return {
      estimatedAmount,
      from: fromAddress,
      to: "0x17Ac28a29670e637c8a6E1ec32b38fC301303E34",
      data,
      value: BigNumber.from(0)
    }
  }
}

function computeAllRoutes(
    tokenIn: string,
    tokenOut: string,
    pools: Pool[],
    currentPath: Pool[] = [],
    allPaths: string[][] = [],
    startTokenIn: string = tokenIn,
    maxHops = 3
) {
  for (const pool of pools) {
    if (
        !includeTokens(pool, new Set<string>([tokenIn.toLowerCase()])) ||
        currentPath.find(pathPool => pool.address == pathPool.address)
    ) {
      continue;
    }

    const outputToken = addressEqual(pool.token0, tokenIn) ? pool.token1 : pool.token0;
    if (addressEqual(outputToken, tokenOut)) {
      allPaths.push([...currentPath.map(e => e.address), pool.address])
    } else if (maxHops > 1) {
      computeAllRoutes(outputToken, tokenOut, pools, [...currentPath, pool], allPaths, startTokenIn, maxHops - 1)
    }
  }
  return allPaths;
}

function includeTokens(pool:Pool, tokens: Set<string>) {
  return tokens.has(pool.token0.toLowerCase()) || tokens.has(pool.token1.toLowerCase());
}


async function loadAllPools(threshold=1) {
  const client = new GraphQLClient("https://api.pangeaswap.com/graphql")
  const query = gql`{
        pools {
            address
            token0 {
                address
            }
            token1 {
                address
            }
            totalValueLocked
        }
  }
  `
  return (
      await client.request<{
        pools: {
          address:string,
          token0:{address:string},
          token1:{address:string},
          totalValueLocked: number,
        }[]
      }>(query)).pools.map((x) => {
    return {
      address: x.address,
      token0: x.token0.address,
      token1: x.token1.address,
      totalValueLocked: x.totalValueLocked
    }
  }).filter(pool => pool.totalValueLocked >= threshold)
}
