import { Paper, Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'


interface IScanPageStepperProps {
    activeStep: number
}
export default function ScanPageStepper({ activeStep }: IScanPageStepperProps) {


    const steps = [
        'בחירת קורסים',
        'בחירת פעילויות',
        'סיום'
    ];
    return <Paper elevation={2} style={{ margin: 8 }}>
        <Stepper dir="rtl" activeStep={activeStep}>
            {steps.map((step, index) =>
                <Step key={index}>
                    <StepLabel>{step}</StepLabel>
                </Step>
            )}
        </Stepper>
    </Paper >
}