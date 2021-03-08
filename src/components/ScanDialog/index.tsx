import React, { useState } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Typography, useTheme } from '@material-ui/core'
import SelectCourse from './SelectCourse'
import SelectActivity from './SelectActivity'
import { ICourseData } from '../../interfaces'


interface IScanDialogProps extends DialogProps {
    onClose: () => void;
}

const ScanDialog = ({ onClose, ...props }: IScanDialogProps) => {

    const [step, setStep] = useState(0)
    const [title, setTitle] = useState("אנא בחר/י קורס");
    const [selectedCourse, setSelectedCourse] = useState<ICourseData | null>(null)
    const theme = useTheme();

    function cleanup() {
        setTitle("אנא בחר/י קורס")
        setStep(0);
        setSelectedCourse(null);
    }

    function handleSelectCourse(course: ICourseData) {
        setSelectedCourse(course);
        setStep(1);
        setTitle(`אנא בחר/י פעילות בקורס ${course.fullname ?? ""}`)

    }

    const steps = [
        <SelectCourse onSelectCourse={handleSelectCourse} />,
        <SelectActivity selectedCourse={selectedCourse} onFinish={onClose} />,
    ]



    return <Dialog dir="rtl" onExited={cleanup} maxWidth="md" onClose={onClose}  {...props}>
        <DialogTitle><Typography variant="h5">{title}</Typography></DialogTitle>
        <DialogContent style={{ maxWidth: theme.breakpoints.width("sm") }}>
            {steps[step]}
        </DialogContent>
        <DialogActions dir="rtl">
            <Button variant="outlined" style={{ color: 'red' }} onClick={onClose} >ביטול</Button>
        </DialogActions>
    </ Dialog>
}

export default ScanDialog;