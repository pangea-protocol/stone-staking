import { ethers, network } from "hardhat";
import { StakedStone, Token } from "../types";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { defaultAbiCoder } from "ethers/lib/utils";

describe("REWARD UNIT TEST", async () => {
  let _snapshotId: string;
  const WEEK = 604800;

  let deployer: SignerWithAddress;
  let manager: SignerWithAddress;
  let user0: SignerWithAddress;
  let user1: SignerWithAddress;

  let stone: Token;
  let stakedStone: StakedStone;

  let snapshotId: string;

  before("", async () => {
    _snapshotId = await ethers.provider.send("evm_snapshot", []);

    [deployer, manager, user0, user1] = await ethers.getSigners();

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

  async function setNextBlockTimestamp(time: number) {
    await network.provider.send("evm_setNextBlockTimestamp", [time]);
    await network.provider.send("evm_mine", []);
  }

  describe("# DEPOSIT & CANCEL REWARD", async () => {
    beforeEach("", async () => {
      await stone.mint(manager.address, ethers.utils.parseEther("10000"));
      await stone
        .connect(manager)
        .approve(stakedStone.address, ethers.constants.MaxUint256);
    });

    it("revert: msg.sender is not manager", async () => {
      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor((block.timestamp + WEEK) / WEEK) * WEEK;

      await expect(
        stakedStone.depositReward(ethers.utils.parseEther("100"), startTime)
      ).to.be.reverted;
    });

    it("revert: startTime % 7days != 0", async () => {
      await stakedStone.grantRole(
        ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
        manager.address
      );

      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor((block.timestamp + WEEK) / WEEK) * WEEK;

      await expect(
        stakedStone
          .connect(manager)
          .depositReward(ethers.utils.parseEther("100"), startTime + 10)
      ).to.be.reverted;
    });

    it("revert: too late", async () => {
      await stakedStone.grantRole(
        ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
        manager.address
      );

      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor(block.timestamp / WEEK) * WEEK;

      await expect(
        stakedStone
          .connect(manager)
          .depositReward(ethers.utils.parseEther("100"), startTime)
      ).to.be.reverted;
    });

    it("depositReward successfully", async () => {
      await stakedStone.grantRole(
        ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
        manager.address
      );

      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor(block.timestamp / WEEK) * WEEK + WEEK;

      await stakedStone
        .connect(manager)
        .depositReward(ethers.utils.parseEther("100"), startTime);

      expect(await stakedStone.totalRewardPerWeek(startTime)).to.be.eq(
        ethers.utils.parseEther("100")
      );
    });

    it("depositReward twice successfully", async () => {
      await stakedStone.grantRole(
        ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
        manager.address
      );

      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor(block.timestamp / WEEK) * WEEK + WEEK;

      await stakedStone
        .connect(manager)
        .depositReward(ethers.utils.parseEther("100"), startTime);

      await stakedStone
        .connect(manager)
        .depositReward(ethers.utils.parseEther("200"), startTime);

      expect(await stakedStone.totalRewardPerWeek(startTime)).to.be.eq(
        ethers.utils.parseEther("300")
      );
    });

    it("cancelReward revert: not manager", async () => {
      await stakedStone.grantRole(
        ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
        manager.address
      );

      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor(block.timestamp / WEEK) * WEEK + WEEK;

      await stakedStone
        .connect(manager)
        .depositReward(ethers.utils.parseEther("100"), startTime);

      await expect(
        stakedStone.cancelReward(ethers.utils.parseEther("10"), startTime)
      ).to.be.reverted;
    });

    it("cancelReward revert: too late", async () => {
      await stakedStone.grantRole(
        ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
        manager.address
      );

      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor(block.timestamp / WEEK) * WEEK + WEEK;

      await stakedStone
        .connect(manager)
        .depositReward(ethers.utils.parseEther("100"), startTime);

      await setNextBlockTimestamp(startTime + 1);

      await expect(
        stakedStone
          .connect(manager)
          .cancelReward(ethers.utils.parseEther("10"), startTime)
      ).to.be.reverted;
    });

    it("cancelReward successfully", async () => {
      await stakedStone.grantRole(
        ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
        manager.address
      );

      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor(block.timestamp / WEEK) * WEEK + WEEK;

      await stakedStone
        .connect(manager)
        .depositReward(ethers.utils.parseEther("100"), startTime);

      await stakedStone
        .connect(manager)
        .cancelReward(ethers.utils.parseEther("10"), startTime);
    });
  });

  describe("# claimReward", async () => {
    beforeEach("", async () => {
      await stone.mint(user0.address, ethers.utils.parseEther("1000"));
      await stone
        .connect(user0)
        .approve(stakedStone.address, ethers.constants.MaxUint256);
      await stone.mint(user1.address, ethers.utils.parseEther("1000"));
      await stone
        .connect(user1)
        .approve(stakedStone.address, ethers.constants.MaxUint256);

      await stone.mint(manager.address, ethers.utils.parseEther("10000"));
      await stone
        .connect(manager)
        .approve(stakedStone.address, ethers.constants.MaxUint256);

      await stakedStone.grantRole(
        ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
        manager.address
      );
    });

    it("claimableReward after stake", async () => {
      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor(block.timestamp / WEEK) * WEEK + WEEK;

      const amount = ethers.utils.parseEther("1200");

      await stakedStone.connect(manager).depositReward(amount, startTime);
      await stakedStone.connect(user0).stake(ethers.utils.parseEther("100"));

      await setNextBlockTimestamp(startTime + 3 * 86400);

      expect(await stakedStone.claimableReward(user0.address)).to.be.closeTo(
        amount.mul(3).div(7),
        1000
      );
    });

    it("claimableReward after two accounts stake", async () => {
      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor(block.timestamp / WEEK) * WEEK + WEEK;

      const amount = ethers.utils.parseEther("1200");

      await stakedStone.connect(manager).depositReward(amount, startTime);
      await stakedStone.connect(user0).stake(ethers.utils.parseEther("200"));
      await stakedStone.connect(user1).stake(ethers.utils.parseEther("300"));

      await setNextBlockTimestamp(startTime + 3 * 86400);

      expect(await stakedStone.claimableReward(user0.address)).to.be.closeTo(
        amount.mul(6).div(35),
        1000
      );
      expect(await stakedStone.claimableReward(user1.address)).to.be.closeTo(
        amount.mul(9).div(35),
        1000
      );
    });

    it("claim after two accounts stake", async () => {
      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor(block.timestamp / WEEK) * WEEK + WEEK;

      const amount = ethers.utils.parseEther("1200");

      await stakedStone.connect(manager).depositReward(amount, startTime);
      await stakedStone.connect(user0).stake(ethers.utils.parseEther("200"));
      await stakedStone.connect(user1).stake(ethers.utils.parseEther("300"));

      await setNextBlockTimestamp(startTime + 3 * 86400);

      const value = await stakedStone.claimableReward(user0.address);
      const prev = await stone.balanceOf(user0.address);
      await stakedStone.connect(user0).claimReward();
      const curr = await stone.balanceOf(user0.address);

      expect(curr.sub(prev)).to.be.closeTo(value, ethers.utils.parseEther("1"));
    });

    it("restake", async () => {
      const block = await ethers.provider.getBlock("latest");
      const startTime = Math.floor(block.timestamp / WEEK) * WEEK + WEEK;

      const amount = ethers.utils.parseEther("1200");

      await stakedStone.connect(manager).depositReward(amount, startTime);
      await stakedStone.connect(user0).stake(ethers.utils.parseEther("200"));
      await stakedStone.connect(user1).stake(ethers.utils.parseEther("300"));

      await setNextBlockTimestamp(startTime + 3 * 86400);

      const value = await stakedStone.claimableReward(user0.address);
      const prev = await stakedStone.balanceOf(user0.address);
      await stakedStone.connect(user0).reStake();
      const curr = await stakedStone.balanceOf(user0.address);

      expect(curr.sub(prev)).to.be.closeTo(value, ethers.utils.parseEther("1"));
    });
  });
});
