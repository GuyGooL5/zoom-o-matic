import { Button, Container, Grid, Typography, CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { IScanPageStepperProps } from '..';
import ErrorContext from '../../../ContextProviders/ErrorContext';
import LocalStorageContext from '../../../ContextProviders/LocalStorageContext';
import { ICourseData } from '../../../interfaces';
import MoodleApi from '../../../Services/MoodleApi';
import CoursesSelectList from './CoursesSelectList';




interface ICoursesListProps {
    courses: ICourseData[];
    onSetCourses: (c: ICourseData[]) => void;
}

export default function ScanPageStep1({ courses, onSetCourses, onPaging }: ICoursesListProps & IScanPageStepperProps) {

    const [checked, setChecked] = useState(new Array(courses.length).fill(false));
    const [isEmpty, setIsEmpty] = useState(true)
    const { localStorage: { user } } = useContext(LocalStorageContext)
    const errorCtx = useContext(ErrorContext);

    useEffect(() => {
        MoodleApi.getCourses()
            .then(_courses => onSetCourses(_courses))
            .catch(errorCtx);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])


    function handleSelectedCourses() {
        let selCourses = courses.filter((c, i) => checked[i]);
        onSetCourses(selCourses);
        onPaging('next');
    }

    return <Container maxWidth="sm">
        {courses.length ? <>
            <Grid container spacing={2} style={{ margin: 16 }} alignItems="center" >
                <Grid item xs={12}>
                    <Typography variant="h5">אנא סמנ/י את הקורסים שאחריהם ברצונך לעקוב</Typography></Grid>
                <Grid item xs={12}>
                    <CoursesSelectList onChange={setChecked} onEmptyChange={setIsEmpty} courses={courses} />
                </Grid>
                <Grid item ><Button onClick={handleSelectedCourses} variant="contained" color="primary" disabled={isEmpty} >הבא</Button></Grid>
            </Grid>

        </> : <CircularProgress size={64} />
        }
    </Container >

}

