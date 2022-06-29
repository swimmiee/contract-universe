import { contractsBucket } from "./contract.bucket"
import { Contract } from "./contract.interface"


/**
 * @params projectId: string | null
 *  string => projectId에 해당하는 Contract만 가져옴
 *  null => 전체 Contract 기져옴
 *  */ 

export const getContracts = async (projectId: string | null):Promise<Contract[]> => {
    const { contracts } = await contractsBucket.get()
    if(Array.isArray(contracts)){
        return projectId ? 
            contracts.filter(c => c.projectId === projectId) 
            : 
            contracts
    } else {
        return []
    }
}

export const getContractById = async (id: string):Promise<Contract | undefined> => {
    const { contracts } = await contractsBucket.get()
    if(Array.isArray(contracts)){
        return contracts.find(c => c.id === id)
    } else {
        return undefined
    }
}