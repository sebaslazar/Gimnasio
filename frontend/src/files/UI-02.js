/*
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./UI-02.css";
import { useUser } from '../contexts/UserContext';

export default function Login() {
    const {setToken} = useUser();

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
                setLoginform({ ...loginForm, correo: event.target.value });
                break;
            case "password":
                setLoginform({ ...loginForm, password: event.target.value });
                break;
            case "rango":
                setLoginform({ ...loginForm, rango: event.target.value });
                break;
            default:
                console.warn(`Etiqueta no manejada: ${label}`); // Mensaje en caso de valor inesperado.
        }
    };
    
    //Manejador de envío de datos
    const onSubmitManejador = async(event) => {
        event.preventDefault()
        console.log(loginForm) //Sólo sirve para pruebas
        //Llamada a API para login
        await axios.post("http://localhost:8888/auth/login",loginForm).then((response) => {
            console.log(response); //Sólo sirve para pruebas
            //Guarda token en almacenamiento local
            //* localStorage.setItem("auth_token", response.data.resultado.token_de_acceso);
            //* localStorage.setItem(
            //     "auth_token_type",
            //     response.data.resultado.tipo_de_token
            // );
            
            //Guarda token en almacenamiento local
            setToken({
                token: response.data.resultado.token_de_acceso,
                tokenType: response.data.resultado.tipo_de_token,
            });

            //Agregar notificación de éxito
            toast.success(response.data.detalles);

            //Recarga página después de login exitoso
            //* setTimeout(() => {
            //     window.location.reload();
            // }, 1000);

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
                        required = "true"
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
                        required = "true"
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
                    <Link to="/registro_cliente"> {/*Ruta que va a aparecer en el navegador*/
                    /*
                        <span className="link_registrar">Únete</span>
                    </Link>
                </p>
            </form>
        </React.Fragment>
    )
}

*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./UI-02.css";
import { useUser } from "../contexts/UserContext";
import { FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';


export default function Login() {
  const { setToken } = useUser();

  const opcionesRango = [
    { value: "", label: "Seleccione su Rango" },
    { value: "Cliente", label: "Cliente" },
    { value: "Entrenador", label: "Entrenador" },
    { value: "Administrador", label: "Administrador" },
  ];

  const [loginForm, setLoginForm] = useState({
    correo: "",
    password: "",
    rango: "Cliente",
    rango: "Entrenador",
    rango: "Administrador",
  });

  const handleChange = (field, value) => {
    setLoginForm({ ...loginForm, [field]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8888/auth/login",
        loginForm
      );
      setToken({
        token: response.data.resultado.token_de_acceso,
        tokenType: response.data.resultado.tipo_de_token,
      });
      toast.success(response.data.detalles);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container d-flex flex-column align-items-center mt-5">
    {/* Título */}
    <h1 className="nombre_de_gimnasio text-center mb-4">GYMCONTROL</h1>

    {/* Formulario */}
    <form onSubmit={handleSubmit} className="login-form w-75">
      {/* Correo */}
      <div className="form-group mb-3">
        <FaEnvelope className="icon" />
        <input
          type="email"
          className="form-control"
          placeholder="Correo Electrónico"
          value={loginForm.correo}
          onChange={(e) => handleChange("correo", e.target.value)}
          required
        />
      </div>

      {/* Rango */}
      <div className="form-group mb-3">
        <FaUserCircle className="icon" />
        <select
          className="form-control"
          value={loginForm.rango}
          onChange={(e) => handleChange("rango", e.target.value)}
          required
        >
          {opcionesRango.map((opcion) => (
            <option key={opcion.value} value={opcion.value} disabled={!opcion.value}>
              {opcion.label}
            </option>
          ))}
        </select>
      </div>

      {/* Contraseña */}
      <div className="form-group mb-3">
        <FaLock className="icon" />
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
          value={loginForm.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
      </div>

      {/* Botón de Ingresar */}
      <button type="submit" className="btn btn-primary  border-purple rounded-pill">
        Ingresar
      </button>
    </form>

    {/* Enlace de Registro (Fuera del formulario) */}
    <div className="nuevo-usuario text-center mt-4">
      <p>
        ¿Eres Nuevo?{" "}
        <Link to="/registro_cliente" className="text-primary">
          Únete
        </Link>
      </p>
    </div>
  </div>
);
}