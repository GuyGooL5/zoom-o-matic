/* eslint-disable react-hooks/exhaustive-deps */
import { AppBar, Box, CircularProgress, Tab, Tabs, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import LocalStorageContext from '../ContextProviders/LocalStorageContext'
import { LTIFormJSON } from '../interfaces'
import MoodleRequests from '../Services/MoodleRequests'
import ZoomFrame from './ZoomFrame'

export default function Courses(): JSX.Element {

    const [activeTab, setActiveTab] = useState(0)
    const { toolIds } = useContext(LocalStorageContext);
    const [loading, setLoading] = useState(true)
    const [toolidsArray, updateToolids] = useReducer(
        (state: LTIFormJSON[], addition: LTIFormJSON) => { return [...state, addition] }, []);


    async function updateLTIDataArray() {
        if (toolIds) {
            for (let index in toolIds) {
                let ltiData = await MoodleRequests.getLTI(toolIds[index]);
                updateToolids(ltiData);
            }
            setLoading(false);
        }
    }
    useEffect(() => {
        updateLTIDataArray();
    }, [])


    function handleChange(e: any, v: number) {
        setActiveTab(v);
    }

    return loading ? <Box>< CircularProgress /> <Typography variant="h5">מעדכן רשימה</Typography></Box > :
        <>
            <AppBar position="static">
                <Tabs value={activeTab} onChange={handleChange} style={{ backgroundColor: '#121212' }} indicatorColor="secondary" variant="fullWidth">
                    {toolIds?.map((id, index) => <Tab label={toolidsArray[index].parameters.context_title} value={index} />)}
                </Tabs>
            </AppBar>
            <ZoomFrame lti={toolidsArray[activeTab]} />
        </>
}