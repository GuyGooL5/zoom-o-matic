import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { MouseEventHandler, ReactNode, useContext, useState } from 'react'

interface AlertProps {
    onClose?: () => void;
    content: React.ReactNode;
    title?: string;
    button?: {
        text: string;
        props?: ButtonProps;
    }
}


interface AlertHiddenProps extends AlertProps {
    open: boolean;
    onClose: () => void;
}

const AlertContext = React.createContext((props: AlertProps | null) => { (() => props)() });


const Alert = ({ open, content, title, button, onClose }: AlertHiddenProps) => {

    const customButtonFn: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (button?.props?.onClick) button.props.onClick(e);
        onClose();
    }
    return <Dialog dir="rtl" open={open} onClose={onClose} >
        {title ? <DialogTitle>{title}</DialogTitle> : null}
        <DialogContent>{content}</DialogContent>
        <DialogActions>
            <Button variant="text" color="primary" {...button?.props} onClick={customButtonFn} >{button?.text ?? "אוקיי"}</Button>
        </DialogActions>
    </Dialog>
};

export const useAlert = () => useContext(AlertContext);

export default function AlertContextProvider({ children }: { children?: ReactNode }) {

    const [props, setProps] = useState<AlertProps | null>(null)

    return <AlertContext.Provider value={setProps}>
        {props ? <Alert {...props} open={!!props}
            onClose={() => {
                if (props.onClose) props.onClose();
                setProps(null);
            }}
        /> : null}
        {children}
    </AlertContext.Provider >

}


