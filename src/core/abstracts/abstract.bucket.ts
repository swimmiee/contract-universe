import { getBucket } from "@extend-chrome/storage";
import { AbstractsBucket } from "./abstract.interface";

export const abstractsBucket = getBucket<AbstractsBucket>('abstracts')
