import React from 'react';
import styles from './Contact.module.css';

function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => { e.preventDefault(); alert('Thanks for your message!'); setForm({ name: '', email: '', message: '' }); };

  return (
    <div className="page container">
      <h2 className="section-title">Contact Us</h2>
      <form className={styles.form} onSubmit={submit}>
        <div className="form-row">
          <label>
            <span>Name</span>
            <input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} required />
          </label>
          <label>
            <span>Email</span>
            <input className="input" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
          </label>
        </div>
        <label>
          <span>Message</span>
          <textarea className="textarea" rows="6" value={form.message} onChange={(e) => update('message', e.target.value)} required />
        </label>
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;


