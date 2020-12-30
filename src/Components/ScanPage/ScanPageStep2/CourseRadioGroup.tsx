import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import ErrorContext from '../../../ContextProviders/ErrorContext';
import { ICourseData, LTIFormJSON } from '../../../interfaces';
import MoodleApi from '../../../Services/MoodleApi';


interface ICourseRadioGroupProps {
    course: ICourseData;
    index: number;
    toolids: string[];
    onChange: (index: number, lti: LTIFormJSON) => void;
}

export default function CourseRadioGroup({ index, course, toolids, onChange }: ICourseRadioGroupProps) {

    const [value, setValue] = useState("");
    const [ltiArray, setLtiArray] = useState<LTIFormJSON[]>([])

    const errorCtx = useContext(ErrorContext);
    useEffect(() => {
        (async () => {
            const arr: LTIFormJSON[] = [];

            for (let toolid of toolids) try {
                let lti = await MoodleApi.getLti(toolid);
                arr.push(lti);
            } catch (e) { errorCtx(e) }
            setLtiArray(arr);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toolids])

    useEffect(() => {
        if (ltiArray[0]?.parameters) {
            handleChange(ltiArray[0]);
        }

    }, [ltiArray])

    function handleChange(lti: LTIFormJSON) {
        setValue(lti.parameters.resource_link_id);
        onChange(index, lti);
    }

    return <FormControl >
        <RadioGroup name={course.id.toString()} value={value} >
            {ltiArray.map((lti, i) =>
                <FormControlLabel key={i} value={lti.parameters.resource_link_id} control={< Radio />}
                    label={lti.parameters.resource_link_title} onClick={() => handleChange(lti)} />
            )}
        </RadioGroup>
    </FormControl>

}


