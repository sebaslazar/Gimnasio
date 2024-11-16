import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet"
import {toast} from 'react-toastify'
import "./Home.css";

document.documentElement.lang = "es";

export default function Home(props) {

    const frases = ["El único mal entrenamiento es el que no haces",
                    "No se trata de ser el mejor, sino de ser mejor que ayer",
                    "Cada repetición cuenta, cada esfuerzo te acerca a tus metas",
                    "No te detengas cuando estés cansado, detente cuando hayas terminado",
                    "Cada gota de sudor es un paso hacia tu mejor versión"
                    ]
    const [user, setUser] = useState({}); //Sirve para los datos del usuario
    const [auth_token, setToken] = useState(); //Sirve para los datos del token
    const [rango_token, setRango] = useState(); //Sirve para los datos del rango

    useEffect(() => {
        setToken(localStorage.getItem("auth_token"));
        if(auth_token != null) { //Verifica si el token existe

            const auth_token_type = localStorage.getItem("auth_token_type");
            const token_usuario = auth_token_type + " " + auth_token;

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
    }, [auth_token, rango_token])

    const onClickHandler = (event) => {
        event.preventDefault();

        localStorage.removeItem("auth_token")
        localStorage.removeItem("auth_token_type")

        toast("Sesión cerrada exitosamente", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
            window.location.reload();
        }, 1500)
    }

    const pagina_sin_token = () => {
        return(
            <div className="home_page">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Gymcontrol - Príncipal</title>
                </Helmet>
                {frases[Math.floor(Math.random() * frases.length)]}
                <Link to="/?login"
                    onClick={() => {
                        props.setPage("login");
                    }}
                >
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

    return <React.Fragment>{auth_token==null || rango_token==null ? pagina_sin_token() : pagina_con_token()}</React.Fragment>;
}