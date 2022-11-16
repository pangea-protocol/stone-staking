import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BigNumber } from "ethers";
import { network } from "hardhat";
import { ProtocolRevenueShare__factory } from "../types";
import { addressBook, isLocalNetwork, waitTx } from "./utils";

const deployFunction: DeployFunction = async function ({
  ethers,
  network,
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;

  const { deployer, manager } = await ethers.getNamedSigners();
  const { dev, operator } = await getNamedAccounts();
  const book = addressBook(network);

  /**
   * 1. 컨트랙트 배포
   */
  const { address } = await deploy("ProtocolRevenueShare", {
    from: deployer.address,
    proxy: {
      owner: dev,
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          args: [book.masterDeployer, book.oUSDT, book.wklay],
        },
      },
    },
    log: true,
    waitConfirmations: isLocalNetwork(network) ? 0 : 2,
    gasPrice: BigNumber.from("250000000000"),
  });

  const protocolShare = ProtocolRevenueShare__factory.connect(
    address,
    deployer
  );

  /**
   * 2. 권한 제공
   */
  await waitTx(
    protocolShare.grantRole(await protocolShare.MANAGER_ROLE(), manager.address)
  );

  await waitTx(
    protocolShare.grantRole(await protocolShare.OP_ROLE(), operator)
  );

  /**
   * 3. 펀드 세팅
   */
  await waitTx(protocolShare.connect(manager).setDaoFund(book.daoFund));
  await waitTx(protocolShare.connect(manager).setGrowthFund(book.growthFund));

  /**
   * 4. 팩토리 별 growthFundRate 변경
   */
  if (book.poolFactory) {
    await waitTx(
      protocolShare
        .connect(manager)
        .setFactoryGrowthFundRate(book.poolFactory, 0)
    );
  }

  if (book.miningPoolFactory) {
    await waitTx(
      protocolShare
        .connect(manager)
        .setFactoryGrowthFundRate(book.miningPoolFactory, 5000)
    );
  }

  if (book.yieldPoolFactory) {
    await waitTx(
      protocolShare
        .connect(manager)
        .setFactoryGrowthFundRate(book.yieldPoolFactory, 5000)
    );
  }

  /**
   * 5. verifyBroker 세팅
   */
  for (let address of book.brokers) {
    await waitTx(protocolShare.connect(manager).verifyBroker(address, true));
  }
};

export default deployFunction;

deployFunction.tags = ["ProtocolRevenueShare"];
