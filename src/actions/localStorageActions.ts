import { Dispatch } from "react";
import { IUserData } from "../interfaces";
import { GlobalStoreActions } from "../stores/GlobalStore";



const setToken = (token: string | null) => (dispatch: Dispatch<GlobalStoreActions>) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    return dispatch({ type: "SET_TOKEN", payload: token })
}

const setUser = (user: IUserData | null) => (dispatch: Dispatch<GlobalStoreActions>) => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
    dispatch({ type: "SET_USER", payload: user });
}
const setMoodleUrl = (url: string | null) => (dispatch: Dispatch<GlobalStoreActions>) => {
    if (url) localStorage.setItem("moodleUrl", url);
    else localStorage.removeItem("moodleUrl");
    dispatch({ type: "SET_MD_URL", payload: url });
}

const setToolids = (toolids: string[]) => (dispatch: Dispatch<GlobalStoreActions>) => {
    localStorage.setItem("toolids", JSON.stringify(toolids));
    dispatch({ type: "SET_TOOLIDS", payload: toolids });
}

const deleteToolid = (toolid: string) => (dispatch: Dispatch<GlobalStoreActions>) => {
    const toolids: string[] = JSON.parse(localStorage.getItem("toolids") ?? "[]");
    const filtered = toolids.filter((value) => value !== toolid);
    localStorage.setItem("toolids", JSON.stringify(filtered));
    dispatch({ type: "SET_TOOLIDS", payload: filtered });
}

const clearLocalStorage = () => (dispatch: Dispatch<GlobalStoreActions>) => {
    localStorage.clear();
    dispatch({ type: "RESET_STORAGE", payload: true });
}


export {
    setToken,
    setMoodleUrl,
    setUser,
    setToolids,
    deleteToolid,
    clearLocalStorage
}