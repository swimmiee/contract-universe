import { chainsBucket } from "./chains.bucket"
import { CHAINS } from "./chains.data"

export const __init_chains = async (force?: boolean) => {
    await chainsBucket.set(({chains}) => {
        if(Array.isArray(chains) && !force){
            return {chains}
        }
        else {
            return {
                chains: [
                    CHAINS.klaytn,
                    CHAINS.ethereum
                ]
            }
        }
    })
}