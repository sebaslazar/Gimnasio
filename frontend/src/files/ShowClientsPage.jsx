import { Helmet } from "react-helmet";
import { MainLayout } from "../layouts/PageLayout";
import { Table, Tbody } from '../components/Table';

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
              <tr>
                <Table.Td>Carlos Andres Mauricio Santana</Table.Td>
                <Table.Td>123456789</Table.Td>
                <Table.Td>1234567</Table.Td>
                <Table.Td>Masculino</Table.Td>
              </tr>
              <tr>
                <Table.Td>Andrea</Table.Td>
                <Table.Td>987654321</Table.Td>
                <Table.Td>7654321</Table.Td>
                <Table.Td>Femenino</Table.Td>
              </tr>
            </Tbody>
          </Table>
        </div>
      </MainLayout>
    </>
  );
}