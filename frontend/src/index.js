import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import { AuthContextProvider } from './context/AuthContext';
import { GlobalStyle } from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalStyle />
        <GlobalProvider>
          <App />
        </GlobalProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

