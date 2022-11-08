/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ProtocolRevenueShare,
  ProtocolRevenueShareInterface,
} from "../ProtocolRevenueShare";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Collect",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "growthFundAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "daoFundAmount",
        type: "uint256",
      },
    ],
    name: "SwapAndShare",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MANAGER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OP_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "collectByPage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "collectFeeCallback",
    outputs: [],
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
    name: "collectFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "daoFund",
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
        name: "_pool",
        type: "address",
      },
    ],
    name: "getGrowthFundRate",
    outputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "growthFund",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    inputs: [
      {
        internalType: "address",
        name: "_masterDeployer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_revenueToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wklay",
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
    name: "masterDeployer",
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
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "revenueToken",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_fund",
        type: "address",
      },
    ],
    name: "setDaoFund",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "_rate",
        type: "uint256",
      },
    ],
    name: "setFactoryGrowthFundRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_fund",
        type: "address",
      },
    ],
    name: "setGrowthFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_rate",
        type: "uint256",
      },
    ],
    name: "setGrowthFundRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "setRevenueToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minimumOutput",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "broker",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "swapAndShare",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wklay",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50613407806100206000396000f3fe6080604052600436106101a15760003560e01c80638d934f74116100e1578063cf58879a1161008a578063dbcd58e211610064578063dbcd58e214610511578063ec87621c1461053e578063ef0ef77d14610553578063f03328301461057357600080fd5b8063cf58879a146104a4578063d547741f146104d1578063dbaf4353146104f157600080fd5b8063ac9650d8116100bb578063ac9650d814610444578063c0c53b8b14610464578063c128ceaa1461048457600080fd5b80638d934f74146103af57806391d14854146103dc578063a217fddf1461042f57600080fd5b80633865aba41161014e5780635c3640ec116101285780635c3640ec146103225780635d67c9fd1461034f57806362f2c3521461036f57806370f7d3731461038f57600080fd5b80633865aba41461029b5780634675d25b146102bb578063556e4e68146102d057600080fd5b80632c559d271161017f5780632c559d271461023b5780632f2ff15d1461025b57806336568abe1461027b57600080fd5b806301ffc9a7146101a65780630d56dace146101db578063248a9ca3146101fd575b600080fd5b3480156101b257600080fd5b506101c66101c1366004612a82565b610593565b60405190151581526020015b60405180910390f35b3480156101e757600080fd5b506101fb6101f6366004612ae9565b61062c565b005b34801561020957600080fd5b5061022d610218366004612b15565b60009081526065602052604090206001015490565b6040519081526020016101d2565b34801561024757600080fd5b506101fb610256366004612b2e565b6107df565b34801561026757600080fd5b506101fb610276366004612b4b565b610906565b34801561028757600080fd5b506101fb610296366004612b4b565b610931565b3480156102a757600080fd5b506101fb6102b6366004612b2e565b6109e4565b3480156102c757600080fd5b5061022d610b3d565b3480156102dc57600080fd5b506098546102fd9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101d2565b34801561032e57600080fd5b50609a546102fd9073ffffffffffffffffffffffffffffffffffffffff1681565b34801561035b57600080fd5b506101fb61036a366004612b2e565b610b97565b34801561037b57600080fd5b506101fb61038a366004612b7b565b610cbe565b34801561039b57600080fd5b506101fb6103aa366004612ae9565b61105b565b3480156103bb57600080fd5b50609b546102fd9073ffffffffffffffffffffffffffffffffffffffff1681565b3480156103e857600080fd5b506101c66103f7366004612b4b565b600091825260656020908152604080842073ffffffffffffffffffffffffffffffffffffffff93909316845291905290205460ff1690565b34801561043b57600080fd5b5061022d600081565b610457610452366004612b9d565b611204565b6040516101d29190612c88565b34801561047057600080fd5b506101fb61047f366004612d08565b611376565b34801561049057600080fd5b5061022d61049f366004612b2e565b611681565b3480156104b057600080fd5b506097546102fd9073ffffffffffffffffffffffffffffffffffffffff1681565b3480156104dd57600080fd5b506101fb6104ec366004612b4b565b61183e565b3480156104fd57600080fd5b506101fb61050c366004612d53565b611864565b34801561051d57600080fd5b506099546102fd9073ffffffffffffffffffffffffffffffffffffffff1681565b34801561054a57600080fd5b5061022d611e66565b34801561055f57600080fd5b506101fb61056e366004612b2e565b611ea7565b34801561057f57600080fd5b506101fb61058e366004612f13565b611fce565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b00000000000000000000000000000000000000000000000000000000148061062657507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60405160200161066d9060208082526007908201527f4d414e4147455200000000000000000000000000000000000000000000000000604082015260600190565b604051602081830303815290604052805190602001206106938161068e3390565b61216a565b73ffffffffffffffffffffffffffffffffffffffff8316610715576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f4e4f545f5a45524f00000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b612710821115610781576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f544f4f5f42494700000000000000000000000000000000000000000000000000604482015260640161070c565b5073ffffffffffffffffffffffffffffffffffffffff9091166000908152609c6020908152604080832093909355609d90522080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b6040516020016108209060208082526007908201527f4d414e4147455200000000000000000000000000000000000000000000000000604082015260600190565b604051602081830303815290604052805190602001206108418161068e3390565b73ffffffffffffffffffffffffffffffffffffffff82166108be576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f4e4f545f5a45524f000000000000000000000000000000000000000000000000604482015260640161070c565b50609b80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600082815260656020526040902060010154610922813361216a565b61092c838361223c565b505050565b73ffffffffffffffffffffffffffffffffffffffff811633146109d6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c660000000000000000000000000000000000606482015260840161070c565b6109e08282612330565b5050565b604051602001610a259060208082526002908201527f4f50000000000000000000000000000000000000000000000000000000000000604082015260600190565b60405160208183030381529060405280519060200120610a468161068e3390565b60a180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8416908117909155604080517fcaa4b46a000000000000000000000000000000000000000000000000000000008152815163caa4b46a926004808401939192918290030181600087803b158015610ad757600080fd5b505af1158015610aeb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b0f9190612ff5565b505060a180547fffffffffffffffffffffffff00000000000000000000000000000000000000001690555050565b604051602001610b7e9060208082526002908201527f4f50000000000000000000000000000000000000000000000000000000000000604082015260600190565b6040516020818303038152906040528051906020012081565b604051602001610bd89060208082526007908201527f4d414e4147455200000000000000000000000000000000000000000000000000604082015260600190565b60405160208183030381529060405280519060200120610bf98161068e3390565b73ffffffffffffffffffffffffffffffffffffffff8216610c76576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f4e4f545f5a45524f000000000000000000000000000000000000000000000000604482015260640161070c565b50609a80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b604051602001610cff9060208082526002908201527f4f50000000000000000000000000000000000000000000000000000000000000604082015260600190565b60405160208183030381529060405280519060200120610d208161068e3390565b609754604080517f566a89af000000000000000000000000000000000000000000000000000000008152905173ffffffffffffffffffffffffffffffffffffffff90921691600091610dda91849163566a89af916004808301926020929190829003018186803b158015610d9357600080fd5b505afa158015610da7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dcb9190613028565b610dd58688613070565b6123eb565b9050845b8181101561102b576040517ea5ae210000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff85169062a5ae219060240160206040518083038186803b158015610e4d57600080fd5b505afa158015610e61573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e859190613088565b90506000808273ffffffffffffffffffffffffffffffffffffffff1663fb5d80b36040518163ffffffff1660e01b8152600401604080518083038186803b158015610ecf57600080fd5b505afa158015610ee3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f079190612ff5565b91509150816fffffffffffffffffffffffffffffffff166000148015610f3d57506fffffffffffffffffffffffffffffffff8116155b15610f4a57505050611019565b60a180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8516908117909155604080517fcaa4b46a000000000000000000000000000000000000000000000000000000008152815163caa4b46a926004808401939192918290030181600087803b158015610fdb57600080fd5b505af1158015610fef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110139190612ff5565b50505050505b80611023816130a5565b915050610dde565b505060a180547fffffffffffffffffffffffff000000000000000000000000000000000000000016905550505050565b60405160200161109c9060208082526007908201527f4d414e4147455200000000000000000000000000000000000000000000000000604082015260600190565b604051602081830303815290604052805190602001206110bd8161068e3390565b73ffffffffffffffffffffffffffffffffffffffff831661113a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f4e4f545f5a45524f000000000000000000000000000000000000000000000000604482015260640161070c565b6127108211156111a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f544f4f5f42494700000000000000000000000000000000000000000000000000604482015260640161070c565b5073ffffffffffffffffffffffffffffffffffffffff9091166000908152609e6020908152604080832093909355609f90522080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b60608167ffffffffffffffff81111561121f5761121f612e06565b60405190808252806020026020018201604052801561125257816020015b606081526020019060019003908161123d5790505b50905060005b8281101561136f5760008030868685818110611276576112766130de565b9050602002810190611288919061310d565b604051611296929190613179565b600060405180830381855af49150503d80600081146112d1576040519150601f19603f3d011682016040523d82523d6000602084013e6112d6565b606091505b50915091508161133c576044815110156112ef57600080fd5b600481019050808060200190518101906113099190613189565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070c919061323b565b8084848151811061134f5761134f6130de565b602002602001018190525050508080611367906130a5565b915050611258565b5092915050565b600054610100900460ff166113915760005460ff1615611395565b303b155b611421576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a6564000000000000000000000000000000000000606482015260840161070c565b600054610100900460ff1615801561146057600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000166101011790555b73ffffffffffffffffffffffffffffffffffffffff84166114dd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f5a45524f5f414444524553530000000000000000000000000000000000000000604482015260640161070c565b73ffffffffffffffffffffffffffffffffffffffff831661155a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f5a45524f5f414444524553530000000000000000000000000000000000000000604482015260640161070c565b73ffffffffffffffffffffffffffffffffffffffff82166115d7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f5a45524f5f414444524553530000000000000000000000000000000000000000604482015260640161070c565b6097805473ffffffffffffffffffffffffffffffffffffffff8087167fffffffffffffffffffffffff000000000000000000000000000000000000000092831617909255609880548684169083161790556099805492851692909116919091179055611641612403565b61164c60003361249c565b801561167b57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690555b50505050565b73ffffffffffffffffffffffffffffffffffffffff81166000908152609d602052604081205460ff16156116d8575073ffffffffffffffffffffffffffffffffffffffff166000908152609c602052604090205490565b6097546040517fa7bce75500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8481166004830152600092169063a7bce7559060240160206040518083038186803b15801561174457600080fd5b505afa158015611758573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061177c9190613088565b73ffffffffffffffffffffffffffffffffffffffff81166000908152609f602052604090205490915060ff1661180e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e4f545f53455455500000000000000000000000000000000000000000000000604482015260640161070c565b73ffffffffffffffffffffffffffffffffffffffff166000908152609e602052604090205492915050565b919050565b60008281526065602052604090206001015461185a813361216a565b61092c8383612330565b6040516020016118a59060208082526002908201527f4f50000000000000000000000000000000000000000000000000000000000000604082015260600190565b604051602081830303815290604052805190602001206118c68161068e3390565b60995460985473ffffffffffffffffffffffffffffffffffffffff898116600090815260a0602090815260408083208c8516845290915280822080549083905590517f70a082310000000000000000000000000000000000000000000000000000000081523060048201529483169492909316929183906370a082319060240160206040518083038186803b15801561195e57600080fd5b505afa158015611972573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119969190613028565b905060008a73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161415611ac3576040517f2e1a7d4d0000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff861690632e1a7d4d90602401600060405180830381600087803b158015611a3657600080fd5b505af1158015611a4a573d6000803e3d6000fd5b505050508873ffffffffffffffffffffffffffffffffffffffff16838989604051611a76929190613179565b60006040518083038185875af1925050503d8060008114611ab3576040519150601f19603f3d011682016040523d82523d6000602084013e611ab8565b606091505b505080915050611bdb565b6040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a81166004830152602482018590528c169063095ea7b390604401602060405180830381600087803b158015611b3357600080fd5b505af1158015611b47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b6b919061324e565b508873ffffffffffffffffffffffffffffffffffffffff168888604051611b93929190613179565b6000604051808303816000865af19150503d8060008114611bd0576040519150601f19603f3d011682016040523d82523d6000602084013e611bd5565b606091505b50909150505b80611c42576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f42524f4b45525f4641494c000000000000000000000000000000000000000000604482015260640161070c565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152600090839073ffffffffffffffffffffffffffffffffffffffff8716906370a082319060240160206040518083038186803b158015611cac57600080fd5b505afa158015611cc0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ce49190613028565b611cee9190613270565b90508a811015611d5a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f534c495050414745000000000000000000000000000000000000000000000000604482015260640161070c565b6000612710611d688f611681565b611d729084613287565b611d7c91906132c4565b90506000611d8a8284613270565b609a54909150611db49073ffffffffffffffffffffffffffffffffffffffff8981169116846124a6565b609b54611ddb9073ffffffffffffffffffffffffffffffffffffffff8981169116836124a6565b8d73ffffffffffffffffffffffffffffffffffffffff168f73ffffffffffffffffffffffffffffffffffffffff167fb3080cce35b83b37e6e5cfe1ae6cb5f3ef29433ff1351936ed6f98cc1e53c60e858585604051611e4d939291909283526020830191909152604082015260600190565b60405180910390a3505050505050505050505050505050565b604051602001610b7e9060208082526007908201527f4d414e4147455200000000000000000000000000000000000000000000000000604082015260600190565b604051602001611ee89060208082526007908201527f4d414e4147455200000000000000000000000000000000000000000000000000604082015260600190565b60405160208183030381529060405280519060200120611f098161068e3390565b73ffffffffffffffffffffffffffffffffffffffff8216611f86576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f4e4f545f5a45524f000000000000000000000000000000000000000000000000604482015260640161070c565b50609880547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60a154339073ffffffffffffffffffffffffffffffffffffffff168114612051576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4e4f5420414c4c4f574544000000000000000000000000000000000000000000604482015260640161070c565b60005b835181101561167b576000848281518110612071576120716130de565b60200260200101519050600084838151811061208f5761208f6130de565b6020026020010151905060008111156121555773ffffffffffffffffffffffffffffffffffffffff808516600090815260a060209081526040808320938616835292905290812080548392906120e6908490613070565b925050819055508173ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f1314fd112a381beea61539dbd21ec04afcff2662ac7d1b83273aade1f53d1b978360405161214c91815260200190565b60405180910390a35b50508080612162906130a5565b915050612054565b600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff166109e0576121c28173ffffffffffffffffffffffffffffffffffffffff166014612533565b6121cd836020612533565b6040516020016121de9291906132ff565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290527f08c379a000000000000000000000000000000000000000000000000000000000825261070c9160040161323b565b600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff166109e057600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff85168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790556122d23390565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff16156109e057600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516808552925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60008183106123fa57816123fc565b825b9392505050565b600054610100900460ff1661249a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e67000000000000000000000000000000000000000000606482015260840161070c565b565b6109e0828261223c565b6040805173ffffffffffffffffffffffffffffffffffffffff8416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb0000000000000000000000000000000000000000000000000000000017905261092c908490612776565b60606000612542836002613287565b61254d906002613070565b67ffffffffffffffff81111561256557612565612e06565b6040519080825280601f01601f19166020018201604052801561258f576020820181803683370190505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106125c6576125c66130de565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110612629576126296130de565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506000612665846002613287565b612670906001613070565b90505b600181111561270d577f303132333435363738396162636465660000000000000000000000000000000085600f16601081106126b1576126b16130de565b1a60f81b8282815181106126c7576126c76130de565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c9361270681613380565b9050612673565b5083156123fc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161070c565b60006127d8826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166128829092919063ffffffff16565b80519091501561092c57808060200190518101906127f6919061324e565b61092c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161070c565b60606128918484600085612899565b949350505050565b60608247101561292b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161070c565b73ffffffffffffffffffffffffffffffffffffffff85163b6129a9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161070c565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516129d291906133b5565b60006040518083038185875af1925050503d8060008114612a0f576040519150601f19603f3d011682016040523d82523d6000602084013e612a14565b606091505b5091509150612a24828286612a2f565b979650505050505050565b60608315612a3e5750816123fc565b825115612a4e5782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070c919061323b565b600060208284031215612a9457600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146123fc57600080fd5b73ffffffffffffffffffffffffffffffffffffffff81168114612ae657600080fd5b50565b60008060408385031215612afc57600080fd5b8235612b0781612ac4565b946020939093013593505050565b600060208284031215612b2757600080fd5b5035919050565b600060208284031215612b4057600080fd5b81356123fc81612ac4565b60008060408385031215612b5e57600080fd5b823591506020830135612b7081612ac4565b809150509250929050565b60008060408385031215612b8e57600080fd5b50508035926020909101359150565b60008060208385031215612bb057600080fd5b823567ffffffffffffffff80821115612bc857600080fd5b818501915085601f830112612bdc57600080fd5b813581811115612beb57600080fd5b8660208260051b8501011115612c0057600080fd5b60209290920196919550909350505050565b60005b83811015612c2d578181015183820152602001612c15565b8381111561167b5750506000910152565b60008151808452612c56816020860160208601612c12565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015612cfb577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0888603018452612ce9858351612c3e565b94509285019290850190600101612caf565b5092979650505050505050565b600080600060608486031215612d1d57600080fd5b8335612d2881612ac4565b92506020840135612d3881612ac4565b91506040840135612d4881612ac4565b809150509250925092565b60008060008060008060a08789031215612d6c57600080fd5b8635612d7781612ac4565b95506020870135612d8781612ac4565b9450604087013593506060870135612d9e81612ac4565b9250608087013567ffffffffffffffff80821115612dbb57600080fd5b818901915089601f830112612dcf57600080fd5b813581811115612dde57600080fd5b8a6020828501011115612df057600080fd5b6020830194508093505050509295509295509295565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612e7c57612e7c612e06565b604052919050565b600067ffffffffffffffff821115612e9e57612e9e612e06565b5060051b60200190565b600082601f830112612eb957600080fd5b81356020612ece612ec983612e84565b612e35565b82815260059290921b84018101918181019086841115612eed57600080fd5b8286015b84811015612f085780358352918301918301612ef1565b509695505050505050565b60008060408385031215612f2657600080fd5b823567ffffffffffffffff80821115612f3e57600080fd5b818501915085601f830112612f5257600080fd5b81356020612f62612ec983612e84565b82815260059290921b84018101918181019089841115612f8157600080fd5b948201945b83861015612fa8578535612f9981612ac4565b82529482019490820190612f86565b96505086013592505080821115612fbe57600080fd5b50612fcb85828601612ea8565b9150509250929050565b80516fffffffffffffffffffffffffffffffff8116811461183957600080fd5b6000806040838503121561300857600080fd5b61301183612fd5565b915061301f60208401612fd5565b90509250929050565b60006020828403121561303a57600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561308357613083613041565b500190565b60006020828403121561309a57600080fd5b81516123fc81612ac4565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156130d7576130d7613041565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261314257600080fd5b83018035915067ffffffffffffffff82111561315d57600080fd5b60200191503681900382131561317257600080fd5b9250929050565b8183823760009101908152919050565b60006020828403121561319b57600080fd5b815167ffffffffffffffff808211156131b357600080fd5b818401915084601f8301126131c757600080fd5b8151818111156131d9576131d9612e06565b61320a60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601612e35565b915080825285602082850101111561322157600080fd5b613232816020840160208601612c12565b50949350505050565b6020815260006123fc6020830184612c3e565b60006020828403121561326057600080fd5b815180151581146123fc57600080fd5b60008282101561328257613282613041565b500390565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156132bf576132bf613041565b500290565b6000826132fa577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613337816017850160208801612c12565b7f206973206d697373696e6720726f6c65200000000000000000000000000000006017918401918201528351613374816028840160208801612c12565b01602801949350505050565b60008161338f5761338f613041565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b600082516133c7818460208701612c12565b919091019291505056fea26469706673582212204bf1e10937621bb10ac7d4c6ed1a53443fbd2f27a24f496217b3e5710e1812a764736f6c63430008090033";

type ProtocolRevenueShareConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProtocolRevenueShareConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProtocolRevenueShare__factory extends ContractFactory {
  constructor(...args: ProtocolRevenueShareConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ProtocolRevenueShare> {
    return super.deploy(overrides || {}) as Promise<ProtocolRevenueShare>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ProtocolRevenueShare {
    return super.attach(address) as ProtocolRevenueShare;
  }
  connect(signer: Signer): ProtocolRevenueShare__factory {
    return super.connect(signer) as ProtocolRevenueShare__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProtocolRevenueShareInterface {
    return new utils.Interface(_abi) as ProtocolRevenueShareInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProtocolRevenueShare {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ProtocolRevenueShare;
  }
}
