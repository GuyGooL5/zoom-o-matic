import { CircularProgress, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import useError from '../../hooks/useError';
import { fetchCourses } from '../../utils/moodleRequests';
import { ICourseData } from '../../interfaces';


interface ISelectCourse {
    onSelectCourse: (course: ICourseData) => void;
}

export default function SelectCourse({ onSelectCourse }: ISelectCourse) {

    const [courses, setCourses] = useState<ICourseData[]>([]);

    const { requestError } = useError();

    useEffect(() => {
        if (!courses.length)
            fetchCourses().then(courses => setCourses(courses)).catch(requestError)
    }, [courses, requestError])

    return courses.length ? <>
        <List >
            {courses.map((course,index) =>
                <ListItem key={index} button onClick={() => onSelectCourse(course)}>
                    <ListItemText style={{ textAlign: 'right' }}>{course.fullname}</ListItemText>
                </ListItem>
            )}
        </List >
    </> : <CircularProgress size={64} />
}

