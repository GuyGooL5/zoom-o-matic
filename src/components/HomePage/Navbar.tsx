import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons';
import NavbarDrawer from './NavbarDrawer';
import { useGlobalStore } from '../../stores/GlobalStore';

export default function Navbar() {

    const [{ user }] = useGlobalStore();
    const [open, setOpen] = useState(false);
    return <>
        <AppBar position="fixed" >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}><Menu /></IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>Zoom-o-matic!</Typography>
                {user?.fullname ? <Typography variant="body1" style={{ marginRight: 16 }}>{`היי ${user.fullname}`}</Typography> : null}
            </Toolbar>
        </AppBar>
        <Toolbar />
        <NavbarDrawer open={open} onClose={() => setOpen(false)} />
    </>
}