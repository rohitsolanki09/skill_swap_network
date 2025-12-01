import React from 'react';
import styles from './SkillCard.module.css';

function SkillCard({ name, category, level, description, userName, onRequest }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.badge}>{category}</div>
        <div className={styles.level}>{level}</div>
      </div>
      <h3 className={styles.title}>{name}</h3>
      {description && <p className={styles.desc}>{description}</p>}
      {userName && (
        <p className={styles.userName}>Offered by: <strong>{userName}</strong></p>
      )}
      <button className="btn accent" onClick={onRequest}>Request Swap</button>
    </div>
  );
}

export default SkillCard;


