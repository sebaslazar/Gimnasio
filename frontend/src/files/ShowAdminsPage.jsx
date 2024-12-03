import { getAdministradores } from '../services/admin';
import { ListTemplate } from '../templates/ListTemplate';

// @ts-check

export function AdminsPage() {
  return (
    <ListTemplate getData={getAdministradores} title='Administradores' />
  );
}