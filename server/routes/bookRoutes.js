const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, addBook } = require('../controllers/bookController');

// GET /books
router.get('/', getAllBooks);

// GET /books/:id
router.get('/:id', getBookById);

// POST /books
router.post('/', addBook); // Later: protect with admin check

module.exports = router;
