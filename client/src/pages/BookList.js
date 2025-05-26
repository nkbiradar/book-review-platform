import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import './BookList.css'; // ✅ Make sure to create this CSS file

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error('Error fetching books:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="booklist-container">
      <header className="booklist-header">
        <h2>📚 Book List</h2>
        <nav>
          {!token ? (
            <>
              <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span>👤 Welcome, <strong>{user?.name}</strong></span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
          {user?.isAdmin && (
            <>
              {' '}| <Link to="/add-book" className="add-book-link">➕ Add Book</Link>
            </>
          )}
        </nav>
      </header>

      <input
        type="text"
        placeholder="🔍 Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {filteredBooks.length === 0 ? (
        <p className="no-books-msg">No books found.</p>
      ) : (
        <div className="book-grid">
          {filteredBooks.map(book => (
            <div className="book-card" key={book._id}>
              <Link to={`/books/${book._id}`}>
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="book-cover"
                />
                <h4>{book.title}</h4>
                <p>by {book.author}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
