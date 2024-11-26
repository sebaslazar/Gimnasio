import { Helmet } from "react-helmet";
import { MainLayout } from "../layouts/PageLayout";

export function ClientsPage() {
  return (
    <>
      <Helmet>
        <title>Gymcontrol - Clientes</title>
      </Helmet>
      <MainLayout>
        <h2>Clientes</h2>
      </MainLayout>
    </>
  );
}