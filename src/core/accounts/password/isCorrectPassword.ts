import { decryptPk } from "utils/decrypt-pk";
import { accountsBucket } from "../accounts.bucket";

export const isCorrectPassword = async (password:string) => {
    const {id, cipher, iteration} = await accountsBucket.get(["id", 'cipher', 'iteration'])
    const Id = decryptPk(cipher!, password, iteration!)
    return id === Id;
}