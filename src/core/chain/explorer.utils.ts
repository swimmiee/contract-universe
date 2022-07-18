import { Chain } from "core";

export const getTxExplorer = (chain: Chain, txHash: string) => {
    return chain.explorer ?
        `${chain.explorer}tx/${txHash}`
        : null
}

export const getBlockExplorer = (chain: Chain, blockNumber: number) => {
    return chain.explorer ?
        `${chain.explorer}block/${blockNumber}`
        : null
}