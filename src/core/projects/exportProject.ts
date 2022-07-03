import { Chain, getProjects } from "core"
import { Abstract, getAbstract } from "core/abstracts"
import { getChainById, getChains } from "core/chain"
import { Contract, getContracts } from "core/contracts"
import { getImpls, Impl } from "core/implementations"
import { Project } from "./projects.interfaces"

interface ContractWithPayload extends Contract {
    abstract: Abstract
    impls: Impl[]
}

interface ProjectEntity extends Project {
    contracts: ContractWithPayload[]
    chains: Chain[]
}


export const exportProject = async (projectId: string) => {
    const chains = await getChains();
    const project = (await getProjects()).find(p => p.id === projectId)
    if(!project)
        return null

    const exportedProject: ProjectEntity = {
        ...project,
        contracts: [],
        chains: []
    }

    const addChainIfNotExists = async (chainId: number) => {
        // return if exists
        if(exportedProject.chains.findIndex(c => c.chainId === chainId) > -1)
            return;

        const chain = chains.find(c => c.chainId === chainId);
        if(chain)
            exportedProject.chains.push(chain);
        else
            throw Error(`Chain ${chainId} not defined`);
    }

    const contracts = await getContracts(projectId)
    await Promise.all(
        contracts.map(async contract => {
            const abstract = (await getAbstract(contract.abstractId))!;
            const impls = await getImpls(contract.id);
            await Promise.all(
                impls.map(({chainId}) => addChainIfNotExists(chainId))
            );
            exportedProject.contracts.push({
                ...contract,
                impls,
                abstract
            })
        })
    )

    return exportedProject;
}