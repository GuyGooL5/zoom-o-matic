import { AppBar, Button, CircularProgress, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react'
import LocalStorageContext from '../ContextProviders/LocalStorageContext';
import SnackbarContext from '../ContextProviders/SnackbarContext';
import { core_webservice_get_site_info } from '../interfaces';
import MoodleRequests from '../Services/MoodleRequests';
import Courses from './Courses';
import Login from './Login';



export default function Home(): JSX.Element {

    const { token, setToken } = useContext(LocalStorageContext);
    const [page, setPage] = useState(<CircularProgress size={64} />);
    const [userData, setUserData] = useState<Partial<core_webservice_get_site_info>>({});
    const snackbar = useContext(SnackbarContext);

    const [appbarButton, setAppbarButton] = useState<any>()


    function logout() {
        setToken(null);
        snackbar('התנתקת בהצלחה');
        setAppbarButton(null);
    }


    useEffect(() => {
        if (token !== null && token !== 'null')
            MoodleRequests.getUserInfo().then(data => {
                if (data) {
                    setUserData(data);
                    setPage(<Courses />);
                    setAppbarButton(<Button color="inherit" onClick={logout}>LOGOUT</Button>)
                }
            }).catch(e => {
                if (e.errorcode === 'invalidtoken') {
                    snackbar('תם תוקף הטוקן, יש להתחבר שוב ', { duration: 5000 });
                    setPage(<Login />)
                }
            })
        else {
            setPage(<Login />)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return <div style={{ width: '100%', height: '100vh', position: 'fixed', display: 'flex', flexDirection: "column", justifyContent: 'stretch', alignContent: 'stretch' }}>
        <AppBar position="fixed" >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}  >
                    Zoom-o-matic!
            </Typography>
                {userData.fullname ? <Typography variant="body1" style={{ marginRight: 16 }}>{`היי ${userData.fullname}`}</Typography> : null}
                {appbarButton}
            </Toolbar>
        </AppBar>
        <Toolbar />
        <div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', flexGrow: 1 }}>
            {page}
        </div>
    </div >
}