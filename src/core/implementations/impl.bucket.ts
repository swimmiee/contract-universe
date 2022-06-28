import { getBucket } from "@extend-chrome/storage";
import { ImplsBucket } from "./impl.interface";

export const implsBucket = getBucket<ImplsBucket>('impls')
