const { getModel } = require('../config/db');
const Company = require('../models/Company');

// @desc    Get all companies list
// @route   GET /api/companies
const getAllCompanies = async (req, res, next) => {
  try {
    const CompanyModel = getModel('Company', Company);
    const { tier, search } = req.query;

    let companies = await CompanyModel.find({});

    if (tier && tier !== 'All') {
      companies = companies.filter((c) => c.tier.includes(tier) || c.tier === tier);
    }

    if (search) {
      const q = search.toLowerCase();
      companies = companies.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.roleTitle.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single company details by slug
// @route   GET /api/companies/:slug
const getCompanyBySlug = async (req, res, next) => {
  try {
    const CompanyModel = getModel('Company', Company);
    const { slug } = req.params;

    let company = await CompanyModel.findOne({ slug });
    if (!company) {
      company = await CompanyModel.findById(slug);
    }

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company recruitment profile not found.' });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCompanies,
  getCompanyBySlug,
};
