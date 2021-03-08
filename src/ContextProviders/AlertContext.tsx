import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { MouseEventHandler, ReactNode, useContext, useEffect, useState } from 'react'

interface IAlertProps {
    content: React.ReactNode;
    title?: string;
    dismissText?: string;
    customButtonProps?: ButtonProps;
    customDismissFn?: MouseEventHandler<HTMLButtonElement>;
}


interface IAlertPropsExtended extends IAlertProps {
    open: boolean;
    onClose: () => void;
}

const AlertContext = React.createContext((el: ReactNode) => { });


const Alert = ({ open, onClose, content, title, dismissText, customButtonProps, customDismissFn }: IAlertPropsExtended) => {

    return <Dialog dir="rtl" open={open} onClose={onClose} >
        {title ? <DialogTitle>{title}</DialogTitle> : null}
        <DialogContent>{content}</DialogContent>
        <DialogActions>
            <Button variant="text" color="primary" onClick={customDismissFn ?? onClose} {...customButtonProps}>{dismissText ?? "אוקיי"}</Button>
        </DialogActions>
    </Dialog>
};

export const useAlert = () => {

    const [props, setProps] = useState<IAlertProps | null>(null)

    const setAlert = useContext(AlertContext);

    const openAlert = (props: IAlertProps) => {
        setProps(props);
    }

    useEffect(() => {
        setAlert(props ? <Alert open={!!props} onClose={() => setProps(null)} {...props} /> : null);
    }, [props, setAlert])

    return { openAlert }
}

export default function AlertContextProvider({ children }: { children?: ReactNode }) {

    const [alert, setAlert] = useState<ReactNode>(<></>)

    return <AlertContext.Provider value={setAlert}>
        {alert}
        {children}
    </AlertContext.Provider >

}


