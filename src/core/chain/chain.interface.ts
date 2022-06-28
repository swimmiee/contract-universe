export interface Chain {
    chainId: number
    rpc_url: string
    name: string
    symbol: string
}

export interface ChainsBucket {
    chains: Chain[]
}