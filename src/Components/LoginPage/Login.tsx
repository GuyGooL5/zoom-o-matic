import React, { forwardRef, useContext, useState } from 'react';
import { Button, Paper, Checkbox, Container, Grid, IconButton, Link, TextField, Typography } from '@material-ui/core';
import { Edit, Visibility, VisibilityOff } from '@material-ui/icons';
import LocalStorageContext from '../../ContextProviders/LocalStorageContext';
import ErrorContext from '../../ContextProviders/ErrorContext';
import MoodleApi from '../../Services/MoodleApi';


interface ILoginProps {
    url: string;
}
const Login = forwardRef(({ url }: ILoginProps, ref) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [tosChecked, setTosChecked] = useState(false);
    const [creds, setCreds] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false)
    const { localStorage: { moodleUrl }, setLocalStorage, deleteLocalStorage } = useContext(LocalStorageContext)

    const errorCtx = useContext(ErrorContext);

    function login() {
        setLoading(true);
        fetch(`${url}/login/token.php`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json, text/plain, */*' },
            method: 'POST', body: `username=${creds.username}&password=${creds.password}&service=moodle_mobile_app`
        })
            .then(res => res.json()).then(json => {
                if (json.errorcode || !json.token) {
                    setLoading(false);
                    errorCtx(json);
                }
                else {
                    setLocalStorage('token', json.token);
                    MoodleApi.getUser().then(_user => {
                        setLocalStorage('user', _user)
                    });
                }
            })
            .catch((e) => { errorCtx(e); setLoading(false); });
    }

    return <Container innerRef={ref} maxWidth='sm' style={{ marginTop: 16 }}>
        <Grid container spacing={2} direction="row-reverse">
            <Grid item xs={12}>
                <Typography variant="h5">אנא התחבר/י למשתמש המודל שלך</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth variant="filled" label="ID" name="username" required
                    onChange={(e) => setCreds({ ...creds, username: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth variant="filled" label="Password" name="password" type={passwordVisible ? 'text' : 'password'} required
                    onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                    InputProps={{ endAdornment: <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? <Visibility /> : <VisibilityOff />}</IconButton> }}
                />
            </Grid>
            <Grid item xs={12} >
                <Paper variant="outlined" style={{ paddingLeft: 8, paddingRight: 8 }}>
                    <Grid container spacing={1} justify="space-between" alignItems="center" >
                        <Grid item><IconButton color="primary" onClick={() => deleteLocalStorage('moodleUrl')}><Edit /></IconButton></Grid>
                        <Grid item><Typography variant="body1" color="textSecondary"><Link target="_blank" href={moodleUrl as string}>{moodleUrl}</Link> :אתר המודל</Typography></Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item container xs={12} direction="row-reverse" alignItems="center">
                <Typography variant="body2">אני מאשר/ת את <Link target="_blank" href="/license.txt">תנאי השימוש</Link></Typography>
                <Checkbox checked={tosChecked} onClick={() => setTosChecked(!tosChecked)} />
            </Grid>
            <Grid item><Button variant="contained" color="primary" disabled={!tosChecked || loading} onClick={login}>התחבר</Button></Grid>
        </Grid>
    </Container>
})

export default Login;