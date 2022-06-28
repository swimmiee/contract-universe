import { nanoid } from "nanoid"
import { projectsBucket } from "./projects.bucket"
import { Project } from "./projects.interfaces"

export const addProject = async (name: string, description: string, isDefault: boolean) => {
    const newProject:Project = {
        id: nanoid(8),
        name,
        description
    }

    await projectsBucket.set(({ projects }) => {
        const updatedProjects = Array.isArray(projects) ? 
            isDefault ?
                [newProject, ...projects]
                :
                [...projects, newProject]
            : 
                [newProject];
        return {
            projects: updatedProjects,
        }
    })

    return newProject;
}