import { getClientes } from '../services/admin';
import { ListTemplate } from '../templates/ListTemplate';

// @ts-check

export function ClientsPage() {
  return (
    <ListTemplate getData={getClientes} title='Clientes' />
  );
}