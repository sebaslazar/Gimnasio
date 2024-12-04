import { Card, Placeholder } from 'react-bootstrap';
import styles from './MembresiasPage.module.css';
import { useEffect, useState } from 'react';
import { getMisMembresiasDisplay } from '../../services/general';
import { useUser } from '../../contexts/UserContext';
import MyNavbar from '../../components/NavbarCliente';
import { Link } from 'react-router-dom';

const cardStyles = {
  backgroundColor: '#3A33BB',
  borderRadius: '20px',
  position: 'relative',
  paddingTop: '35px',
  width: '21rem',
  minHeight: '24rem',
};

export function MisMembresiasPage() {
  const [dataState, setDataState] = useState({
    loading: true,
    error: null,
    data: [],
  });

  const { token } = useUser();

  useEffect(() => {
    getMisMembresiasDisplay(token)
      .then((data) => {
        setDataState({ loading: false, error: null, data });
      })
      .catch((error) => {
        setDataState({ loading: false, error: error.message, data: [] });
      });
  }, [token]);

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
            <h1 className={`${styles.title}`}>No hay membresías disponibles</h1>
          </div>
        </Card.Body>
      </Card>
    );
  } else {
    cards = dataState.data.map((item, index) => (
      <MemberCard key={index} {...item} />
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
        <MyNavbar />
      </header>
      <div className={`${styles.titleSection}`}>
        <div className={`${styles.titleContainer}`}>
          <h1 className={`${styles.title}`}>Mis Membresías</h1>
        </div>
      </div>
      <div className={`${styles.cardSection}`}>{cards}</div>
    </>
  );
}

/**
 * @param {{
 *   title: string,
 *   price: number,
 *   features: string[]
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
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <div className={`${styles.footer}`}>
          <span>Desde:</span>
          <button className={`btn btn-primary mt-8 ${styles.btn}`}>
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

function PlaceHolderCard() {
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
