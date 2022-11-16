import { task, types } from "hardhat/config";
import { ethers } from "hardhat";
import { ProtocolRevenueShare } from "../types";
import { waitTx } from "./utils";

task("protocolRevenueShare:setManager")
  .addPositionalParam("user")
  .setAction(async ({ user }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(
      share.grantRole(await share.MANAGER_ROLE(), user),
      "매니저 권한 제공"
    );
  });

task("protocolRevenueShare:setOperator")
  .addPositionalParam("user")
  .setAction(async ({ user }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(
      share.grantRole(await share.OP_ROLE(), user),
      "오퍼레이터 권한 제공"
    );
  });

task("protocolRevenueShare:setRevenueToken")
  .addPositionalParam("token")
  .setAction(async ({ token }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(share.setRevenueToken(token), "revenue token 세팅");
  });

task("protocolRevenueShare:setGrowthFund")
  .addPositionalParam("fund")
  .setAction(async ({ fund }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(share.setGrowthFund(fund), "growth fund 세팅");
  });

task("protocolRevenueShare:setDaoFund")
  .addPositionalParam("fund")
  .setAction(async ({ fund }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(share.setDaoFund(fund), "dao fund 세팅");
  });

task("protocolRevenueShare:setMinimumRevenue")
  .addPositionalParam("amount")
  .setAction(async ({ amount }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(share.setMinimumRevenue(amount), "minimumRevenue 세팅");
  });

task("protocolRevenueShare:setGrowthFundRate")
  .addPositionalParam("pool")
  .addPositionalParam("rate")
  .setAction(async ({ pool, rate }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(share.setGrowthFundRate(pool, rate), "minimumRevenue 세팅");
  });

task("protocolRevenueShare:setFactoryGrowthFundRate")
  .addPositionalParam("factory")
  .addPositionalParam("rate")
  .setAction(async ({ factory, rate }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(
      share.setFactoryGrowthFundRate(factory, rate),
      "minimumRevenue 세팅"
    );
  });

task("protocolRevenueShare:verifyBroker")
  .addPositionalParam("broker")
  .addPositionalParam("isVerified", "", true, types.boolean)
  .setAction(async ({ broker, isVerified }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(share.verifyBroker(broker, isVerified), "minimumRevenue 세팅");
  });

task("protocolRevenueShare:setApproval")
  .addPositionalParam("broker")
  .addPositionalParam("feeToken")
  .addPositionalParam("ok", "", true, types.boolean)
  .setAction(async ({ broker, feeToken, ok }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(share.setApproval(broker, feeToken, ok), "setApproval");
  });

task("protocolRevenueShare:collect").setAction(
  async ({ start, limit }, { ethers }) => {
    const deployer = await ethers.getNamedSigner("deployer");

    const share = (await ethers.getContract(
      "ProtocolRevenueShare",
      deployer
    )) as ProtocolRevenueShare;

    await waitTx(share.collectByPage(0, 1000), "collectByPage");
  }
);
