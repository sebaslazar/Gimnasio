import { getMembresias } from '../services/admin';
import { ListTemplate } from '../templates/ListTemplate';

const MEMBERSHIP_HEADERS = [
  'nombre',
  'precio',
  {
    value: 'duracion',
    display: 'Duración',
  },
];

export function MembershipsPage() {
  return (
    <ListTemplate getData={getMembresias} title='Membresías' headers={MEMBERSHIP_HEADERS} />
  );
}