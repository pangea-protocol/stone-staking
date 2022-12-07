import { ethers, network } from "hardhat";
import { StakedStone, Token } from "../types";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { defaultAbiCoder } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { DUST, jumpDays, jumpToStartOfWeek } from "./utils";

/**
 * 배당금 정산에 대한 세부 분배 규칙 시뮬레이션
 */
describe("CLAIM DIVIDEND UNIT TEST", async () => {
  let _snapshotId: string;

  let deployer: SignerWithAddress;
  let manager: SignerWithAddress;
  let user0: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  let stone: Token;
  let revenueToken: Token;
  let bonusToken: Token;
  let stakedStone: StakedStone;

  let snapshotId: string;

  before("", async () => {
    _snapshotId = await ethers.provider.send("evm_snapshot", []);

    [deployer, manager, user0, user1, user2] = await ethers.getSigners();

    /**
     * DEPLOY
     */
    stone = (await (
      await ethers.getContractFactory("Token")
    ).deploy("STONE", "STONE")) as Token;

    revenueToken = (await (
      await ethers.getContractFactory("Token")
    ).deploy("revenueToken", "revenueToken")) as Token;

    bonusToken = (await (
      await ethers.getContractFactory("Token")
    ).deploy("bonusToken", "bonusToken")) as Token;

    stakedStone = (await (
      await ethers.getContractFactory("StakedStone")
    ).deploy()) as StakedStone;

    const timestamp = (await ethers.provider.getBlock("latest")).timestamp;
    await stakedStone.initialize(stone.address, timestamp);

    /**
     * 권한 획득
     */
    await stakedStone.grantRole(
      ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
      manager.address
    );

    await faucetStone(manager, ethers.utils.parseEther("10000000"));
    await revenueToken.mint(
      manager.address,
      ethers.utils.parseEther("10000000")
    );
    await revenueToken
      .connect(manager)
      .approve(stakedStone.address, ethers.constants.MaxUint256);

    await bonusToken.mint(manager.address, ethers.utils.parseEther("10000000"));
    await bonusToken
      .connect(manager)
      .approve(stakedStone.address, ethers.constants.MaxUint256);

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

  /**
   * 스톤 준비
   * @param user
   * @param amount
   */
  async function faucetStone(user: SignerWithAddress, amount: BigNumber) {
    await stone.mint(user.address, amount);
    await stone
      .connect(user)
      .approve(stakedStone.address, ethers.constants.MaxUint256);
  }

  /**
   * 배당금 예치
   * @param tokens
   * @param amounts
   */
  async function depositDividend(tokens: Token[], amounts: BigNumber[]) {
    await stakedStone.connect(manager).setDividendRecordDate();
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const amount = amounts[i];

      await stakedStone.connect(manager).depositDividend(token.address, amount);
    }
    await stakedStone.connect(manager).executeDividend();
  }

  describe("# claimReward", async () => {
    beforeEach("3명의 유저에게 자산 준비", async () => {
      // 스톤 제공
      await faucetStone(user0, ethers.utils.parseEther("10000"));
      await faucetStone(user1, ethers.utils.parseEther("10000"));
      await faucetStone(user2, ethers.utils.parseEther("10000"));
    });

    it("문제 케이스> 유저 0이 stake 후 unstake를 한 후에도 reward는 모두 수령할 수 있어야 함", async () => {
      await jumpToStartOfWeek(false);
      const amount = ethers.utils.parseEther("10");
      await stakedStone.connect(user0).stake(amount);
      await jumpDays(10, false);

      await stakedStone.connect(user0).unstake(amount.div(2));
      await jumpDays(20, false);

      await depositDividend([revenueToken], [ethers.utils.parseEther("10")]);

      const result = await stakedStone.allocatedDividend(user0.address, 0);

      expect(result.tokens[0]).to.be.eq(revenueToken.address);
      expect(result.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10"),
        DUST
      );
    });

    it("유저 0이 reward를 모두 수령하는 케이스", async () => {
      await jumpToStartOfWeek(false);
      const amount = ethers.utils.parseEther("10");

      await stakedStone.connect(user0).stake(amount);

      await jumpDays(30);

      await depositDividend([revenueToken], [ethers.utils.parseEther("10")]);

      const result = await stakedStone.allocatedDividend(user0.address, 0);

      expect(result.tokens[0]).to.be.eq(revenueToken.address);
      expect(result.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10"),
        DUST
      );
    });

    it("유저 0이 두 달치 모두 수령하는 케이스", async () => {
      await jumpToStartOfWeek(false);
      const amount = ethers.utils.parseEther("10");

      await stakedStone.connect(user0).stake(amount);

      await jumpDays(30);

      await depositDividend([revenueToken], [ethers.utils.parseEther("10")]);

      await jumpDays(30);

      await depositDividend([bonusToken], [ethers.utils.parseEther("10")]);

      const result = await stakedStone.allocatedDividend(user0.address, 0);

      expect(result.tokens[0]).to.be.eq(revenueToken.address);
      expect(result.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10"),
        DUST
      );

      const result1 = await stakedStone.allocatedDividend(user0.address, 1);

      expect(result1.tokens[0]).to.be.eq(bonusToken.address);
      expect(result1.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10"),
        DUST
      );
    });

    it("유저 0가 stake와 unstake를 순차대로 호출한 케이스", async () => {
      await jumpToStartOfWeek(false);
      const amount = ethers.utils.parseEther("10");

      await stakedStone.connect(user0).stake(amount);
      await jumpDays(14);
      await stakedStone.connect(user0).unstake(amount);

      await jumpDays(30);

      await depositDividend([revenueToken], [ethers.utils.parseEther("10")]);

      await jumpDays(14);
      await stakedStone.connect(user1).stake(amount);
      await jumpDays(14);

      await depositDividend([bonusToken], [ethers.utils.parseEther("10")]);

      const result = await stakedStone.allocatedDividend(user0.address, 0);

      expect(result.tokens[0]).to.be.eq(revenueToken.address);
      expect(result.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10"),
        DUST
      );

      const result1 = await stakedStone.allocatedDividend(user1.address, 1);

      expect(result1.tokens[0]).to.be.eq(bonusToken.address);
      expect(result1.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10"),
        DUST
      );
    });

    it("유저 0과 유저 1과 유저 2가 돈을 각각 넣은 케이스", async () => {
      await jumpToStartOfWeek(false);
      const amount = ethers.utils.parseEther("10");

      await stakedStone.connect(user0).stake(amount);
      await jumpDays(30);
      await stakedStone.connect(user1).stake(amount);
      await jumpDays(30);

      await depositDividend([revenueToken], [ethers.utils.parseEther("10")]);

      await stakedStone.connect(user2).stake(amount);
      await jumpDays(30);

      await depositDividend([bonusToken], [ethers.utils.parseEther("10")]);

      const result00 = await stakedStone.allocatedDividend(user0.address, 0);
      const result01 = await stakedStone.allocatedDividend(user1.address, 0);
      const result02 = await stakedStone.allocatedDividend(user2.address, 0);

      expect(result00.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").mul(2).div(3),
        DUST
      );
      expect(result01.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").mul(1).div(3),
        DUST
      );
      expect(result02.amounts[0]).to.be.eq(0);

      const result10 = await stakedStone.allocatedDividend(user0.address, 1);
      const result11 = await stakedStone.allocatedDividend(user1.address, 1);
      const result12 = await stakedStone.allocatedDividend(user2.address, 1);

      expect(result10.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").div(3),
        DUST
      );
      expect(result11.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").div(3),
        DUST
      );
      expect(result12.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").div(3),
        DUST
      );
    });

    it("유저 0이 파킹하고 있고, 유저 1이 주기적으로 stake/unstake하는 케이스", async () => {
      await jumpToStartOfWeek(false);
      const amount = ethers.utils.parseEther("10");

      await stakedStone.connect(user0).stake(amount);
      await jumpDays(30);
      await stakedStone.connect(user1).stake(amount);
      await jumpDays(30);

      await depositDividend([revenueToken], [ethers.utils.parseEther("10")]);

      await stakedStone.connect(user1).unstake(amount);
      await jumpDays(30);
      await stakedStone.connect(user1).stake(amount);
      await jumpDays(30);

      await depositDividend([revenueToken], [ethers.utils.parseEther("10")]);

      await stakedStone.connect(user1).stake(amount);
      await jumpDays(30);
      await stakedStone.connect(user1).unstake(amount.mul(2));
      await jumpDays(30);

      await depositDividend([revenueToken], [ethers.utils.parseEther("10")]);

      const result00 = await stakedStone.allocatedDividend(user0.address, 0);
      const result01 = await stakedStone.allocatedDividend(user1.address, 0);

      expect(result00.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").mul(2).div(3),
        DUST
      );
      expect(result01.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").mul(1).div(3),
        DUST
      );
      {
        const prev = await revenueToken.balanceOf(user0.address);
        await stakedStone.connect(user0).claimDividend(0);
        const curr = await revenueToken.balanceOf(user0.address);
        expect(curr.sub(prev)).to.be.eq(result00.amounts[0]);
      }
      {
        const prev = await revenueToken.balanceOf(user1.address);
        await stakedStone.connect(user1).claimDividend(0);
        const curr = await revenueToken.balanceOf(user1.address);
        expect(curr.sub(prev)).to.be.eq(result01.amounts[0]);
      }

      const result10 = await stakedStone.allocatedDividend(user0.address, 1);
      const result11 = await stakedStone.allocatedDividend(user1.address, 1);

      expect(result10.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").mul(2).div(3),
        DUST
      );
      expect(result11.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").mul(1).div(3),
        DUST
      );
      {
        const prev = await revenueToken.balanceOf(user0.address);
        await stakedStone.connect(user0).claimDividend(1);
        const curr = await revenueToken.balanceOf(user0.address);
        expect(curr.sub(prev)).to.be.eq(result10.amounts[0]);
      }
      {
        const prev = await revenueToken.balanceOf(user1.address);
        await stakedStone.connect(user1).claimDividend(1);
        const curr = await revenueToken.balanceOf(user1.address);
        expect(curr.sub(prev)).to.be.eq(result11.amounts[0]);
      }

      const result20 = await stakedStone.allocatedDividend(user0.address, 2);
      const result21 = await stakedStone.allocatedDividend(user1.address, 2);
      const result22 = await stakedStone.allocatedDividend(user2.address, 2);

      expect(result20.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").div(2),
        DUST
      );
      expect(result21.amounts[0]).to.be.closeTo(
        ethers.utils.parseEther("10").div(2),
        DUST
      );
      expect(result22.amounts[0]).to.be.eq(0);
      {
        const prev = await revenueToken.balanceOf(user0.address);
        await stakedStone.connect(user0).claimDividend(2);
        const curr = await revenueToken.balanceOf(user0.address);
        expect(curr.sub(prev)).to.be.eq(result20.amounts[0]);
      }
      {
        const prev = await revenueToken.balanceOf(user1.address);
        await stakedStone.connect(user1).claimDividend(2);
        const curr = await revenueToken.balanceOf(user1.address);
        expect(curr.sub(prev)).to.be.eq(result21.amounts[0]);
      }
    });
  });
});
