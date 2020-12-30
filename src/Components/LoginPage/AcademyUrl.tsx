import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { join } from 'path'
import LocalStorageContext from '../../ContextProviders/LocalStorageContext';

interface IAcademyUrlProps {
}
const AcademyUrl = React.forwardRef((p: IAcademyUrlProps, ref) => {

    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false)
    const { setLocalStorage } = useContext(LocalStorageContext);


    async function updateURL() {
        setLoading(true);
        let tempUrl: URL;
        try {
            if (!(url.startsWith('http://') || url.startsWith('https://'))) tempUrl = new URL(`https://${url}`);
            else tempUrl = new URL(url);

            if (await tryUrl(tempUrl.href)) {
                setLocalStorage('moodleUrl', tempUrl.toString());
            }
            else if (await tryUrl(tempUrl.origin)) {
                setLocalStorage('moodleUrl', tempUrl.toString());
            }
            else setDialogOpen(true);
            setLoading(false);
        } catch (e) {
            setDialogOpen(true);
            setLoading(false);
        }
    }

    function tryUrl(url: string): Promise<boolean> {
        return new Promise((resolve) => {
            fetch(new URL(join(url, '/login/token.php')).toString(), {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cookie": "MoodleSession=oraqbr9sir18ddji5t8sp96b35"
                }
            })
                .then(response => {
                    if (response.status !== 200) resolve(false);
                    return response.json();
                })
                .then(json => { resolve(!!json?.errorcode); })
                .catch(() => resolve(false))
        })
    }

    return <Container maxWidth="sm" style={{ marginTop: 16 }}>
        <Grid innerRef={ref} container spacing={2} direction="row-reverse">
            <Grid item xs={12}>
                <Typography variant="h5">אני הכנס/י את כתובת המודל של מוסד הלימודים שלך</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Moodle URL" required variant="filled" value={url} onChange={(e) => setUrl(e.target.value)} />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" disabled={!!loading} onClick={updateURL} >עדכון</Button>
            </Grid>
        </Grid>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>אירעה שגיאה</DialogTitle>
            <DialogContent>
                <Typography variant="body1">לא ניתן להתחבר, אנא וודאו שהכתובת נכונה</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => setDialogOpen(false)}>אוקיי</Button>
            </DialogActions>
        </Dialog>
    </Container>
})
export default AcademyUrl