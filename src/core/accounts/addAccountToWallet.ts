import { Wallet } from "ethers";
import { decryptPk } from "utils/decryptPk";
import { Account } from "./account.interface";
import { web3 } from "./config";

export const addAccountToWallet = ({cipher, iteration}:Account, password:string) => {
    const pk = decryptPk(cipher, password, iteration)
    let wallet  = new Wallet(pk) 
    web3.eth.accounts.wallet.add(wallet)
}