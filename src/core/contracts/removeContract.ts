import { implsBucket } from "core/implementations"
import { contractsBucket } from "."

export const removeContract = async (contractId: string) => {
    await implsBucket.set(({impls}) => {
        const remainedImpls = impls.filter(impl => impl.contractId !== contractId)
        return {
            impls: remainedImpls
        }
    })

    await contractsBucket.set(({contracts}) => ({
        contracts: contracts?.filter(c => c.id !== contractId) || []
    }))
}