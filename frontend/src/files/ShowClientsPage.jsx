import { Helmet } from 'react-helmet';
import { PAgeLayout } from '../layouts/PageLayout';
import { Table, Tbody, Thead } from '../components/Table';
import { IdIcon, SexIcon, TelefoneIcon, UserIcon } from '../components/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

// @ts-check

export function ClientsPage() {
  const {token} = useUser();
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: [],
  });

  let content;

  useEffect(() => {
    axios
      .get('http://localhost:8888/admin/clientes', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data, status }) => {
        if (status === 200) {
          setState({
            loading: false,
            error: null,
            data: data.resultado.map((client) => ({
              nombre: client.nombre,
              identificacion: client['ID_cliente'],
              telefono: client.telefono,
              sexo: client.sexo,
            })),
          });
        } else {
          setState({
            loading: false,
            error: 'Error al cargar los datos',
            data: [],
          });
        }
      })
      .catch((error) => {
        setState({
          loading: false,
          error: error,
          data: [],
        });
      });
  }, [token]);

  if (state.loading) {
    content = <SpecialTableContent content="Cargando..." />;
  } else if (state.error) {
    content = <SpecialTableContent content="Error al cargar los datos" />;
  } else if (state.data.length === 0) {
    content = <SpecialTableContent content="No hay datos para mostrar" />;
  } else {
    content = state.data.map((client) => (
      <Table.Tr key={client.identificacion}>
        <Table.Td>
          <UserIcon />
          {client.nombre}
        </Table.Td>
        <Table.Td>
          <IdIcon />
          {client.identificacion}
        </Table.Td>
        <Table.Td>
          <TelefoneIcon />
          {client.telefono}
        </Table.Td>
        <Table.Td>
          <SexIcon />
          {client.sexo}
        </Table.Td>
      </Table.Tr>
    ));
  }

  return (
    <>
      <Helmet>
        <title>Gymcontrol - Clientes</title>
      </Helmet>
      <PAgeLayout>
          <Table>
            <Thead>
              <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Identificacion</Table.Th>
                <Table.Th>Telefono</Table.Th>
                <Table.Th>Sexo</Table.Th>
              </Table.Tr>
            </Thead>
            <Tbody>{content}</Tbody>
          </Table>
      </PAgeLayout>
    </>
  );
}

/**
 *
 * @param {object} param
 * @param {string} param.content
 * @returns
 */
function SpecialTableContent({ content }) {
  return (
    <Table.Tr>
      <Table.Td
        colSpan={4}
        style={{
          width: '100%',
          height: '300px',
          fontSize: '2em',
        }}
      >
        {content}
      </Table.Td>
    </Table.Tr>
  );
}
