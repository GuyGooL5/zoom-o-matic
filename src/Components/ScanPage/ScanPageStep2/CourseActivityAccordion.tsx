import { Accordion, AccordionSummary, Typography, CircularProgress, AccordionDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react'
import ErrorContext from '../../../ContextProviders/ErrorContext';
import { ICourseData, LTIFormJSON } from '../../../interfaces';
import MoodleApi from '../../../Services/MoodleApi';
import CourseRadioGroup from './CourseRadioGroup';



interface ICourseActivityAccordionProps {
    course: ICourseData;
    index: number;
    onChange: (index: number, lti: LTIFormJSON) => void;
}
export default function CourseActivityAccordion({ index, course, onChange }: ICourseActivityAccordionProps) {

    const [toolids, setToolids] = useState<string[]>([]);

    const errorCtx = useContext(ErrorContext)

    useEffect(() => {
        MoodleApi.getToolids(course.id)
            .then(_toolids => setToolids(_toolids))
            .catch(errorCtx);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course.id])


    return <Accordion >
        <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography >{course.fullname}</Typography>
            {toolids.length ? null : <CircularProgress size={16} />}
        </AccordionSummary>
        <AccordionDetails>
            {toolids ?
                <CourseRadioGroup index={index} course={course} toolids={toolids as string[]} onChange={onChange} />
                :
                <CircularProgress />
            }
        </AccordionDetails>
    </Accordion>
}
