import { TreeItemProps } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { ContractTreeItemRoot } from "./ContractTreeItemRoot";

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelInfo?: string;
    labelText: string;
  };

export const ContractTreeItem = ({
    bgColor,
    color,
    labelInfo,
    labelText,
    ...other
  }: StyledTreeItemProps) => {
    return (
      <ContractTreeItemRoot
        label={
          <Box 
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={.7}
          >
            <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
              {labelText}
            </Typography>
            <Typography variant="caption" fontSize={11} color="inherit">
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
  