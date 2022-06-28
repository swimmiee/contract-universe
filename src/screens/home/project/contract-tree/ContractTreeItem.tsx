import { TreeItemProps } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { ContractTreeItemRoot } from "./ContractTreeItemRoot";

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelInfo?: string;
    labelText: string;
  };

export const ContractTreeItem = (props: StyledTreeItemProps) => {
    const {
      bgColor,
      color,
      labelInfo,
      labelText,
      ...other
    } = props;
  
    return (
      <ContractTreeItemRoot
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.8, pr: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor
        }}
        {...other}
      />
    );
  }
  