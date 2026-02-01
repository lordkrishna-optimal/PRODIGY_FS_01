require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);    // signup, login
app.use('/api/books', bookRoutes);    // books CRUD + list
app.use('/api/reviews', reviewRoutes); // add/delete reviews

app.get('/', (req, res) => res.send('BookReview Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
