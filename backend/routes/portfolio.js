// routes/portfolio.js - Portfolio Routes
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createOrUpdatePortfolio,
  getMyPortfolio,
  getPortfolioBySlug,
  deletePortfolio,
  togglePublish
} = require('../controllers/portfolioController');

// Protected routes (specific routes first)
router.get('/me', protect, getMyPortfolio);
router.patch('/publish', protect, togglePublish);

router.route('/')
  .post(protect, createOrUpdatePortfolio)
  .delete(protect, deletePortfolio);

// Public routes (dynamic slug route last)
router.get('/:slug', getPortfolioBySlug);

module.exports = router;
