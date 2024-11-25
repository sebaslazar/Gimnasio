import { Helmet } from "react-helmet";
import { Outlet } from "react-router";

/**
 * @param {{children: import('react').ReactNode}} props
 */
export function MainLayout() {
  return (
    <div className="app-container">
      <Helmet>
          <meta charSet="utf-8"/>
          <title>Gymcontrol</title>
      </Helmet>
      <div className="centered-div">
        <Outlet />
      </div>
    </div>
  );
}