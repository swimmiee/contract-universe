import { Chain } from "./chain.interface";

export const CHAINS:{[key:string]: Chain} = {
    ethereum: {
        name: 'Ethereum',
        symbol: "ETH",
        chainId: 1,
        rpc_url: "https://rpc.ankr.com/eth",
        explorer: "https://etherscan.io/"
    },
    klaytn: {
        name: 'Klaytn Mainnet',
        symbol: 'KLAY',
        chainId: 8217,
        rpc_url: "https://public-node-api.klaytnapi.com/v1/cypress",
        explorer: "https://scope.klaytn.com/"
    },
    baobab: {
        name: 'Klaytn Testnet',
        symbol: 'KLAY',
        chainId: 1001,
        rpc_url: "https://public-node-api.klaytnapi.com/v1/baobab",
        explorer: "https://baobab.scope.klaytn.com/"
    },
}