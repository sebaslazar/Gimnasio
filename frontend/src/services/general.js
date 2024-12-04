import axios from "axios";

/**
 * @typedef {Object} Membresia
 * @property {string} ID_membresia
 * @property {string} nombre
 * @property {number} precio
 * @property {string} descripcion
 * @property {number} max_miembros
 * @property {number} duracion_meses
 * @property {number} descuento
 */

/**
 * @typedef {Object} MembresiaDysplay
 * @property {string} id
 * @property {string} title
 * @property {number} price
 * @property {string[]} features
 */

/**
 * Convierte una membresia a un objeto MembresiaDysplay
 * @param {Membresia} membresia
 * @returns {MembresiaDysplay}
 */
function membresia2Display(membresia) {

  const duracion = membresia['duracion_meses'];
  return ({
    id: membresia['ID_membresia'],
    title: membresia.nombre.toLowerCase().startsWith('membresía ') ? membresia.nombre.split(' ')[1] : `Membresia ${membresia.nombre}`,
    price: membresia.precio,
    features: [
      membresia.descripcion,
      `Máximo ${membresia.max_miembros} Miembros`,
      `Duración de ${duracion} mes${duracion > 1 ? 'es' : ''}`,
      membresia.descuento ? `Con un descuento especial del ${membresia.descuento}% si lo compras ya` : 'Sin descuento',
    ],
  });
}

/**
 * Retorna las membresias disponibles
 * @param {string} token
 * @returns {Promise<MembresiaDysplay[]>}
 */
export function getMembresiasDisplay(token) {
  return axios
    .get('http://localhost:8888/info/membresias', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data, status }) => {
      if (status === 200) {
        return (data.resultado ?? []).map(membresia2Display);
      } else {
        throw new Error('Error al cargar los datos');
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return [];
      }
      throw error;
    });
}

/**
 * Retorna las membresias disponibles
 * @param {string} token
 * @returns {Promise<MembresiaDysplay[]>}
 */
export function getMisMembresiasDisplay(token) {
  return axios
    .get('http://localhost:8888/cliente/membresias_compradas', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data, status }) => {
      if (status === 200) {
        return (data.resultado ?? []).map(membresia2Display);
      } else {
        throw new Error('Error al cargar los datos');
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return [];
      }
      throw error;
    });
}