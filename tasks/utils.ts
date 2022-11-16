import { ContractTransaction } from "ethers";

export async function waitTx(
  transaction: Promise<ContractTransaction>,
  desc = "",
  wait = 2
) {
  const tx = await transaction;

  const receipt = await tx.wait(wait);
  console.log(
    `desc: ${desc}  / tx : ${receipt.transactionHash} / gasUsed : ${receipt.gasUsed}`
  );
}
