/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TransparentUpgradeableProxy,
  TransparentUpgradeableProxyInterface,
} from "../TransparentUpgradeableProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialLogic",
        type: "address",
      },
      {
        internalType: "address",
        name: "initialAdmin",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "changeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x6080604052604051610aaa380380610aaa8339818101604052606081101561002657600080fd5b8151602083015160408085018051915193959294830192918464010000000082111561005157600080fd5b90830190602082018581111561006657600080fd5b825164010000000081118282018810171561008057600080fd5b82525081516020918201929091019080838360005b838110156100ad578181015183820152602001610095565b50505050905090810190601f1680156100da5780820380516001836020036101000a031916815260200191505b50604052508491508290506100ee826101bf565b8051156101a6576000826001600160a01b0316826040518082805190602001908083835b602083106101315780518252601f199092019160209182019101610112565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d8060008114610191576040519150601f19603f3d011682016040523d82523d6000602084013e610196565b606091505b50509050806101a457600080fd5b505b506101ae9050565b6101b782610231565b505050610291565b6101d28161025560201b6104bb1760201c565b61020d5760405162461bcd60e51b8152600401808060200182810382526036815260200180610a746036913960400191505060405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610355565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47081811480159061028957508115155b949350505050565b6107d4806102a06000396000f3fe60806040526004361061005e5760003560e01c80635c60da1b116100435780635c60da1b146101425780638f28397014610180578063f851a440146101c05761006d565b80633659cfe6146100755780634f1ef286146100b55761006d565b3661006d5761006b6101d5565b005b61006b6101d5565b34801561008157600080fd5b5061006b6004803603602081101561009857600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166101ef565b61006b600480360360408110156100cb57600080fd5b73ffffffffffffffffffffffffffffffffffffffff823516919081019060408101602082013564010000000081111561010357600080fd5b82018360208201111561011557600080fd5b8035906020019184600183028401116401000000008311171561013757600080fd5b509092509050610243565b34801561014e57600080fd5b50610157610317565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561018c57600080fd5b5061006b600480360360208110156101a357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661036e565b3480156101cc57600080fd5b50610157610476565b6101dd6104f7565b6101ed6101e861058b565b6105b0565b565b6101f76105d4565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561023857610233816105f9565b610240565b6102406101d5565b50565b61024b6105d4565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561030a57610287836105f9565b60008373ffffffffffffffffffffffffffffffffffffffff1683836040518083838082843760405192019450600093509091505080830381855af49150503d80600081146102f1576040519150601f19603f3d011682016040523d82523d6000602084013e6102f6565b606091505b505090508061030457600080fd5b50610312565b6103126101d5565b505050565b60006103216105d4565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156103635761035c61058b565b905061036b565b61036b6101d5565b90565b6103766105d4565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156102385773ffffffffffffffffffffffffffffffffffffffff8116610415576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603a8152602001806106ed603a913960400191505060405180910390fd5b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f61043e6105d4565b6040805173ffffffffffffffffffffffffffffffffffffffff928316815291841660208301528051918290030190a161023381610646565b60006104806105d4565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156103635761035c6105d4565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4708181148015906104ef57508115155b949350505050565b6104ff6105d4565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610583576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252604281526020018061075d6042913960600191505060405180910390fd5b6101ed6101ed565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b3660008037600080366000845af43d6000803e8080156105cf573d6000f35b3d6000fd5b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b6106028161066a565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610355565b610673816104bb565b6106c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260368152602001806107276036913960400191505060405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5556fe5472616e73706172656e745570677261646561626c6550726f78793a206e65772061646d696e20697320746865207a65726f20616464726573735570677261646561626c6550726f78793a206e657720696d706c656d656e746174696f6e206973206e6f74206120636f6e74726163745472616e73706172656e745570677261646561626c6550726f78793a2061646d696e2063616e6e6f742066616c6c6261636b20746f2070726f787920746172676574a2646970667358221220a3f93de68b55e262e4ea40b1b167e7c993ecc16e9348db4b2ac4815af270077864736f6c634300070600335570677261646561626c6550726f78793a206e657720696d706c656d656e746174696f6e206973206e6f74206120636f6e7472616374";

type TransparentUpgradeableProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TransparentUpgradeableProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TransparentUpgradeableProxy__factory extends ContractFactory {
  constructor(...args: TransparentUpgradeableProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    initialLogic: string,
    initialAdmin: string,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<TransparentUpgradeableProxy> {
    return super.deploy(
      initialLogic,
      initialAdmin,
      _data,
      overrides || {}
    ) as Promise<TransparentUpgradeableProxy>;
  }
  getDeployTransaction(
    initialLogic: string,
    initialAdmin: string,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      initialLogic,
      initialAdmin,
      _data,
      overrides || {}
    );
  }
  attach(address: string): TransparentUpgradeableProxy {
    return super.attach(address) as TransparentUpgradeableProxy;
  }
  connect(signer: Signer): TransparentUpgradeableProxy__factory {
    return super.connect(signer) as TransparentUpgradeableProxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TransparentUpgradeableProxyInterface {
    return new utils.Interface(_abi) as TransparentUpgradeableProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TransparentUpgradeableProxy {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TransparentUpgradeableProxy;
  }
}
