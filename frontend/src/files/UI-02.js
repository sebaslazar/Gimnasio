import React, {useState} from 'react';
import {Link} from "react-router-dom"
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
        rango: "",
    })

    console.log(loginForm)

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

    return (
        <React.Fragment>
            <h1 className="nombre_de_gimnasio">
                GYMCONTROL
            </h1>
            <form>
                <div class="form-group">
                    <input
                        type="email"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Correo"
                        onChange={(event) => {
                            onChange_formulario("correo", event);
                        }}
                    />
                </div>
                <div class="form-group">
                    <select
                        class="form-group"
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
                <div class="form-group">
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Contraseña"
                        onChange={(event) => {
                            onChange_formulario("password", event);
                        }}
                    />
                </div>
                <button
                    type="submit"
                    class="btn btn-primary">
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