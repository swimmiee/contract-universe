import { Button, Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useContractState } from "atoms"
import { getMainProject } from "core"
import { removeProject } from "core/projects/removeProject"

export const NotSelected = () => {
    const { project, setProject } = useContractState()
    const onRemove = async () => {
        if(!project)
            return;

        if(window.confirm("프로젝트를 정말 삭제하시겠습니까?")){
            await removeProject(project.id)
            const mainProject = await getMainProject()
            setProject(mainProject)
        }
    }
    return (
        <Box 
            display="flex"
            flexDirection="column"
            flex={1}
            p={3}
        >
            <Typography 
                variant="h3"
                mb={1}
                children={project?.name}
            />

            <Divider sx={{mb: 1.5}} />
            
            <Typography 
                variant="body2"
                mb={1}
                children={project?.description || `${project?.name || ""} project.`}
            />

            <Typography 
                variant="body1"
                component="code"
                align="center"
                my={2}
                children="컨트랙트를 선택해 주세요!"
            />


            <Typography 
                variant="h5"
                color="error"
                mt={5}
                children="Danger Zone"
            />
            <Divider sx={{my: 1.5}} />

            <Box 
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography 
                    variant="body1"
                    mb={1}
                    children={(project?.name || "") + " 프로젝트 삭제"}
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