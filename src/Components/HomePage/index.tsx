import React, { useContext } from 'react'
import LocalStorageContext from '../../ContextProviders/LocalStorageContext'
import LoginPage from '../LoginPage';
import Home from './Home';

export default function HomePage() {

    const { localStorage: { token, user } } = useContext(LocalStorageContext);

    return token && user ? <Home /> : <LoginPage />
}