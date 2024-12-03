import { getProveedores } from '../services/admin';
import { ListTemplate } from '../templates/ListTemplate';

// @ts-check
const PROVIDER_HEADERS = ['nombre', 'identificacion', 'telefono', 'direccion'];

export function ProvidersPage() {
  return (
    <ListTemplate getData={getProveedores} title='Proveedores' headers={PROVIDER_HEADERS} />
  );
}