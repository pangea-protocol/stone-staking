import { ethers, network } from "hardhat";
import { StakedStone, Token } from "../types";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { defaultAbiCoder } from "ethers/lib/utils";

describe("STAKING UNIT TEST", async () => {
  let _snapshotId: string;

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

    await stakedStone.initialize(stone.address);

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

  describe("# function setCooldownPeriod(uint256 period) external", async () => {
    it("revert: msg.sender is not manager", async () => {
      await expect(stakedStone.setCooldownPeriod(3600)).to.be.reverted;
    });

    it("set cooldown period successfully", async () => {
      await stakedStone.grantRole(
        ethers.utils.keccak256(defaultAbiCoder.encode(["string"], ["MANAGER"])),
        manager.address
      );
      const givenPeriod = 3600;

      await stakedStone.connect(manager).setCooldownPeriod(givenPeriod);

      expect(await stakedStone.cooldownPeriod()).to.be.eq(givenPeriod);
    });
  });

  describe("# function stake(uint256 amount) external", async () => {
    it("try to stake", async () => {
      const amount0 = ethers.utils.parseEther("100");
      const amount1 = ethers.utils.parseEther("200");

      await stone.mint(user0.address, amount0);
      await stone.mint(user1.address, amount1);

      await stone
        .connect(user0)
        .approve(stakedStone.address, ethers.constants.MaxUint256);
      await stone
        .connect(user1)
        .approve(stakedStone.address, ethers.constants.MaxUint256);

      await stakedStone.connect(user0).stake(amount0);
      await stakedStone.connect(user1).stake(amount0);
      await stakedStone.connect(user1).stake(amount0);

      expect(await stakedStone.balanceOf(user0.address)).to.be.eq(amount0);
      expect(await stakedStone.balanceOf(user1.address)).to.be.eq(amount1);

      expect(await stakedStone.totalSupply()).to.be.eq(amount0.add(amount1));
    });
  });

  describe("# function unstake(uint256 amount) external", async () => {
    const amount0 = ethers.utils.parseEther("10000");
    beforeEach("", async () => {
      await stone.mint(user0.address, amount0);
      await stone.mint(user1.address, amount0);

      await stone
        .connect(user0)
        .approve(stakedStone.address, ethers.constants.MaxUint256);
      await stone
        .connect(user1)
        .approve(stakedStone.address, ethers.constants.MaxUint256);

      await stakedStone.connect(user0).stake(amount0);
      await stakedStone.connect(user1).stake(amount0);
    });

    it("unstake multiple", async () => {
      await stakedStone.connect(user0).unstake(ethers.utils.parseEther("100"));
      await stakedStone.connect(user0).unstake(ethers.utils.parseEther("200"));
      await stakedStone.connect(user1).unstake(ethers.utils.parseEther("50"));
      await stakedStone.connect(user0).unstake(ethers.utils.parseEther("100"));
      await stakedStone.connect(user1).unstake(ethers.utils.parseEther("100"));

      expect(await stakedStone.balanceOf(user0.address)).to.be.eq(
        amount0.sub(ethers.utils.parseEther("400"))
      );
      expect(await stakedStone.balanceOf(user1.address)).to.be.eq(
        amount0.sub(ethers.utils.parseEther("150"))
      );

      expect(await stakedStone.unstakingRequestCounts(user0.address)).to.be.eq(
        3
      );
      expect(await stakedStone.unstakingRequestCounts(user1.address)).to.be.eq(
        2
      );

      expect(
        (await stakedStone.unstakingRequestByIndex(user0.address, 0)).amount
      ).to.be.eq(ethers.utils.parseEther("100"));
      expect(
        (await stakedStone.unstakingRequestByIndex(user0.address, 1)).amount
      ).to.be.eq(ethers.utils.parseEther("200"));
      expect(
        (await stakedStone.unstakingRequestByIndex(user0.address, 2)).amount
      ).to.be.eq(ethers.utils.parseEther("100"));

      expect(
        (await stakedStone.unstakingRequestByIndex(user1.address, 0)).amount
      ).to.be.eq(ethers.utils.parseEther("50"));
      expect(
        (await stakedStone.unstakingRequestByIndex(user1.address, 1)).amount
      ).to.be.eq(ethers.utils.parseEther("100"));
    });
  });

  describe("# function withdraw(uint256 requestId) external", async () => {
    const amount0 = ethers.utils.parseEther("10000");
    beforeEach("", async () => {
      await stone.mint(user0.address, amount0);
      await stone.mint(user1.address, amount0);

      await stone
        .connect(user0)
        .approve(stakedStone.address, ethers.constants.MaxUint256);
      await stone
        .connect(user1)
        .approve(stakedStone.address, ethers.constants.MaxUint256);

      await stakedStone.connect(user0).stake(amount0);
      await stakedStone.connect(user1).stake(amount0);
    });

    it("revert: NOT REQUEST OWNER", async () => {
      await stakedStone.connect(user0).unstake(ethers.utils.parseEther("1"));

      await expect(stakedStone.connect(user1).withdraw(0)).to.be.reverted;
    });

    it("revert: NEED COOLDOWN", async () => {
      await stakedStone.connect(user0).unstake(ethers.utils.parseEther("1"));

      await expect(stakedStone.connect(user0).withdraw(0)).to.be.revertedWith(
        "NEED COOLDOWN"
      );
    });

    it("success to withdraw", async () => {
      await stakedStone.connect(user0).unstake(ethers.utils.parseEther("1"));
      const request = await stakedStone.unstakingRequestByIndex(
        user0.address,
        0
      );
      const coolDownPeriod = await stakedStone.cooldownPeriod();

      await setNextBlockTimestamp(
        request.requestTs.add(coolDownPeriod).toNumber()
      );

      const prev = await stone.balanceOf(user0.address);
      await stakedStone.connect(user0).withdraw(request.id);
      const curr = await stone.balanceOf(user0.address);

      expect(curr.sub(prev)).to.be.eq(ethers.utils.parseEther("1"));
      expect(await stakedStone.unstakingRequestCounts(user0.address)).to.be.eq(
        0
      );
    });

    it("revert: double withdraw", async () => {
      await stakedStone.connect(user0).unstake(ethers.utils.parseEther("1"));
      const request = await stakedStone.unstakingRequestByIndex(
        user0.address,
        0
      );
      const coolDownPeriod = await stakedStone.cooldownPeriod();

      await setNextBlockTimestamp(
        request.requestTs.add(coolDownPeriod).toNumber()
      );

      await stakedStone.connect(user0).withdraw(request.id);
      await expect(
        stakedStone.connect(user0).withdraw(request.id)
      ).to.be.revertedWith("ALREADY CLAIMED");
    });
  });
});
