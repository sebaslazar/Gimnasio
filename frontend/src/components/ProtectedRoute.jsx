import { Navigate, Outlet } from 'react-router';
import { useUser } from '../contexts/UserContext';
import React from 'react';
import { toast } from 'react-toastify';

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
 *  unauthorizedPath: string,
 *  ranges: AuthRanges,
 * }} props - Component props
 * @returns {React.ReactElement|null} The protected route content if authenticated, null or redirect otherwise
 */
export function ProtectedRoutes({
  children,
  fallbackPath = '/login',
  unauthorizedPath = '/',
  ranges,
  ..._rest
}) {
  const { auth, isLogged } = useUser();
  const range = auth?.rango;

  const authorized = isLogged && (
    Array.isArray(ranges)
      ? ranges.includes(range)
      : ranges === range
  );

  if (!isLogged) {
    return <Navigate to={fallbackPath} />;
  } else if (!authorized) {
    console.error(`User is not authorized to access this route. Required: ${ranges}, Got: ${auth}`);
    toast.error('No tienes permisos para acceder a esta ruta');
    
    return <Navigate to={unauthorizedPath} />;
  }


  return (
    <>
      {children}
      <Outlet />
    </>
  );
}
