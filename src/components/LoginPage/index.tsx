import React, { useEffect } from 'react'
import { fetchUser } from '../../utils/moodleRequests';
import { useGlobalStore } from '../../stores/GlobalStore'
import AcademyUrl from './AcademyUrl';
import Login from './Login';
import { setUser } from '../../actions/localStorageActions';



export default function LoginPage() {

    const [{ moodleUrl, token }, dispatchLocalStorage] = useGlobalStore();

    useEffect(() => {
        if (token)
            fetchUser().then(user => setUser(user)(dispatchLocalStorage));
    }, [dispatchLocalStorage, token])

    return moodleUrl ? <Login url={moodleUrl} /> : <AcademyUrl />


}