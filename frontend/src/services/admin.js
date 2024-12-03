import axios from "axios";

/**
 * @typedef {Object} Client
 * @property {string} nombre
 * @property {string} identificacion
 * @property {string} telefono
 * @property {string} sexo
 */

/**
 * 
 * @param {string} token 
 * @returns {Promise<Client[]>}
 * @throws {Error}
 */
export function getClientes(token) {
  return axios
  .get('http://localhost:8888/admin/clientes', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then(({ data, status }) => {
    if (status === 200) {
      return (data.resultado ?? []).map((client) => ({
          nombre: client.nombre,
          identificacion: client['ID_cliente'],
          telefono: client.telefono,
          sexo: client.sexo,
        }));
    } else {
      console.error(data);
      throw new Error('Error al cargar los datos');
    }
  })
  .catch((error) => {
    if (error.response?.status === 404) return [];
    console.error(error);
    throw new Error('Error al cargar los datos');
  });
}

/**
 * 
 * @param {string} token 
 * @returns {Promise<Client[]>}
 * @throws {Error}
 */
export function getAdministradores(token) {
  return axios
  .get('http://localhost:8888/admin/administradores', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then(({ data, status }) => {
    if (status === 200) {
      return (data.resultado ?? []).map((client) => ({
          nombre: client.nombre,
          identificacion: client['ID_admin'],
          telefono: client.telefono,
          sexo: client.sexo,
        }));
    } else {
      console.error(data);
      throw new Error('Error al cargar los datos');
    }
  })
  .catch((error) => {
    if (error.response?.status === 404) return [];
    console.error(error);
    throw new Error('Error al cargar los datos');
  });
}

/**
 * 
 * @param {string} token 
 * @returns {Promise<Client[]>}
 * @throws {Error}
 */
export function getEntrenadores(token) {
  return axios
  .get('http://localhost:8888/admin/entrenadores', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then(({ data, status }) => {
    if (status === 200) {
      return (data.resultado ?? []).map((client) => ({
          nombre: client.nombre,
          identificacion: client['ID_entrenador'],
          telefono: client.telefono,
          sexo: client.sexo,
        }));
    } else {
      console.error(data);
      throw new Error('Error al cargar los datos');
    }
  })
  .catch((error) => {
    if (error.response?.status === 404) return [];
    console.error(error);
    throw new Error('Error al cargar los datos');
  });
}

/**
 * 
 * @param {string} token 
 * @returns {Promise<Client[]>}
 * @throws {Error}
 */
export function getProveedores(token) {
  return axios
  .get('http://localhost:8888/admin/proveedores', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then(({ data, status }) => {
    if (status === 200) {
      return (data.resultado ?? []).map((client) => ({
          nombre: client.nombre,
          identificacion: client['ID_proveedor'],
          telefono: client.telefono,
          direccion: client.direccion,
        }));
    } else {
      throw new Error('Error al cargar los datos');
    }
  })
  .catch((error) => {
    console.error(error);
    if (error.response?.status === 404) return [];
    throw new Error('Error al cargar los datos');
  });
}