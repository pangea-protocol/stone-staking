import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BigNumber } from "ethers";
import { network } from "hardhat";
import { isLocalNetwork } from "./utils";

const deployFunction: DeployFunction = async function ({
  ethers,
  network,
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;

  const { deployer } = await ethers.getNamedSigners();
  const { dev } = await getNamedAccounts();
  let stone;
  let openDate;
  if (network.name == "baobab") {
    stone = "0x816BE2E0594D7cFF6a745591E72BB7397F272385";
    openDate = Math.floor(new Date().getTime() / 1000);
  } else {
    throw new Error("NOT DETERMINED STONE AND OPEN DATE");
  }

  /**
   * 1. 컨트랙트 배포
   */
  const { address } = await deploy("StakedStone", {
    from: deployer.address,
    proxy: {
      owner: dev,
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          args: [stone, openDate],
        },
      },
    },
    log: true,
    waitConfirmations: isLocalNetwork(network) ? 0 : 2,
    gasPrice: BigNumber.from("250000000000"),
  });
};

export default deployFunction;

deployFunction.tags = ["StakedStone"];
