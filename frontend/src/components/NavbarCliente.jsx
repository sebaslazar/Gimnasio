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
import 'bootstrap/dist/css/bootstrap.min.css';

const MyNavbar = ({ rango_token }) => {
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
                <Nav.Link as={Link} to="/clientes" className="text-white me-5">Clientes</Nav.Link>
                <Nav.Link as={Link} to="/entrenamientos" className="text-white me-5">Entrenamientos</Nav.Link>
              </>
            )}

            {rango_token === "Administrador" && (
              <>
                <Nav.Link as={Link} to="/usuarios" className="text-white me-5">Usuarios</Nav.Link>
                <Nav.Link as={Link} to="/reportes" className="text-white me-5">Reportes</Nav.Link>
                <Nav.Link as={Link} to="/configuraciones" className="text-white me-5">Configuraciones</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
