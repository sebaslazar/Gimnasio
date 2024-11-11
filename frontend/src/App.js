import './App.css';
import React, {useState} from "react";
import {Helmet} from "react-helmet"
import Login from './files/UI-02.js';
import Registro_cliente from './files/UI-03.js';

document.documentElement.lang = "es"; //Establece el idioma de la página en español

function App() {

    const [page, setPage] = useState("login");

    const elegir_pagina = () => {
        if (page === "login") {
            return <Login setPage={setPage} />;
        }
        if (page === "registro_cliente") {
            return <Registro_cliente setPage={setPage} />;
        }
    }

    return (
        <div className="app-container">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Gymcontrol</title>
            </Helmet>
            <div className="centered-div">
                {elegir_pagina()}
            </div>
        </div>
    );
}

export default App;
