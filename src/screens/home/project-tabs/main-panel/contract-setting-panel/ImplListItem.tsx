import { Box, Button, Typography } from "@mui/material"
import { useContractState } from "atoms"
import { Chain, Impl } from "core"
import { useState } from "react"
import { fAddress } from "utils/formatAddress"

interface ImplListItemProps {
    impl: Impl
    chain: Chain
}
export const ImplListItem = ({impl, chain}:ImplListItemProps) => {
    const {setImpl} = useContractState()
    const viewImpl = () => setImpl(impl)
    const [isEditing, setIsEditing] = useState(false);
    const startEdit = () => setIsEditing(true)

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

            <Box display="flex">
                <Button
                    sx={{mx: 2}}
                    variant="contained"
                    onClick={viewImpl}
                >
                    View
                </Button>
                <Button
                    variant="outlined"
                    onClick={startEdit}
                >
                    Edit
                </Button>
            </Box>
        </Box>
    )

}