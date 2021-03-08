import { setUser, setToken, setMoodleUrl } from '../actions/localStorageActions';
import { useGlobalStore } from '../stores/GlobalStore';
import { useSnackbar } from '../ContextProviders/SnackbarContext';
import { useCallback } from 'react';
import { useAlert } from '../ContextProviders/AlertContext';
import { Typography } from '@material-ui/core';


type ErrorCode = "invalidtoken" | "invalidlogin" | "invalidtoolid";



const useError = () => {

    const openSnackbar = useSnackbar();
    const openAlert = useAlert()
    const [, dispatchGlobalStore] = useGlobalStore();

    const onInvalidToken = useCallback(() => {
        openAlert({
            title: "שגיאת חיבור",
            content: <Typography>טוקן החיבור לא תקין או פג תוקף, אנא התחבר/י מחדש.</Typography>, button: { text: "התחברות" }, onClose: () => {
                setMoodleUrl("https://md.hit.ac.il")(dispatchGlobalStore);
                setUser(null)(dispatchGlobalStore);
                setToken(null)(dispatchGlobalStore);
            }
        })
    }, [openAlert, dispatchGlobalStore]);





    const requestError = useCallback((errorcode?: ErrorCode) => {
        switch (errorcode) {
            case "invalidtoken":
                onInvalidToken();
                break;
            case "invalidtoolid":
                openSnackbar({ message: "אחת או יותר מהפעילויות לא קיימות אז הן נמחקו", button: { text: "הבנתי" }, persist: true, duration: 7000 });
                break;
            default:
                openSnackbar({ message: "אירעה שגיאה" });
        }
    }, [onInvalidToken, openSnackbar]);

    return { requestError };
}


export default useError;