import { getBucket } from "@extend-chrome/storage";
import { AccountBucket } from "./account.interface";

export const accountsBucket = getBucket<AccountBucket>('accounts')
