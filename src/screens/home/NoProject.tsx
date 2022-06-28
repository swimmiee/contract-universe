import { Box, IconButton, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";


export function NoProject(){
    const navigate = useNavigate()
    const toCreateProject = () => navigate(ROUTES.CREATE_PROJECT)
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            flex={1}
        >
            <Typography 
                variant="body1"
                children="새로운 프로젝트를 생성해 보세요!"
            />
            <IconButton onClick={toCreateProject}>
                <Add />
            </IconButton>
        </Box>
    )
}