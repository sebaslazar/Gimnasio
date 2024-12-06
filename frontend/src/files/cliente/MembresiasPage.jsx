import { useEffect, useState } from 'react';
import { Card, Offcanvas, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyNavbar from '../../components/NavbarCliente';
import { useUser } from '../../contexts/UserContext';
import { comprarMembresia, getMembresiasDisplay } from '../../services/client';
import styles from './MembresiasPage.module.css';

import { toast } from 'react-toastify';

const cardStyles = {
  backgroundColor: '#3A33BB',
  borderRadius: '20px',
  position: 'relative',
  paddingTop: '35px',
  width: '21rem',
  minHeight: '24rem',
};

export function MembresiasPage() {
  const { isLogged, auth, token } = useUser();
  
  const [dataState, setDataState] = useState({
    loading: true,
    error: null,
    data: [],
  });

  const [confirmData, setConfirmData] = useState({
    showCanvas: false,
    data: null,
  });

  const fetchMembresias = () => {
    getMembresiasDisplay(token)
      .then((data) => {
        setDataState({ loading: false, error: null, data });
      })
      .catch((error) => {
        setDataState({ loading: false, error: error.message, data: [] });
      });
  };

  const onStartBuy = (data) => {
    setConfirmData({
      showCanvas: true,
      data,
    });
  };

  const onCancelBuy = () => {
    setConfirmData({
      showCanvas: false,
      data: null,
    });
  };

  const onConfirmBuy = async () => {
    try {
      await comprarMembresia({
        id: confirmData.data.id,
        token,
      });

      toast.success('Membresía comprada con éxito');
      setConfirmData({
        showCanvas: false,
        data: null,
      });
      fetchMembresias();
    } catch (error) {
      console.error(error);
      toast.error('Error al comprar la membresía');
    }
  };

  useEffect(fetchMembresias, [token]);

  let cards;

  if (dataState.loading) {
    cards = Array.from({ length: 3 }, (_, index) => (
      <PlaceHolderCard key={index} />
    ));
  } else if (dataState.error) {
    cards = (
      <Card className={`${styles.card}`} style={cardStyles}>
        <Card.Body>
        <div
          className={`${styles.titleContainer} ${styles.absoluteCenterTitle}`}
        >
          <h1 className={`${styles.title}`}>Error</h1>
        </div>
          <p>{dataState.error}</p>
        </Card.Body>
      </Card>
    );
  } else if (dataState.data.length === 0) {
    cards = (
      <Card className={`${styles.card}`} style={cardStyles}>
        <Card.Body>
          <div className={`${styles.titleContainer}`}>
            <h1
              className={`${styles.title}`}
              style={{
                whiteSpace: 'normal'
              }}
            >No hay membresías disponibles</h1>
          </div>
        </Card.Body>
      </Card>
    );
  } else {
    cards = dataState.data.map((item, index) => (
      <MemberCard 
        key={item.id}
        onClick={() => onStartBuy(item)}
        {...item}
      />
    ));
  }

  return (
    <>
      <header className="d-flex justify-content-between align-items-center p-4">
        <Link to="/" style={{
          textDecoration: 'none',
        }}>
          <h1 className="logo">GYMCONTROL</h1>
        </Link>

        <MyNavbar rango_token={auth?.rango ?? 'Cliente'} />
      </header>
      <Offcanvas 
        show={confirmData.showCanvas}
        onHide={onCancelBuy}
        placement="bottom"
        style={{
          backgroundColor: '#181640',
          color: 'white',
          fontFamily: 'Montserrat',
        }}
      >
        <Offcanvas.Header closeButton closeVariant='white'>
          <Offcanvas.Title 
            style={{
              fontFamily: 'Hyperwave',
              fontSize: '2.5rem',
              lineHeight: 'normal',
            }}
          >
            ¿Estás seguro de que deseas continuar?
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>
            {`Estás a punto de comprar la membresía "${confirmData.data?.title}" por ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(confirmData.data?.price)} COP.`}
          </p>
          <p>
            Al comprar esta membresía, aceptas los términos y condiciones de uso
            de GYMCONTROL.
          </p>
          <div className="d-flex justify-content-start gap-3 ps-2">
            <button
              className="btn btn-primary"
              onClick={onConfirmBuy}
            >
              Sí
            </button>
            <button
              className="btn btn-danger"
              onClick={onCancelBuy}
            >
              No
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className={`${styles.titleSection}`}>
        <div className={`${styles.titleContainer}`}>
          <h1 className={`${styles.title}`}>Membresías Disponibles</h1>
        </div>
      </div>
      <div className={`${styles.cardSection}`}>{cards}</div>
      {(isLogged && auth.rango==='Cliente') && (<div className={`${styles.titleSection}`}>
        <Link to='/mis_membresias' className={`${styles.squareButton}`}>Mis Membresías</Link>
      </div>)}
    </>
  );
}

/**
 * @param {{
 *   title: string,
 *   price: number,
 *   features: string[]
 *   onClick: () => void
 * }} props
 * @returns 
 */
function MemberCard({
  title = 'Estándar',
  price = 50000,
  features = [
    'Membresía estándar con acceso a entrenamientos',
    'Máximo 40 Miembros',
    'Duración de 1 mes',
    'Descuento del 20% en todas las actividades',
  ],
  onClick,
}) {
  return (
    <Card className={`${styles.card}`} style={cardStyles}>
      <Card.Body
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          className={`${styles.titleContainer} ${styles.absoluteCenterTitle}`}
        >
          <h1 className={`${styles.title}`}>{title}</h1>
        </div>
        <ul className={`${styles.featureList}`}>
          {features.map((feature, index) => (
            <li key={index}>
              {feature}
            </li>
          ))}
        </ul>
        <div className={`${styles.footer}`}>
          <span>Desde:</span>
          <button 
            className={`btn btn-primary mt-8 ${styles.btn}`}
            onClick={onClick}
          >
            {`${new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(price)} COP`}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

function PlaceHolderCard(){
  return (
    <Card className={`${styles.card}`} style={cardStyles}>
      <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
    </Card>
  );
}