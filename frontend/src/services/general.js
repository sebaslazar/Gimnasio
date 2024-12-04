import axios from "axios";

/**
 * @typedef {Object} MembresiaDysplay
 * @property {string} id
 * @property {string} title
 * @property {number} price
 * @property {string[]} features
 */

/**
 * @type {MembresiaDysplay[]}
 */
const mockMembresias = [
  {
    id: '1',
    title: 'Estándar',
    price: 50000,
    features: [
      'Membresía estándar con acceso a entrenamientos',
      'Máximo 40 Miembros',
      'Duración de 1 mes',
      'Descuento del 20% en todas las actividades',
    ],
  },
  {
    id: '2',
    title: 'Premium',
    price: 100000,
    features: [
      'Membresía premium con acceso a entrenamientos',
      'Máximo 60 Miembros',
      'Duración de 1 mes',
      'Descuento del 30% en todas las actividades',
    ],
  },
  {
    id: '3',
    title: 'VIP',
    price: 150000,
    features: [
      'Membresía VIP con acceso a entrenamientos',
      'Máximo 80 Miembros',
      'Duración de 1 mes',
      'Descuento del 40% en todas las actividades',
    ],
  },
];

/**
 * Retorna las membresias disponibles
 * @param {string} token
 * @returns {Promise<MembresiaDysplay[]>}
 */
export function getMembresiasDisplay(token) {
  // return axios
  //   .get('http://localhost:8888/admin/membresias', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then(({ data, status }) => {
  //     if (status === 200) {
  //       return (data.resultado ?? []).map((membresia) => ({
  //           id: membresia.id,
  //           title: membresia.nombre,
  //           price: membresia.precio,
  //           features: membresia.caracteristicas,
  //         }));
  //     } else {
  //       throw new Error('Error al cargar los datos');
  //     }
  //   });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMembresias);
    }, 1000);
  });
}