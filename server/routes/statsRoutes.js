const express = require('express');
const router = express.Router();
const { getPlacementStats, getStudentReadinessSummary } = require('../controllers/statsController');
const { protect } = require('../middleware/auth');

router.get('/placement', getPlacementStats);
router.get('/readiness', protect, getStudentReadinessSummary);

module.exports = router;
