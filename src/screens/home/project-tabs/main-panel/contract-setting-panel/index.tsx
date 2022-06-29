import { Box, Typography } from "@mui/material"
import { Chain, Contract, getChains, getImpls, Impl } from "core"
import { useCallback } from "react"
import { Async } from "react-async"
import { ImplListItem } from "./ImplListItem"

interface ContractSettingProps {
    contract: Contract
}

// TODO
// Contract 설정 후 recoil 전역 변수 값 바꿔줘야.
export const ContractSetting = ({contract}:ContractSettingProps) => {
    const loadImpls = async () => {
        const impls = await getImpls(contract.id)
        const chains = await getChains()
        return {
            impls, chains
        }
    }

    const findChain = useCallback((impl:Impl, chains:Chain[]) => 
        chains.find(c => c.chainId === impl.chainId)!
    ,[])

    return (
        <Box 
            display="flex"
            flexDirection="column"
            flex={1}
            p={2}
        >

            <Typography 
                variant="h3"
                children={contract.name}
            />

            <Async promiseFn={loadImpls}>
                {({data}) => {
                    if(data) return (
                        data.impls.map(impl => (
                            <ImplListItem
                                key={impl.id}
                                impl={impl}
                                chain={findChain(impl, data.chains)}
                            />
                        ))
                    )
                }}
            </Async>

        </Box>
    )
}