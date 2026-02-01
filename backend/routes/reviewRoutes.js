const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const reviewCtrl = require('../controllers/reviewController');

router.post('/', protect, reviewCtrl.addReview);
router.put('/:id', protect, reviewCtrl.updateReview);
router.delete('/:id', protect, reviewCtrl.deleteReview);

module.exports = router;
