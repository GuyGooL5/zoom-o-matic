import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import React, { ReactNode, useState } from 'react'

type FnSnackbarContext = (msg: string, opts?: {
    duration?: number;
    anchorOrigin?: SnackbarOrigin;

}) => void;

const tmpFn: FnSnackbarContext = (msg, opts) => { };

const SnackbarContext = React.createContext(tmpFn);
export default SnackbarContext;


export function SnackbarContextProvider({ children }: { children?: ReactNode }) {
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState("");
    const [anchorOrigin, setAnchorOrigin] = useState<SnackbarOrigin>({ vertical: 'bottom', horizontal: 'center' })
    const [duration, setDuration] = useState(2000)

    function handleClose() {
        setOpen(false);
    }

    const popSnacbar: FnSnackbarContext = (_msg, opts) => {
        setMsg(_msg);
        setOpen(true);
        if (opts?.duration) setDuration(opts.duration);
        if (opts?.anchorOrigin) setAnchorOrigin(opts.anchorOrigin);
    }

    return <SnackbarContext.Provider value={popSnacbar}>
        {children}
        <Snackbar dir="rtl" anchorOrigin={anchorOrigin} message={msg} open={open} autoHideDuration={duration} onClose={handleClose} />
    </SnackbarContext.Provider>

}