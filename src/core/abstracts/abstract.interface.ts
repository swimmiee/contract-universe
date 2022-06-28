import { AbiItem } from "web3-utils"

export interface CalledFreq {
    [func_name: string]: number
}

export interface Abstract {
    name: string
    abi: AbiItem[]
    called_freq: CalledFreq
}

export interface AbstractsBucket {
    [abstractId:string]: Abstract
}