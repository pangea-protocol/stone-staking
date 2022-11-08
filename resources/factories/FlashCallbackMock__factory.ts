/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FlashCallbackMock,
  FlashCallbackMockInterface,
} from "../FlashCallbackMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "callFlash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fee0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee1",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "flashCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161068738038061068783398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b6105f4806100936000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063b234bedb1461003b578063c3924ed614610050575b600080fd5b61004e610049366004610406565b610063565b005b61004e61005e366004610406565b610103565b600184905560028390556000546040517f490e6cbc00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063490e6cbc906100cb9030908890889088908890600401610486565b600060405180830381600087803b1580156100e557600080fd5b505af11580156100f9573d6000803e3d6000fd5b5050505050505050565b600080610112838501856104fe565b9150915060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b15801561017c57600080fd5b505afa158015610190573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101b49190610520565b60005460015473ffffffffffffffffffffffffffffffffffffffff9283169263a9059cbb9216906101e690869061055d565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815273ffffffffffffffffffffffffffffffffffffffff90921660048301526024820152604401602060405180830381600087803b15801561025157600080fd5b505af1158015610265573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610289919061059c565b5060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d21220a76040518163ffffffff1660e01b815260040160206040518083038186803b1580156102f057600080fd5b505afa158015610304573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103289190610520565b60005460025473ffffffffffffffffffffffffffffffffffffffff9283169263a9059cbb92169061035a90859061055d565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815273ffffffffffffffffffffffffffffffffffffffff90921660048301526024820152604401602060405180830381600087803b1580156103c557600080fd5b505af11580156103d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103fd919061059c565b50505050505050565b6000806000806060858703121561041c57600080fd5b8435935060208501359250604085013567ffffffffffffffff8082111561044257600080fd5b818701915087601f83011261045657600080fd5b81358181111561046557600080fd5b88602082850101111561047757600080fd5b95989497505060200194505050565b73ffffffffffffffffffffffffffffffffffffffff8616815284602082015283604082015260806060820152816080820152818360a0830137600081830160a090810191909152601f9092017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0160101949350505050565b6000806040838503121561051157600080fd5b50508035926020909101359150565b60006020828403121561053257600080fd5b815173ffffffffffffffffffffffffffffffffffffffff8116811461055657600080fd5b9392505050565b60008219821115610597577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b500190565b6000602082840312156105ae57600080fd5b8151801515811461055657600080fdfea2646970667358221220d28665595a030f229b306b38d5e2a6463b95667f0e39dce3489fa366f9ddb94d64736f6c63430008090033";

type FlashCallbackMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FlashCallbackMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FlashCallbackMock__factory extends ContractFactory {
  constructor(...args: FlashCallbackMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _pool: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FlashCallbackMock> {
    return super.deploy(_pool, overrides || {}) as Promise<FlashCallbackMock>;
  }
  getDeployTransaction(
    _pool: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_pool, overrides || {});
  }
  attach(address: string): FlashCallbackMock {
    return super.attach(address) as FlashCallbackMock;
  }
  connect(signer: Signer): FlashCallbackMock__factory {
    return super.connect(signer) as FlashCallbackMock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FlashCallbackMockInterface {
    return new utils.Interface(_abi) as FlashCallbackMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FlashCallbackMock {
    return new Contract(address, _abi, signerOrProvider) as FlashCallbackMock;
  }
}
