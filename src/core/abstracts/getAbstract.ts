import { abstractsBucket } from "./abstract.bucket"
import { Abstract } from "./abstract.interface"

export const getAbstract = async (abstractId:string):Promise<Abstract | null> => {
    const abstracts =  await abstractsBucket.get()

    const abs = abstracts[abstractId]
    return abs || null
}