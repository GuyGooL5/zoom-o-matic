import { Button, Container, Divider, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { IScanPageStepperProps } from '..';
import LocalStorageContext from '../../../ContextProviders/LocalStorageContext';
import { LTIFormJSON } from '../../../interfaces';

interface IScanPageStep3Props {
    activities: LTIFormJSON[]
}
export default function ScanPageStep3({ activities, onPaging }: IScanPageStep3Props & IScanPageStepperProps) {

    const [activityComponents, setActivityComponents] = useState<ReactNode>(null)

    const { setLocalStorage } = useContext(LocalStorageContext);

    useEffect(() => {
        setActivityComponents(<List >
            {activities.map(activity => <>
                <ListItem>
                    <ListItemText primary={activity.parameters.context_title} secondary={activity.parameters.resource_link_title} />
                </ListItem >
                < Divider light />
            </>
            )}
        </List >
        )
    }, [activities])


    function handleFinish() {
        setLocalStorage('toolids', [...activities.map(e => e.parameters.resource_link_id)]);
    }

    return <Container maxWidth="md">
        <Grid container spacing={2} justify="space-between">
            <Grid item xs={12}>
                <Typography variant="h5">נבחרו הפעיליות הבאות</Typography>
            </Grid>
            <Grid item xs={12}>
                {activityComponents}
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={handleFinish} >סיים</Button>
            </Grid>
            <Grid item>
                <Button onClick={() => onPaging('back')}>הקודם</Button>
            </Grid>
        </Grid>
    </Container >
}