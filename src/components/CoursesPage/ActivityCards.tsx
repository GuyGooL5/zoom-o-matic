import { CircularProgress, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons';
import React, { useEffect, useMemo, useState } from 'react'
import { deleteToolid } from '../../actions/localStorageActions';
import useError from '../../hooks/useError';
import { LTI } from '../../interfaces';
import { useGlobalStore } from '../../stores/GlobalStore';
import { fetchLti } from '../../utils/moodleRequests';



interface IActivityCardProps {
    toolid: string;
    editMode: boolean;
    onDelete: () => void;
    onSelect: (lti: LTI) => void;
}
function ActivityCard({ toolid, editMode, onSelect, onDelete }: IActivityCardProps) {

    const [lti, setLti] = useState<LTI | null>(null);

    const { requestError } = useError();

    const [, dispatchGlobalStore] = useGlobalStore();

    useEffect(() => {
        fetchLti(toolid).then(setLti).catch(requestError);

    }, [requestError, toolid])


    function handleDelete() {
        deleteToolid(toolid)(dispatchGlobalStore)
        onDelete();
    }

    return <ListItem button>
        {lti ?
            <>
                {editMode ? <ListItemIcon><IconButton onClick={handleDelete}><Delete /></IconButton></ListItemIcon> : null}
                <ListItemText style={{ textAlign: 'right' }} onClick={() => onSelect(lti)}>
                    <Typography variant="h6">{lti.parameters.context_title}</Typography>
                    <Typography variant="body2">{lti.parameters.resource_link_title}</Typography>
                </ListItemText>
            </> :
            <CircularProgress />
        }
    </ListItem >
}


interface IActivityCardsProps {
    editMode: boolean;
    onFinishedEditing: () => void;
    toolids: string[];
    onSelectLti: (lti: LTI) => void;
}

export default function ActivityCards({ editMode, onFinishedEditing, toolids, onSelectLti }: IActivityCardsProps) {

    const cards = useMemo(() => {
        return toolids.length !== 0 ? toolids.map((toolid, index) => <>
            <ActivityCard key={toolid} toolid={toolid} editMode={editMode} onDelete={onFinishedEditing} onSelect={onSelectLti} />
            {index < toolids.length - 1 ? <Divider /> : null}
        </>) : <Grid container direction="row-reverse" alignItems="center">
                <Grid item><Typography variant="h5">רשימת הפעילויות ריקה, להוספה לחץ</Typography></Grid>
                <Grid item><Add /></Grid>
            </Grid>
    }, [editMode, onFinishedEditing, onSelectLti, toolids])


    return <List>{cards}</List>
}