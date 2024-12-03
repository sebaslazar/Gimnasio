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
            {/* Usamos Link en lugar de Nav.Link */}
            <Nav.Link as={Link} to="/inicio" className="text-white me-5">Inicio</Nav.Link>
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
