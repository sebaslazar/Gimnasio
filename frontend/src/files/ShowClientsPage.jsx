import { getClientes } from '../services/admin';
import { UserListTemplate } from '../templates/UserListTemplate';

// @ts-check

export function ClientsPage() {
  return (
    <UserListTemplate getData={getClientes} title='Clientes' />
  );
}