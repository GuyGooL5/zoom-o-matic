import React, { useState } from 'react'

import { Container } from '@material-ui/core'
import { ICourseData, LTIFormJSON } from '../../interfaces'
import ScanPageStepper from './ScanPageStepper'
import ScanPageStep2 from './ScanPageStep2'
import ScanPageStep1 from './ScanPageStep1'
import ScanPageStep3 from './ScanPageStep3'


export interface IScanPageStepperProps {
    onPaging: (action: "next" | "back") => void;
}

export default function ScanPage() {

    const [step, setStep] = useState(0)
    const [courses, setCourses] = useState<ICourseData[]>([]);
    const [selectedActivites, setSelectedActivites] = useState<LTIFormJSON[]>([])

    function handlePaging(action: "next" | "back") {
        switch (action) {
            case "next":
                setStep(step + 1);
                break;
            case "back":
                setStep(step - 1);
                break;
        }
    }

    const steps = [
        <ScanPageStep1 courses={courses} onSetCourses={setCourses} onPaging={handlePaging} />,
        <ScanPageStep2 courses={courses} activities={selectedActivites} onSetSelectedActivities={setSelectedActivites} onPaging={handlePaging} />,
        <ScanPageStep3 activities={selectedActivites} onPaging={handlePaging} />
    ]

    return <Container maxWidth="md">
        <ScanPageStepper activeStep={step} />
        {steps[step]}
    </Container>
}