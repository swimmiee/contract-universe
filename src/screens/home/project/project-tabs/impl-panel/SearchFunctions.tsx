import { Autocomplete, TextField } from "@mui/material"
import { AbiItem } from "web3-utils"

interface SearchFunctionsProps {
    abiItems: AbiItem[]
}
export const SearchFunctions = ({abiItems}:SearchFunctionsProps) => {
    return (
        <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={abiItems.filter(a => a.name).map((item) => item.name)}
            renderInput={(params) => <TextField {...params} label="functions" />}
        />
    )
}