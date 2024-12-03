import { getClientesActivos } from '../../services/entrenador';
import { ListTemplate } from '../../templates/ListTemplate';

// @ts-check

export function ActiveClientsPage() {
  return (
    <ListTemplate getData={getClientesActivos} title='Clientes Activos' />
  );
}