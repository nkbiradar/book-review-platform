const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: String,
  description: String,
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  coverImage: String, // ✅ NEW FIELD
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
