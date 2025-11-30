// controllers/portfolioController.js - Portfolio Controllers
const Portfolio = require('../models/Portfolio');

// @desc    Create or update portfolio
// @route   POST /api/portfolios
// @access  Private
exports.createOrUpdatePortfolio = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    // Get user's profile picture from User model
    const User = require('../models/User');
    const user = await User.findById(req.user.id);
    
    // If no profile picture in request but user has one, use user's profile picture
    if (!req.body.aboutMe?.profilePicture && user.profilePicture) {
      if (!req.body.aboutMe) req.body.aboutMe = {};
      req.body.aboutMe.profilePicture = user.profilePicture;
    }

    let portfolio = await Portfolio.findOne({ user: req.user.id });

    if (portfolio) {
      // Update existing portfolio
      portfolio = await Portfolio.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Portfolio updated successfully',
        portfolio
      });
    }

    // Create new portfolio
    portfolio = await Portfolio.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Portfolio created successfully',
      portfolio
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my portfolio
// @route   GET /api/portfolios/me
// @access  Private
exports.getMyPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    res.status(200).json({
      success: true,
      portfolio
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get portfolio by slug (public)
// @route   GET /api/portfolios/:slug
// @access  Public
exports.getPortfolioBySlug = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug })
      .populate('user', 'fullName email');

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    if (!portfolio.isPublished) {
      return res.status(403).json({
        success: false,
        message: 'This portfolio is not published'
      });
    }

    // Increment views
    portfolio.views += 1;
    await portfolio.save();

    res.status(200).json({
      success: true,
      portfolio
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete portfolio
// @route   DELETE /api/portfolios
// @access  Private
exports.deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    await portfolio.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Publish/unpublish portfolio
// @route   PATCH /api/portfolios/publish
// @access  Private
exports.togglePublish = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    portfolio.isPublished = !portfolio.isPublished;
    await portfolio.save();

    res.status(200).json({
      success: true,
      message: `Portfolio ${portfolio.isPublished ? 'published' : 'unpublished'} successfully`,
      portfolio
    });
  } catch (error) {
    next(error);
  }
};
