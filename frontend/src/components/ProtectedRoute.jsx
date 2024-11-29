import { Navigate, Outlet } from 'react-router';
import { useUser } from '../contexts/UserContext';
import React from 'react';

/** @type {{
  ADMIN: 'Administrador',
  USER: 'Cliente',
  TRAINER: 'Entrenador',
}} */
export const AUTH_RANGES = {
  ADMIN: 'Administrador',
  USER: 'Cliente',
  TRAINER: 'Entrenador',
};

/**
 * @typedef {typeof AUTH_RANGES[keyof typeof AUTH_RANGES]} AuthRange
 */

/**
 * @typedef {AuthRange | AuthRange[]} AuthRanges
 */

/**
 * @description Should be used as a Layout component to protect routes
 * 
 * @component
 * @description A component that protects routes by checking authentication before rendering children
 * @param {React.PropsWithChildren & {
 *  fallbackPath: string,
 *  ranges: AuthRanges,
 * }} props - Component props
 * @returns {React.ReactElement|null} The protected route content if authenticated, null or redirect otherwise
 */
export function ProtectedRoutes({
  children,
  fallbackPath = '/login',
  ranges,
  ..._rest
}) {
  const { token } = useUser();

  return token ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to={fallbackPath} />
  );
}
