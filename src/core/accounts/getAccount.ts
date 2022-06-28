import { Account, AccountBucket } from "./account.interface"
import { accountsBucket } from "./accounts.bucket"

export const getAccount = async ():Promise<AccountBucket> => {
    const account = await accountsBucket.get()
    return account
}
export const getDefaultAccount = async ():Promise<Account | null> => {
    const {accounts, defaultAccount} = await accountsBucket.get()
    if(defaultAccount < 0 || defaultAccount === undefined){
        return null
    }
    return accounts[defaultAccount]
}