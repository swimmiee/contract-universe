import { Box, Button, Typography } from "@mui/material"
import { useContractState } from "atoms"
import { Chain, Impl, removeImpl } from "core"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fAddress } from "utils/formatAddress"

interface ImplListItemProps {
    impl: Impl
    chain: Chain
}
export const ImplListItem = ({impl, chain}:ImplListItemProps) => {
    const { setImpl } = useContractState()
    const viewImpl = () => setImpl(impl)
    const navigate = useNavigate()
    // const [isEditing, setIsEditing] = useState(false);
    // const startEdit = () => setIsEditing(true)
    const onRemove = useCallback(() => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            removeImpl(impl.id)
                .then(() => navigate(0))
        }
    },[])

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={0.5}
        >
            <Box>
                <Typography 
                    variant="h6"
                    children={impl.name}
                />
                <Box display="flex" alignItems="flex-end">
                    <Typography 
                        variant="caption"
                        children={chain.name}
                    />
                    <Typography 
                        ml={1.5}
                        variant="caption"
                        children={fAddress(impl.address, 12, 4)}
                    />
                </Box>
            </Box>

            <Box display="flex" ml={2} >
                <Button
                    variant="contained"
                    onClick={viewImpl}
                >
                    View
                </Button>
                <span style={{width: 16}} />
                <Button
                    variant="outlined"
                    color="error"
                    onClick={onRemove}
                >
                    Remove
                </Button>
            </Box>
        </Box>
    )

}