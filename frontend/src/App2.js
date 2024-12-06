import './App.css';
import React from "react";
import { Helmet } from "react-helmet";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.js";
import Login from './files/UI-02.js';
import RegistroCliente from './files/UI-03.js';
import { useUser } from "./contexts/UserContext.jsx";
import { MainLayout } from './layouts/MainLayout.jsx';
import { ClientsPage } from './files/admin/ShowClientsPage.jsx';
import { ProtectedRoutes } from './components/ProtectedRoute.jsx';
import { AdminsPage } from './files/admin/ShowAdminsPage.jsx';
import { TrainersPage } from './files/admin/ShowTrainersPage.jsx';
import { ProvidersPage } from './files/admin/ShowProvidersPage.jsx';
import { MembershipsPage } from './files/admin/ShowMemberships.jsx';
import { ActiveClientsPage } from './files/entrenador/ShowActiveClients.jsx';
import { MembresiasPage } from './files/cliente/MembresiasPage.jsx';
import { MisMembresiasPage } from './files/cliente/MisMembresiasPage.jsx';
import { MembresiaPage } from './files/admin_cli/MembresiaPage.jsx';

document.documentElement.lang = "es"; //Establece el idioma de la página en español

function App() {
  const {token} = useUser();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Gymcontrol</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/registro_cliente" element={!token ? <RegistroCliente /> : <Navigate to="/" />} />
        </Route>

        {/* AQUÍ DEBEN IR LAS RUTAS DEL ADMINISTRADOR */}
        <Route element={<ProtectedRoutes fallbackPath="/login" ranges={['Administrador']} />}>
          <Route path="/admin/clientes" element={<ClientsPage />} />
          <Route path="/admin/entrenadores" element={<TrainersPage />} />
          <Route path="/admin/administradores" element={<AdminsPage />} />
          <Route path="/admin/proveedores" element={<ProvidersPage />} />
          <Route path="/admin/membresias" element={<MembershipsPage />} />
          <Route path="/admin/crear_membresia" element={<MembresiaPage />} />
        </Route>

        {/* AQUÍ DEBEN IR LAS RUTAS DEL ENTRENADOR */}
        <Route element={<ProtectedRoutes fallbackPath="/login" ranges={['Entrenador']} />}>
          <Route path="/entrenador/clientes_activos" element={<ActiveClientsPage />} />
        </Route>

        {/* AQUÍ DEBEN IR LAS RUTAS DEL CLIENTE */}
        <Route element={<ProtectedRoutes fallbackPath="/login" ranges={['Cliente']} />}>
          <Route path="/membresias" element={<MembresiasPage />} />
          <Route path="/mis_membresias" element={<MisMembresiasPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
