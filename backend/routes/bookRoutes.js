const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const bookCtrl = require('../controllers/bookController');

router.route('/')
  .get(bookCtrl.getBooks)     // public listing (pagination, search via ?q=)
  .post(protect, bookCtrl.createBook);

router.route('/:id')
  .get(bookCtrl.getBookById)
  .put(protect, bookCtrl.updateBook)
  .delete(protect, bookCtrl.deleteBook);

module.exports = router;
