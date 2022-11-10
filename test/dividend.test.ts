import { ethers, network } from "hardhat";
import { StakedStone, Token } from "../types";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { defaultAbiCoder } from "ethers/lib/utils";
import { jumpToNextBlockTimestamp } from "./utils";
import { BigNumber } from "ethers";

describe.only("DIVIDEND UNIT TEST", async () => {
  let _snapshotId: string;

  let deployer: SignerWithAddress;
  let manager: SignerWithAddress;
  let user0: SignerWithAddress;
  let user1: SignerWithAddress;

  let stone: Token;
  let token0: Token;
  let token1: Token;
  let stakedStone: StakedStone;

  let openDate: number;

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
    token0 = (await (
      await ethers.getContractFactory("Token")
    ).deploy("token0", "token0")) as Token;
    token1 = (await (
      await ethers.getContractFactory("Token")
    ).deploy("token1", "token1")) as Token;

    stakedStone = (await (
      await ethers.getContractFactory("StakedStone")
    ).deploy()) as StakedStone;

    openDate = (await ethers.provider.getBlock("latest")).timestamp + 604800;
    await stakedStone.initialize(stone.address, openDate);

    await token0.mint(manager.address, ethers.utils.parseEther("100000000"));
    await token0
      .connect(manager)
      .approve(stakedStone.address, ethers.constants.MaxUint256);
    await token1.mint(manager.address, ethers.utils.parseEther("100000000"));
    await token1
      .connect(manager)
      .approve(stakedStone.address, ethers.constants.MaxUint256);

    /**
     * 권한 획득
     */
    await stakedStone.grantRole(
      ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
      manager.address
    );

    await faucetStone(user0, ethers.utils.parseEther("10000"));
    await faucetStone(user1, ethers.utils.parseEther("10000"));

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

  async function faucetStone(user: SignerWithAddress, amount: BigNumber) {
    await stone.mint(user.address, amount);
    await stone
      .connect(user)
      .approve(stakedStone.address, ethers.constants.MaxUint256);
  }

  describe("# SET & RESET", async () => {
    it("revert : NOT MANAGER", async () => {
      await expect(stakedStone.setDividendRecordDate()).to.be.reverted;
    });

    it("revert : NOT START", async () => {
      await expect(
        stakedStone.connect(manager).setDividendRecordDate()
      ).to.be.revertedWith("NOT START");
    });

    it("revert : TOTAL SHARE NOT ZERO", async () => {
      await jumpToNextBlockTimestamp(openDate);
      await expect(
        stakedStone.connect(manager).setDividendRecordDate()
      ).to.be.revertedWith("TOTAL SHARE NOT ZERO");
    });

    it("revert : ALREADY SET", async () => {
      await jumpToNextBlockTimestamp(openDate);

      await stakedStone.connect(user0).stake(ethers.utils.parseEther("10"));

      await stakedStone.connect(manager).setDividendRecordDate();
      await expect(
        stakedStone.connect(manager).setDividendRecordDate()
      ).to.be.revertedWith("ALREADY SET");
    });

    it("setDividendRecordDate successfully", async () => {
      await jumpToNextBlockTimestamp(openDate);

      const amount = ethers.utils.parseEther("10");
      await stakedStone.connect(user0).stake(amount);

      await stakedStone.connect(manager).setDividendRecordDate();

      const result = await stakedStone.readyDividendInfo();
      const timestamp = (await ethers.provider.getBlock("latest")).timestamp;

      expect(amount).to.be.eq(result.totalShare);
      expect(openDate).to.be.eq(result.startDate);

      expect(timestamp).to.be.eq(result.recordDate);
    });

    it("REVERT: resetDividendRecordDate", async () => {
      await jumpToNextBlockTimestamp(openDate);

      const amount = ethers.utils.parseEther("10");
      await stakedStone.connect(user0).stake(amount);

      await expect(
        stakedStone.connect(manager).resetDividendRecordDate()
      ).to.be.revertedWith("NOT SET");
    });

    it("reset successfully", async () => {
      await jumpToNextBlockTimestamp(openDate);

      const amount = ethers.utils.parseEther("10");
      await stakedStone.connect(user0).stake(amount);

      await stakedStone.connect(manager).setDividendRecordDate();
      await stakedStone.connect(manager).resetDividendRecordDate();

      const result = await stakedStone.readyDividendInfo();
      expect(result.totalShare).to.be.eq(0);
      expect(result.startDate).to.be.eq(0);
      expect(result.recordDate).to.be.eq(0);
    });
  });

  describe("# DEPOSIT", async () => {
    beforeEach(async () => {
      await jumpToNextBlockTimestamp(openDate);

      const amount = ethers.utils.parseEther("10");
      await stakedStone.connect(user0).stake(amount);

      await stakedStone.connect(manager).setDividendRecordDate();
    });

    it("revert : zero deposit", async () => {
      await expect(
        stakedStone.connect(manager).depositDividend(token0.address, 0)
      ).to.be.revertedWith("NOT ZERO");
    });

    it("revert : NOT SET", async () => {
      await stakedStone.connect(manager).resetDividendRecordDate();

      await expect(
        stakedStone.connect(manager).depositDividend(token0.address, 0)
      ).to.be.revertedWith("NOT SET");
    });

    it("depositDividend token0", async () => {
      const amount = ethers.utils.parseEther("10");
      await stakedStone
        .connect(manager)
        .depositDividend(token0.address, amount);

      const info = await stakedStone.readyDividendInfo();
      expect(info.tokens[0]).to.be.eq(token0.address);
      expect(info.amounts[0]).to.be.eq(amount);
    });

    it("depositDividend token0 & token1", async () => {
      const amount = ethers.utils.parseEther("10");
      await stakedStone
        .connect(manager)
        .depositDividend(token0.address, amount);
      await stakedStone
        .connect(manager)
        .depositDividend(token1.address, amount.mul(2));

      const info = await stakedStone.readyDividendInfo();
      expect(info.tokens[0]).to.be.eq(token0.address);
      expect(info.amounts[0]).to.be.eq(amount);
      expect(info.tokens[1]).to.be.eq(token1.address);
      expect(info.amounts[1]).to.be.eq(amount.mul(2));
    });

    it("depositDividend token0 & token1 multiple", async () => {
      const amount = ethers.utils.parseEther("10");
      await stakedStone
        .connect(manager)
        .depositDividend(token0.address, amount);
      await stakedStone
        .connect(manager)
        .depositDividend(token1.address, amount.mul(2));
      await stakedStone
        .connect(manager)
        .depositDividend(token0.address, amount);

      const info = await stakedStone.readyDividendInfo();
      expect(info.tokens[0]).to.be.eq(token0.address);
      expect(info.amounts[0]).to.be.eq(amount.mul(2));
      expect(info.tokens[1]).to.be.eq(token1.address);
      expect(info.amounts[1]).to.be.eq(amount.mul(2));
    });
  });
});
