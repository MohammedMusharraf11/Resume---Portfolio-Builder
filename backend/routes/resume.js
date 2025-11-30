// routes/resume.js - Resume Routes
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume
} = require('../controllers/resumeController');

// All routes are protected
router.use(protect);

router.route('/')
  .post(createResume)
  .get(getMyResumes);

router.route('/:id')
  .get(getResumeById)
  .put(updateResume)
  .delete(deleteResume);

module.exports = router;
