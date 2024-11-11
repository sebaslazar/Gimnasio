import React, {useState} from 'react';
import {Link} from "react-router-dom"
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import "./UI-03.css";

export default function Registro(props) {

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
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Identificación"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Segundo Nombre"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Apellido"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Segundo Apellido"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Correo"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Dirección"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
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
                <div className="form-group">
                    <select className="form-group">
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
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Peso en Kilogramos"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        min="1"
                        max="3"
                        step="0.1"
                        className="form-control"
                        placeholder="Altura en Metro"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary">
                        Crear cuenta
                </button>
                <p>
                    ¿Ya Tienes Una Cuenta?{" "}
                    <Link to="/?login" //Ruta que va a aparecer en el navegador
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