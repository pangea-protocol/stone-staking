/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Ticks, TicksInterface } from "../Ticks";

const _abi = [
  {
    inputs: [],
    name: "PriceOutOfBounds",
    type: "error",
  },
  {
    inputs: [],
    name: "TickOutOfBounds",
    type: "error",
  },
];

const _bytecode =
  "0x611ab261003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100405760003560e01c806328c11771146100455780637a1d534314610083575b600080fd5b81801561005157600080fd5b50610065610060366004611845565b6100a3565b6040805160029390930b835260208301919091520160405180910390f35b81801561008f57600080fd5b5061006561009e3660046118fc565b610cf0565b6000808560020b8860020b1261011a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f57524f4e475f4f5244455200000000000000000000000000000000000000000060448201526064015b60405180910390fd5b600288900b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2761813156101a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4c4f5745525f52414e47450000000000000000000000000000000000000000006044820152606401610111565b6101d17ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff27618611989565b60020b8660020b1315610240576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f55505045525f52414e47450000000000000000000000000000000000000000006044820152606401610111565b600288900b600090815260208e90526040902054660100000000000090046fffffffffffffffffffffffffffffffff16801515806102a15750600289900b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff27618145b15610306576102b086826119c8565b8e60008b60020b60020b815260200190815260200160002060000160066101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550610773565b6000808f60008d60020b60020b815260200190815260200160002090508060000160039054906101000a900460020b91508a8160000160036101000a81548162ffffff021916908360020b62ffffff1602179055508060000160069054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff1660001415806103c0575060028c900b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff27618145b80156103d157508a60020b8c60020b125b80156103e257508160020b8b60020b125b610448576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4c4f5745525f4f524445520000000000000000000000000000000000000000006044820152606401610111565b50610452856110c1565b60020b8a60020b136105c3576040518060c001604052808c60020b81526020018260020b8152602001886fffffffffffffffffffffffffffffffff1681526020018f81526020018e81526020018d73ffffffffffffffffffffffffffffffffffffffff168152508f60008c60020b60020b815260200190815260200160002060008201518160000160006101000a81548162ffffff021916908360020b62ffffff16021790555060208201518160000160036101000a81548162ffffff021916908360020b62ffffff16021790555060408201518160000160066101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550606082015181600101556080820151816002015560a08201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050610727565b6040518060c001604052808c60020b81526020018260020b8152602001886fffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff168152508f60008c60020b60020b815260200190815260200160002060008201518160000160006101000a81548162ffffff021916908360020b62ffffff16021790555060208201518160000160036101000a81548162ffffff021916908360020b62ffffff16021790555060408201518160000160066101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550606082015181600101556080820151816002015560a08201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050505b898f60008360020b60020b815260200190815260200160002060000160006101000a81548162ffffff021916908360020b62ffffff16021790555060018361076f91906119fc565b9250505b50600286900b600090815260208e90526040902054660100000000000090046fffffffffffffffffffffffffffffffff16801515806107df57506107d67ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff27618611989565b60020b8760020b145b15610844576107ee86826119c8565b8e60008960020b60020b815260200190815260200160002060000160066101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550610c83565b6000808f60008b60020b60020b815260200190815260200160002090508060000160039054906101000a900460020b9150888160000160036101000a81548162ffffff021916908360020b62ffffff1602179055508060000160069054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff166000141580156108e157508860020b8260020b135b80156108f257508860020b8a60020b125b610958576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f55505045525f4f524445520000000000000000000000000000000000000000006044820152606401610111565b50610962856110c1565b60020b8860020b13610ad3576040518060c001604052808a60020b81526020018260020b8152602001886fffffffffffffffffffffffffffffffff1681526020018f81526020018e81526020018d73ffffffffffffffffffffffffffffffffffffffff168152508f60008a60020b60020b815260200190815260200160002060008201518160000160006101000a81548162ffffff021916908360020b62ffffff16021790555060208201518160000160036101000a81548162ffffff021916908360020b62ffffff16021790555060408201518160000160066101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550606082015181600101556080820151816002015560a08201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050610c37565b6040518060c001604052808a60020b81526020018260020b8152602001886fffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff168152508f60008a60020b60020b815260200190815260200160002060008201518160000160006101000a81548162ffffff021916908360020b62ffffff16021790555060208201518160000160036101000a81548162ffffff021916908360020b62ffffff16021790555060408201518160000160066101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550606082015181600101556080820151816002015560a08201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050505b878f60008360020b60020b815260200190815260200160002060000160006101000a81548162ffffff021916908360020b62ffffff160217905550600183610c7f91906119fc565b9250505b6000610c8e856110c1565b90508760020b8660020b128015610cab57508060020b8860020b13155b15610cb857879550610cdc565b8960020b8660020b128015610cd357508060020b8a60020b13155b15610cdc578995505b50939d909c509a5050505050505050505050565b600284900b600081815260208790526040812090918291907ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2761814801590610d56575080546fffffffffffffffffffffffffffffffff868116660100000000000090920416145b15610e7d578054600281810b600090815260208b9052604080822063010000009485900480850b84529190922082547fffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffff1662ffffff928316909502949094178255845484547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000169116178355919089810b9087900b1415610df957825460020b95505b600289810b600090815260208c90526040812080547fffffffffffffffffffff0000000000000000000000000000000000000000000016815560018082018390559281019190915560030180547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055610e7490856119fc565b93505050610ecc565b80546fffffffffffffffffffffffffffffffff66010000000000008083048216889003909116027fffffffffffffffffffff00000000000000000000000000000000ffffffffffff9091161781555b50600285900b6000908152602088905260409020610f097ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff27618611989565b60020b8660020b14158015610f3d575080546fffffffffffffffffffffffffffffffff868116660100000000000090920416145b15611064578054600281810b600090815260208b9052604080822063010000009485900480850b84529190922082547fffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffff1662ffffff928316909502949094178255845484547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000169116178355919088810b9087900b1415610fe057825460020b95505b600288810b600090815260208c90526040812080547fffffffffffffffffffff0000000000000000000000000000000000000000000016815560018082018390559281019190915560030180547fffffffffffffffffffffffff000000000000000000000000000000000000000016905561105b90856119fc565b935050506110b3565b80546fffffffffffffffffffffffffffffffff66010000000000008083048216889003909116027fffffffffffffffffffff00000000000000000000000000000000ffffffffffff9091161781555b839250509550959350505050565b60006401000276a373ffffffffffffffffffffffffffffffffffffffff83161080611116575073fffd8963efd1fc6a506488495d951d5263988d2673ffffffffffffffffffffffffffffffffffffffff831610155b1561114d576040517f6e4ba61d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b77ffffffffffffffffffffffffffffffffffffffff00000000602083901b166fffffffffffffffffffffffffffffffff811160071b81811c67ffffffffffffffff811160061b90811c63ffffffff811160051b90811c61ffff811160041b90811c60ff8111600390811b91821c600f811160021b90811c918211600190811b92831c979088119617909417909217179091171717608081106111f757607f810383901c9150611201565b80607f0383901b91505b908002607f81811c60ff83811c9190911c800280831c81831c1c800280841c81841c1c800280851c81851c1c800280861c81861c1c800280871c81871c1c800280881c81881c1c800280891c81891c1c8002808a1c818a1c1c8002808b1c818b1c1c8002808c1c818c1c1c8002808d1c818d1c1c8002808e1c9c81901c9c909c1c80029c8d901c9e9d7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff808f0160401b60c09190911c678000000000000000161760c19b909b1c674000000000000000169a909a1760c29990991c672000000000000000169890981760c39790971c671000000000000000169690961760c49590951c670800000000000000169490941760c59390931c670400000000000000169290921760c69190911c670200000000000000161760c79190911c670100000000000000161760c89190911c6680000000000000161760c99190911c6640000000000000161760ca9190911c6620000000000000161760cb9190911c6610000000000000161760cc9190911c6608000000000000161760cd9190911c66040000000000001617693627a301d71055774c8581027ffffffffffffffffffffffffffffffffffd709b7e5480fba5a50fed5e62ffc5568101608090811d906fdb2df09e81959a81455e260799a0632f8301901d600281810b9083900b14611448578873ffffffffffffffffffffffffffffffffffffffff1661142082611457565b73ffffffffffffffffffffffffffffffffffffffff161115611442578161144a565b8061144a565b815b9998505050505050505050565b60008060008360020b1261146e578260020b61147b565b8260020b61147b90611a14565b90506114a67ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff27618611989565b62ffffff168111156114e4576040517ff87dc40c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006001821661150557700100000000000000000000000000000000611517565b6ffffcb933bd6fad37aa2d162d1a5940015b70ffffffffffffffffffffffffffffffffff169050600282161561154b576ffff97272373d413259a46990580e213a0260801c5b600482161561156a576ffff2e50f5f656932ef12357cf3c7fdcc0260801c5b6008821615611589576fffe5caca7e10e4e61c3624eaa0941cd00260801c5b60108216156115a8576fffcb9843d60f6159c9db58835c9266440260801c5b60208216156115c7576fff973b41fa98c081472e6896dfb254c00260801c5b60408216156115e6576fff2ea16466c96a3843ec78b326b528610260801c5b6080821615611605576ffe5dee046a99a2a811c461f1969c30530260801c5b610100821615611625576ffcbe86c7900a88aedcffc83b479aa3a40260801c5b610200821615611645576ff987a7253ac413176f2b074cf7815e540260801c5b610400821615611665576ff3392b0822b70005940c7a398e4b70f30260801c5b610800821615611685576fe7159475a2c29b7443b29c7fa6e889d90260801c5b6110008216156116a5576fd097f3bdfd2022b8845ad8f792aa58250260801c5b6120008216156116c5576fa9f746462d870fdf8a65dc1f90e061e50260801c5b6140008216156116e5576f70d869a156d2a1b890bb3df62baf32f70260801c5b618000821615611705576f31be135f97d08fd981231505542fcfa60260801c5b62010000821615611726576f09aa508b5b7a84e1c677de54f3e99bc90260801c5b62020000821615611746576e5d6af8dedb81196699c329225ee6040260801c5b62040000821615611765576d2216e584f5fa1ea926041bedfe980260801c5b62080000821615611782576b048a170391f7dc42444e8fa20260801c5b60008460020b13156117c157807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff816117bd576117bd611a4d565b0490505b6401000000008106156117d55760016117d8565b60005b60ff16602082901c0192505050919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461180e57600080fd5b919050565b8035600281900b811461180e57600080fd5b80356fffffffffffffffffffffffffffffffff8116811461180e57600080fd5b60008060008060008060008060008060006101608c8e03121561186757600080fd5b8b359a5060208c0135995060408c0135985061188560608d016117ea565b975061189360808d01611813565b96506118a160a08d01611813565b95506118af60c08d01611813565b94506118bd60e08d01611813565b93506118cc6101008d01611825565b92506118db6101208d01611813565b91506118ea6101408d016117ea565b90509295989b509295989b9093969950565b600080600080600060a0868803121561191457600080fd5b8535945061192460208701611813565b935061193260408701611813565b925061194060608701611825565b915061194e60808701611813565b90509295509295909350565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160020b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8000008114156119bf576119bf61195a565b60000392915050565b60006fffffffffffffffffffffffffffffffff8083168185168083038211156119f3576119f361195a565b01949350505050565b60008219821115611a0f57611a0f61195a565b500190565b60007f8000000000000000000000000000000000000000000000000000000000000000821415611a4657611a4661195a565b5060000390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fdfea264697066735822122054069faf651a79d832b5c9a5cf08f7ca95585961aec6e075672434df819ac32064736f6c63430008090033";

type TicksConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TicksConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Ticks__factory extends ContractFactory {
  constructor(...args: TicksConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Ticks> {
    return super.deploy(overrides || {}) as Promise<Ticks>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Ticks {
    return super.attach(address) as Ticks;
  }
  connect(signer: Signer): Ticks__factory {
    return super.connect(signer) as Ticks__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TicksInterface {
    return new utils.Interface(_abi) as TicksInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Ticks {
    return new Contract(address, _abi, signerOrProvider) as Ticks;
  }
}