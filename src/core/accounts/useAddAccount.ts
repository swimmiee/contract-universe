import { accountState } from "atoms";
import { Wallet } from "ethers";
import { useSetRecoilState } from "recoil";
import { encryptPk } from "utils/encryptPk";
import { accountsBucket } from "./accounts.bucket";
import { getAccountsList } from "./accounts.info"
import { AES_ITERATION, web3 } from "./config";


export const useAddAccount = () => {
    const setAccount = useSetRecoilState(accountState)
    const addAccount = async (
        name: string, 
        pk: string, 
        password: string, 
        isDefault: boolean
    ):Promise<boolean> => {
        const acc = await getAccountsList()
        if(acc.map(acc => acc.name).includes(name)){
            throw Error("이미 존재하는 계정 이름입니다. 다른 이름을 설정해주세요.")
        }

        let wallet:Wallet;

        wallet  = new Wallet(pk) 
        web3.eth.accounts.wallet.add(wallet)
        
        const newAccount = {
            name,
            address: wallet.address,
            cipher: encryptPk(pk, password, AES_ITERATION),
            iteration: AES_ITERATION,
        }

        await accountsBucket.set(({accounts, defaultAccount}) => ({
            accounts: Array.isArray(accounts) ? [...accounts, newAccount] : [newAccount],
            defaultAccount: isDefault ? accounts.length : defaultAccount < 0 ? 0 : defaultAccount
        }))
        setAccount(newAccount)
        return true
    }

    return addAccount
}