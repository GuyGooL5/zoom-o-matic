import React, { useContext, useState } from 'react';
import { Button, Checkbox, Container, Grid, IconButton, Link, TextField, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import MoodleRequests from '../Services/MoodleRequests';
import LocalStorageContext from '../ContextProviders/LocalStorageContext';
import SnackbarContext from '../ContextProviders/SnackbarContext';

export default function Login(): JSX.Element {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [tosChecked, setTosChecked] = useState(false);
    const [creds, setCreds] = useState({ username: "", password: "" });
    const { setToken } = useContext(LocalStorageContext)
    const snackbar = useContext(SnackbarContext);

    function login() {
        MoodleRequests.getToken(creds.username, creds.password).then(token => {
            if (setToken) setToken(token);
        }).catch((e) => {
            console.log(e);
            snackbar(e.error);
        })
    }

    return <Container maxWidth='sm' style={{ margin: 8 }}>
        <Grid container spacing={2} direction="row">
            <Grid item xs={12}>
                <TextField fullWidth variant="filled" label="Moodle ID" name="username" required
                    onChange={(e) => setCreds({ ...creds, username: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth variant="filled" label="Password" name="password" type={passwordVisible ? 'text' : 'password'} required
                    onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                    InputProps={{ endAdornment: <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? <Visibility /> : <VisibilityOff />}</IconButton> }}
                />
            </Grid>
            <Grid item container xs={12} direction="row" alignItems="center"><Checkbox checked={tosChecked} onClick={() => setTosChecked(!tosChecked)} />
                <Typography variant="body2">אני מאשר את <Link href="about:blank">תנאי התקנון</Link>
                </Typography>
            </Grid>
            <Grid item><Button variant="contained" color="primary" disabled={!tosChecked} onClick={login}>התחבר</Button></Grid>
        </Grid>
    </Container>


}