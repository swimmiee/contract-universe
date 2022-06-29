import { ContractImplInfo } from "core/implementations/getContractInfoByImpl";
import { createContext } from "react";

const ImplStore = createContext<ContractImplInfo | null>(null);

export default ImplStore;