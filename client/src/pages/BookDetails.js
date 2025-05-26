import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

useEffect(() => {
  axios.get(`/books/${id}`).then(res => setBook(res.data));
  axios.get(`/reviews?bookId=${id}`).then(res => setReviews(res.data));
}, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !user) {
      toast.error('❌ You must be logged in to submit a review.');
      return;
    }

    // Add input validation
    if (!comment.trim()) {
      toast.error('❌ Please write a review comment');
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error('❌ Rating must be between 1 and 5');
      return;
    }

    try {
      const res = await axios.post(
        '/api/reviews',
        {
          book: id,
          user: user._id,
          comment: comment.trim(),
          rating,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      // Update reviews list with new review
      setReviews(prevReviews => [...prevReviews, res.data]);
      
      // Reset form
      setComment('');
      setRating(5);
      
      toast.success('✅ Review submitted successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Review submission failed';
      toast.error(`❌ ${errorMessage}`);
      console.error('Review submission error:', err);
    }
  };

  if (!book) return <p style={{ padding: '2rem' }}>Loading book details...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <ToastContainer />
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>

      <hr />

      <h3>⭐ Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul style={{ paddingLeft: '1rem' }}>
          {reviews.map(review => (
            <li key={review._id} style={{ marginBottom: '1rem' }}>
              <strong>Rating:</strong> {review.rating} / 5<br />
              <em>{review.comment}</em><br />
              {review.user?.name && (
                <small>— by {review.user.name}</small>
              )}
            </li>
          ))}
        </ul>
      )}

      {token && user && (
  <div className="review-form-container" style={{
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '2rem'
  }}>
    <h3>✍️ Write a Review</h3>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label>
          <strong>Rating:</strong>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  opacity: n <= rating ? 1 : 0.3
                }}
              >
                ⭐
              </button>
            ))}
          </div>
        </label>
      </div>
      
      <div>
        <label>
          <strong>Your Review:</strong>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your thoughts about this book..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '0.5rem',
              marginTop: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
            required
          />
        </label>
      </div>
      
      <button 
        type="submit"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Submit Review
      </button>
    </form>
  </div>
)}
    </div>
  );
};

export default BookDetails;
