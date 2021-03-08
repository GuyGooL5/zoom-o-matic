import React from 'react';
import HomePage from './components/HomePage';
import { GlobalStore } from './stores/GlobalStore';
import SnackbarContextProvider from './ContextProviders/SnackbarContext';
import AlertContextProvider from './ContextProviders/AlertContext';

export default function App() {
  return (
    <div className="App" style={{ margin: 0, padding: 0 }}>
      <GlobalStore>
        <SnackbarContextProvider>
          <AlertContextProvider>
            <HomePage />
          </AlertContextProvider>
        </SnackbarContextProvider>
      </GlobalStore>
    </div>
  );
}