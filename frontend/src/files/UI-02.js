import React from 'react';
import "./UI-02.css";

export default function Login(props) {

    const opciones_rango = [
        {value: "", label: "Rango"},
        {value: "Cliente", label: "Cliente"},
        {value: "Entrenador", label: "Entrenador"},
        {value: "Administrador", label: "Administrador"},
    ];

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
                    />
                </div>
                <div class="form-group">
                    <select class="form-group">
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
                    />
                </div>
                <button
                    type="submit"
                    class="btn btn-primary">
                        Ingresar
                </button>
                <p>
                    ¿Eres Nuevo? <span className="link_registrar">
                        Únete
                    </span>
                </p>
            </form>
        </React.Fragment>
    )
}