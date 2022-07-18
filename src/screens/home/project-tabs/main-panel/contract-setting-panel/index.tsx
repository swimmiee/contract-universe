import { Box, Button, Divider, Typography } from "@mui/material"
import { useContractState } from "atoms"
import { Chain, getChains, getImpls, Impl } from "core"
import { removeContract } from "core/contracts/removeContract"
import { useCallback } from "react"
import { Async } from "react-async"
import { ImplListItem } from "./ImplListItem"


export const ContractSetting = () => {
    const { contract, setContract } = useContractState()

    const loadImpls = async () => {
        if(!contract)
            return;
        const impls = await getImpls(contract.id)
        const chains = await getChains()
        return {
            impls, chains
        }
    }

    const findChain = useCallback((impl:Impl, chains:Chain[]) => 
        chains.find(c => c.chainId === impl.chainId)!
    ,[])


    const onRemove = async () => {
        if(!contract)
            return;

        if(window.confirm("컨트랙트를 정말 삭제하시겠습니까?")){
            await removeContract(contract.id)
            setContract(null)
        }
    }

    return (
        <Box 
            display="flex"
            flexDirection="column"
            flex={1}
            p={2}
        >
            <Typography 
                variant="h3"
                children={contract?.name}
                mb={1}
            />
            <Divider sx={{mb: 1}} />

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


            {/* Danger Zone */}
            <Typography 
                variant="h5"
                mt={5}
                color="error"
                children="Danger Zone"
            />
            <Divider sx={{my: 1.5}} />
            <Box 
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography 
                    variant="body1"
                    mb={1}
                    children={(contract?.name || "") + " 컨트랙트 삭제"}
                />
                <Button
                    variant="outlined"
                    color="error"
                    onClick={onRemove}
                    size="small"
                >
                    Remove
                </Button>
            </Box>
        </Box>
    )
}