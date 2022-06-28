import { atom } from "recoil";
import { Account, getDefaultAccount } from "core";

export const accountState = atom<Account | null>({
    key: 'state-account',
    default: getDefaultAccount()
})