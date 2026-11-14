const express = require('express');
const router = express.Router();
const {
  getAllProblems,
  getProblemBySlug,
  runCode,
  submitCode,
  getMySubmissions,
} = require('../controllers/codingController');
const { protect } = require('../middleware/auth');

router.get('/problems', getAllProblems);
router.get('/problems/:slug', getProblemBySlug);
router.post('/run', runCode);
router.post('/submit', protect, submitCode);
router.get('/submissions', protect, getMySubmissions);

module.exports = router;
