import { ethers, network } from "hardhat";
import { StakedStone, Token } from "../types";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { defaultAbiCoder } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import {
  DUST,
  jumpDays,
  jumpToStartOfWeek,
  multipleTxOnSameBlock,
  WEEK,
} from "./utils";

/**
 * 리워드에 대한 세부 분배 규칙 시뮬레이션
 *
 * 주요 엣지 케이스
 *
 * [1] 지난 epoch의 남은 물량을 정상적으로 처리하는지
 *
 * [2] staked된 물량이 없었을 때 비율이 올바르게 처리되는지
 *
 * [3] 시간과 예치한 물량에 비례해서 분배가 올바르게 되고 있는지
 *
 * [4] stake & unstake에 따라 정상적으로 분배비율이 바뀌고 있는지
 *
 */
describe("CLAIM REWARD UNIT TEST", async () => {
  let _snapshotId: string;

  let deployer: SignerWithAddress;
  let manager: SignerWithAddress;
  let user0: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  let stone: Token;
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

  async function depositReward(amount: BigNumber, epoch: number) {
    const block = await ethers.provider.getBlock("latest");
    const startTime = Math.floor(block.timestamp / WEEK) * WEEK + epoch * WEEK;
    await stakedStone.connect(manager).depositReward(amount, startTime);
  }

  describe("# claimReward", async () => {
    beforeEach("3명의 유저에게 자산 준비", async () => {
      // 스톤 제공
      await faucetStone(user0, ethers.utils.parseEther("10000"));
      await faucetStone(user1, ethers.utils.parseEther("10000"));
      await faucetStone(user2, ethers.utils.parseEther("10000"));

      // 주차 별 스톤 리워드 납입
      await depositReward(ethers.utils.parseEther("100"), 1);
      await depositReward(ethers.utils.parseEther("100"), 2);
    });

    it("유저 0이 reward를 모두 수령하는 케이스", async () => {
      await jumpToStartOfWeek(false);
      const amount = ethers.utils.parseEther("10");

      // 1일차
      await jumpDays(1);

      await stakedStone.connect(user0).stake(amount);

      // 15일 이후
      await jumpDays(14);

      const result = await stakedStone.claimableReward(user0.address);

      const prev = await stone.balanceOf(user0.address);
      await stakedStone.connect(user0).claimReward();
      const curr = await stone.balanceOf(user0.address);

      // user0은 모든 depositedReward를 가져갈 수 있습니다.
      expect(result).to.be.closeTo(ethers.utils.parseEther("200"), DUST);
      expect(curr.sub(prev)).to.be.eq(result);
    });

    it("유저 0이 14일 간 예치, 유저 1이 7일간 예치한 경우", async () => {
      // 유저0는 7일 * 1주차 보상     + 7일 * 2주차 보상 / 2
      // 유저1는 7일 * 2주차 보상 / 2
      // 으로 나뉘어짐

      const amount = ethers.utils.parseEther("10");

      await jumpToStartOfWeek(false);

      await stakedStone.connect(user0).stake(amount);
      await jumpDays(7, false);

      await stakedStone.connect(user1).stake(amount);
      await jumpDays(7);

      const result0 = await stakedStone.claimableReward(user0.address);
      const result1 = await stakedStone.claimableReward(user1.address);

      const totalReward = ethers.utils.parseEther("200");

      expect(result0).to.be.closeTo(
        totalReward.mul(3).div(4),
        ethers.utils.parseEther("1")
      );
      expect(result1).to.be.closeTo(
        totalReward.div(4),
        ethers.utils.parseEther("1")
      );
      expect(result0.add(result1)).to.be.lte(totalReward);

      expect(
        await stakedStone.connect(user0).callStatic.claimReward()
      ).to.be.eq(result0);
      expect(
        await stakedStone.connect(user1).callStatic.claimReward()
      ).to.be.eq(result1);
    });

    it("유저 0이 14일 간 예치, 유저 1이 4일간 예치한 경우", async () => {
      // 유저0 지분 = 10일 + 4일 / 2 = 12
      // 유저1 지분 =        4일 / 2 = 2

      const amount = ethers.utils.parseEther("10");

      await jumpToStartOfWeek(false);
      await stakedStone.connect(user0).stake(amount);
      await jumpDays(10, false);
      await stakedStone.connect(user1).stake(amount);
      await jumpDays(4);

      const result0 = await stakedStone.claimableReward(user0.address);
      const result1 = await stakedStone.claimableReward(user1.address);

      const totalReward = ethers.utils.parseEther("200");

      expect(result0).to.be.closeTo(totalReward.mul(12).div(14), DUST);
      expect(result1).to.be.closeTo(totalReward.mul(2).div(14), DUST);
      expect(result0.add(result1)).to.be.lte(totalReward);

      expect(
        await stakedStone.connect(user0).callStatic.claimReward()
      ).to.be.eq(result0);
      expect(
        await stakedStone.connect(user1).callStatic.claimReward()
      ).to.be.eq(result1);
    });

    it("유저 0과 유저 1이 동일 예치 후, 유저 0이 이후에 추가 예치한 케이스", async () => {
      // 유저0 지분 = 1일 + 7일 / 2 + 6일 * 2 / 3 = 1 + 3.5 + 4 = 8.5 (17/28)
      // 유저1 지분 =       7일 / 2 + 6일 * 1 / 3 =     3.5 + 2 = 5.5 (11/28)

      const amount = ethers.utils.parseEther("10");

      await jumpToStartOfWeek(false);
      await stakedStone.connect(user0).stake(amount);
      await jumpDays(1, false);
      await stakedStone.connect(user1).stake(amount);
      await jumpDays(7, false);
      await stakedStone.connect(user0).stake(amount);
      await jumpDays(6);

      const result0 = await stakedStone.claimableReward(user0.address);
      const result1 = await stakedStone.claimableReward(user1.address);

      const totalReward = ethers.utils.parseEther("200");

      expect(result0).to.be.closeTo(totalReward.mul(17).div(28), DUST);
      expect(result1).to.be.closeTo(totalReward.mul(11).div(28), DUST);
      expect(result0.add(result1)).to.be.lte(totalReward);

      expect(
        await stakedStone.connect(user0).callStatic.claimReward()
      ).to.be.eq(result0);
      expect(
        await stakedStone.connect(user1).callStatic.claimReward()
      ).to.be.eq(result1);
    });

    it("유저 0과 유저 1이 동일 예치 후, 유저 0이 이후에 절반을 제거한 케이스", async () => {
      // 유저0 지분 = 1일 + 7일 / 2 + 6일 * 1 / 3 = 1 + 3.5 + 2 = 6.5 (13/28)
      // 유저1 지분 =       7일 / 2 + 6일 * 2 / 3 =     3.5 + 4 = 7.5 (15/28)

      const amount = ethers.utils.parseEther("10");

      await jumpToStartOfWeek(false);
      await stakedStone.connect(user0).stake(amount);
      await jumpDays(1, false);
      await stakedStone.connect(user1).stake(amount);
      await jumpDays(7, false);
      await stakedStone.connect(user0).unstake(amount.div(2));
      await jumpDays(6);

      const result0 = await stakedStone.claimableReward(user0.address);
      const result1 = await stakedStone.claimableReward(user1.address);

      const totalReward = ethers.utils.parseEther("200");

      expect(result0).to.be.closeTo(totalReward.mul(13).div(28), DUST);
      expect(result1).to.be.closeTo(totalReward.mul(15).div(28), DUST);
      expect(result0.add(result1)).to.be.lte(totalReward);

      expect(
        await stakedStone.connect(user0).callStatic.claimReward()
      ).to.be.eq(result0);
      expect(
        await stakedStone.connect(user1).callStatic.claimReward()
      ).to.be.eq(result1);
    });

    it("유저 0과 유저 1이 동일 예치 후, 유저 0이 모두 제거한 케이스", async () => {
      // 같은 금액을 예치한 경우
      // 유저0 지분 = 1일 + 7일 / 2       = 1 + 3.5 = 4.5 ( 9/28)
      // 유저1 지분 =       7일 / 2 + 6일 = 3.5 + 6 = 9.5 (19/28)

      const amount = ethers.utils.parseEther("10");

      await jumpToStartOfWeek(false);
      await stakedStone.connect(user0).stake(amount);
      await jumpDays(1, false);
      await stakedStone.connect(user1).stake(amount);
      await jumpDays(7, false);
      await stakedStone.connect(user0).unstake(amount);
      await jumpDays(6);

      const result0 = await stakedStone.claimableReward(user0.address);
      const result1 = await stakedStone.claimableReward(user1.address);

      const totalReward = ethers.utils.parseEther("200");

      expect(result0).to.be.closeTo(totalReward.mul(9).div(28), DUST);
      expect(result1).to.be.closeTo(totalReward.mul(19).div(28), DUST);
      expect(result0.add(result1)).to.be.lte(totalReward);

      expect(
        await stakedStone.connect(user0).callStatic.claimReward()
      ).to.be.eq(result0);
      expect(
        await stakedStone.connect(user1).callStatic.claimReward()
      ).to.be.eq(result1);
    });

    it("유저 0이 15일 차에 처음 넣은 경우", async () => {
      const amount = ethers.utils.parseEther("10");

      await jumpToStartOfWeek(true);
      await jumpDays(15);

      await stakedStone.connect(user0).stake(amount);

      const result = await stakedStone.claimableReward(user0.address);

      const totalReward = ethers.utils.parseEther("200");

      expect(result).to.be.closeTo(totalReward, DUST);
      expect(
        await stakedStone.connect(user0).callStatic.claimReward()
      ).to.be.eq(result);
    });

    it("유저 0이 3일차 claim 요청하는 경우", async () => {
      const amount = ethers.utils.parseEther("10");

      await jumpToStartOfWeek(false);
      await stakedStone.connect(user0).stake(amount);
      await jumpDays(3, true);

      const result = await stakedStone.claimableReward(user0.address);
      expect(
        await stakedStone.connect(user0).callStatic.claimReward()
      ).to.be.eq(result);
      const totalReward = ethers.utils.parseEther("100");

      expect(result).to.be.closeTo(totalReward.mul(3).div(7), DUST);
    });

    it("유저 0이 3일 예치 후 빼고, 7일차부터 다시 예치한 경우", async () => {
      const amount = ethers.utils.parseEther("10");

      await jumpToStartOfWeek(false);
      await stakedStone.connect(user0).stake(amount);
      await jumpDays(3, true);
      await stakedStone.connect(user0).unstake(amount);
      await jumpDays(7, true);
      await stakedStone.connect(user0).stake(amount);
      await jumpDays(4, true);

      const result = await stakedStone.claimableReward(user0.address);
      expect(
        await stakedStone.connect(user0).callStatic.claimReward()
      ).to.be.eq(result);
      const totalReward = ethers.utils.parseEther("200");

      expect(result).to.be.closeTo(totalReward, DUST);
    });

    it("유저 0 : 유저 1 : 유저 2가 동일 시점에 자산을 넣은 경우", async () => {
      const amount = ethers.utils.parseEther("10");

      await jumpToStartOfWeek(false);

      // 동일 트랜잭션 내에서 호출
      await multipleTxOnSameBlock(
        () => stakedStone.connect(user0).stake(amount.mul(1)),
        () => stakedStone.connect(user1).stake(amount.mul(2)),
        () => stakedStone.connect(user2).stake(amount.mul(3))
      );

      await jumpDays(14, true);

      const result0 = await stakedStone.claimableReward(user0.address);
      const result1 = await stakedStone.claimableReward(user1.address);
      const result2 = await stakedStone.claimableReward(user2.address);
      expect(
        await stakedStone.connect(user0).callStatic.claimReward()
      ).to.be.eq(result0);
      expect(
        await stakedStone.connect(user1).callStatic.claimReward()
      ).to.be.eq(result1);
      expect(
        await stakedStone.connect(user2).callStatic.claimReward()
      ).to.be.eq(result2);

      const totalReward = ethers.utils.parseEther("200");

      expect(result0).to.be.closeTo(totalReward.mul(1).div(6), DUST);
      expect(result1).to.be.closeTo(totalReward.mul(2).div(6), DUST);
      expect(result2).to.be.closeTo(totalReward.mul(3).div(6), DUST);
    });
  });
});
