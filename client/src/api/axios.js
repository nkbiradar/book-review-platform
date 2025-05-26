import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://book-review-platform-l1u1.onrender.com/api',
});

export default instance;
