const express = require('express');
const router = express.Router();
const { getAllCompanies, getCompanyBySlug } = require('../controllers/companyController');

router.get('/', getAllCompanies);
router.get('/:slug', getCompanyBySlug);

module.exports = router;
