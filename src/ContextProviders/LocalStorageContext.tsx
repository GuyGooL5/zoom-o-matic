import React, { ReactNode, useState } from 'react'
import LocalStorage from '../Services/LocalStorage';



interface ILocalStorageContext {
    token: string | null;
    setToken: (token: string | null) => void;
    toolIds: string[] | null;
    addToolIDs: (...toolid: string[]) => void;

}

const LocalStorageContext = React.createContext({} as ILocalStorageContext);

export default LocalStorageContext;

export function LocalStorageContextProvider({ children }: { children?: ReactNode }) {


    const [token, setToken] = useState(LocalStorage.getToken());
    const [toolids, setToolids] = useState(LocalStorage.getToolIDs())

    function updateToken(_token: string | null) {
        LocalStorage.setToken(_token);
        setToken(_token);
    }

    function addToolIDs(..._toolids: string[]) {
        LocalStorage.addToolIDs(..._toolids);
        setToolids(LocalStorage.getToolIDs());
    }

    return <LocalStorageContext.Provider value={{
        token: token,
        toolIds: toolids,
        setToken: updateToken,
        addToolIDs: addToolIDs
    }} >
        {children}
    </ LocalStorageContext.Provider>

}