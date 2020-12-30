import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react'
import { IScanPageStepperProps } from '..';
import { ICourseData, LTIFormJSON } from '../../../interfaces'
import CourseActivityAccordion from './CourseActivityAccordion';





interface ICoursesListProps {
    courses: ICourseData[];
    activities: LTIFormJSON[];
    onSetSelectedActivities: (activities: LTIFormJSON[]) => void;
}



export default function ScanPageStep2({ courses, activities, onSetSelectedActivities, onPaging }: ICoursesListProps & IScanPageStepperProps) {


    function handleCourseChange(index: number, lti: LTIFormJSON) {
        let newActivities = [...activities];
        newActivities[index] = lti;
        onSetSelectedActivities(newActivities);
    }

    return <Container dir="rtl" maxWidth="md">
        <Grid container justify="space-between" spacing={2} >
            <Grid item xs={12}>
                <Typography variant="h5" style={{ marginBottom: 8 }}>בחר פעילות בכל קורס</Typography>
            </Grid>
            <Grid item xs={12}>
                {courses.map((course, index) => <CourseActivityAccordion key={index} index={index} course={course} onChange={handleCourseChange} />)}
            </Grid>
            <Grid item><Button onClick={() => onPaging('back')}>חזור</Button></Grid>
            <Grid item><Button variant="contained" color="primary" onClick={() => onPaging('next')}>הבא</Button></Grid>
        </Grid>
    </Container >
}

