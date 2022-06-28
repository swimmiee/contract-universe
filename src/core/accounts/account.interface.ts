
export interface Account {
    name: string
    address: string
    cipher: string
    iteration: number
}

export interface AccountBucket {
    // for auth
    id: string
    cipher: string
    iteration: number
    // for accounts
    accounts: Account[]
    defaultAccount: number
}
