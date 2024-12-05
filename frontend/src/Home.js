/*
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet"
import {toast} from 'react-toastify'
import "./Home.css";
import { useUser } from "./contexts/UserContext";
//la vida es vida
document.documentElement.lang = "es";

export default function Home() {
  const {token, logOut} = useUser();

    const frases = ["El único mal entrenamiento es el que no haces",
                    "No se trata de ser el mejor, sino de ser mejor que ayer",
                    "Cada repetición cuenta, cada esfuerzo te acerca a tus metas",
                    "No te detengas cuando estés cansado, detente cuando hayas terminado",
                    "Cada gota de sudor es un paso hacia tu mejor versión"
                    ]
    const [user, setUser] = useState({}); //Sirve para los datos del usuario
    // const [auth_token, setToken] = useState(); //Sirve para los datos del token
    const [rango_token, setRango] = useState(); //Sirve para los datos del rango

    useEffect(() => {
        // setToken(localStorage.getItem("auth_token"));
        if(token != null) { //Verifica si el token existe

            const auth_token_type = localStorage.getItem("auth_token_type");
            const token_usuario = auth_token_type + " " + token;

                //Obtiene datos de la API
                axios.get("http://localhost:8888/usuario/", {headers: {Authorization: token_usuario}}).then((response) => {
                        console.log(response); //Sólo sirve para pruebas
                        setUser(response.data.resultado.info_usuario);
                        setRango(response.data.resultado.rango_usuario)
                    }).catch((error) => {
                        console.log(error); //Sólo sirve para pruebas
                        localStorage.removeItem("auth_token")
                        localStorage.removeItem("auth_token_type")
                        toast.error(error.response.data.detail.message)

                        setTimeout(() => {
                            window.location.reload();
                        }, 1000)
                    })
        }
    }, [token, rango_token])

    const onClickHandler = (event) => {
        event.preventDefault();

        //* localStorage.removeItem("auth_token")
        //* localStorage.removeItem("auth_token_type")

        logOut();

        toast("Sesión cerrada exitosamente", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // setTimeout(() => {
        //     window.location.reload();
        // }, 1500)
    }

    const pagina_sin_token = () => {
        return(
            <div className="home_page">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Gymcontrol - Príncipal</title>
                </Helmet>
                {frases[Math.floor(Math.random() * frases.length)]}
                <Link to="/login">
                    <button type="button" className="btn btn-primary">Únete</button>
                </Link>
            </div>
        );
    }

    const pagina_con_token = () => {
        return (
            <div className="home_page">
                <Helmet>
                <meta charSet="utf-8"/>
                    <title>Gymcontrol - Príncipal</title>
                </Helmet>
                ¡BIENVENID{user.sexo === "MASCULINO" ? "O " : "A "}
                {rango_token === "Cliente" ? user.nombre.toUpperCase() : rango_token.toUpperCase()}
                {user.sexo === "FEMENINO" && rango_token !== "Cliente" ? "A" : ""}!
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick = {(event) => {
                        onClickHandler(event);
                    }}
                >
                    Cerrar Sesión
                </button>
            </div>
        );
    }

    // return <React.Fragment>{auth_token==null || rango_token==null ? pagina_sin_token() : pagina_con_token()}</React.Fragment>;
    return <React.Fragment>{token==null || rango_token==null ? pagina_sin_token() : pagina_con_token()}</React.Fragment>;
}*/

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css'; // Incluye tus estilos personalizados
import MyNavbar from './components/NavbarCliente';
import { useUser } from './contexts/UserContext';

//import ChatbotIcon from './ChatbotIcon'; // Importa el componente del ícono del chatbot

document.documentElement.lang = 'es';

export default function Home(props) {
  const { token, logOut } = useUser();

  const frases = [
    'El único mal entrenamiento es el que no haces',
    'No se trata de ser el mejor, sino de ser mejor que ayer',
    'Cada repetición cuenta, cada esfuerzo te acerca a tus metas',
    'No te detengas cuando estés cansado, detente cuando hayas terminado',
    'Cada gota de sudor es un paso hacia tu mejor versión',
  ];
  const [user, setUser] = useState({}); // Datos del usuario
  //  const [auth_token, setToken] = useState(); // Token de autenticación
  const [rango_token, setRango] = useState(); // Rango del usuario

  useEffect(() => {
    // setToken(localStorage.getItem("auth_token"));
    if (token != null) {
      // Verifica si el token existe
      const auth_token_type = localStorage.getItem('auth_token_type');
      const token_usuario = auth_token_type + ' ' + token;

      // Obtiene datos de la API
      axios
        .get('http://localhost:8888/usuario/', {
          headers: { Authorization: token_usuario },
        })
        .then((response) => {
          console.log(response); // Solo para pruebas
          setUser(response.data.resultado.info_usuario);
          setRango(response.data.resultado.rango_usuario);
        })
        .catch((error) => {
          console.log(error); // Solo para pruebas
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_token_type');
          toast.error(error.response.data.detail.message);

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    }
  }, [token, rango_token]);

  const onClickHandler = (event) => {
    event.preventDefault();

    // localStorage.removeItem("auth_token");
    // localStorage.removeItem("auth_token_type");

    logOut();

    toast('Sesión cerrada exitosamente', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // setTimeout(() => {
    //     window.location.reload();
    // }, 1500);
  };

  const pagina_sin_token = () => {
    return (
      <div className="homepage-container d-flex flex-column justify-content-between vh-100 text-light">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Gymcontrol - Principal</title>
        </Helmet>
        <header className="d-flex justify-content-between align-items-center p-4">
          <h1 className="logo">GYMCONTROL</h1>
          <Link to="/login">
            <button className="btn btn-link">Iniciar Sesión</button>
          </Link>
        </header>
        <div className="content d-flex flex-column align-items-start">
          <h2 className="display-4 font-weight-bold">
            {frases[Math.floor(Math.random() * frases.length)]}
          </h2>
          <Link to="/registro_cliente">
            <button
              type="button"
              className="btn btn-primary mt-8"
              style={{ marginLeft: '10px' }}
            >
              Únete
            </button>
          </Link>
        </div>
        <div></div>
      </div>
    );
  };

  const pagina_con_token = () => {
    return (
      <div className="homepage-container d-flex flex-column justify-content-between vh-100 text-light">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Gymcontrol - Principal</title>
        </Helmet>
        <header className="d-flex justify-content-between align-items-center p-4">
          <h1 className="logo">GYMCONTROL</h1>
          <MyNavbar rango_token={rango_token} />
          
                      {/* 
            <button
              type="button"
              className="btn  text-white"
              onClick={(event) => {
                onClickHandler(event);
              }}
            >
              Cerrar Sesión
            </button> 
            */}
        </header>
        <div className="content d-flex flex-column align-items-start">
          <h2 className="display-4 font-weight-bold">
            ¡BIENVENID{user.sexo === 'MASCULINO' ? 'O ' : 'A '}
            {rango_token === 'Cliente'
              ? user.nombre.toUpperCase()
              : rango_token.toUpperCase()}
            {user.sexo === 'FEMENINO' && rango_token !== 'Cliente' ? 'A' : ''}!
          </h2>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {token == null || rango_token == null
        ? pagina_sin_token()
        : pagina_con_token()}
    </React.Fragment>
  );
}
