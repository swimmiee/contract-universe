import { nanoid } from "nanoid"
import { AbiItem } from "web3-utils"
import { abstractsBucket } from "./abstract.bucket"
import { CalledFreq } from "./abstract.interface"

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

    
    // called freq initialization
    const called_freq:CalledFreq = {}
    abiItems.forEach(item => {
        if(item.name)
            called_freq[item.name] = 0
    })

    await abstractsBucket.set(() => ({
        [id]: {
            name,
            abi: abiItems,
            called_freq
        }
    }))

    return id;
}