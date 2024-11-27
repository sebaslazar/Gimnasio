import styles from './styles.module.css';

/**
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The children nodes to be rendered inside the table.
 * @returns {JSX.Element} The rendered table component.
 */
function Th({children}) {
  <th className={styles.cell}><div className={styles.headDiv}>{children}</div></th>
}

/**
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The children nodes to be rendered inside the table.
 * @returns {JSX.Element} The rendered table component.
 */
function Td({children}) {
  <td className={`${styles.cell} ${styles.td}`}>{children}</td>
}

/**
 * Table component to display a list of users.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The children nodes to be rendered inside the table.
 * @returns {JSX.Element} The rendered table component.
 */
export function Table({children}){
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.cell}><div className={styles.headDiv}>Nombre</div></th>
          <th className={styles.cell}><div className={styles.headDiv}>Identificacion</div></th>
          <th className={styles.cell}><div className={styles.headDiv}>Telefono</div></th>
          <th className={styles.cell}><div className={styles.headDiv}>Sexo</div></th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        <tr>
          <td className={`${styles.cell} ${styles.td}`}>Carlos Andres Mauricio Santana</td>
          <td className={`${styles.cell} ${styles.td}`}>123456789</td>
          <td className={`${styles.cell} ${styles.td}`}>1234567</td>
          <td className={`${styles.cell} ${styles.td}`}>Masculino</td>
        </tr>
        <tr>
          <td className={`${styles.cell} ${styles.td}`}>Andrea</td>
          <td className={`${styles.cell} ${styles.td}`}>987654321</td>
          <td className={`${styles.cell} ${styles.td}`}>7654321</td>
          <td className={`${styles.cell} ${styles.td}`}>Femenino</td>
        </tr>
      </tbody>
    </table>
  );
}

Table.Th = Th;
Table.Td = Td;