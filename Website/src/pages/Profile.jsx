import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSkills } from '../context/SkillsContext';
import styles from './Profile.module.css';

function Profile() {
  const { user, updateUser } = useAuth();
  const { getUserSkills } = useSkills();
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(user?.about || '');

  const userSkills = getUserSkills();

  const handleSaveAbout = () => {
    updateUser({ about });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="page container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`page container ${styles.wrap}`}>
      <div className={styles.header}>
        <div className={styles.avatar}>{user.name[0]}</div>
        <div>
          <h2 className={styles.name}>{user.name}</h2>
          <div className="muted">{user.email}</div>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h3>About</h3>
        {isEditing ? (
          <div>
            <textarea
              className="textarea"
              rows="4"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell others about yourself and your interests..."
            />
            <div style={{ marginTop: '10px' }}>
              <button className="btn" onClick={handleSaveAbout}>Save</button>
              <button 
                className="btn secondary" 
                onClick={() => {
                  setAbout(user.about || '');
                  setIsEditing(false);
                }}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className={styles.about}>{user.about || 'No bio added yet.'}</p>
            <button 
              className="btn secondary" 
              onClick={() => setIsEditing(true)}
            >
              Edit Bio
            </button>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h3>Skills Offered</h3>
          <ul className={styles.list}>
            {userSkills.length > 0 ? (
              userSkills.map((s) => (
                <li key={s.id} className={styles.listItem}>
                  <span className={styles.badge}>{s.category}</span>
                  <span>{s.name}</span>
                  <span className={styles.level}>{s.level}</span>
                </li>
              ))
            ) : (
              <li className={styles.emptyState}>
                <p className="muted">No skills added yet. <a href="/add">Add your first skill!</a></p>
              </li>
            )}
          </ul>
        </section>

        <section className={styles.card}>
          <h3>Swaps Completed</h3>
          <div className={styles.metric}>
            <div className={styles.metricValue}>{user.swapsCompleted || 0}</div>
            <div className={styles.metricLabel}>Successful swaps</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;


