import { Button, Container, Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { useState } from 'react'
import { LTI } from '../../interfaces'
import { useGlobalStore } from '../../stores/GlobalStore'
import ScanDialog from '../ScanDialog/'
import ActivityCards from './ActivityCards'
import ZoomDialog from './ZoomDialog'

export default function CoursesPage(): JSX.Element {

    const [lti, setLti] = useState<LTI | null>(null);
    const [editMode, setEditMode] = useState(false);
    const theme = useTheme();
    const scanDialogBreakpoint = useMediaQuery(theme.breakpoints.down("xs"));
    const [zoomDialogOpen, setZoomOpenDialog] = useState(false);
    const [scanDialogOpen, setScanDialogOpen] = useState(false);


    const [{ toolids }] = useGlobalStore();


    function handleCloseZoomDialog() {
        setZoomOpenDialog(false);
    }

    function handleSelectLti(lti: LTI) {
        setZoomOpenDialog(true);
        setLti(lti);
    }

    function handleOpenScanDialog() {
        setEditMode(false);
        setScanDialogOpen(true);
    }

    function handleCloseScanDialog() {
        setScanDialogOpen(false);
    }

    return <>
        <Container maxWidth="md" style={{ marginTop: 16, height: "100vh" }}>
            <Grid container direction="row">
                <Grid item container direction="row-reverse" xs={12} spacing={2} alignItems="center" justify="space-between">
                    <Grid item xs={12} sm={4}><Typography variant="h4" style={{textAlign:scanDialogBreakpoint?"center":"right"}} >דף פעילויות</Typography></Grid>
                    <Grid item xs={12} sm={8} container spacing={2}  >
                        <Grid item><Button startIcon={<Add />} variant="contained" color="secondary" onClick={handleOpenScanDialog}>הוסף פעילות</Button></Grid>
                        {toolids?.length ? <Grid item><Button color="default" onClick={() => setEditMode(last => !last)}>{editMode ? "בטל עריכה" : "עריכה"}</Button></Grid> : null}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {toolids ? <ActivityCards editMode={editMode} onFinishedEditing={() => setEditMode(false)} toolids={toolids} onSelectLti={handleSelectLti} /> : null}
                </Grid>
            </Grid>
        </Container>
        <ZoomDialog open={zoomDialogOpen} lti={lti} onCloseDialog={handleCloseZoomDialog} />
        <ScanDialog fullScreen={scanDialogBreakpoint} open={scanDialogOpen} onClose={handleCloseScanDialog}></ScanDialog>
    </>
}