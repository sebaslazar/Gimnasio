import { Route, Navigate } from "react-router";
import { useUser } from "../contexts/UserContext";

/**
 * @component
 * @extends {RouteProps}
 * @description A component that protects routes by checking authentication before rendering children
 * @param {import('react-router').RouteProps & {fallbackPath: string}} props - Component props
 * @returns {React.ReactElement|null} The protected route content if authenticated, null or redirect otherwise
 */
function ProtectedRoute({
  children,
  element,
  fallbackPath='/login',
  ...rest
}) {
  const { token } = useUser();

  return (
    <Route
      {...rest}
      element={token ? element : 
        <Navigate to={fallbackPath} replace />
      }
    >
      {token ? children : null}
    </Route>
  );
}