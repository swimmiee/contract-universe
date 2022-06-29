// interface ImplMainProps 

import { Chip, chipClasses, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContractValue } from "atoms";
import { useContext } from "react";
import { AbiItem } from "web3-utils";
import { AbiExecuter } from "./AbiExecuter";
import ImplStore from "./implContext";
import { SearchFunctions } from "./SearchFunctions";

const isView = (a:AbiItem) => a.stateMutability === "view" || a.stateMutability === "pure"
export const ImplMain = () => {
    const { project, impl} = useContractValue()
    const { contract, abstract, chain }  = useContext(ImplStore)!

    return (
        <Box 
            display="flex"
            flexDirection="column"
            flex={1}
            p={1.5}
        >

            <SearchFunctions abiItems={abstract.abi}/>

            <Box 
                display="flex"
                justifyContent="space-between"
                mt={1}
                padding={1}
            >
                <Typography 
                    variant="h4"
                    children={impl?.name}
                />
                <Chip 
                    color="info"
                    label={chain.name}
                    variant="outlined"
                />
            </Box>

            {abstract.abi
                .filter(a => a.name && a.type === "function")
                .sort((a, b) => +isView(b) - +isView(a))
                .map((a, i)=> (
                <AbiExecuter 
                    abi={a}
                    key={i}
                />
            ))}

        </Box>
    )
}