import { ethers, network } from "hardhat";
import {
  ERC20,
  ERC20__factory,
  MasterDeployer,
  MasterDeployer__factory,
  Multicall__factory,
  WETH10,
  WETH10__factory,
} from "../resources";
import { BigNumber, Signer } from "ethers";
import { ProtocolRevenueShare } from "../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { OneInchFetcher } from "../utils/oneInch";
import { sleep } from "../utils/utils";
import { config } from "dotenv";
import { SwapScannerFetcher } from "../utils/swapscanner";
import { PangeaswapFetcher } from "../utils/pangeaswap";
// import helpers from "@nomicfoundation/hardhat-network-helpers";
config();

describe("SCENARIO:FORK", function () {
  let _snapshotId: string;

  let user: SignerWithAddress;
  let manager: SignerWithAddress;
  let operator: SignerWithAddress;
  let growthFund: SignerWithAddress;
  let daoFund: SignerWithAddress;

  let pangeaDeployer: Signer;

  let snapshotId: string;

  let masterDeployer: MasterDeployer;
  let usdt: ERC20;
  let eth: ERC20;
  let wklay: WETH10;

  before(async () => {
    _snapshotId = await ethers.provider.send("evm_snapshot", []);

    [user, manager, operator, growthFund, daoFund] = await ethers.getSigners();

    const deployerAddress = "0x2A2F23ff33671361010D357529BDF0adca9416Fc";
    // await helpers.impersonateAccount(deployerAddress);
    pangeaDeployer = await ethers.getSigner(deployerAddress);

    masterDeployer = await MasterDeployer__factory.connect(
      "0xEB4B1CE03bb947Ce23ABd1403dF7C9B86004178d",
      pangeaDeployer
    );
    usdt = await ERC20__factory.connect(
      "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167",
      ethers.provider
    );
    eth = await ERC20__factory.connect(
      "0x34d21b1e550D73cee41151c77F3c73359527a396",
      ethers.provider
    );

    wklay = await WETH10__factory.connect(
      "0xFF3e7cf0C007f919807b32b30a4a9E7Bd7Bc4121",
      ethers.provider
    );

    snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  afterEach(async () => {
    await network.provider.send("evm_revert", [snapshotId]);
    snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  after(async () => {
    await network.provider.send("evm_revert", [_snapshotId]);
    _snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  describe("# INTEGRATION TEST", async () => {
    let protocolRevenue: ProtocolRevenueShare;
    let oneInchFetcher: OneInchFetcher;
    let swapScannerFetcher: SwapScannerFetcher;
    let pangeaswapFetcher: PangeaswapFetcher;

    beforeEach("DEPLOY & SETUP", async () => {
      oneInchFetcher = new OneInchFetcher(wklay.address, usdt.address);
      swapScannerFetcher = new SwapScannerFetcher(
        process.env.SWAPSCANNER_PRIVATE_KEY!,
        wklay.address,
        usdt.address
      );
      const multicall = Multicall__factory.connect(
        "0x1A293190Fa8D3e61f8236e251afcd8725FA768C1",
        ethers.provider
      );
      pangeaswapFetcher = new PangeaswapFetcher(
        multicall,
        wklay.address,
        usdt.address
      );

      protocolRevenue = (await (
        await ethers.getContractFactory("ProtocolRevenueShare", user)
      ).deploy()) as ProtocolRevenueShare;

      await protocolRevenue.initialize(
        masterDeployer.address,
        usdt.address,
        wklay.address
      );

      /**
       * Operator와 Manager Role 지정
       */
      await protocolRevenue.grantRole(
        await protocolRevenue.OP_ROLE(),
        operator.address
      );

      await protocolRevenue.grantRole(
        await protocolRevenue.MANAGER_ROLE(),
        manager.address
      );

      /**
       * 매니저 계정으로 접근
       */
      protocolRevenue = protocolRevenue.connect(manager);

      /**
       * fund 주소 지정
       */
      await protocolRevenue.setGrowthFund(growthFund.address);
      await protocolRevenue.setDaoFund(daoFund.address);

      /**
       * Factory 별 수수료 지정
       */
      await protocolRevenue.setFactoryGrowthFundRate(
        "0x3d94b5E3b83CbD52B9616930D33515613ADfAd67",
        0
      );

      await protocolRevenue.setFactoryGrowthFundRate(
        "0x02d9bf2d4F5cEA981cB8a8B77A56B498C5da7Eb0",
        5000
      );

      await protocolRevenue.setFactoryGrowthFundRate(
        "0x6C7Fc36c3F2792Faf12a5Ba8aa12379c5D01986d",
        5000
      );

      /**
       * 프로토콜 수취하는 대상자 세팅
       */
      await masterDeployer.setProtocolFeeTo(protocolRevenue.address);

      /**
       * 브로커 권한 제공
       * - 1인치 네트워크
       * - 스왑스캐너
       * - 판게아 스왑 라우터
       */
      await protocolRevenue.verifyBroker(
        "0xf50782A24afCb26ACb85d086Cf892bFfFB5731B5",
        true
      );
      await protocolRevenue.verifyBroker(
        "0x17ac28a29670e637c8a6e1ec32b38fc301303e34",
        true
      );
      await protocolRevenue.verifyBroker(
        "0x1111111254fb6c44bac0bed2854e76f90643097d",
        true
      );

      /**
       * Operator 권한으로 변경
       */
      protocolRevenue = protocolRevenue.connect(operator);
    });

    it("collect By Batch", async () => {
      await protocolRevenue.collectByPage(0, 10);

      const totalFees = await protocolRevenue.totalFeeTokens();
      const feeTokens = await protocolRevenue.feeTokens(0, totalFees);
      for (const feeToken of feeTokens) {
        const revenue = await protocolRevenue.allocateRevenue(feeToken);
        if (revenue.amount.eq(0)) continue;

        await sleep(300);
        const resp = await oneInchFetcher.swap(
          feeToken,
          usdt.address,
          protocolRevenue.address,
          revenue.amount
        );

        if (resp.estimatedAmount.gt(1_100_000)) {
          try {
            await protocolRevenue.share(
              feeToken,
              applySlippage(resp.estimatedAmount, 10000),
              resp.to,
              resp.data
            );
          } catch (e) {
            console.error(e);
          }
        }
      }
      console.log(`DAO FUND : ${await usdt.balanceOf(daoFund.address)}`);
      console.log(`GROWTH FUND : ${await usdt.balanceOf(growthFund.address)}`);
    });

    it("SHARE oUSDTxKLAY pairPool by 1 inch", async () => {
      // [1] Collect 수행하기
      const usdtXklayPool = "0xeEE272973cf2cA4c5EBf946e601272a3215412a0";
      await protocolRevenue.collectFrom(usdtXklayPool);

      // [2] Receipt에서 event 가져오기
      const totalFees = await protocolRevenue.totalFeeTokens();
      const feeTokens = await protocolRevenue.feeTokens(0, totalFees);
      for (const feeToken of feeTokens) {
        const revenue = await protocolRevenue.allocateRevenue(feeToken);
        const resp = await oneInchFetcher.swap(
          feeToken,
          usdt.address,
          protocolRevenue.address,
          revenue.amount
        );

        await protocolRevenue.share(
          feeToken,
          applySlippage(resp.estimatedAmount, 100),
          resp.to,
          resp.data
        );
      }

      console.log(`DAO FUND : ${await usdt.balanceOf(daoFund.address)}`);
      console.log(`GROWTH FUND : ${await usdt.balanceOf(growthFund.address)}`);
    });

    it("SHARE ETHxKLAY pairPool by 1 inch", async () => {
      // [1] collect From
      const pool = "0x94d996E26ef631D25Fd705dcA6a8e99227e90D00";
      await protocolRevenue.collectFrom(pool);

      // [2] Receipt에서 event 가져오기
      const totalFees = await protocolRevenue.totalFeeTokens();
      const feeTokens = await protocolRevenue.feeTokens(0, totalFees);
      for (const feeToken of feeTokens) {
        const revenue = await protocolRevenue.allocateRevenue(feeToken);
        const resp = await oneInchFetcher.swap(
          feeToken,
          usdt.address,
          protocolRevenue.address,
          revenue.amount
        );

        await protocolRevenue.share(
          feeToken,
          applySlippage(resp.estimatedAmount, 100),
          resp.to,
          resp.data
        );
      }
      console.log(`DAO FUND : ${await usdt.balanceOf(daoFund.address)}`);
      console.log(`GROWTH FUND : ${await usdt.balanceOf(growthFund.address)}`);
    });

    /**
     * 현재는 항상 실패 => allowance를 미리 취득해야 필요한 approval을 반환해주기 때문
     */
    // it("SHARE ETHxKLAY pairPool by swapScanner", async () => {
    //   // [1] collect From
    //   const pool = "0x94d996E26ef631D25Fd705dcA6a8e99227e90D00";
    //   await protocolRevenue.collectFrom(pool);
    //
    //   // [2] Receipt에서 event 가져오기
    //   const totalFees = await protocolRevenue.totalFeeTokens();
    //   const feeTokens = await protocolRevenue.feeTokens(0, totalFees);
    //   for (const feeToken of feeTokens) {
    //     const revenue = await protocolRevenue.allocateRevenue(feeToken);
    //     const resp = await swapScannerFetcher.swap(
    //         feeToken,
    //         usdt.address,
    //         protocolRevenue.address,
    //         revenue.amount
    //     );
    //     console.log(resp)
    //
    //     await protocolRevenue.share(
    //         feeToken,
    //         applySlippage(resp.estimatedAmount, 100),
    //         resp.to,
    //         resp.data
    //     );
    //   }
    //   console.log(`DAO FUND : ${await usdt.balanceOf(daoFund.address)}`);
    //   console.log(`GROWTH FUND : ${await usdt.balanceOf(growthFund.address)}`);
    // });

    it("SHARE USDTxKLAY pairPool by pangeaswap", async () => {
      // [1] collect From
      const pool = "0xeEE272973cf2cA4c5EBf946e601272a3215412a0";
      await protocolRevenue.collectFrom(pool);

      // [2] Receipt에서 event 가져오기
      const totalFees = await protocolRevenue.totalFeeTokens();
      const feeTokens = await protocolRevenue.feeTokens(0, totalFees);
      for (const feeToken of feeTokens) {
        const revenue = await protocolRevenue.allocateRevenue(feeToken);
        const resp = await pangeaswapFetcher.swap(
          feeToken,
          usdt.address,
          protocolRevenue.address,
          revenue.amount
        );

        await protocolRevenue.share(
          feeToken,
          applySlippage(resp.estimatedAmount, 100),
          resp.to,
          resp.data
        );
      }
      console.log(`DAO FUND : ${await usdt.balanceOf(daoFund.address)}`);
      console.log(`GROWTH FUND : ${await usdt.balanceOf(growthFund.address)}`);
    });

    it("SHARE ETHxKLAY pairPool by pangeaswap", async () => {
      // [1] collect From
      const pool = "0x94d996E26ef631D25Fd705dcA6a8e99227e90D00";
      await protocolRevenue.collectFrom(pool);

      // [2] Receipt에서 event 가져오기
      const totalFees = await protocolRevenue.totalFeeTokens();
      const feeTokens = await protocolRevenue.feeTokens(0, totalFees);
      for (const feeToken of feeTokens) {
        const revenue = await protocolRevenue.allocateRevenue(feeToken);
        const resp = await pangeaswapFetcher.swap(
          feeToken,
          usdt.address,
          protocolRevenue.address,
          revenue.amount
        );

        await protocolRevenue.share(
          feeToken,
          applySlippage(resp.estimatedAmount, 100),
          resp.to,
          resp.data
        );
      }
      console.log(`DAO FUND : ${await usdt.balanceOf(daoFund.address)}`);
      console.log(`GROWTH FUND : ${await usdt.balanceOf(growthFund.address)}`);
    });
  });
});

export function applySlippage(amount: BigNumber, slippage: number) {
  const bips = 10000;
  return amount.mul(bips - slippage).div(bips);
}
