import { AbiItem } from "web3-utils"

export interface Abstract {
    name: string
    abi: AbiItem[]
}

export interface AbstractsBucket {
    [abstractId:string]: Abstract
}