import { Menu, MenuItem } from "@mui/material"
import { useContractValue } from "atoms"
import { exportProject } from "core/projects/exportProject"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "routes/route-names"
import { saveAs } from "utils/saveAs"

interface MenuPopupProps {
    open: boolean
    anchorEl: HTMLElement | null
    handleClose: () => void
}

type onClickReturnType = boolean | void
type onClickFuncType = () => (onClickReturnType | Promise<onClickReturnType>)
interface MenuConfigProps {
    title: string
    // if return true, remain menu popup
    onClick: onClickFuncType

}


export const MenuPopup = ({open, anchorEl, handleClose}:MenuPopupProps) => {
    const navigate = useNavigate()


    const { project } = useContractValue()

    const menuConfig = useMemo(() => {
        // default menu
        const menus:MenuConfigProps[] = [
            {
                title: 'Create project',
                onClick: () => navigate(ROUTES.CREATE_PROJECT)
            },
            { 
                title: 'Import project', 
                onClick: () => navigate(ROUTES.IMPORT_PROJECT) 
            },
            
        ]

        // add export menu if project exists
        if(project){
            const onExport = () => exportProject(project.id)
                .then((entity) => {
                    if(!entity)
                        throw Error("Project를 export할 수 없습니다.");
                    saveAs(
                        new Blob(
                            [JSON.stringify(entity, null, 2)], 
                            {type: 'text/plain'}
                        ), 
                        entity.name+'.json'
                    )
                    return false
                })
                .catch((e) => {
                    alert(e.message)
                    return true;    // remain menu popup
                })
            menus.push({ 
                title: `Export Project "${project.name}"`, 
                onClick: onExport
            })
        }
        return menus
    },[project === null])

    const withClose = (func: onClickFuncType) => () => Promise.resolve(func())
            .then((remain) => {
                if(!remain) handleClose()
            })

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {menuConfig.map(({title, onClick}, id) => (
                <MenuItem 
                    key={id}
                    onClick={withClose(onClick)}
                    children={title}
                />
            ))}
        </Menu>
    )
}