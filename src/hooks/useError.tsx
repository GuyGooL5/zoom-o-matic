import { setUser, setToken } from '../actions/localStorageActions';
import { useGlobalStore } from '../stores/GlobalStore';
import { useSnackbar } from '../ContextProviders/SnackbarContext';
import { useCallback } from 'react';


type ErrorCode = "invalidtoken" | "invalidlogin";


const useError = () => {

    const openSnackbar = useSnackbar();
    const [, dispatchLocalStorage] = useGlobalStore();

    const requestError = useCallback((e: { errorcode: ErrorCode, error: string }) => {
        switch (e.errorcode) {
            case "invalidtoken":
                openSnackbar({ message: "טוקן החיבור לא תקין, אנא התחברו מחדש.", duration: 5000 });
                setUser(null)(dispatchLocalStorage);
                setToken(null)(dispatchLocalStorage);
                break;
            case "invalidlogin":
                openSnackbar({ message: e.error });
                break;
            default:
                openSnackbar({ message: JSON.stringify(e) });
        }
    }, [dispatchLocalStorage, openSnackbar]);

    return { requestError };
}


export default useError;