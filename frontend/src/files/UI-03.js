
import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import {toast} from "react-toastify";
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import "./UI-03.css";

export default function Registro() {

    //Opciones de sexo
    const opciones_sexo = [
        {value: "", label: "Sexo"},
        {value: "MASCULINO", label: "Hombre"},
        {value: "FEMENINO", label: "Mujer"},
    ];

    const navigate = useNavigate();

    //Formato de registro
    const [formRegister, setFormRegister] = useState({
        ID: "",
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
        peso: "",
        altura: "",
    });

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

    //Capturador de campos
    const onChange_formulario = (label, event) => {
        switch(label) {
            case "ID":
                setFormRegister({ ...formRegister, ID: event.target.value });
                break;
            case "password":
                setFormRegister({ ...formRegister, password: event.target.value });
                break;
            case "sexo":
                setFormRegister({ ...formRegister, sexo: event.target.value });
                break;
            case "nombre":
                setFormRegister({ ...formRegister, nombre: event.target.value });
                break;
            case "segundo_nombre":
                setFormRegister({ ...formRegister, segundo_nombre: event.target.value });
                break;
            case "apellido":
                setFormRegister({ ...formRegister, apellido: event.target.value });
                break;
            case "segundo_apellido":
                setFormRegister({ ...formRegister, segundo_apellido: event.target.value });
                break;
            case "fecha_nacimiento":
                setBirthDate(event);
                setFormRegister({ ...formRegister, fecha_nacimiento: formato_fecha(event) });
                break;
            case "correo":
                setFormRegister({ ...formRegister, correo: event.target.value });
                break;
            case "telefono":
                setFormRegister({ ...formRegister, telefono: event.target.value });
                break;
            case "direccion":
                setFormRegister({ ...formRegister, direccion: event.target.value });
                break;
            case "activo":
                setFormRegister({ ...formRegister, activo: event.target.value });
                break;
            case "peso":
                setFormRegister({ ...formRegister, peso: event.target.value });
                break;
            case "altura":
                setFormRegister({ ...formRegister, altura: event.target.value });
                break;
            default:
                console.warn(`Etiqueta no manejada: ${label}`); // Advertencia si hay un valor no esperado
        }
    };
    
    //Manejador de envío de datos
    const onSubmitManejador = async(event) => {
        event.preventDefault()
        console.log(formRegister) //Sólo sirve para pruebas

        //Llama a la API para registrar cliente
        await axios.post("http://localhost:8888/auth/registro_cliente", formRegister).then((response) => {
            //Agregar notificación de éxito
            toast.success(response.data.detalles);

            //Redirige a página de login
            navigate("/login");
            // setTimeout(() => {
            //     props.setPage("login");
            // }, 2000)

            //Sólo sirve para pruebas
            console.log(response);
        }).catch((error) => {
            //Sólo sirve para pruebas
            console.log(error);

            //Agrega notificación de error
            toast.error(error.response.data.detail)
        });
    };

    return (
        <React.Fragment>
            <h1 className="nombre_de_gimnasio">
                GYMCONTROL
            </h1>
            <form onSubmit={onSubmitManejador}>
                <div className="form-group">
                    <input
                        required = "true"
                        type="text"
                        className="form-control"
                        placeholder="Identificación"
                        onChange={(event) => {
                            onChange_formulario("ID", event);
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        required = "true"
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        onChange={(event) => {
                            onChange_formulario("nombre", event);
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Segundo Nombre"
                        onChange={(event) => {
                            onChange_formulario("segundo_nombre", event);
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        required = "true"
                        type="text"
                        className="form-control"
                        placeholder="Apellido"
                        onChange={(event) => {
                            onChange_formulario("apellido", event);
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Segundo Apellido"
                        onChange={(event) => {
                            onChange_formulario("segundo_apellido", event);
                        }}
                    />
                </div>
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
                    <input
                        required = "true"
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        onChange={(event) => {
                            onChange_formulario("password", event);
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        required = "true"
                        type="text"
                        className="form-control"
                        placeholder="Dirección"
                        onChange={(event) => {
                            onChange_formulario("direccion", event);
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        required = "true"
                        type="tel"
                        className="form-control"
                        placeholder="Teléfono"
                        onChange={(event) => {
                            onChange_formulario("telefono", event);
                        }}
                    />
                </div>
                <DatePicker
                        required = "true"
                        placeholderText="Fecha De Nacimiento"
                        selected={birthDate}
                        locale="es"
                        dateFormat="dd-MM-yyyy"
                        onChange = {(event) => {
                            onChange_formulario("fecha_nacimiento", event);
                        }}
                    />
                <div className="form-group">
                    <select
                        required = "true"
                        value={formRegister.sexo}
                        className="form-group"
                        onChange = {(event) => {
                            onChange_formulario("sexo", event);
                        }}>
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
                        required = "true"
                        type="number"
                        className="form-control"
                        placeholder="Peso en Kilogramos"
                        onChange = {(event) => {
                            onChange_formulario("peso", event);
                        }}
                    />
                </div>
                <div className="form-group">
                    <input
                        required = "true"
                        type="number"
                        min="1"
                        max="3"
                        step="0.1"
                        className="form-control"
                        placeholder="Altura en Metro"
                        onChange = {(event) => {
                            onChange_formulario("altura", event);
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className=" btn-primary ">
                        Crear cuenta
                </button>
                <p>
                    ¿Ya Tienes Una Cuenta?{" "}
                    <Link to="/login"> 
                        <span className="link_registrar">Iniciar Sesión</span>
                    </Link>
                </p>
            </form>
        </React.Fragment>
    )
}


