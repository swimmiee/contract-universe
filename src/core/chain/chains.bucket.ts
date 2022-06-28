import { getBucket } from "@extend-chrome/storage";
import { ChainsBucket } from "./chain.interface";

export const chainsBucket = getBucket<ChainsBucket>('chains')
