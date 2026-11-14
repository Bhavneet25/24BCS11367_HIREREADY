const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    required: true,
  },
  tier: {
    type: String,
    enum: ['Super Dream (20+ LPA)', 'Dream (10-20 LPA)', 'Core / Tier-1 (6-10 LPA)', 'Mass Recruiter (3.5-6 LPA)'],
    required: true,
  },
  packageRange: {
    type: String,
    required: true,
  },
  roleTitle: {
    type: String,
    default: 'Software Development Engineer (SDE-1)',
  },
  description: {
    type: String,
    required: true,
  },
  difficultyLevel: {
    type: String,
    enum: ['Medium', 'Hard', 'Very Hard', 'Moderate'],
    default: 'Hard',
  },
  eligibility: {
    minCgpa: { type: Number, default: 7.0 },
    eligibleBranches: [String],
    backlogsAllowed: { type: Number, default: 0 },
    criteriaNotes: String,
  },
  hiringRounds: [
    {
      roundNumber: Number,
      roundName: String,
      roundType: String, // Online Assessment, Technical Round 1, Technical Round 2, HR / Managerial
      duration: String,
      description: String,
      tips: String,
    },
  ],
  syllabus: [
    {
      topic: String,
      weightage: String,
      description: String,
    },
  ],
  pastQuestions: [
    {
      title: String,
      type: String, // Coding, Aptitude, System Design, Behavioral
      difficulty: String,
      tags: [String],
    },
  ],
  interviewTips: [String],
  alumniInsights: [
    {
      author: String,
      batch: String,
      quote: String,
      offerPackage: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Company', companySchema);
