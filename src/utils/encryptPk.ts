import { utils, ModeOfOperation, padding } from 'aes-js'

export const encryptPk = (pk: string, passphrase: string, iteration: number) => {
    if(pk.slice(0,2) === '0x'){
        pk = pk.slice(2)
    }

    const ppBytes = utils.utf8.toBytes(passphrase)
    const padded = padding.pkcs7.pad(ppBytes)
    const aesCtr = new ModeOfOperation.ctr(padded)

    const pkBytes = utils.hex.toBytes(pk)
    let cipherBytes = pkBytes;
    for (let i = 0; i < iteration; i++) {
        cipherBytes = aesCtr.encrypt(cipherBytes);
    }
    const cipher = utils.hex.fromBytes(cipherBytes);

    return cipher
}