import { accountsBucket } from "./accounts.bucket"

export const getAccountsList = async () => {
    const { accounts } = await accountsBucket.get('accounts')
    return accounts || []
}