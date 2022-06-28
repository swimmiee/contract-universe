import { MenuItem, Select } from "@mui/material"
import { getContracts } from "core"
import { useCallback } from "react"
import { Async } from "react-async"
import { UseFormRegisterReturn } from "react-hook-form"

interface SelectContractProps extends UseFormRegisterReturn {
    projectId: string
    initContractId: string
}

export const SelectContract = ({projectId, initContractId, ...rest}:SelectContractProps) => {
    const loadContracts = useCallback(async () => {
        if(!projectId)
            return []
        const contracts = await getContracts(projectId)
        return contracts
    },[])

    return (
            <Async promiseFn={loadContracts} >
                {({data:contracts}) => {
                    if(contracts) return (
                        <Select defaultValue={initContractId} {...rest}> 
                        {
                            contracts.map(c => (
                                <MenuItem 
                                    key={c.id}
                                    value={c.id}
                                    children={c.name}
                                />
                            ))
                        }
                        </Select>
                    )
                }}
            </Async>
    )
}

