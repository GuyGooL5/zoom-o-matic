import { CircularProgress, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react'
import { setToolids } from '../../actions/localStorageActions';
import { useSnackbar } from '../../ContextProviders/SnackbarContext';
import useError from '../../hooks/useError';
import { ICourseData, LTI } from '../../interfaces';
import { useGlobalStore } from '../../stores/GlobalStore';
import { fetchLti, fetchToolids } from '../../utils/moodleRequests';


interface IActivityItemProps {
    toolid: string;
    onSelect: (lti: LTI) => void;

}

function ActivityItem({ toolid, onSelect }: IActivityItemProps) {

    const [lti, setLti] = useState<LTI | null>(null)
    const [ready, setReady] = useState(false)
    useEffect(() => {
        fetchLti(toolid).then(setLti).catch().finally(() => setReady(true));
    }, [toolid])

    return <ListItem button disabled={ready && !lti} onClick={() => lti ? onSelect(lti) : null} >
        <ListItemText style={{ textAlign: "right" }} >
            {ready ? lti ? lti.parameters.resource_link_title : "פעילות לא קיימת" : <CircularProgress />}
        </ListItemText>
    </ListItem>

}


interface ActivityList {
    course: ICourseData;
    selectedToolids: string[];
    onFinish: () => void;
}

function ActivitiesList({ onFinish, selectedToolids }: ActivityList) {

    const [{ toolids }, dispatchGlobal] = useGlobalStore();


    const openSnackbar = useSnackbar();


    const handleSelect = useCallback((lti: LTI) => {
        console.log(lti);
        const toolid = lti.parameters.resource_link_id;
        if (toolids?.includes(toolid)) {
            return openSnackbar({ message: "הפעילות כבר קיימת", duration: 5000 }); // TODO: REASSIGN THIS ERROR HANDLING
        }
        setToolids([lti.parameters.resource_link_id, ...toolids ?? []])(dispatchGlobal);
        onFinish();
    }, [dispatchGlobal, onFinish, openSnackbar, toolids]);

    return <List  >
        {selectedToolids.length === 0 ? <Typography>לא נמצאו פעילויות בקורס</Typography> :
            selectedToolids.map((toolid,index) => <ActivityItem key={index} toolid={toolid} onSelect={handleSelect} />)
        }
    </List >

}




interface ISelectActivityProps {
    selectedCourse: ICourseData | null;
    onFinish: () => void;
}

export default function SelectActivity({ onFinish, selectedCourse }: ISelectActivityProps) {

    const [selectToolids, setSelectToolids] = useState<string[]>([]);
    const { requestError } = useError();

    useEffect(() => {
        if (selectedCourse?.id)
            fetchToolids(selectedCourse.id).then(setSelectToolids).catch(requestError);
    }, [requestError, selectedCourse])

    return <List >
        {selectToolids && selectedCourse ?
            <ActivitiesList course={selectedCourse} selectedToolids={selectToolids} onFinish={onFinish} />
            :
            <CircularProgress />
        }
    </List >

}

