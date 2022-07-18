import { getContracts } from "core/contracts"
import { removeContract } from "core/contracts/removeContract"
import { projectsBucket } from "./projects.bucket";

export const removeProject = async (projectId: string) => {
    const contracts = await getContracts(projectId)
    for await (const contract of contracts) {
        await removeContract(contract.id);
    }
    await projectsBucket.set(({projects}) => ({
        projects: projects?.filter(c => c.id !== projectId) || []
    }))
}