import './App.css';
import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet"
import Home from "./Home.js"
import Login from './files/UI-02.js';
import Registro_cliente from './files/UI-03.js';

document.documentElement.lang = "es"; //Establece el idioma de la página en español

function App() {

    const [page, setPage] = useState("Home");
    const [token, setToken] = useState();

    //Permite intercambiar la página que se carga
    const elegir_pagina = () => {
        if (page === "login") {
            return <Login setPage={setPage} />;
        }
        if (page === "registro_cliente") {
            return <Registro_cliente setPage={setPage} />;
        }
    }

    //Recupera token del almacenamiento local
    useEffect(() => {
        const auth = localStorage.getItem("auth_token");
        setToken(auth);
    }, [token]);

    const paginas = () => {
        if (token == null && (page === "login" || page === "registro_cliente")) {
            return(
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
        } else {
            return <Home setPage={setPage}/>;
        }
    };

    return <React.Fragment>{paginas()}</React.Fragment>;
}

export default App;
