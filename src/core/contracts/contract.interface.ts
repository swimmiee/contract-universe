export interface Contract {
    id: string
    name: string
    projectId: string
    abstractId: string
}

export interface ContractsBucket {
    contracts: Contract[]
}