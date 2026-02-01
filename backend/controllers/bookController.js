const Book = require('../models/Book');
const Review = require('../models/Review');

exports.createBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    if (!title || !author) return res.status(400).json({ message: 'Title and author required' });
    const book = new Book({ title, author, description, genre, year, addedBy: req.user._id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('createBook', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.max(1, parseInt(req.query.limit || '5'));
    const skip = (page - 1) * limit;

    const q = (req.query.q || '').trim();
    const genre = req.query.genre;
    const sort = req.query.sort || '-createdAt'; // e.g., -createdAt, year, rating

    const filter = {};
    if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { author: new RegExp(q, 'i') }];
    if (genre) filter.genre = genre;

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter).sort(sort).skip(skip).limit(limit).lean();

    // attach avg rating & count (aggregation)
    const bookIds = books.map(b => b._id);
    const agg = await Review.aggregate([
      { $match: { bookId: { $in: bookIds } } },
      { $group: { _id: "$bookId", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);

    const aggMap = {};
    agg.forEach(a => { aggMap[a._id.toString()] = { avg: a.avgRating, count: a.count }; });

    const booksWithRating = books.map(b => ({
      ...b,
      rating: aggMap[b._id.toString()] || { avg: 0, count: 0 }
    }));

    res.json({ total, page, totalPages: Math.ceil(total / limit), books: booksWithRating });
  } catch (err) {
    console.error('getBooks', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id).lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ bookId: id }).populate('userId', 'name').sort({ createdAt: -1 }).lean();
    const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

    res.json({ ...book, reviews, avgRating, reviewCount: reviews.length });
  } catch (err) {
    console.error('getBookById', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

    const allowed = ['title','author','description','genre','year'];
    allowed.forEach(field => {
      if (req.body[field] !== undefined) book[field] = req.body[field];
    });

    await book.save();
    res.json(book);
  } catch (err) {
    console.error('updateBook', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

    // delete related reviews
    await Review.deleteMany({ bookId: id });
    await book.deleteOne();
    res.json({ message: 'Book removed' });
  } catch (err) {
    console.error('deleteBook', err);
    res.status(500).json({ message: 'Server error' });
  }
};
