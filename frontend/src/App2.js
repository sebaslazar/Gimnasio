import './App.css';
import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.js";
import Login from './files/UI-02.js';
import RegistroCliente from './files/UI-03.js';
import { useUser } from "./contexts/UserContext.jsx";
import { MainLayout } from './layouts/MainLayout.jsx';
import { ClientsPage } from './files/ShowClientsPage.jsx';

document.documentElement.lang = "es"; //Establece el idioma de la página en español

function App() {
  const {token} = useUser();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Gymcontrol</title>
      </Helmet>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<ClientsPage />} />
        <Route element={<MainLayout />}>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/registro_cliente" element={!token ? <RegistroCliente /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
