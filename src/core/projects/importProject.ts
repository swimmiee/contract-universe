import { abstractsBucket } from "core/abstracts";
import { addChain, getChains } from "core/chain";
import { implsBucket } from "core/implementations";
import { addProject } from "./addProject";
import { ProjectEntity } from "./exportProject";
import { projectsBucket } from "./projects.bucket";

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

export const importProject = async ({contracts, chains, ...project}:ProjectEntity) => {

    // 1. add extra chains
    const originChains = await getChains();
    for await (const chain of chains) {
        if(originChains.findIndex(c => c.chainId === chain.chainId) === -1){
            await addChain(chain)
        }
    }

    // 2. add project
    await projectsBucket.set(({ projects }) => {
        const updatedProjects = Array.isArray(projects) ? 
                [...projects, project]
            : 
                [project];
        return {
            projects: updatedProjects,
        }
    })

    // 3. add contracts
    for await (const { abstract:{id, ...abstract}, impls:newImpls } of contracts) {
        await abstractsBucket.set(() => ({
            [id]: abstract
        }))
        await implsBucket.set(({impls}) => ({
            impls: Array.isArray(impls) ? impls.concat(newImpls) : newImpls
        }))
    }

}