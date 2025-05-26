import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password });
      alert('✅ Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('❌ Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>📝 Register</h2>
        <form onSubmit={handleRegister} className="form">
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />

          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

          <button type="submit" className="btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
