import React, { useContext } from 'react'
import LocalStorageContext from '../../ContextProviders/LocalStorageContext'
import AcademyUrl from './AcademyUrl'
import Login from './Login'



export default function LoginPage() {

    const { localStorage: { moodleUrl } } = useContext(LocalStorageContext)

    return moodleUrl ? <Login url={moodleUrl ?? ""} /> : <AcademyUrl />


}