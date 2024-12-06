import { Link } from 'react-router-dom';
import { getDisplayMembresias } from '../../services/admin';
import { ListTemplate } from '../../templates/ListTemplate';

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
    <>
      <ListTemplate getData={getDisplayMembresias} title='Membresías' headers={MEMBERSHIP_HEADERS} />
      <div
        styles={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <Link to='/admin/crear_membresia'>
          <button
            type='button'
            className='btn btn-primary'
          >
            Crear membresía
          </button>
        </Link>
      </div>
    </>
  );
}