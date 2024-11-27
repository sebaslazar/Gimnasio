import styles from './styles.module.css';

/**
 *
 * @param {React.HTMLProps<HTMLTableSectionElement>} props - The properties object.
 * @param {React.ReactNode} props.children - The children nodes to be rendered inside the table.
 * @returns {JSX.Element} The rendered table component.
 */
export function Tbody({children, ...options}) {
  return <tbody {...options} className={styles.body}>{children}</tbody>
}