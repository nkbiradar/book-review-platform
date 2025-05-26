import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero-books.jpg';
import './Home.css';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/books')
      .then(res => setFeatured(res.data))
      .catch(err => console.error('Error loading featured books', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="home-container">
      {/* Top Bar */}
      <nav className="top-nav">
        {!token ? (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div className="user-menu">
            <span>👋 Welcome, <strong>{user.name}</strong></span>
            <Link to="/profile">My Profile</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${heroImage})` }}>
        <h1>Discover Great Books</h1>
        <p>Your next reading adventure awaits</p>
      </section>

      {/* Featured Books Section */}
      <section className="featured-books">
        <h2>🌟 Featured Books</h2>
        <div className="books-grid">
          {featured.map(book => (
            <Link to={`/books/${book._id}`} key={book._id} className="book-card">
              {book.coverImage && (
                <img src={book.coverImage} alt={book.title} />
              )}
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <span className="genre">{book.genre}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
