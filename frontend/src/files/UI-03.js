import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./UI-03.css";

export default function Login(props) {

    //Opciones de sexo
    const opciones_sexo = [
        {value: "", label: "Sexo"},
        {value: "MASCULINO", label: "Hombre"},
        {value: "FEMENINO", label: "Mujer"},
    ];



    //Valor por defecto para datepicker
    const [birthDate, setBirthDate] = useState(null);

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
                    />
                </div>
                <div class="form-group">
                    <DatePicker
                        dateFormat="dd-MM-yyyy"
                        placeholderText="Fecha De Nacimiento"
                        selected={birthDate}
                    />
                </div>
                <div class="form-group">
                    <select class="form-group">
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
                    ¿Ya Tienes Una Cuenta? <span className="link_registrar">
                        Iniciar Sesión
                    </span>
                </p>
            </form>
        </React.Fragment>
    )
}