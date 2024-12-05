/*
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const MyNavbar = () => {
  return (
    <Navbar variant="dark" className="py-8">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            <Nav.Link as={Link} to="/" className="text-white me-5">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/actividades" className="text-white me-5">Actividades</Nav.Link>
            <Nav.Link as={Link} to="/citas" className="text-white me-5">Citas</Nav.Link>
            <Nav.Link as={Link} to="/entrenamientos" className="text-white me-5">Entrenamientos</Nav.Link>
            <Nav.Link as={Link} to="/membresias" className="text-white me-5">Membresías</Nav.Link>
            <Nav.Link as={Link} to="/familia" className="text-white me-5">Familia</Nav.Link>
            <Nav.Link as={Link} to="/perfil" className="text-white me-5">Perfil</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
*/
// MyNavbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
// import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { useUser } from '../contexts/UserContext'; 







const MyNavbar = ({ rango_token }) => {

  const {  logOut } = useUser();
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
  return (
    <Navbar variant="dark" className="py-8">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            <Nav.Link as={Link} to="/" className="text-white me-5">Inicio</Nav.Link>
          

            {rango_token === "Cliente" && (
              <>
                <Nav.Link as={Link} to="/actividades" className="text-white me-5">Actividades</Nav.Link>
                <Nav.Link as={Link} to="/citas" className="text-white me-5">Citas</Nav.Link>
                <Nav.Link as={Link} to="/entrenamientos" className="text-white me-5">Entrenamientos</Nav.Link>
                <Nav.Link as={Link} to="/membresias" className="text-white me-5">Membresías</Nav.Link>
                <Nav.Link as={Link} to="/familia" className="text-white me-5">Familia</Nav.Link>
                <Nav.Link as={Link} to="/perfil" className="text-white me-5">Perfil</Nav.Link>
              </>
            )}

            {rango_token === "Entrenador" && (
              <>
                <Nav.Link as={Link} to="/perfil" className="text-white me-5">Mi Perfil</Nav.Link>
                <Nav.Link as={Link} to="/entrenador/clientes_activos" className="text-white me-5">Clientes</Nav.Link>
                <Nav.Link as={Link} to="/entrenamientos" className="text-white me-5">Entrenamientos</Nav.Link>
              </>
            )}

            {rango_token === "Administrador" && (
              <>
                <Nav.Link as={Link} to="/admin/administradores" className="text-white me-5">Administradores</Nav.Link>
                <Nav.Link as={Link} to="/admin/proveedores" className="text-white me-5">Proveedores</Nav.Link>
                <Nav.Link as={Link} to="/admin/entrenadores" className="text-white me-5">Entrenadores</Nav.Link>
                <Nav.Link as={Link} to="/admin/clientes" className="text-white me-5">Clientes</Nav.Link>

                <Nav.Link as={Link} to="/admin/membresias" className="text-white me-5">Membresias</Nav.Link>
              </>
            )}

            <button
            type="button"
            className="btn  text-white"
            onClick={(event) => {
              onClickHandler(event);
            }}
          >
            Cerrar Sesión
          </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
