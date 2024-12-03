import { getMembresias } from '../services/admin';
import { ListTemplate } from '../templates/ListTemplate';

const MEMBERSHIP_HEADERS = [
  'nombre',
  'precio',
  'duracion',
];

export function MembershipsPage() {
  return (
    <ListTemplate getData={getMembresias} title='Membresias' headers={MEMBERSHIP_HEADERS} />
  );
}