const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('./models/Book');

const seedBooks = [
  {
    title: 'The Pragmatic Programmer',
    author: 'Andy Hunt',
    genre: 'Programming',
    description: 'A classic guide for software engineers.',
    featured: true,
    rating: 4.7,
    coverImage: 'https://res.cloudinary.com/datjuglj8/image/upload/v1748166482/0.1_dmmcgi.jpg'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    description: 'Build better habits, break bad ones.',
    featured: true,
    rating: 4.8,
    coverImage: 'https://res.cloudinary.com/datjuglj8/image/upload/v1748166484/0.2_zoc5pg.jpg'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    description: 'A chilling vision of a totalitarian future.',
    featured: true,
    rating: 4.5,
    coverImage: 'https://res.cloudinary.com/datjuglj8/image/upload/v1748166483/0.3_mmjqyy.jpg'
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    genre: 'Productivity',
    description: 'Rules for focused success in a distracted world.',
    featured: true,
    rating: 4.6,
    coverImage: 'https://res.cloudinary.com/datjuglj8/image/upload/v1748166483/0.5_eefi4k.jpg'
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Programming',
    description: 'A handbook of agile software craftsmanship.',
    featured: true,
    rating: 4.9,
    coverImage: 'https://res.cloudinary.com/datjuglj8/image/upload/v1748166482/0.4_htj0x9.jpg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    description: 'A journey of self-discovery and dreams.',
    featured: true,
    rating: 4.4,
    coverImage: 'https://res.cloudinary.com/datjuglj8/image/upload/v1748166483/0.6_blogjf.jpg'
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB for seeding');
    await Book.deleteMany({});
    const inserted = await Book.insertMany(seedBooks);
    console.log(`🌱 Seeded ${inserted.length} books`);
    process.exit();
  })
  .catch(err => {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  });
