import { Chip, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContractState } from "atoms";
import { useState } from "react";
import { ChangeEventHandler } from "react";
import { useContext } from "react";
import { AbiItem } from "web3-utils";
import { AbiExecuter } from "./AbiExecuter";
import ImplStore from "./implContext";
import CloseIcon from '@mui/icons-material/Close';


const isView = (a:AbiItem) => a.stateMutability === "view" || a.stateMutability === "pure"
export const ImplMain = () => {
    const { impl, setImpl } = useContractState()
    const { contract, abstract, chain }  = useContext(ImplStore)!
    const [search, setSearch] = useState("")
    const onChangeSearch:ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.target.value)
    } 
    const close = () => setImpl(null)

    return (
        <Box 
            display="flex"
            flexDirection="column"
            flex={1}
            p={1.5}
        >
            <Box 
                display="flex"
                alignItems="center"
            >
                <TextField 
                    label="Search"
                    value={search}
                    onChange={onChangeSearch}
                    sx={{mr: 2, display: 'flex', flex: 1}}
                />
                <CloseIcon onClick={close}/>
            </Box>

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
                .filter(a => a.type === "function" && a.name && a.name.includes(search))
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