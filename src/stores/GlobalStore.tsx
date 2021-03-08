import React, { createContext, Dispatch, useContext, useReducer } from "react"
import { IUserData } from "../interfaces"
import { DispatchActions } from "../types";

interface GlobalStoreData {
    user: IUserData | null;
    token: string | null;
    toolids: string[] | null;
    moodleUrl: string | null;
}

const initialState: GlobalStoreData = {
    token: localStorage.getItem("token"),
    moodleUrl: localStorage.getItem("moodleUrl"),
    user: (() => { let v = localStorage.getItem("user"); return v ? JSON.parse(v) : null })(),
    toolids: (() => { let v = localStorage.getItem("toolids"); return v ? JSON.parse(v) : null })()
}


type Actions = {
    SET_TOKEN: string | null,
    SET_USER: IUserData | null,
    SET_MD_URL: string | null,
    SET_TOOLIDS: string[] | null,
    RESET_STORAGE: boolean
}


export type GlobalStoreActions = DispatchActions<Actions>;

const reducer = (state: GlobalStoreData, { type, payload }: GlobalStoreActions) => {

    switch (type) {
        /**if payload is present the token will be set to be the payload, otherwise it will be deleted */
        case "SET_TOKEN": return { ...state, token: payload as string | null };
        case "SET_USER": return { ...state, user: payload as IUserData | null };
        case "SET_MD_URL": return { ...state, moodleUrl: payload as string | null };
        case "SET_TOOLIDS": return { ...state, toolids: payload as string[] | null };
        case "RESET_STORAGE":
            const newState = { ...state };
            for (const k in newState) {
                newState[k as keyof GlobalStoreData] = null;
            }
            return newState
        default:
            return state;
    }
}

const Context = createContext({});

const GlobalStore: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return <Context.Provider value={[state, dispatch]}>
        {children}
    </Context.Provider>;
}


const useGlobalStore = () => useContext(Context) as [GlobalStoreData, Dispatch<DispatchActions<Actions>>];


export {
    GlobalStore,
    useGlobalStore
}