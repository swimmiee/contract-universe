import { useContractState } from "atoms"
import { Contract, getChains, getImpls } from "core"
import { useCallback } from "react"
import { Async } from "react-async"
import { generatePath, useNavigate } from "react-router-dom"
import { ROUTES } from "routes"
import { ContractTreeItem } from "./ContractTreeItem"


interface ContractTabProps {
    contract: Contract
}
export const ContractTab = ({contract}:ContractTabProps) => {
    const {id, name, projectId} = contract;

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

    const { setContract, setImpl } = useContractState()
    const selectContract = useCallback(() => setContract(contract),[contract.id])

    return (
        <ContractTreeItem 
            nodeId={id} 
            labelText={name}
            onClick={selectContract}
        >
            <Async promiseFn={loadImplsWithChains}>
                {({data}) => {
                    if(data) return (
                        data.impls.map((impl) => (
                            <ContractTreeItem
                                nodeId={impl.id}
                                onClick={() => setImpl(impl)}
                                labelText={impl.name}
                                labelInfo={data.chains.find(
                                    c => c.chainId === impl.chainId
                                )?.symbol || '-'}
                            />
                        ))
                    )
                }}
            </Async>
            <ContractTreeItem 
                nodeId={'create-'+id}
                labelText="+ new"
                onClick={onCreateImpl}
            />
        </ContractTreeItem>
    )
}