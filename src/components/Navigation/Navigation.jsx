import styles from './Navigation.module.css';
import { NavLink } from "react-router-dom";
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

const Navigation = () => {
    return (
        <nav className={styles.navigation}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/moviespage" className={buildLinkClass}>
          Movies
        </NavLink>        
    </nav>
    );
};

export default Navigation;
