import React, { ReactNode } from 'react'
import { Drawer, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { Close, Info } from '@material-ui/icons'
import { useSnackbar } from '../../ContextProviders/SnackbarContext'
import { useGlobalStore } from '../../stores/GlobalStore'
import { clearLocalStorage } from '../../actions/localStorageActions'
import { useAlert } from '../../ContextProviders/AlertContext'


interface IDrawerListItemProps {
    icon: ReactNode;
    label: string;
    onClick: () => void;
}
function DrawerListItem({ icon, label, onClick }: IDrawerListItemProps) {
    return <ListItem button onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
    </ListItem>
}


interface INavbarDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function NavbarDrawer({ open, onClose }: INavbarDrawerProps) {

    const [, dispatchLocalStorage] = useGlobalStore();
    const openSnackbar = useSnackbar();
    const { openAlert } = useAlert()

    function invokeDialog() {
        openAlert({
            title: "אודות",
            content:
                <Typography>
                    אתר זה הוא פרוייקט בשלבים ראשוניים כדי להקל על חיי הסטודנטים בעידן הזום והמודל.
                        נבנה ע"י גיא ציציאשוילי.<br />
                    <Link target="_blank" href="https://github.com/GuyGooL5/zoom-o-matic">קישור לפרויקט בגיט</Link><br />
                    <Link href="/license.txt">תנאי השימוש</Link>
                </Typography>,
            dismissText: "סגור"
        })
    }

    function logout() {
        clearLocalStorage()(dispatchLocalStorage);
        openSnackbar({ message: "התנתקת בהצלחה", duration: 5000 });
        onClose();
    }

    return <>
        <Drawer anchor="left" open={open} onClose={onClose} PaperProps={{ style: { width: 256 } }}>
            <List>
                <DrawerListItem icon={<Info />} label="אודות" onClick={invokeDialog} />
                <DrawerListItem icon={<Close />} label="התנתקות" onClick={logout} />
            </List>
        </Drawer>
    </>
}