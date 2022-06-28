import { getBucket } from "@extend-chrome/storage";
import { ProjectBucket } from "./projects.interfaces";

export const projectsBucket = getBucket<ProjectBucket>('projects')
