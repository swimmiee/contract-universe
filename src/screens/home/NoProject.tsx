import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";


export function NoProject(){
    const navigate = useNavigate()
    const toCreateProject = () => navigate(ROUTES.CREATE_PROJECT)
    const toImportProject = () => navigate(ROUTES.IMPORT_PROJECT)
    return (
        <Box
            display="flex"
            flexDirection="column"
            flex={1}
            px={8}
            py={6}
        >
            <Typography 
                variant="h6"
                children="새로운 프로젝트를 생성해 보세요!"
                mb={1}
            />
            <Button variant="contained" onClick={toCreateProject}>
                New Project
            </Button>
            <span style={{padding: 12}} />
            <Button variant="outlined" onClick={toImportProject}>
                Import Project
            </Button>
        </Box>
    )
}