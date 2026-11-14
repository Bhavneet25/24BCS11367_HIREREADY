const express = require('express');
const router = express.Router();
const {
  getAllTests,
  getTestById,
  submitTest,
  getMyTestHistory,
  getPracticeQuestions,
} = require('../controllers/aptitudeController');
const { protect } = require('../middleware/auth');

router.get('/tests', getAllTests);
router.get('/tests/:id', getTestById);
router.post('/tests/:id/submit', protect, submitTest);
router.get('/history', protect, getMyTestHistory);
router.get('/practice-questions', getPracticeQuestions);

module.exports = router;
