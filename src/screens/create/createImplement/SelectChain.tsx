import { MenuItem, Select } from "@mui/material"
import { chainsBucket } from "core"
import { useCallback } from "react"
import { Async } from "react-async"
import { UseFormRegisterReturn } from "react-hook-form"

interface SelectChainProps extends UseFormRegisterReturn {
    setDefaultChain: (chainId: number) => void
}

export const SelectChain = ({setDefaultChain, ...props}:SelectChainProps) => {
    const loadChains = useCallback(async () => {
        const { chains } = await chainsBucket.get()
        return chains
    },[])
    
    return (
        <Async promiseFn={loadChains}>
            {({data:chains}) => {
                if(chains) {
                    setDefaultChain(chains[0].chainId)
                    return (
                        <Select {...props} defaultValue={chains[0].chainId}>
                            {
                                chains.map((c, i) => (
                                    <MenuItem
                                        key={c.chainId}
                                        value={c.chainId}
                                        children={c.name}
                                    />
                                ))
                            }
                        </Select>   
                    )
                }
                    
            }}
        </Async>
    )
}
