import { Card, CardActionArea, CardContent, CircularProgress, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import ErrorContext from '../../ContextProviders/ErrorContext';
import { LTIFormJSON } from '../../interfaces';
import MoodleApi from '../../Services/MoodleApi';



interface IActivityCardProps {
    toolid: string;
    onSelect: (lti: LTIFormJSON) => void;
}
export default function ActivityCard({ toolid, onSelect }: IActivityCardProps) {

    const [lti, setLti] = useState<LTIFormJSON | null>(null);
    const errorCtx = useContext(ErrorContext);

    useEffect(() => {
        MoodleApi.getLti(toolid).then(setLti).catch(errorCtx)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return lti ?
        <Card >
            <CardActionArea onClick={() => onSelect(lti)}>
                <CardContent style={{ height: 128, alignContent: 'center' }} >
                    <Typography variant="h6">{lti.parameters.context_title}</Typography>
                    <Typography variant="body2">{lti.parameters.resource_link_title}</Typography>
                </CardContent>
            </CardActionArea>
        </Card >
        :
        <CircularProgress />
}