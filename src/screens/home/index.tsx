import { Box } from "@mui/system";
import { accountState, useContractValue } from "atoms";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ROUTES } from "routes";
import { NoProject } from "./NoProject";
import ProjectTabs from "./project/project-tabs";



export default function Home(){
    const [account, setAccount] = useRecoilState(accountState)
    const { project } = useContractValue()

    return !account ? <Navigate to={ROUTES.ADD_ACCOUNT} replace /> :(
        <Box
            display="flex"
            flexDirection="column"
        >
            {project ?
                <ProjectTabs />
                :
                <NoProject />
            }
        </Box>
    )
}