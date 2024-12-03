import { getProveedores } from '../services/admin';
import { ListTemplate } from '../templates/ListTemplate';

// @ts-check
const PROVIDER_HEADERS = [
  'nombre',
  {
    value: 'identificacion',
    display: 'Identificación',
  },
  {
    value: 'telefono',
    display: 'Teléfono',
  },
  {
    value: 'direccion',
    display: 'Dirección',
  },
];

export function ProvidersPage() {
  return (
    <ListTemplate getData={getProveedores} title='Proveedores' headers={PROVIDER_HEADERS} />
  );
}