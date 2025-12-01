import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.col}>
          <div className={styles.brand}>
            <span className={styles.logoMark}>⤳</span>
            <span>Skill Swap</span>
          </div>
          <p className="muted">Swap skills, grow together.</p>
        </div>
        <div className={styles.col}>
          <div className={styles.title}>Explore</div>
          <Link to="/browse" className={styles.link}>Browse Skills</Link>
          <Link to="/add" className={styles.link}>Add Skill</Link>
          <Link to="/dashboard" className={styles.link}>Dashboard</Link>
        </div>
        <div className={styles.col}>
          <div className={styles.title}>Company</div>
          <Link to="/" className={styles.link}>About</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
          <a href="mailto:rohitsolanki9822@gmail.com" className={styles.link}>rohitsolanki9822@gmail.com</a>
          <div className={styles.socials}>
            <a className={styles.social} href="#" aria-label="Twitter">𝕏</a>
            <a className={styles.social} href="#" aria-label="GitHub">GH</a>
            <a className={styles.social} href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>© {new Date().getFullYear()} Skill Swap</div>
    </footer>
  );
}

export default Footer;


