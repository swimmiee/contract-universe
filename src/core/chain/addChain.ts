import { Chain } from "./chain.interface"
import { chainsBucket } from "./chains.bucket"


export const addChain = async (newChain:Chain) => {
    await chainsBucket.set(({chains}) => {
        if(!Array.isArray(chains)){
            return {
                chains: [newChain]
            }
        }

        // chain 이름 중복
        if(chains.findIndex(c => c.chainId === newChain.chainId || c.name === newChain.name) > -1){
            throw Error(`${newChain.name}::이미 존재하는 체인입니다.`)
        }

        return {
            chains: [...chains, newChain]
        }
    })
}