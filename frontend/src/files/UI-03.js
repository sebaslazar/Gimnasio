import React, {useState} from 'react';
import {Link} from "react-router-dom"
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import "./UI-03.css";

export default function Login(props) {

    //Opciones de sexo
    const opciones_sexo = [
        {value: "", label: "Sexo"},
        {value: "MASCULINO", label: "Hombre"},
        {value: "FEMENINO", label: "Mujer"},
    ];

    //Formato de registro
    const [formRegister, setFormRegister] = useState({
        ID_cliente: "",
        password: "",
        sexo: "",
        nombre: "",
        segundo_nombre: "",
        apellido: "",
        segundo_apellido: "",
        fecha_nacimiento: "",
        correo: "",
        telefono: "",
        direccion: "",
        activo: "",
        peso: "",
        altura: "",
        rango: "",
    })

    //Valor por defecto para datepicker
    registerLocale("es", es)
    const [birthDate, setBirthDate] = useState(null);

    //Convertir formato de fecha a string
    const formato_fecha = (fecha) => {
        let d = new Date(fecha),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();
        if (month.legth < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [day, month, year].join("-");
    };

    return (
        <React.Fragment>
            <h1 className="nombre_de_gimnasio">
                GYMCONTROL
            </h1>
            <form>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Identificación"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Nombre"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Segundo Nombre"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Apellido"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Segundo Apellido"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="email"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Correo"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Dirección"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="number"
                        class="form-control"
                        placeholder="Teléfono"
                        locale="es"
                    />
                </div>
                <DatePicker
                        placeholderText="Fecha De Nacimiento"
                        selected={birthDate}
                        locale="es"
                        dateFormat="dd-MM-yyyy"
                    />
                <div class="form-group">
                    <select value={formRegister.sexo} class="form-group">
                    {opciones_sexo.map((data) => {
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
                        type="number"
                        class="form-control"
                        placeholder="Peso en Kilogramos"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="number"
                        min="1"
                        max="3"
                        step="0.1"
                        class="form-control"
                        placeholder="Altura en Metro"
                    />
                </div>
                <button
                    type="submit"
                    class="btn btn-primary">
                        Crear cuenta
                </button>
                <p>
                    ¿Ya Tienes Una Cuenta?{" "} //Ruta que va a aparecer en el navegador
                    <Link to="/?login"
                        onClick={() => {
                            props.setPage("login"); //Nombre de la página indicada en App.js
                        }}
                    >
                        <span className="link_registrar">Iniciar Sesión</span>
                    </Link>
                </p>
            </form>
        </React.Fragment>
    )
}