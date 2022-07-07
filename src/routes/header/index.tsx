import { Chip, Typography, Box } from "@mui/material"
import { accountState, useContractValue } from "atoms"
import { useMemo } from "react"
import { matchPath, useLocation, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { fAddress } from "utils/formatAddress"
import { ROUTES } from "../route-names"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Menu } from "./Menu"


const HEADER_HEIGHT = 76;

const HEADER_ESCAPED_LIST = [
    ROUTES.LOGIN,
    ROUTES.ADD_ACCOUNT,
    ROUTES.REGISTER
]

export const Header = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const showHeader = useMemo(() => {
        return !HEADER_ESCAPED_LIST.some(route => matchPath(route, pathname))
    },[pathname])


    const [account, setAccount] = useRecoilState(accountState)
    const { project } = useContractValue()

    return (account && showHeader) ? (
        <>
        <Box
            position="fixed"
            height={HEADER_HEIGHT}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingX={1}
            width="100%"
            borderBottom={0.8}
            zIndex={10}
            style={{
                backgroundColor: "#fff"
            }}
        >   
            <Box 
                display="flex"
                style={{width: 100}}
                padding={1}
                justifyContent="flex-start"
            >
                {matchPath(ROUTES.HOME, pathname) && project ? 
                    <Chip 
                        color="primary"
                        size="small"
                        label={project.name}
                    />
                :
                    <ArrowBackIosNewIcon 
                        onClick={goBack}
                    />
                }
            </Box>


            <Box display="flex" flex={1} flexDirection="column" alignItems="center">
                <Typography 
                    variant="body1"
                    fontWeight="bold"
                    children={account.name}
                    mb={.5}
                />
                <Chip 
                    variant="outlined"
                    size="small"
                    label={fAddress(account.address, 12)}
                />
            </Box>


            <Box
                display="flex"
                justifyContent="flex-end"
                style={{width: 100}} 
            >
                <Menu />
            </Box>
        </Box>

        <div style={{height: HEADER_HEIGHT}} />
        </>
    ) : null
}