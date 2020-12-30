import { AppBar, CircularProgress, Dialog, IconButton, Slide, Toolbar, Typography } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { Close } from '@material-ui/icons'
import React, { forwardRef } from 'react'
import { LTIFormJSON } from '../../interfaces'
import ZoomFrame from './ZoomFrame'




const Transition = forwardRef(function Transition(props: TransitionProps, ref: React.Ref<unknown>) {
    return <Slide direction="up" ref={ref} {...props} />
})


interface IZoomDialogProps {
    open: boolean;
    lti: LTIFormJSON | null;
    onCloseDialog: () => void;
}


export default function ZoomDialog({ open, lti, onCloseDialog }: IZoomDialogProps): JSX.Element {

    return <Dialog dir="rtl" open={open} fullScreen TransitionComponent={Transition}>
        {lti ?
            <>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onCloseDialog} ><Close /></IconButton>
                        <Typography variant="h6">{lti.parameters.context_title}</Typography>
                    </Toolbar>
                </AppBar>
                <ZoomFrame lti={lti} />
            </>
            :
            <CircularProgress />
        }
    </Dialog>

}