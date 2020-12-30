import React, { ReactNode, useContext, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { Close, Info, ViewList } from '@material-ui/icons'
import LocalStorageContext from '../../ContextProviders/LocalStorageContext'
import SnackbarContext from '../../ContextProviders/SnackbarContext'


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

    const { deleteLocalStorage } = useContext(LocalStorageContext)
    const snackbar = useContext(SnackbarContext)

    const [infoDialogOpen, setInfoDialogOpen] = useState(false)

    function logout() {
        deleteLocalStorage("all");
        snackbar('התנתקת בהצלחה', { duration: 5000 });
        onClose();
    }

    function scan() {
        deleteLocalStorage('toolids');
        onClose();

    }

    return <>
        <Drawer anchor="left" open={open} onClose={onClose} PaperProps={{ style: { width: 256 } }}>
            <List>
                <DrawerListItem icon={<ViewList />} label="סריקת קורסים" onClick={scan} />
                <Divider />
                <DrawerListItem icon={<Info />} label="אודות" onClick={() => setInfoDialogOpen(true)} />
                <DrawerListItem icon={<Close />} label="התנתקות" onClick={logout} />
            </List>
        </Drawer>
        <Dialog dir="rtl" fullWidth open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)}>
            <DialogTitle>אודות</DialogTitle>
            <DialogContent>
                <Typography>
                    אתר זה הוא פרוייקט בשלבים ראשוניים כדי להקל על חיי הסטודנטים בעידן הזום והמודל.
                    נבנה ע"י גיא ציציאשוילי.
                    <br />
                    <Link href="https://github.com/GuyGooL5/zoom-o-matic">קישור לפרויקט בגיט</Link>
                    <br />
                    <Link href="/license.txt">תנאי השימוש</Link>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary">סגור</Button>
            </DialogActions>
        </Dialog>
    </>
}