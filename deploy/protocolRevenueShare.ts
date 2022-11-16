import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BigNumber } from "ethers";

const deployFunction: DeployFunction = async function ({
  ethers,
  network,
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;

  const { deployer } = await ethers.getNamedSigners();
  const { dev } = await getNamedAccounts();

  let masterDeployer;
  let oUSDT;
  let wklay;

  if (network.name == "cypress") {
    masterDeployer = "0xEB4B1CE03bb947Ce23ABd1403dF7C9B86004178d";
    oUSDT = "0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167";
    wklay = "0xFF3e7cf0C007f919807b32b30a4a9E7Bd7Bc4121";
  } else if (network.name == "baobab") {
    masterDeployer = "0x899d8Ff3d3BD16DBE4eFF245BdA27EF96C01044B";
    oUSDT = "0x3185206Bc408D4a0cb948c4D245Bfbda50067aeC";
    wklay = "0x0339d5Eb6D195Ba90B13ed1BCeAa97EbD198b106";
  } else if (network.name == "localhost" || network.name == "hardhat") {
    masterDeployer = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    oUSDT = "0x09D51b85C46fc70e18786350f81011c02e9F4327";
    wklay = "0x331617C2a63bDC6cC518FDD899A53F7Effc771fA";
  } else {
    throw new Error("SET UP NEED");
  }

  await deploy("ProtocolRevenueShare", {
    from: deployer.address,
    proxy: {
      owner: dev,
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          args: [masterDeployer, oUSDT, wklay],
        },
      },
    },
    log: true,
    waitConfirmations: 0,
    gasPrice: BigNumber.from("250000000000"),
  });
};

export default deployFunction;

deployFunction.tags = ["ProtocolRevenueShare"];
