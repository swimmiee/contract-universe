import { Abstract, abstractsBucket } from "core/abstracts"
import { web3 } from "core/accounts"
import { Chain, getChainById } from "core/chain"
import { Contract as CoreContract, getContractById } from "core/contracts"
import { Contract } from "web3-eth-contract"
import { Impl } from "./impl.interface"


export interface ContractImplInfo {
    contract: CoreContract
    abstract: Abstract
    chain: Chain
    contractInstance: Contract
}


export const getContractInfoByImpl = async (impl:Impl):Promise<ContractImplInfo> => {
    const {contractId, chainId} = impl
    const contract = (await getContractById(contractId))!

    const abstract = (await abstractsBucket.get([contract.abstractId]))[contract.abstractId]!

    const chain = (await getChainById(chainId))!

    web3.setProvider(chain.rpc_url)
    const contractInstance = new web3.eth.Contract(abstract.abi, impl.address)

    return {
        contract,
        abstract,
        chain: chain!,
        contractInstance
    };
}