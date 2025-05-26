import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: ''
  });

  if (!user?.isAdmin) return <p>⛔ Unauthorized: Admins only</p>;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/books', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Book added successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add book');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>➕ Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required /><br /><br />
        <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required /><br /><br />
        <input name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} required /><br /><br />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows={4} required /><br /><br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
