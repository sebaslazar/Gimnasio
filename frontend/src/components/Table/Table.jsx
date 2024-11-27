import styles from './styles.module.css';

/**
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The children nodes to be rendered inside the table.
 * @returns {JSX.Element} The rendered table component.
 */
function Th({children}) {
  return <th className={styles.cell}><div className={styles.headDiv}>{children}</div></th>
}

/**
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The children nodes to be rendered inside the table.
 * @returns {JSX.Element} The rendered table component.
 */
function Td({children}) {
  return <td className={`${styles.cell} ${styles.td}`}>{children}</td>
}

/**
 *
 * @param {React.HTMLProps<HTMLTableRowElement>} propstable.
 * @returns {JSX.Element} The rendered table component.
 */
function Tr({children, ...props}) {
  const {onClick} = props;
  const actionClass = onClick ? styles.action : '';

  return <tr {...props} className={`${actionClass}`}>{children}</tr>
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
      {children}
    </table>
  );
}

Table.Th = Th;
Table.Td = Td;
Table.Tr = Tr;