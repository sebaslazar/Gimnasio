import { getAdministradores } from '../services/admin';
import { UserListTemplate } from '../templates/UserListTemplate';

// @ts-check

export function AdminsPage() {
  return (
    <UserListTemplate getData={getAdministradores} title='Administradores' />
  );
}