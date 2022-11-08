import "dotenv/config";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "hardhat-interface-generator";
import "hardhat-abi-exporter";
import "hardhat-spdx-license-identifier";
import "hardhat-tracer";
import "@primitivefi/hardhat-dodoc";
import "solidity-coverage";
import "./tasks";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  gasReporter: {
    currency: "ETH",
    gasPrice: 250,
    enabled: true,
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      live: false,
      chainId: 31337,
      saveDeployments: true,
      tags: ["test", "local"],
      gasPrice: 250000000000,
      accounts: {
        // 1,000,000,000
        accountsBalance: "1000000000000000000000000000000000000000",
      },
      forking: {
        enabled: true,
        url: "https://internal.ken.stick.us",
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      cypress: "0x2A2F23ff33671361010D357529BDF0adca9416Fc",
    },
    dev: {
      default: 1,
      cypress: "0x9906594cF4CC26b62fEf0eA53CE159F4d2Ad9a32",
    },
    protocolFeeTo: {
      default: 2,
      cypress: "0x88219f20e9B4FDa1088f27E71518A0b626cFf21B",
    },
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
    ],
    settings: {
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  dodoc: {
    runOnCompile: false,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  mocha: {
    timeout: 300000,
  },
  abiExporter: {
    path: "deployments/abis",
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: false,
  },
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
export default config;
