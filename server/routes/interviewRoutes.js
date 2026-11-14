const express = require('express');
const router = express.Router();
const {
  getMyInterviews,
  scheduleInterview,
  getInterviewById,
  submitFeedback,
} = require('../controllers/interviewController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMyInterviews);
router.post('/schedule', protect, scheduleInterview);
router.get('/:id', protect, getInterviewById);
router.post('/:id/feedback', protect, submitFeedback);

module.exports = router;
