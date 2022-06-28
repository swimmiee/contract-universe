import { getAbstract } from "core/abstracts/getAbstract";
import { nanoid } from "nanoid";
import { contractsBucket } from "./contract.bucket";
import { Contract, } from "./contract.interface";


export const addContract = async (
    projectId: string, 
    name: string, 
    abstractId: string
) => {
    const id = nanoid(8)
    const { contracts } =  await contractsBucket.get()

    if(Array.isArray(contracts) && contracts.find(abs => abs.name === name)){
        throw Error("이미 존재하는 이름입니다.")
    }
    const abs = await getAbstract(abstractId)
    if(!abs){
        throw Error("존재하지 않는 ABI입니다.")
    }

    const newContract:Contract = {
        id, 
        projectId,
        name,
        abstractId
    }

    await contractsBucket.set(({contracts}) => {
        return {
            contracts: Array.isArray(contracts) ? 
                [...contracts, newContract] 
                :
                [newContract]
        }
    })
    return newContract
}