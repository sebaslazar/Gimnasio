import { getProveedores } from '../services/admin';
import { UserListTemplate } from '../templates/UserListTemplate';

// @ts-check

export function ProvidersPage() {
  return (
    <UserListTemplate getData={getProveedores} title='Proveedores' />
  );
}