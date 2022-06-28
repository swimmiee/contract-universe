import { Chain } from "./chain.interface"
import { chainsBucket } from "./chains.bucket"

export const getChains = async ():Promise<Chain[]> => {
    const {chains} = await chainsBucket.get()
    if(Array.isArray(chains)){
        return chains
    } else {
        return []
    }
}