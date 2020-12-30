import React from 'react';
import HomePage from './Components/HomePage';
import { ErrorContextProvider } from './ContextProviders/ErrorContext';
import { LocalStorageContextProvider } from './ContextProviders/LocalStorageContext';
import { SnackbarContextProvider } from './ContextProviders/SnackbarContext';

export default function App() {
  return (
    <div className="App" style={{ margin: 0, padding: 0 }}>
      <LocalStorageContextProvider>
        <SnackbarContextProvider>
          <ErrorContextProvider>
            <HomePage />
          </ErrorContextProvider>
        </SnackbarContextProvider>
      </LocalStorageContextProvider>
    </div>
  );
}