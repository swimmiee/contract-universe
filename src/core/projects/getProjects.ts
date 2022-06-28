import { projectsBucket } from "./projects.bucket"
import { Project } from "./projects.interfaces";

export const getProjects = async () => {
    const { projects } = await projectsBucket.get()
    return projects;
}

export const getMainProject = async ():Promise<Project | null> => {
    const projects = await getProjects()
    return Array.isArray(projects) ? projects[0] : null
}