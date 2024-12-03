import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Table, Tbody, Thead } from '../components/Table';
import { IdIcon, SexIcon, TelefoneIcon, UserIcon } from '../components/icons';
import { useUser } from '../contexts/UserContext';
import { PageLayout } from '../layouts/PageLayout';
import { toPascalCase } from '../utils';
import { MapPinIcon } from '../components/icons/MapPinIcon';

const ICON_MAP = {
  nombre: <UserIcon />,
  identificacion: <IdIcon />,
  telefono: <TelefoneIcon />,
  sexo: <SexIcon />,
  direccion: <MapPinIcon />,
}

function defaultGetData(_) {
  return Promise.reject(new Error('getData not implemented'));
}

/**
 * 
 * @param {{
 *   getData: (token: string) => Record<string, string>[],
 *   title: string,
 *   headers: string[],
 * }} props 
 * @returns 
 */
export function ListTemplate({
  title='undefined',
  getData = defaultGetData,
  headers = ['nombre', 'identificacion', 'telefono', 'sexo'],
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
        {headers.map((header) => (
          <Table.Td key={header}>
            {ICON_MAP[header]} {client[header]}
          </Table.Td>
        ))}
      </Table.Tr>
    ));
  }

  return (
    <>
      <Helmet>
        <title>Gymcontrol - {title}</title>
      </Helmet>
      <PageLayout title={title}>
          <Table>
            <Thead>
              <Table.Tr>
                {headers.map((header) => (
                  <Table.Th key={header}>{toPascalCase(header)}</Table.Th>
                ))}
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
