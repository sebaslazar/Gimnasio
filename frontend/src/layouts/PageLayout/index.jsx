import { Outlet } from "react-router";
import styles from './page.module.css';
import './reset.css';

/**
 * @param {{children: import('react').ReactNode && {
 *  title: string,
 * }}} props
 */
export function PageLayout({children, title}) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.centeredDiv}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.contentContainer}>
          <Outlet />
          {children}
        </div>
      </div>
    </div>
  );
}