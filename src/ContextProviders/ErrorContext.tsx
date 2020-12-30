import React, { createContext, ReactNode, useContext } from 'react'
import LocalStorageContext from './LocalStorageContext';
import SnackbarContext from './SnackbarContext';



const ErrorContext = createContext({} as (error: any) => void);

export default ErrorContext;




type ErrorCode = "invalidtoken" | "invalidlogin";

export function ErrorContextProvider({ children }: { children?: ReactNode }) {

    const snackbar = useContext(SnackbarContext);
    const { deleteLocalStorage } = useContext(LocalStorageContext)

    function errorCode(e: { errorcode: ErrorCode, error: string }) {
        switch (e.errorcode) {
            case "invalidtoken":
                snackbar("טוקן החיבור לא תקין, אנא התחברו מחדש.", { duration: 5000 });
                deleteLocalStorage('token');
                deleteLocalStorage('user');
                break;
            case "invalidlogin":
                snackbar(e.error);
                break;
            default:
                snackbar(JSON.stringify(e));
        }
    }


    function error(e: any) {
        if (e.errorcode) {
            errorCode(e);
        }
        else {
            console.log(e);
            snackbar('error');
        }
    }

    return <ErrorContext.Provider value={error}>
        {children}
    </ErrorContext.Provider>

}