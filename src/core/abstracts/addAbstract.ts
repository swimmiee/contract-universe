import { nanoid } from "nanoid"
import { AbiItem } from "web3-utils"
import { abstractsBucket } from "./abstract.bucket"

export const addAbstract = async (
    name: string,
    abiItems: AbiItem[]
) =>{
    const abstracts =  await abstractsBucket.get()

    let id:string;
    do {
        // prevent duplicated ID
        id = nanoid(8)
    } while (abstracts[id]);

    
    await abstractsBucket.set(() => ({
        [id]: {
            name,
            abi: abiItems,
        }
    }))

    return id;
}