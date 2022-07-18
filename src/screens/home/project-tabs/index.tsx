import { useState } from 'react';
import { useContractState } from 'atoms';
import { Tabs, Tab, Box } from '@mui/material';
import { ProjectPanel } from './ProjectPanel';
import { getProjects } from 'core';
import { useAsync } from 'react-async';

function a11yProps(index: number) {
  return {
    id: `project-tab-${index}`,
    'aria-controls': `project-tabpanel-${index}`,
  };
}

export default function ProjectTabs() {
    const [current, setCurrent] = useState(0);
    const { setProject, setContract } = useContractState()
    const {data: projects} = useAsync({
        promiseFn: getProjects
    })

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrent(newValue);
        if(projects){
            setProject(projects[newValue])
            if(newValue !== current)
                setContract(null)
        }
    };

    return projects ? (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={current} onChange={handleChange} aria-label="project tabs" variant="scrollable">
                    {projects.map((proj, i) => (
                        <Tab label={proj.name} {...a11yProps(i)} key={i} />
                    ))}
                </Tabs>
            </Box>
            {projects.map((proj, i) => (
                <ProjectPanel value={current} index={i} key={i}>
                    {proj.name}
                </ProjectPanel>
            ))}
        </Box>
    ) : null;
    // @TODO: project 로딩 중 있어야할지?
}