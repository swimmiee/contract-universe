import { nanoid } from "nanoid";
import { implsBucket } from "./impl.bucket";
import { Impl } from "./impl.interface";


export const addImpl = async (
    name: string,
    address: string,
    contractId: string,
    chainId: number
) => {
    const id = nanoid(8)
    const newImpl:Impl = {
        id,
        name,
        address,
        contractId,
        chainId
    }

    await implsBucket.set(({impls}) => ({
        impls: Array.isArray(impls) ? impls.concat([newImpl]) : [newImpl]
    }))

    return id;
}