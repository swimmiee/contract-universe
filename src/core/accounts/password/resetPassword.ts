import { nanoid } from "nanoid";
import { accountsBucket } from "../accounts.bucket"
import { encryptPk } from "utils/encrypt-pk";
import { utils } from "aes-js";
import { AES_ITERATION } from "../config";
import { CHAINS, chainsBucket } from "core/chain";

export const resetPassword = async (password: string) => {
    let { id } = await accountsBucket.get()
    if(!id){
        // 초기 비밀번호 만드는 경우
        id = '0x'+utils.hex.fromBytes(utils.utf8.toBytes(nanoid(32)))
        await accountsBucket.set(() => {
            return {
                id,
                cipher: encryptPk(id, password, AES_ITERATION),
                iteration: AES_ITERATION,
                accounts: [],
                defaultAccount: -1,
            }
        })
        await chainsBucket.set({
            chains: [CHAINS.klaytn, CHAINS.ethereum]
        })
    }
    else {
        // 비밀번호 변경하는 경우
        await accountsBucket.set(() => {
            return {
                cipher: encryptPk(id, password, AES_ITERATION),
                iteration: AES_ITERATION
            }
        })
    }

}