const Review = require('../models/Review');

// GET /reviews?bookId=xxx
const getReviews = async (req, res) => {
  try {
    const { bookId } = req.query;
    const query = bookId ? { book: bookId } : {};
    const reviews = await Review.find(query).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// POST /reviews
const addReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add review' });
  }
};

module.exports = {
  getReviews,
  addReview,
};
