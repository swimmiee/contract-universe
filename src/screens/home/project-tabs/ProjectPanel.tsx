import { Box } from "@mui/material";
import { ContractVerticalTabs } from "./contract-tree";
import { ImplPanel } from "./main-panel";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function ProjectPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`project-tabpanel-${index}`}
            aria-labelledby={`project-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box
                display="flex"
            >
                <ContractVerticalTabs />
                <ImplPanel />
            </Box>
        )}
        </div>
    );
}
  