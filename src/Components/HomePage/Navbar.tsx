import React, { useContext, useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import LocalStorageContext from '../../ContextProviders/LocalStorageContext'
import { Menu } from '@material-ui/icons';
import NavbarDrawer from './NavbarDrawer';

interface INavbarProps {
}
export default function Navbar(p: INavbarProps) {

    const { localStorage: { user } } = useContext(LocalStorageContext);
    const [open, setOpen] = useState(false);
    return <>
        <AppBar position="fixed" >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}><Menu /></IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>Zoom-o-matic!</Typography>
                {user && user.fullname ? <Typography variant="body1" style={{ marginRight: 16 }}>{`היי ${user.fullname}`}</Typography> : null}
            </Toolbar>
        </AppBar>
        <Toolbar />
        <NavbarDrawer open={open} onClose={() => setOpen(false)} />
    </>
}