/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MasterDeployer,
  MasterDeployerInterface,
} from "../MasterDeployer";

const _abi = [
  {
    inputs: [],
    name: "InvalidFee",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAllowedFactory",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "factory",
        type: "address",
      },
    ],
    name: "AddToWhitelistFactory",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "factory",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "deployData",
        type: "bytes",
      },
    ],
    name: "DeployPool",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "protocolFeeTo",
        type: "address",
      },
    ],
    name: "ProtocolFeeToUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "factory",
        type: "address",
      },
    ],
    name: "RemoveFromWhitelistFactory",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
    ],
    name: "addToWhitelistFactory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "airdropDistributor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_deployData",
        type: "bytes",
      },
    ],
    name: "deployPool",
    outputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "getFactoryAddress",
    outputs: [
      {
        internalType: "address",
        name: "factory",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idx",
        type: "uint256",
      },
    ],
    name: "getPoolAddress",
    outputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_protocolFeeTo",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pools",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "protocolFeeTo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
    ],
    name: "removeFromWhitelistFactory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airdropDistributor",
        type: "address",
      },
    ],
    name: "setAirdropDistributor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_protocolFeeTo",
        type: "address",
      },
    ],
    name: "setProtocolFeeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPoolsCount",
    outputs: [
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "whitelistedFactories",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611035806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ff5760003560e01c8063a4063dbc11610097578063d0a9317311610066578063d0a9317314610268578063e0e6799f14610288578063ef3692521461029b578063f2fde38b146102bb57600080fd5b8063a4063dbc146101e6578063a7bce75514610209578063b92da7ba14610242578063c4d66de81461025557600080fd5b8063566a89af116100d3578063566a89af1461017c5780636f50f2f41461018d578063715018a6146101c05780638da5cb5b146101c857600080fd5b8062a5ae2114610104578063250558dc14610141578063254cd1a814610154578063509e3ffb14610169575b600080fd5b610117610112366004610e82565b6102ce565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b61011761014f366004610ebd565b61030b565b610167610162366004610f42565b610514565b005b610167610177366004610f42565b61062e565b606954604051908152602001610138565b6101b061019b366004610f42565b60686020526000908152604090205460ff1681565b6040519015158152602001610138565b610167610726565b60335473ffffffffffffffffffffffffffffffffffffffff16610117565b6101b06101f4366004610f42565b60676020526000908152604090205460ff1681565b610117610217366004610f42565b73ffffffffffffffffffffffffffffffffffffffff9081166000908152606a60205260409020541690565b610167610250366004610f42565b6107b3565b610167610263366004610f42565b6108a8565b6066546101179073ffffffffffffffffffffffffffffffffffffffff1681565b610167610296366004610f42565b610a5a565b6065546101179073ffffffffffffffffffffffffffffffffffffffff1681565b6101676102c9366004610f42565b610ba1565b6000606982815481106102e3576102e3610f66565b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff1692915050565b73ffffffffffffffffffffffffffffffffffffffff831660009081526068602052604081205460ff1661036a576040517f124e1d7a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f27c3cae100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8516906327c3cae1906103be9086908690600401610f95565b602060405180830381600087803b1580156103d857600080fd5b505af11580156103ec573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104109190610fe2565b73ffffffffffffffffffffffffffffffffffffffff818116600081815260676020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660019081179091556069805491820190557f7fb4302e8e91f9110a6554c2c0a24601252c2a42c2220ca988efcfe3999143080180547fffffffffffffffffffffffff00000000000000000000000000000000000000009081168617909155606a909252918290208054948a16949091168417905551929350917fe469f9471ac1d98222517eb2cdff1ef4df5f7880269173bb782bb78e499d9de3906105059087908790610f95565b60405180910390a39392505050565b60335473ffffffffffffffffffffffffffffffffffffffff16331461059a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff81166105e7576040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b606680547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60335473ffffffffffffffffffffffffffffffffffffffff1633146106af576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610591565b73ffffffffffffffffffffffffffffffffffffffff811660008181526068602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055517f67c303fcf871bb64aded503a4fcf82870def78e2fb89ddc1c23caacb4174ac319190a250565b60335473ffffffffffffffffffffffffffffffffffffffff1633146107a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610591565b6107b16000610cd1565b565b60335473ffffffffffffffffffffffffffffffffffffffff163314610834576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610591565b73ffffffffffffffffffffffffffffffffffffffff811660008181526068602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055517f77bdc353eff221266da980861500a9ef26c0829919b4b192cfa9c687d5473a839190a250565b600054610100900460ff166108c35760005460ff16156108c7565b303b155b610953576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152608401610591565b600054610100900460ff1615801561099257600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000166101011790555b73ffffffffffffffffffffffffffffffffffffffff82166109df576040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b606580547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8416179055610a27610d48565b8015610a5657600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690555b5050565b60335473ffffffffffffffffffffffffffffffffffffffff163314610adb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610591565b73ffffffffffffffffffffffffffffffffffffffff8116610b28576040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b606580547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f5384cdf4313810fabc89429faf20f012efaa71e0a3bdebc9c0a6ecb9fe1f98e89060200160405180910390a150565b60335473ffffffffffffffffffffffffffffffffffffffff163314610c22576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610591565b73ffffffffffffffffffffffffffffffffffffffff8116610cc5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610591565b610cce81610cd1565b50565b6033805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff16610ddf576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610591565b6107b1600054610100900460ff16610e79576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610591565b6107b133610cd1565b600060208284031215610e9457600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff81168114610cce57600080fd5b600080600060408486031215610ed257600080fd5b8335610edd81610e9b565b9250602084013567ffffffffffffffff80821115610efa57600080fd5b818601915086601f830112610f0e57600080fd5b813581811115610f1d57600080fd5b876020828501011115610f2f57600080fd5b6020830194508093505050509250925092565b600060208284031215610f5457600080fd5b8135610f5f81610e9b565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60208152816020820152818360408301376000818301604090810191909152601f9092017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0160101919050565b600060208284031215610ff457600080fd5b8151610f5f81610e9b56fea26469706673582212208c6ab2f067af37ede1d1bb8f534d9c1b682c136258f58d058591fa7ce13b495c64736f6c63430008090033";

type MasterDeployerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MasterDeployerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MasterDeployer__factory extends ContractFactory {
  constructor(...args: MasterDeployerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MasterDeployer> {
    return super.deploy(overrides || {}) as Promise<MasterDeployer>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MasterDeployer {
    return super.attach(address) as MasterDeployer;
  }
  connect(signer: Signer): MasterDeployer__factory {
    return super.connect(signer) as MasterDeployer__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MasterDeployerInterface {
    return new utils.Interface(_abi) as MasterDeployerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MasterDeployer {
    return new Contract(address, _abi, signerOrProvider) as MasterDeployer;
  }
}