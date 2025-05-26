import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import AddBook from './pages/AddBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ Home page */}
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default App;
