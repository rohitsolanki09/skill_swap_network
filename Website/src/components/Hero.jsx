import React from 'react';
import styles from './Hero.module.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.title}>Swap Skills. Build Community.</h1>
          <p className={styles.subtitle}>Learn from peers and share what you know. The easiest way to grow your abilities and help others at the same time.</p>
          <div className={styles.actions}>
            <Link to="/browse" className="btn">Browse Skills</Link>
            <Link to="/add" className="btn secondary">Offer a Skill</Link>
          </div>
        </div>
        <div className={styles.art}>
          <div className={styles.card1}></div>
          <div className={styles.card2}></div>
          <div className={styles.card3}></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;


