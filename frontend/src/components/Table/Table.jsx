import React from 'react';
import styles from './styles.module.css';

/**
 *
 * @param {React.HTMLProps<HTMLTableHeaderCellElement>} props - The properties object.
 * @param {React.ReactNode} props.children - The children nodes to be rendered inside the table.
 * @returns {JSX.Element} The rendered table component.
 */
function Th({children, ...options}) {
  return <th {...options} className={styles.cell}><div className={styles.headDiv}>{children}</div></th>
}

/**
 *
 * @param {React.HTMLProps<HTMLTableCellElement>} props - The properties object.
 * @param {React.ReactNode} props.children - The children nodes to be rendered inside the table.
 * @returns {JSX.Element} The rendered table component.
 */
function Td({children, ...props}) {
  return (
    <td {...props} className={`${styles.cell} ${styles.td}`}>
      <div className={`${styles.tdContainer}`}>
        {children}
      </div>
    </td>
  )
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
 * @param {React.HTMLProps<HTMLTableElement>} props - The properties object.
 * @param {React.ReactNode} props.children - The children nodes to be rendered inside the table.
 * @returns {JSX.Element} The rendered table component.
 */
export function Table({children, ...options}){
  return (
    <table {...options} className={styles.table}>
      {children}
    </table>
  );
}

Table.Th = Th;
Table.Td = Td;
Table.Tr = Tr;