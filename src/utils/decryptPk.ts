import { utils, padding, ModeOfOperation } from 'aes-js'


export const decryptPk = (cipher: string, passphrase: string, iteration: number) => {
    const ppBytes = utils.utf8.toBytes(passphrase)
    const padded = padding.pkcs7.pad(ppBytes)
    const aesCtr = new ModeOfOperation.ctr(padded)

    const cipherBytes = utils.hex.toBytes(cipher)
    let pkBytes = cipherBytes;
    for (let i = 0; i < iteration; i++) {
        pkBytes  = aesCtr.encrypt(pkBytes);
    }
    const pk = utils.hex.fromBytes(pkBytes)

    return '0x'+pk
}