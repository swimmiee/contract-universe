import { getBucket } from "@extend-chrome/storage";
import { ContractsBucket } from "./contract.interface";

export const contractsBucket = getBucket<ContractsBucket>('contracts')
