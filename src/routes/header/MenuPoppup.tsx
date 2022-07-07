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

interface MenuConfigProps {
    title: string
    onClick: () => void
}


export const MenuPopup = ({open, anchorEl, handleClose}:MenuPopupProps) => {
    const navigate = useNavigate()


    const { project } = useContractValue()

    const menuConfig = useMemo(() => {
        const menus:MenuConfigProps[] = [
            { 
                title: "Import project", 
                onClick: () => {
                    navigate(ROUTES.IMPORT_PROJECT) 
                    handleClose()
                }
            }
        ]

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
                })
                .catch((e) => alert(e.message))
            menus.push({ 
                title: `Export Project "${project.name}"`, 
                onClick: onExport
            })
        }
        return menus
    },[])

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
                    onClick={onClick}
                    children={title}
                />
            ))}
        </Menu>
    )
}