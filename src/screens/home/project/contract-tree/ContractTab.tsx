import { Chain, Contract, getChains, getImpls, implsBucket } from "core"
import { useCallback } from "react"
import { Async, useAsync } from "react-async"
import { generatePath, useNavigate } from "react-router-dom"
import { ROUTES } from "routes"
import { ContractTreeItem } from "./ContractTreeItem"


interface ContractTabProps {
    contract: Contract
}
export const ContractTab = ({contract: {id, name, projectId}}:ContractTabProps) => {
    const navigate = useNavigate()
    const onCreateImpl = useCallback(() => navigate(
        generatePath(ROUTES.CREATE_IMPLEMENTATION, {
            contractId: id,
            projectId
        })
    ),[id, projectId])

    const loadImplsWithChains = useCallback(async () => {
        const chains = await getChains()
        const impls = await getImpls(id)
        return {
            chains,
            impls
        }
    },[id])
    const {data:chains, error, isPending} = useAsync<Chain[]>(getChains)

    return (
        <ContractTreeItem nodeId={id} labelText={name}>
            <Async promiseFn={loadImplsWithChains}>
                {({data}) => {
                    if(data) return (
                        data.impls.map((impl) => (
                            <ContractTreeItem
                                nodeId={impl.id}
                                labelText={impl.name}
                                labelInfo={data.chains.find(
                                    c => c.chainId === impl.chainId
                                )?.name || '-'}
                            />
                        ))
                    )
                }}
            </Async>
            <ContractTreeItem 
                nodeId={'create-'+id}
                labelText="new..."
                onClick={onCreateImpl}
            />
        </ContractTreeItem>
    )
}