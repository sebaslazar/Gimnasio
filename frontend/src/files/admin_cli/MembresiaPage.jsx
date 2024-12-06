import { Link, useNavigate } from 'react-router-dom';
import MyNavbar from '../../components/NavbarCliente';
import { useUser } from '../../contexts/UserContext';
import { PageLayout } from '../../layouts/PageLayout';
import { crearMembresia } from '../../services/admin';
import { toast } from 'react-toastify';

import styles from './membresiaPage.module.css';

export function MembresiaPage() {
  const { auth, token } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      nombre: form.nombre.value,
      descripcion: form.descripcion.value,
      descuento: parseFloat(form.descuento.value),
      max_miembros: parseInt(form.max_miembros.value),
      duracion_meses: parseInt(form.duracion_meses.value),
      precio: parseInt(form.precio.value),
    };

    try {
      await crearMembresia({ data, token: token });

      toast.success('Membresía creada correctamente');
      navigate('/admin/membresias');
    } catch (error) {
      console.error(error);
      toast.error('Error al crear la membresía');
    }
  };

  return (
    <>
      <header className="d-flex justify-content-between align-items-center p-4">
        <Link
          to="/"
          style={{
            textDecoration: 'none',
          }}
        >
          <h1 className="logo">GYMCONTROL</h1>
        </Link>

        <MyNavbar rango_token={auth?.rango ?? 'Cliente'} />
      </header>
      <PageLayout title="Membresías">
        <form
          className={`${styles.gridContainer} ${styles.borde}`}
          onSubmit={onSubmit}
        >
          <div className={`${styles.gridNombre}`}>
            <input
              type="text"
              name='nombre'
              placeholder="Nombre"
              className={`${styles.input}`}
            />
          </div>
          <div className={`${styles.gridDescripcion}`}>
            {/* Descripción */}
            <textarea
              name='descripcion'
              placeholder="Descripción"
              className={`${styles.textarea}`}
            />
          </div>
          <div className={`${styles.gridDescuento}`}>
            {/* Descuento (float between 0 and 1) */}
            <input
              type="number"
              name='descuento'
              min={0}
              max={1}
              step={0.01}
              placeholder="Descuento"
              className={`${styles.input}`}
            />
          </div>
          <div className={`${styles.gridMiembros}`}>
            {/* Miembros (cantidad)*/}
            <input
              name='max_miembros'
              type="number"
              min={0}
              placeholder="Miembros"
              className={`${styles.input}`}
            />
          </div>
          <div className={`${styles.gridDuracion}`}>
            {/* Duracion (meses) */}
            <input
              name='duracion_meses'
              type="number"
              min={0}
              placeholder="Duración (meses)"
              className={`${styles.input}`}
            />
          </div>
          <div className={`${styles.gridPrecio}`}>
            {/* Precio */}
            <input
              name='precio'
              type="number"
              min={0}
              placeholder="Precio"
              className={`${styles.input}`}
            />
          </div>
          <div className={`${styles.gridSubmit}`}>
            <button
              type="submit"
              className={`btn btn-primary ${styles.btn}`}
            >
              Crear
            </button>
          </div>
        </form>
      </PageLayout>
    </>
  );
}
