import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSkills } from '../context/SkillsContext';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { user } = useAuth();
  const { getUserSkills, getIncomingRequests, getOutgoingRequests, updateRequestStatus } = useSkills();

  const userSkills = getUserSkills();
  const incomingRequests = getIncomingRequests();
  const outgoingRequests = getOutgoingRequests();

  const handleRequestAction = (requestId, action) => {
    updateRequestStatus(requestId, action);
  };

  if (!user) {
    return (
      <div className="page container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Please log in to access your dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`page container ${styles.wrap}`}>
      <section className={styles.top}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>{user.name[0]}</div>
          <div>
            <h2 className={styles.name}>{user.name}</h2>
            <div className="muted">{user.email}</div>
          </div>
          <div className={styles.stats}>
            <div>
              <div className={styles.statValue}>{userSkills.length}</div>
              <div className={styles.statLabel}>Skills</div>
            </div>
            <div>
              <div className={styles.statValue}>{user.swapsCompleted || 0}</div>
              <div className={styles.statLabel}>Swaps</div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.grid}> 
        <section className={styles.card}>
          <h3>My Skills</h3>
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
          <h3>Incoming Skill Swap Requests</h3>
          <ul className={styles.list}>
            {incomingRequests.length > 0 ? (
              incomingRequests.map((r) => (
                <li key={r.id} className={styles.listItem}>
                  <div>
                    <strong>{r.fromUserName}</strong> → {r.skillName}
                    <div className={`muted ${styles.note}`}>{r.message}</div>
                  </div>
                  <div className={styles.actions}>
                    <button 
                      className="btn" 
                      onClick={() => handleRequestAction(r.id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button 
                      className="btn secondary"
                      onClick={() => handleRequestAction(r.id, 'declined')}
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className={styles.emptyState}>
                <p className="muted">No incoming requests yet.</p>
              </li>
            )}
          </ul>
        </section>

        <section className={styles.card}>
          <h3>My Requests</h3>
          <ul className={styles.list}>
            {outgoingRequests.length > 0 ? (
              outgoingRequests.map((r) => (
                <li key={r.id} className={styles.listItem}>
                  <div>
                    To <strong>{r.toUserName}</strong> → {r.skillName}
                    <div className={`muted ${styles.note}`}>{r.message}</div>
                    <div className={`muted ${styles.note}`}>
                      Status: <span style={{ 
                        color: r.status === 'accepted' ? 'green' : 
                               r.status === 'declined' ? 'red' : 'orange' 
                      }}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                  {r.status === 'pending' && (
                    <div className={styles.actions}>
                      <button 
                        className="btn secondary"
                        onClick={() => handleRequestAction(r.id, 'cancelled')}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className={styles.emptyState}>
                <p className="muted">No outgoing requests yet.</p>
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;


