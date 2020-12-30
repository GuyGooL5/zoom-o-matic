/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import LocalStorageContext from '../../ContextProviders/LocalStorageContext'
import { LTIFormJSON } from '../../interfaces'
import ActivityCard from './ActivityCard'
import ZoomDialog from './ZoomDialog'

export default function CoursesPage(): JSX.Element {

    const [lti, setLti] = useState<LTIFormJSON | null>(null);


    const [openDialog, setOpenDialog] = useState(false)


    const { localStorage: { toolids } } = useContext(LocalStorageContext);


    function handleCloseDialog() {
        setOpenDialog(false);
    }

    function handleSelect(lti: LTIFormJSON) {
        setOpenDialog(true);
        setLti(lti);
    }


    return <Container maxWidth="md" style={{ marginTop: 16 }}>
        <Grid container spacing={2} justify="center">
            {toolids?.map((id, index) =>
                <Grid item xs={12} sm={6} style={{ flexGrow: 1 }}>
                    <ActivityCard key={index} toolid={id} onSelect={handleSelect} />
                </Grid>
            )}
            <ZoomDialog open={openDialog} lti={lti} onCloseDialog={handleCloseDialog} />
        </Grid>
    </Container>
}