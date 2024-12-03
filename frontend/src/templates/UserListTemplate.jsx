import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Table, Tbody, Thead } from '../components/Table';
import { IdIcon, SexIcon, TelefoneIcon, UserIcon } from '../components/icons';
import { useUser } from '../contexts/UserContext';
import { PageLayout } from '../layouts/PageLayout';

function defaultGetData(_) {
  return Promise.reject(new Error('getData not implemented'));
}

/**
 * @typedef {Object} User
 * @property {string} nombre
 * @property {string} identificacion
 * @property {string} telefono
 * @property {string} sexo
 */


/**
 * 
 * @param {{
 *   getData: (token: string) => User[],
 *   title: string,
 * }} props 
 * @returns 
 */
export function UserListTemplate({
  title='undefined',
  getData = defaultGetData, 
}) {
  const {token} = useUser();
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: [],
  });

  let content;

  useEffect(() => {
    getData(token)
      .then((data) => {
        setState({
          loading: false,
          error: null,
          data: data,
        });
      })
      .catch((error) => {
        console.error(error);
        setState({
          loading: false,
          error: error,
          data: [],
        });
      });
  }, [token, getData]);

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
      <PageLayout title={title}>
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
      </PageLayout>
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
