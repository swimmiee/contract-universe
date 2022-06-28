
export interface Project {
    id: string
    name: string
    description: string
}

export interface ProjectBucket {
    projects: Project[]
}
