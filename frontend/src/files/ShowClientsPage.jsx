import { Helmet } from "react-helmet";
import { MainLayout } from "../layouts/PageLayout";
import { Table, Tbody } from '../components/Table';
// @ts-check

const clientData = [
  {
    nombre: 'Pepito Perez Perez',
    identificacion: '123456789',
    telefono: '1234567',
    sexo: 'Masculino',
  },
  {
    nombre: 'Carlos Mauricio Santana',
    identificacion: '123456787',
    telefono: '1234567',
    sexo: 'Masculino',
  },
  {
    nombre: 'Alan Brito Delgado',
    identificacion: '123456788',
    telefono: '1234567',
    sexo: 'Masculino',
  },
];

export function ClientsPage() {
  return (
    <>
      <Helmet>
        <title>Gymcontrol - Clientes</title>
      </Helmet>
      <MainLayout>
        <div style={{margin: 'auto', width: 'fit-content'}}>
          <Table>
            <thead>
              <tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Identificacion</Table.Th>
                <Table.Th>Telefono</Table.Th>
                <Table.Th>Sexo</Table.Th>
              </tr>
            </thead>
            <Tbody>
              {clientData.map((client) => (
                <tr key={client.identificacion}>
                  <Table.Td>{client.nombre}</Table.Td>
                  <Table.Td>{client.identificacion}</Table.Td>
                  <Table.Td>{client.telefono}</Table.Td>
                  <Table.Td>{client.sexo}</Table.Td>
                </tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </MainLayout>
    </>
  );
}