const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserById, updateUser } = require('../controllers/userController');

// Protected user routes
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);

module.exports = router;
