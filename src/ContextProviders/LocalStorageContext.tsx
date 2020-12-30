import React, { ReactNode, useReducer } from 'react'
import { IUserData } from '../interfaces';

interface LocalStorageData {
    user: IUserData | null;
    token: string | null;
    toolids: string[] | null;
    moodleUrl: string | null;
}


type deleteStorageFn = ((key: keyof LocalStorageData | "all") => void)

interface ILocalStorageContext {
    localStorage: LocalStorageData;
    setLocalStorage: ((key: 'user', value: IUserData) => void) &
    ((key: 'token' | 'moodleUrl', value: string) => void) &
    ((key: 'toolids', value: string[]) => void);
    deleteLocalStorage: deleteStorageFn
}

const LocalStorageContext = React.createContext({} as ILocalStorageContext);

export default LocalStorageContext;


export function LocalStorageContextProvider({ children }: { children?: ReactNode }) {

    function reducer(prevState: LocalStorageData, { key, value }: { key: keyof LocalStorageData | 'all', value: any }): LocalStorageData {
        if (key === 'all' && !value) {
            localStorage.clear();
            let nextState = { ...prevState };
            for (let k in nextState) nextState[k as keyof LocalStorageData] = null;
            return nextState;
        }
        else if (value == null) {
            localStorage.removeItem(key);
            return { ...prevState, [key]: null };
        }
        else if (key === "token" || key === "moodleUrl") localStorage.setItem(key, value);
        else localStorage.setItem(key, JSON.stringify(value));
        return { ...prevState, [key as keyof LocalStorageData]: value };
    }

    const [localStorageState, setLocalStorageState] = useReducer(reducer, {
        user: JSON.parse(localStorage.getItem('user') as string),
        token: localStorage.getItem('token'),
        moodleUrl: localStorage.getItem('moodleUrl'),
        toolids: JSON.parse(localStorage.getItem('toolids') as string)
    })

    return <LocalStorageContext.Provider value={{
        localStorage: localStorageState,
        setLocalStorage: (key: any, value: any) => setLocalStorageState({ key: key, value: value }),
        deleteLocalStorage: (key) => setLocalStorageState({ key: key, value: null })
    }} >
        {children}
    </ LocalStorageContext.Provider>

}