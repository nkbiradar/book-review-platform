const express = require('express');
const router = express.Router();
const { getReviews, addReview } = require('../controllers/reviewController');

// GET /reviews
router.get('/', getReviews);

// POST /reviews
router.post('/', addReview);

module.exports = router;
