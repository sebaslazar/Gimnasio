import { getEntrenadores } from '../services/admin';
import { UserListTemplate } from '../templates/UserListTemplate';

// @ts-check

export function TrainersPage() {
  return (
    <UserListTemplate getData={getEntrenadores} title='Entrenadores' />
  );
}