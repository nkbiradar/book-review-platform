// ----------------------------
// 📁 UserProfile.js (Updated)
// ----------------------------

import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import './UserProfile.css';

const UserProfile = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const userId = (user?._id || user?.id || '').trim();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profileImage: ''
  });

  useEffect(() => {
    if (!userId || !token) return;

    axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setFormData(res.data))
    .catch(err => console.error('❌ Fetch profile failed:', err.response?.data || err));
  }, [userId, token]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!userId) return alert('❌ User ID is missing');

    try {
      const res = await axios.put(`/api/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('✅ Profile updated!');
      setFormData(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      alert(`❌ Failed to update: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'bookapp_unsigned');
    uploadData.append('cloud_name', 'datjuglj8');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/datjuglj8/image/upload', {
        method: 'POST',
        body: uploadData
      });

      const data = await res.json();
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, profileImage: data.secure_url }));
        alert('✅ Image uploaded!');
      }
    } catch (err) {
      console.error('❌ Image upload failed:', err);
      alert('❌ Failed to upload image');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>👤 User Profile</h2>
        {formData.profileImage && <img src={formData.profileImage} alt="Profile" className="profile-avatar" />}

        <form onSubmit={handleUpdate}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} readOnly />

          <label>Profile Image URL:</label>
          <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} />

          <label>Upload Profile Photo:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
