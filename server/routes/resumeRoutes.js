const express = require('express');
const router = express.Router();
const { getMyResume, saveResume, enhanceBulletPoint } = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMyResume);
router.put('/', protect, saveResume);
router.post('/ai-enhance', protect, enhanceBulletPoint);

module.exports = router;
