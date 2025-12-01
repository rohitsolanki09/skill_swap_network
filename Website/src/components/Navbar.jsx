import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuth();

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} onClick={close}>
          <span className={styles.logoMark}>⤳</span>
          <span className={styles.logoText}>Skill Swap</span>
        </Link>

        <button className={styles.menuBtn} onClick={toggle} aria-label="Toggle Menu">
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
          <NavLink to="/" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} onClick={close}>Home</NavLink>
          <NavLink to="/browse" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} onClick={close}>Browse Skills</NavLink>
          
          {user ? (
            <>
              <NavLink to="/add" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} onClick={close}>Add Skill</NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} onClick={close}>Dashboard</NavLink>
              <NavLink to="/profile" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} onClick={close}>Profile</NavLink>
              <button onClick={handleLogout} className={`${styles.link} ${styles.logoutBtn}`}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} onClick={close}>Login</NavLink>
              <Link to="/signup" className={`btn ${styles.cta}`} onClick={close}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;


