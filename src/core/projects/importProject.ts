import { abstractsBucket } from "core/abstracts";
import { addChain, getChains } from "core/chain";
import { Contract, contractsBucket } from "core/contracts";
import { Impl, implsBucket } from "core/implementations";
import { nanoid } from "nanoid";
import { ProjectEntity } from "./exportProject";
import { projectsBucket } from "./projects.bucket";
import { Project } from "./projects.interfaces"

const ProjectEntityProperties = [
    "contracts",
    "chains",
    "id",
    "name"
]

export const isValidProject = (projectLike: any) => {
    if(ProjectEntityProperties.some(prop => !projectLike.hasOwnProperty(prop)))
        return false;
    if(
        !Array.isArray(projectLike.contracts!) ||
        !Array.isArray(projectLike.chains!)
    )
        return false;
        
    return true;
}

export const importProject = async ({contracts, chains, id:projectId, ...project}:ProjectEntity) => {

    // project, contract, impl의 id를 신규로 부여한다. (abstract는 유지)
    const idMap:{[beforeId: string]: string} = {}
    const addIdMap = (beforeId: string) => {
        let newId;
        do { 
            newId = nanoid(8) 
        } while(idMap[newId])

        idMap[beforeId] = newId;
        return newId;
    }

    // 1. add extra chains
    const originChains = await getChains();
    for await (const chain of chains) {
        if(originChains.findIndex(c => c.chainId === chain.chainId) === -1){
            await addChain(chain)
        }
    }

    // project Id 변경
    const newProject:Project = {id: addIdMap(projectId), ...project}

    // 2. add project
    await projectsBucket.set(({ projects }) => {
        const updatedProjects = Array.isArray(projects) ? 
                [...projects, newProject]
            : 
                [newProject];
        return {
            projects: updatedProjects,
        }
    })

    // 3. add contracts
    for await (const { 
        abstract:{id: abstractId, ...abstract}, 
        impls, 
        ...contract 
    } of contracts) {
        const newContract:Contract = {
            id: addIdMap(contract.id), 
            projectId: idMap[contract.projectId],
            name: contract.name,
            abstractId: contract.abstractId
        }

        await contractsBucket.set(({contracts}) => ({
            contracts: Array.isArray(contracts) ? 
                contracts.concat([newContract])
                :
                [newContract]
        }))

        await abstractsBucket.set(() => ({
            [abstractId]: abstract
        }))

        const newImpls:Impl[] = impls.map(({id, contractId, ...impl}) => {
            return {
                id: addIdMap(id),
                contractId: idMap[contractId],
                ...impl
            }
        })
        await implsBucket.set(({impls}) => ({
            impls: Array.isArray(impls) ? impls.concat(newImpls) : newImpls
        }))
    }

}