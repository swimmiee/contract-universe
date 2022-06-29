import { Box } from "@mui/material";
import { useContractState } from "atoms";
import { getContractInfoByImpl } from "core/implementations/getContractInfoByImpl";
import { useCallback } from "react";
import { Async } from "react-async";
import { ContractSetting } from "./contract-setting-panel";
import ImplStore from "./impl-panel/implContext";
import { ImplMain } from "./impl-panel";
import { NoImpl } from "./NoImpl";

export function ImplPanel (){
    const { impl, contract } = useContractState()
    const getInfo = useCallback(async () => {
        if(impl){
            const info = await getContractInfoByImpl(impl)
            return info
        }
        else
            throw Error("Not Selected")
    },[impl?.id])

    return (
        <Box
            display="flex"
            flexDirection="column"
            flex={1}
        >
            <Async promiseFn={getInfo}>
                {({data, isLoading, error}) => {
                    if(error){
                        if(contract) return (
                            <ContractSetting 
                                contract={contract} 
                            />
                        )
                        else return (
                            <NoImpl />
                        )
                    } 
                    else if(data) return (
                        <ImplStore.Provider value={data}>
                            <ImplMain />
                        </ImplStore.Provider>
                    )
                }}

            </Async>

        </Box>
    )
}