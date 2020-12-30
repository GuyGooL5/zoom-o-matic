import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Grid, Button, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { ICourseData } from '../../../interfaces';




interface ICourseListItemProps {
    index: number;
    course: ICourseData;
    checked: boolean;
    onToggle: (index: number) => void;
}
function CourseListItem({ index, course, checked, onToggle }: ICourseListItemProps) {

    return <ListItem button onClick={() => onToggle(index)}>
        <ListItemText dir="rtl" >{course.fullname}</ListItemText>
        <ListItemIcon>
            <Checkbox edge="start" checked={checked} />
        </ListItemIcon>
    </ListItem>
}


interface ICoursesSelectListProps {
    courses: ICourseData[];
    onChange: (arr: boolean[]) => void;
    onEmptyChange: (state: boolean) => void;
}
export default function CoursesSelectList({ courses, onChange, onEmptyChange }: ICoursesSelectListProps) {


    const [selected, setSelected] = useState(0)
    const [checked, setChecked] = useState(new Array(courses.length).fill(false));

    function handleToggle(index: number) {
        let lastChecked = [...checked];
        lastChecked[index] = !lastChecked[index];
        setSelected(selected + (lastChecked[index] ? 1 : -1));
        setChecked(lastChecked);
        onEmptyChange(!(selected + (lastChecked[index] ? 1 : -1)));
        onChange(lastChecked);
    }
    function selectAll() {
        if (selected === courses.length) setChecked(new Array(courses.length).fill(false));
        else setChecked(new Array(courses.length).fill(true));
        setSelected(selected === courses.length ? 0 : courses.length);
        onEmptyChange(!!(selected === courses.length));
    }

    return <Grid container justify="space-between" alignItems="center">
        <Grid item >
            <Typography variant="body1">נבחרו {selected} קורסים</Typography>
        </Grid>
        <Grid item>
            <Button onClick={selectAll}>{selected === courses.length ? 'בטל הכל' : 'סמן הכל'}
                <Checkbox indeterminate={!!(selected && selected !== courses.length)} checked={selected === courses.length} disableRipple />
            </Button>
        </Grid>
        <Grid item xs={12}>
            <List >
                {courses.map((course, index) =>
                    <CourseListItem key={index} index={index} course={course} onToggle={handleToggle} checked={!!checked[index]} />
                )}
            </List >
        </Grid>
    </Grid>

}