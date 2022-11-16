import { ContractTransaction } from "ethers";
import { HardhatRuntimeEnvironment, Network } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

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

export function isLocalNetwork(network: Network) {
  return network.name == "localhost" || network.name == "hardhat";
}

export function addressBook(network: Network) {
  switch (network.name) {
    case "cypress":
      return {
        masterDeployer: "0xEB4B1CE03bb947Ce23ABd1403dF7C9B86004178d",
        oUSDT: "0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167",
        wklay: "0xFF3e7cf0C007f919807b32b30a4a9E7Bd7Bc4121",
        growthFund: "0xD56aB173c3dAC538c261B64BcaCb1f9E1ABbD45b",
        daoFund: "0x56AF1fc95BD6EDbcF77EdB9cCc25Db7e9dA79116",
        poolFactory: "0x3d94b5E3b83CbD52B9616930D33515613ADfAd67",
        miningPoolFactory: "0x02d9bf2d4F5cEA981cB8a8B77A56B498C5da7Eb0",
        yieldPoolFactory: "0x6C7Fc36c3F2792Faf12a5Ba8aa12379c5D01986d",
        brokers: [
          "0xf50782A24afCb26ACb85d086Cf892bFfFB5731B5",
          "0x17ac28a29670e637c8a6e1ec32b38fc301303e34",
          "0x1111111254fb6c44bac0bed2854e76f90643097d",
        ],
      };
    case "baobab":
      return {
        masterDeployer: "0x899d8Ff3d3BD16DBE4eFF245BdA27EF96C01044B",
        oUSDT: "0x3185206Bc408D4a0cb948c4D245Bfbda50067aeC",
        wklay: "0x0339d5Eb6D195Ba90B13ed1BCeAa97EbD198b106",
        growthFund: "0x7123bB2b1D7A9849415946B6b448075556B2A51D",
        daoFund: "0x158bE09afB3887Ef042F922BCE50dEAF4e41DacF",
        poolFactory: "0x2be2C91cCA2df52b41a9e42723c46fD029359c95",
        miningPoolFactory: "0x3e0c0b0737b57D5e7d6f6b10C0e945383bEba82c",
        yieldPoolFactory: "0x3135bB8273107BAe6297DF80fe0A8BD77a34C7E4",
        brokers: ["0x42271971dbF42fbfEaF7F428604a86760300cB5B"],
      };
    case "localhost":
    case "hardhat":
      return {
        masterDeployer: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        oUSDT: "0x09D51b85C46fc70e18786350f81011c02e9F4327",
        wklay: "0x331617C2a63bDC6cC518FDD899A53F7Effc771fA",
        growthFund: "0x7123bB2b1D7A9849415946B6b448075556B2A51D",
        daoFund: "0x158bE09afB3887Ef042F922BCE50dEAF4e41DacF",
        poolFactory: "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690",
        miningPoolFactory: null,
        yieldPoolFactory: null,
        brokers: ["0x851356ae760d987E095750cCeb3bC6014560891C"],
      };
    default:
      throw new Error("NETWORK CHECK");
  }
}

const deployFunction: DeployFunction =
  async function ({}: HardhatRuntimeEnvironment) {};

export default deployFunction;
