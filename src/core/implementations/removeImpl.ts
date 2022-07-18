import { implsBucket } from "./impl.bucket";

export const removeImpl = async (implId: string) => {
    await implsBucket.set(({impls}) => {
        if(!impls){
            throw Error("Impl not exists")
        }
        const targetIndex = impls.findIndex(i => i.id === implId)
        if(targetIndex === -1){
            throw Error(`Impl id : ${implId} not exists`)
        }
        return {
            impls: impls.slice(0, targetIndex).concat(impls.slice(targetIndex + 1))
        }
    })
}