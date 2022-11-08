/**
 * sleep 구현
 * @param ms
 */
export async function sleep(ms: number) {
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
}

/**
 * 주소 동일성 체크
 * @param address0
 * @param address1
 */
export function addressEqual(address0: string, address1: string) {
  return address0.toLowerCase() === address1.toLowerCase();
}
