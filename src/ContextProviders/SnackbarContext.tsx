import { Button, Snackbar, SnackbarOrigin, SnackbarProps } from '@material-ui/core';
import React, { MouseEventHandler, ReactNode, useContext, useEffect, useState } from 'react'



interface ISnackbarProps extends SnackbarProps {
    persist?: boolean // if true clickaway won't dismiss the snackbar, only timeout.
    duration?: number; //in milliseconds
    anchorOrigin?: SnackbarOrigin;
    backgroundColor?: string;
    textColor?: string;
    button?: { text: string, eventHandler?: MouseEventHandler<HTMLButtonElement>, color?: string; }
}



function MessageSnackBar({ open, onClose, persist, message, backgroundColor, textColor: color, duration, button, ...props }: ISnackbarProps) {


    const handleClose: SnackbarProps["onClose"] = (e, r) => {
        if (persist && r === "clickaway") return;
        if (onClose) onClose(e, r);
    }

    const buttonCloseFn: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (button?.eventHandler) button?.eventHandler(e);
        handleClose(e, "timeout");
    };


    const action = button ?
        <Button style={{ color: button.color ?? "pink", marginRight: "auto", marginLeft: -8, paddingRight: -16 }}
            onClick={buttonCloseFn}>{button.text}</Button> : null
    return <Snackbar dir="rtl" open={open} message={message} action={action} onClose={handleClose} autoHideDuration={duration}
        {...props} style={{ backgroundColor, color }}
    />
}

const SnackbarContext = React.createContext((props: ISnackbarProps) => { (() => props)(); });

export const useSnackbar = () => useContext(SnackbarContext);

export default function SnackbarContextProvider({ children }: { children?: ReactNode }) {
    const [open, setOpen] = useState(false)
    const [props, setProps] = useState<SnackbarProps | null>(null);

    useEffect(() => props ? setOpen(true) : setOpen(false), [props])

    const handleClose = () => {
        setOpen(false);
        setProps(null);
    }

    return <SnackbarContext.Provider value={setProps}>
        {children}
        {props ? <MessageSnackBar key={+new Date()} {...props} open={open} onClose={handleClose} /> : null}
    </SnackbarContext.Provider>

}


