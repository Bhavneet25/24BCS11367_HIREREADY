const { getModel } = require('../config/db');
const Resume = require('../models/Resume');
const { sampleResume } = require('../data/sampleResumes');

// @desc    Get current user's active resume or create starter
// @route   GET /api/resume
const getMyResume = async (req, res, next) => {
  try {
    const ResumeModel = getModel('Resume', Resume);
    let resume = await ResumeModel.findOne({ user: req.user._id });

    if (!resume) {
      resume = await ResumeModel.create({
        user: req.user._id,
        ...sampleResume,
        personalInfo: {
          ...sampleResume.personalInfo,
          fullName: req.user.name || sampleResume.personalInfo.fullName,
          email: req.user.email || sampleResume.personalInfo.email,
        },
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save/Update resume contents
// @route   PUT /api/resume
const saveResume = async (req, res, next) => {
  try {
    const ResumeModel = getModel('Resume', Resume);
    const resumeData = req.body;

    // Calculate ATS compatibility score based on content completeness
    let score = 50;
    if (resumeData.personalInfo?.summary?.length > 40) score += 10;
    if (resumeData.experience?.length > 0) score += 15;
    if (resumeData.projects?.length >= 2) score += 15;
    if (resumeData.skills?.programmingLanguages?.length >= 3) score += 5;
    if (resumeData.education?.length > 0) score += 5;
    score = Math.min(98, score);

    let resume = await ResumeModel.findOne({ user: req.user._id });

    if (resume) {
      resume = await ResumeModel.findByIdAndUpdate(
        resume._id,
        {
          ...resumeData,
          atsScore: score,
          updatedAt: new Date().toISOString(),
        },
        { new: true }
      );
    } else {
      resume = await ResumeModel.create({
        user: req.user._id,
        ...resumeData,
        atsScore: score,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume saved successfully.',
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    AI Assistant for improving resume bullets with quantifiable action verbs
// @route   POST /api/resume/ai-enhance
const enhanceBulletPoint = async (req, res, next) => {
  try {
    const { draftText, roleOrProject } = req.body;

    if (!draftText) {
      return res.status(400).json({ success: false, message: 'Please provide bullet draft text.' });
    }

    // Heuristic AI bullet enhancer
    const suggestions = [
      `Architected ${draftText.replace(/^(worked on|built|created|made)\s+/i, '')}, improving query latency by 38% and scaling throughput to 5,000+ RPS.`,
      `Engineered ${draftText.replace(/^(worked on|built|created|made)\s+/i, '')} adhering to clean architecture patterns, reducing bugs in production by 25%.`,
      `Spearheaded the development of ${draftText.replace(/^(worked on|built|created|made)\s+/i, '')}, driving 40% higher user retention through optimized UI responsiveness.`
    ];

    res.status(200).json({
      success: true,
      original: draftText,
      suggestions,
      actionVerbsRecommended: ['Architected', 'Spearheaded', 'Optimized', 'Automated', 'Engineered', 'Overhauled'],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyResume,
  saveResume,
  enhanceBulletPoint,
};
