import React from 'react'
import { useGlobalStore } from '../../stores/GlobalStore';
import LoginPage from '../LoginPage';
import Home from './Home';

export default function HomePage() {

    const [{ token, user }] = useGlobalStore();

    return token && user ? <Home /> : <LoginPage />
}