import { getDisplayMembresias } from '../services/admin';
import { ListTemplate } from '../templates/ListTemplate';

const MEMBERSHIP_HEADERS = [
  'nombre',
  {
    value: 'identificacion',
    display: 'ID',
  },
  'precio',
  {
    value: 'duracion',
    display: 'Duración',
  },
];

export function MembershipsPage() {
  return (
    <ListTemplate getData={getDisplayMembresias} title='Membresías' headers={MEMBERSHIP_HEADERS} />
  );
}