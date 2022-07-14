import { MenuOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { MenuPopup } from "./MenuPopup";

export const Menu = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuOutlined />
            </IconButton>
            <MenuPopup 
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
            />
        </>
    )
}