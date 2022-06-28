export interface Impl {
    id: string
    name: string
    address: string
    contractId: string
    chainId: number
}

export interface ImplsBucket {
    impls: Impl[]
}