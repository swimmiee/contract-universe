import { implsBucket } from "./impl.bucket"
import { Impl } from "./impl.interface"


/**
 * @params projectId: string | null
 *  string => projectId에 해당하는 impl만 가져옴
 *  null => 전체 impl 기져옴
 *  */ 

export const getImpls = async (contractId: string):Promise<Impl[]> => {
    const { impls } = await implsBucket.get()
    if(Array.isArray(impls)){
        return impls.filter(a => a.contractId === contractId) 
    } else {
        return []
    }
}