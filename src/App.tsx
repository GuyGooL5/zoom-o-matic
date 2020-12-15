import React from 'react';
import './App.css';
import Home from './Components/Home';
import { LocalStorageContextProvider } from './ContextProviders/LocalStorageContext';
import { SnackbarContextProvider } from './ContextProviders/SnackbarContext';

function App() {
  return (
    <div className="App" style={{ margin: 0, padding: 0 }}>
      <LocalStorageContextProvider>
        <SnackbarContextProvider>
          <Home />
        </SnackbarContextProvider>
      </LocalStorageContextProvider>
    </div>
  );
}

export default App;
