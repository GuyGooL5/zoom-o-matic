import React, { useContext } from 'react'
import LocalStorageContext from '../../ContextProviders/LocalStorageContext';
import CoursesPage from '../CoursesPage';
import ScanPage from '../ScanPage';
import Navbar from './Navbar';


export default function Home(): JSX.Element {

    const { localStorage: { toolids } } = useContext(LocalStorageContext);

    return < >
        <Navbar />
        {toolids ? <CoursesPage /> : <ScanPage />}
    </ >
}