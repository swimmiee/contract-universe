import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ContractTreeItem } from './ContractTreeItem';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes';
import { useContractState } from 'atoms';
import { Async, useAsync } from 'react-async';
import { Contract, getContracts } from 'core';
import { ContractTab } from './ContractTab';
import { useCallback, useEffect } from 'react';

const colors = [
  "#1a73e8",
  "#e3742f",
  "#a250f5",
  "#3c8039",
]

export function ContractVerticalTabs() {
  const { project } = useContractState()
  const loadContracts = async () => {
    if(!project?.id)
      return []
    const contracts = await getContracts(project.id)
    return contracts
  }

  const navigate = useNavigate()
  const toCreateContract = useCallback(() => {
    if(project?.id)
      navigate(generatePath(
        ROUTES.CREATE_CONTRACT,
        { projectId: project.id }
      ))
  },[project?.id])

  return (
    <TreeView
      aria-label="contract"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      sx={{ height: "100%", flexGrow: 1, maxWidth: 160, overflowY: 'auto' }}
    >
      <Async promiseFn={loadContracts}>
        {({data:constracts, isLoading}) => {
          if(isLoading)
            return "Loading..."
          else if(constracts){
            return (
              constracts.map(a => (
                <ContractTab 
                  key={a.id}
                  contract={a}
                />
              ))
            )
          }
        }}
      </Async>
      <ContractTreeItem 
        nodeId='-1'
        labelText='Add Contract'
        onClick={toCreateContract}
      />
    </TreeView>
  );
}
