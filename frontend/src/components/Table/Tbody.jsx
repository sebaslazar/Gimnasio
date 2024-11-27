import styles from './styles.module.css';

/**
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The children nodes to be rendered inside the table.
 * @returns {JSX.Element} The rendered table component.
 */
export function Tbody({children}) {
  <tbody className={styles.body}>{children}</tbody>
}