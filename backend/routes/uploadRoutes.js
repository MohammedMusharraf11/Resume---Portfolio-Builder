// routes/uploadRoutes.js - Upload Routes
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const {
  uploadImage,
  uploadProfilePicture,
  uploadProjectImage,
  deleteImage,
} = require('../controllers/uploadController');

// All routes are protected (require authentication)
router.use(protect);

// Upload routes
router.post('/image', upload.single('image'), uploadImage);
router.post('/profile', upload.single('image'), uploadProfilePicture);
router.post('/project', upload.single('image'), uploadProjectImage);

// Delete route
router.delete('/:publicId', deleteImage);

module.exports = router;
