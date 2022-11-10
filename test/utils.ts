import { ContractTransaction } from "ethers";
import { ethers, network } from "hardhat";

export const DUST = ethers.utils.parseEther("0.0001");
export const DAY = 86400;
export const WEEK = DAY * 7;
/**
 * 동일 블럭 내에 트랜잭션 호출 ( hardhat 환경 내에서 복수개의 transaction을 밀어 넣기 )
 * @param txs
 */
export async function multipleTxOnSameBlock(
  ...txs: (() => Promise<ContractTransaction>)[]
) {
  await network.provider.send("evm_setAutomine", [false]);
  for (const tx of txs) {
    await tx();
  }
  await network.provider.send("evm_mine", []);
  await network.provider.send("evm_setAutomine", [true]);
}

export function getWeekStartTime(time: number) {
  return Math.floor(time / WEEK) * WEEK;
}

export async function jumpToNextBlockTimestamp(time: number) {
  await network.provider.send("evm_setNextBlockTimestamp", [time]);
  await network.provider.send("evm_mine", []);
}

export async function jumpToStartOfWeek(mine = true) {
  const block = await ethers.provider.getBlock("latest");
  const startTime = Math.floor(block.timestamp / WEEK) * WEEK + WEEK;
  await network.provider.send("evm_setNextBlockTimestamp", [startTime]);
  if (mine) {
    await network.provider.send("evm_mine", []);
  }
}

export async function jumpDays(days: number, mine = true) {
  await network.provider.send("evm_increaseTime", [DAY * days]);
  if (mine) {
    await network.provider.send("evm_mine", []);
  }
}
