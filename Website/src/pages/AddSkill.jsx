import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSkills } from '../context/SkillsContext';
import { categories, skillLevels } from '../data/dummyData';
import styles from './AddSkill.module.css';

function AddSkill() {
  const [form, setForm] = useState({ name: '', category: '', level: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { addSkill } = useSkills();
  const navigate = useNavigate();

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError(''); // Clear error when user types
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = addSkill(form);
    
    if (result.success) {
      setForm({ name: '', category: '', level: '', description: '' });
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="page container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Please log in to add skills</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="page container">
      <h2 className="section-title">Add a New Skill</h2>
      
      {error && (
        <div style={{ 
          background: '#fee', 
          color: '#c33', 
          padding: '10px', 
          borderRadius: '8px', 
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      <form className={styles.form} onSubmit={submit}>
        <label>
          <span>Skill Name</span>
          <input 
            className="input" 
            value={form.name} 
            onChange={(e) => update('name', e.target.value)} 
            placeholder="e.g., React Basics" 
            required 
          />
        </label>

        <div className="form-row">
          <label>
            <span>Category</span>
            <select 
              className="select" 
              value={form.category} 
              onChange={(e) => update('category', e.target.value)} 
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label>
            <span>Level</span>
            <select 
              className="select" 
              value={form.level} 
              onChange={(e) => update('level', e.target.value)} 
              required
            >
              <option value="">Select level</option>
              {skillLevels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
        </div>

        <label>
          <span>Description</span>
          <textarea 
            className="textarea" 
            rows="5" 
            value={form.description} 
            onChange={(e) => update('description', e.target.value)} 
            placeholder="What will someone learn from you?" 
          />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Adding Skill...' : 'Add Skill'}
        </button>
      </form>
    </div>
  );
}

export default AddSkill;


