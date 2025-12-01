import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSkills } from '../context/SkillsContext';
import { categories, skillLevels } from '../data/dummyData';
import SkillCard from '../components/SkillCard';
import styles from './BrowseSkills.module.css';

function BrowseSkills() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [message, setMessage] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(null);
  const { user } = useAuth();
  const { skills, searchSkills, requestSkillSwap } = useSkills();

  const filtered = searchSkills(query, category, level);

  const handleRequest = (skillId) => {
    if (!user) {
      alert('Please log in to request skill swaps');
      return;
    }
    setShowMessageForm(skillId);
    setMessage('');
  };

  const handleSubmitRequest = (skillId) => {
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }

    const result = requestSkillSwap(skillId, message);
    if (result.success) {
      alert('Skill swap request sent successfully!');
      setShowMessageForm(null);
      setMessage('');
    } else {
      alert(result.error);
    }
  };

  return (
    <div className={`page container`}>
      <h2 className="section-title">Browse Skills</h2>
      <div className={styles.filters}>
        <input 
          className="input" 
          placeholder="Search skills..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <select 
          className="select" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select 
          className="select" 
          value={level} 
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">All Levels</option>
          {skillLevels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="spacer-sm"></div>

      {filtered.length > 0 ? (
        <div className="grid cols-3">
          {filtered.map((s) => (
            <div key={s.id}>
              <SkillCard 
                name={s.name} 
                category={s.category} 
                level={s.level} 
                description={s.description}
                userName={s.userName}
                onRequest={() => handleRequest(s.id)} 
              />
              
              {showMessageForm === s.id && (
                <div style={{
                  marginTop: '10px',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <textarea
                    className="textarea"
                    rows="3"
                    placeholder="Send a message to the skill owner..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <button 
                      className="btn accent" 
                      onClick={() => handleSubmitRequest(s.id)}
                    >
                      Send Request
                    </button>
                    <button 
                      className="btn secondary" 
                      onClick={() => {
                        setShowMessageForm(null);
                        setMessage('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3>No skills found</h3>
          <p className="muted">
            {query || category || level 
              ? 'Try adjusting your search filters' 
              : 'Be the first to add a skill to the platform!'
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default BrowseSkills;


