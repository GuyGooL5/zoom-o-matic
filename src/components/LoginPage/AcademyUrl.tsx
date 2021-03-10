import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { MouseEventHandler, useState } from 'react'
import { join } from 'path'
import { useGlobalStore } from '../../stores/GlobalStore';
import { Axios } from '../../config';
import { setMoodleUrl } from '../../actions/localStorageActions';
import { useAlert } from '../../ContextProviders/AlertContext';

export default function AcademyUrl() {

    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false);
    const [, dispatchGlobalStore] = useGlobalStore();
    const openAlert = useAlert();
    const tryUrl = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            Axios.post(new URL(join(url, '/login/token.php')).toString(), {
                method: 'POST',
            }).then(({ status, data }) => {
                if (status !== 200) resolve(false);
                resolve(!!data?.errorcode);
            }).catch(() => resolve(false))
        })
    }

    const updateURL: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        let tempUrl: URL;
        try {
            tempUrl = (!(url.startsWith('http://') || url.startsWith('https://'))) ?
                new URL(`https://${url}`) :
                new URL(url);

            if (await tryUrl(tempUrl.href)) {
                setMoodleUrl(tempUrl.toString())(dispatchGlobalStore);
            }
            else if (await tryUrl(tempUrl.origin)) {
                setMoodleUrl(tempUrl.toString())(dispatchGlobalStore);
            }
            else throw Error();
        } catch (e) {
            openAlert({ title: "אתר המודל לא נמצא", content: "לא ניתן להתחבר, אנא וודאו שהכתובת תקינה או שהחיבור תקין" })
            setLoading(false);
        }
    }

    return <Container maxWidth="sm" style={{ marginTop: 16 }}>
        <form>
            <Grid container spacing={2} direction="row-reverse">
                <Grid item xs={12}>
                    <Typography variant="h5">אני הכנס/י את כתובת המודל של מוסד הלימודים שלך</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Moodle URL" required variant="filled" value={url} onChange={(e) => setUrl(e.target.value)} />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained" color="primary" disabled={!!loading} onClick={updateURL} >עדכון</Button>
                </Grid>
            </Grid>
        </form>
    </Container>
}
