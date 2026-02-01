const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReview = async (req, res) => {
  try {
    const { bookId, rating, reviewText } = req.body;
    if (!bookId || !rating) return res.status(400).json({ message: 'bookId and rating required' });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // optional: prevent multiple reviews by same user
    const existing = await Review.findOne({ bookId, userId: req.user._id });
    if (existing) return res.status(400).json({ message: 'You already reviewed this book' });

    const review = new Review({ bookId, userId: req.user._id, rating, reviewText });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error('addReview', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

    const { rating, reviewText } = req.body;
    if (rating !== undefined) review.rating = rating;
    if (reviewText !== undefined) review.reviewText = reviewText;
    await review.save();
    res.json(review);
  } catch (err) {
    console.error('updateReview', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    await review.deleteOne();
    res.json({ message: 'Review removed' });
  } catch (err) {
    console.error('deleteReview', err);
    res.status(500).json({ message: 'Server error' });
  }
};
