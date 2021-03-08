import React, { forwardRef, useEffect, useState } from 'react';
import { Button, Paper, Checkbox, Container, Grid, IconButton, Link, TextField, Typography, CircularProgress } from '@material-ui/core';
import { Edit, Visibility, VisibilityOff } from '@material-ui/icons';
import useError from '../../hooks/useError';
import { Axios } from '../../config';
import { useGlobalStore } from '../../stores/GlobalStore';
import { fetchUser } from '../../utils/moodleRequests';
import { setMoodleUrl, setToken, setUser } from '../../actions/localStorageActions';

interface ILoginProps {
    url: string;
}
const Login = forwardRef(({ url }: ILoginProps, ref) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [tosChecked, setTosChecked] = useState(false);
    const [creds, setCreds] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false)
    const [{ token, moodleUrl }, dispatchGlobalStore] = useGlobalStore();

    const { requestError } = useError();

    useEffect(() => {
        if (token) fetchUser().then(user => setUser(user)(dispatchGlobalStore));
    }, [dispatchGlobalStore, token])

    function login() {
        setLoading(true);

        Axios.post(`${url}/login/token.php`, `username=${creds.username}&password=${creds.password}&service=moodle_mobile_app`
        ).then(({ data }) => {
            if (data.errorcode || !data.token) {
                requestError(data);
            }
            else setToken(data.token)(dispatchGlobalStore);
        }).catch((e) => { requestError(e); }).finally(() => setLoading(false));
    }

    return <Container innerRef={ref} maxWidth='sm' style={{ marginTop: 16 }}>
        <form>

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
                            <Grid item><IconButton color="primary" onClick={() => setMoodleUrl(null)(dispatchGlobalStore)}><Edit /></IconButton></Grid>
                            <Grid item><Typography variant="body1" color="textSecondary"><Link target="_blank" href={moodleUrl as string}>{moodleUrl}</Link> :אתר המודל</Typography></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item container xs={12} direction="row-reverse" alignItems="center">
                    <Typography variant="body2">אני מאשר/ת את <Link target="_blank" href="/license.txt">תנאי השימוש</Link></Typography>
                    <Checkbox checked={tosChecked} onClick={() => setTosChecked(!tosChecked)} />
                </Grid>
                <Grid item><Button type="submit" variant="contained" color="primary" onClick={login}
                    disabled={!tosChecked || loading} startIcon={loading ? <CircularProgress size={24} /> : null}>כניסה</Button></Grid>
            </Grid>
        </form>
    </Container>
})

export default Login;