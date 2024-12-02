import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App2';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import './index.css';
import { UserProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // TODO: StrictMode should be removed in production. Specifically because Some Toasts are not working properly with it
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
