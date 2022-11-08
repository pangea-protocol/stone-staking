import {Log} from "@ethersproject/abstract-provider/src.ts";
import {ProtocolRevenueShare__factory} from "../types";
import {addressEqual} from "./utils";


const protocolRevenueInterface = ProtocolRevenueShare__factory.createInterface();

/**
 * Collect Event를 추려오기
 * @param address
 * @param logs
 */
export function gatherCollectEvents(address:string, logs: Array<Log>) {
  address = address.toLowerCase();
  return logs
      .filter((log) => addressEqual(log.address, address))
      .map((log) => protocolRevenueInterface.parseLog(log))
      .filter((logDesc) => logDesc.name === "Collect")
      .map((logDesc) => {
        return {
          pool: logDesc.args[0],
          token: logDesc.args[1],
          amount: logDesc.args[2],
        };
      });
}

/**
 * Share Event를 추려오기
 * @param address
 * @param logs
 */
export function gatherShareEvents(address:string, logs: Array<Log>) {
  address = address.toLowerCase();
  return logs
      .filter((log) => addressEqual(log.address, address))
      .map((log) => protocolRevenueInterface.parseLog(log))
      .filter((logDesc) => logDesc.name === "Share")
      .map((logDesc) => {
        return {
          feeToken: logDesc.args[0],
          revenueToken: logDesc.args[1],
          amount: logDesc.args[2],
          output: logDesc.args[3],
          growthFundShare: logDesc.args[4],
          daoFundShare: logDesc.args[5]
        };
      });
}
