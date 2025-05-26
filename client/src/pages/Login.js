import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('✅ Login successful!');
      navigate('/');
    } catch (err) {
      alert('❌ Invalid credentials');
      console.error(err);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>🔐 Login</h2>
        <form onSubmit={handleLogin} className="form">
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

          <button type="submit" className="btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
