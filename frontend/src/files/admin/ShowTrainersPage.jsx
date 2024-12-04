import { getEntrenadores } from '../../services/admin';
import { ListTemplate } from '../../templates/ListTemplate';

// @ts-check

export function TrainersPage() {
  return (
    <ListTemplate getData={getEntrenadores} title='Entrenadores' />
  );
}