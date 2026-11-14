const mongoose = require('mongoose');

const placementStatisticSchema = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true,
    default: '2025-2026',
  },
  overview: {
    totalEligibleStudents: { type: Number, default: 850 },
    totalOffersReceived: { type: Number, default: 1120 },
    placedPercentage: { type: Number, default: 93.4 },
    highestPackageLPA: { type: Number, default: 54.5 },
    averagePackageLPA: { type: Number, default: 14.8 },
    medianPackageLPA: { type: Number, default: 12.0 },
    totalCompaniesVisited: { type: Number, default: 184 },
  },
  branchStats: [
    {
      branch: String,
      eligible: Number,
      placed: Number,
      placementRate: Number,
      avgLpa: Number,
      highestLpa: Number,
    },
  ],
  salaryDistribution: [
    {
      bracket: String, // e.g. "3-6 LPA", "6-10 LPA", "10-20 LPA", "20+ LPA"
      percentage: Number,
      studentCount: Number,
    },
  ],
  topRecruiters: [
    {
      company: String,
      offersCount: Number,
      tier: String,
      highestLpa: Number,
      domain: String,
    },
  ],
  tierBreakdown: [
    {
      tierName: String,
      companyCount: Number,
      offersCount: Number,
      avgPackageLpa: Number,
    },
  ],
  trendingSkills: [
    {
      skill: String,
      demandPercentage: Number,
      growth: String,
    },
  ],
  yearOnYearTrends: [
    {
      year: String,
      avgLpa: Number,
      highestLpa: Number,
      placementRate: Number,
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PlacementStatistic', placementStatisticSchema);
