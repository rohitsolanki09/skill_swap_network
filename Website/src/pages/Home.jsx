import React from 'react';
import Hero from '../components/Hero';
import styles from './Home.module.css';
import { categories } from '../data/dummyData';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <Hero />
      <section className={`container ${styles.section}`}>
        <h2 className="section-title">Popular Categories</h2>
        <div className="grid cols-4">
          {categories.slice(0, 8).map((cat) => (
            <Link key={cat} to={`/browse?category=${encodeURIComponent(cat)}`} className={styles.catCard}>
              <div className={styles.icon}>★</div>
              <div className={styles.catTitle}>{cat}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;


