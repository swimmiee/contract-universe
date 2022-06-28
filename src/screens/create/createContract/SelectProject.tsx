import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { getProjects } from "core";
import { useAsync } from "react-async";


interface SelectProjectsProps {
    projectId: string | undefined
    setProjectId: (pid:string) => void
}
export const SelectProject = ({projectId, setProjectId}:SelectProjectsProps) => {
    const {data: projects} = useAsync({
        promiseFn: getProjects
    })

    const handleChange = (event: SelectChangeEvent) => {
        setProjectId(event.target.value as string);
    };

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="select-project-label">프로젝트</InputLabel>
                <Select
                    labelId="select-project-label"
                    id="select-project"
                    value={projectId}
                    label="프로젝트"
                    onChange={handleChange}
                >
                    {projects?.map(p => (
                        <MenuItem 
                            value={p.id}
                            key={p.id}
                            children={p.name}
                        />
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}