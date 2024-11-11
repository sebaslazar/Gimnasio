import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./UI-02.css";

export default function Login(props) {

    //Opciones de rango
    const opciones_rango = [
        {value: "", label: "Rango"},
        {value: "Cliente", label: "Cliente"},
        {value: "Entrenador", label: "Entrenador"},
        {value: "Administrador", label: "Administrador"},
    ];

    //Formato de registro
    const [loginForm, setLoginform] = useState({
        correo: "",
        password: "",
        rango: "Cliente", //Fija "Cliente" como valor por defecto
    });

    //Capturador de campos
    const onChange_formulario = (label, event) => {
        switch(label) {
            case "correo":
                setLoginform({ ...loginForm, correo: event.target.value});
                break;
            case "password":
                setLoginform({ ...loginForm, password: event.target.value});
                break;
            case "rango":
                setLoginform({ ...loginForm, rango: event.target.value});
                break;
        }
    }

    //Manejador de envío de datos
    const onSubmitManejador = async(event) => {
        event.preventDefault()
        console.log(loginForm) //Sólo sirve para pruebas
        //Llamada a API para login
        await axios.post("http://localhost:8888/auth/login",loginForm).then((response) => {
            console.log(response); //Sólo sirve para pruebas
            //Guarda token en almacenamiento local
            localStorage.setItem("auth_token", response.data.resultado.token_de_acceso);
            localStorage.setItem(
                "auth_token_type",
                response.data.resultado.tipo_de_token
            );

            //Agregar notificación de éxito
            toast.success(response.data.detalles);

            //Recarga página después de login exitoso
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        }).catch((error) => {
            //Sólo sirve para pruebas
            console.log(error);

            //Agrega notificación de error
            toast.error(error.response.data.detail);
        })
    }

    return (
        <React.Fragment>
            <h1 className="nombre_de_gimnasio">
                GYMCONTROL
            </h1>
            <form onSubmit={onSubmitManejador}>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Correo"
                        onChange={(event) => {
                            onChange_formulario("correo", event);
                        }}
                    />
                </div>
                <div className="form-group">
                    <select
                        className="form-group"
                        onChange={(event) => {
                            onChange_formulario("rango", event);
                        }}
                        >
                    {opciones_rango.map((data) => {
                        if(data.value === ""){
                            return(
                                <option key={data.label} value={data.value} disabled>
                                    {data.label}
                                </option>
                            )
                        }
                        else{
                            return(
                                <option key={data.label} value={data.value}>
                                    {data.label}
                                </option>
                            )
                        }
                    })}
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        onChange={(event) => {
                            onChange_formulario("password", event);
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary">
                        Ingresar
                </button>
                <p>
                    ¿Eres Nuevo?{" "}
                    <Link to="/?registro_cliente" //Ruta que va a aparecer en el navegador
                        onClick={() => {
                            props.setPage("registro_cliente"); //Nombre de la página indicada en App.js
                        }}
                    >
                        <span className="link_registrar">Únete</span>
                    </Link>
                </p>
            </form>
        </React.Fragment>
    )
}