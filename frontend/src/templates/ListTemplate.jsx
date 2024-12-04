import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Table, Tbody, Thead } from '../components/Table';
import { IdIcon, SexIcon, TelefoneIcon, UserIcon } from '../components/icons';
import { useUser } from '../contexts/UserContext';
import { PageLayout } from '../layouts/PageLayout';
import { toPascalCase } from '../utils';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { Link } from 'react-router-dom';
import MyNavbar from '../components/NavbarCliente';

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
 * @typedef {Object} HeaderObject
 * @property {string} value
 * @property {string} display
 */

/**
 * @typedef {(HeaderObject | string)[]} Header
 */

/**
 * @typedef {Header[]} Headers
 */

/**
 * Returns the header value
 * @param {Header} header
 * @returns {string}
 */
function getHeaderValue(header) {
  if (typeof header === 'string') {
    return header;
  }
  return header.value;
}

/**
 * Returns the header display
 * @param {Header} header
 * @returns {string}
 */
function getHeaderDisplay(header) {
  if (typeof header === 'string') {
    return header;
  }
  return header.display;
}

/**
 * @type {Headers}
 */
const DEFAULT_HEADERS = [
  'nombre',
  {
    value: 'identificacion',
    display: 'Identificación',
  },
  {
    value: 'telefono',
    display: 'Teléfono',
  },
  'sexo',
];

/**
 * 
 * @param {{
 *   getData: (token: string) => Record<string, string>[],
 *   title: string,
 *   headers: Headers,
 * }} props 
 * @returns 
 */
export function ListTemplate({
  title='undefined',
  getData = defaultGetData,
  headers = DEFAULT_HEADERS,
}) {
  const {token, auth} = useUser();
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
          <Table.Td key={getHeaderValue(header)}>
            {ICON_MAP[getHeaderValue(header)]} {client[getHeaderValue(header)]}
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
      <header className="d-flex justify-content-between align-items-center p-4">
        <Link to="/" style={{
          textDecoration: 'none',
        }}>
          <h1 className="logo">GYMCONTROL</h1>
        </Link>

        <MyNavbar rango_token={auth?.rango ?? 'Cliente'} />
      </header>
      <PageLayout title={title}>
          <Table>
            <Thead>
              <Table.Tr>
                {headers.map((header) => (
                  <Table.Th key={getHeaderValue(header)}>{toPascalCase(getHeaderDisplay(header))}</Table.Th>
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
