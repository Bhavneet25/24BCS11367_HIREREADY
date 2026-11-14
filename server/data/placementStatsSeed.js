const placementStats = {
  academicYear: "2025-2026",
  overview: {
    totalEligibleStudents: 920,
    totalOffersReceived: 1245,
    placedPercentage: 94.2,
    highestPackageLPA: 54.5,
    averagePackageLPA: 15.2,
    medianPackageLPA: 12.8,
    totalCompaniesVisited: 198
  },
  branchStats: [
    {
      branch: "Computer Science & Engineering",
      eligible: 320,
      placed: 312,
      placementRate: 97.5,
      avgLpa: 19.8,
      highestLpa: 54.5
    },
    {
      branch: "Information Technology",
      eligible: 180,
      placed: 174,
      placementRate: 96.6,
      avgLpa: 18.2,
      highestLpa: 48.0
    },
    {
      branch: "Electronics & Communication",
      eligible: 210,
      placed: 195,
      placementRate: 92.8,
      avgLpa: 14.5,
      highestLpa: 36.0
    },
    {
      branch: "Electrical & Electronics",
      eligible: 110,
      placed: 98,
      placementRate: 89.1,
      avgLpa: 11.4,
      highestLpa: 24.0
    },
    {
      branch: "Mechanical & Core Engineering",
      eligible: 100,
      placed: 88,
      placementRate: 88.0,
      avgLpa: 9.2,
      highestLpa: 18.0
    }
  ],
  salaryDistribution: [
    { bracket: "3.5 - 6 LPA (Mass / Foundation)", percentage: 18.5, studentCount: 160 },
    { bracket: "6 - 10 LPA (Tier-1 Core)", percentage: 29.5, studentCount: 256 },
    { bracket: "10 - 20 LPA (Dream Companies)", percentage: 34.0, studentCount: 295 },
    { bracket: "20+ LPA (Super Dream & Tech Giants)", percentage: 18.0, studentCount: 156 }
  ],
  topRecruiters: [
    { company: "Amazon", offersCount: 42, tier: "Super Dream", highestLpa: 45.0, domain: "Cloud & E-Commerce" },
    { company: "Microsoft", offersCount: 28, tier: "Super Dream", highestLpa: 44.0, domain: "Enterprise Cloud & AI" },
    { company: "Google", offersCount: 14, tier: "Super Dream", highestLpa: 54.5, domain: "Distributed Systems & Search" },
    { company: "Goldman Sachs", offersCount: 22, tier: "Super Dream", highestLpa: 38.0, domain: "FinTech & Low Latency" },
    { company: "TCS (Digital & Prime)", offersCount: 180, tier: "Tier-1 / Mass", highestLpa: 9.0, domain: "Consulting & IT Services" },
    { company: "Infosys (SP & DSE)", offersCount: 145, tier: "Tier-1 / Mass", highestLpa: 9.5, domain: "Digital Transformation" }
  ],
  tierBreakdown: [
    { tierName: "Super Dream (20+ LPA)", companyCount: 28, offersCount: 182, avgPackageLpa: 29.4 },
    { tierName: "Dream (10 - 20 LPA)", companyCount: 54, offersCount: 380, avgPackageLpa: 14.6 },
    { tierName: "Tier-1 Tech (6 - 10 LPA)", companyCount: 68, offersCount: 410, avgPackageLpa: 7.8 },
    { tierName: "Mass Recruiters (3.5 - 6 LPA)", companyCount: 48, offersCount: 273, avgPackageLpa: 4.2 }
  ],
  trendingSkills: [
    { skill: "Data Structures & System Design", demandPercentage: 96, growth: "+14% YoY" },
    { skill: "Full-Stack Development (React, Node, MERN)", demandPercentage: 88, growth: "+24% YoY" },
    { skill: "Cloud Services (AWS, Docker, Microservices)", demandPercentage: 79, growth: "+32% YoY" },
    { skill: "Generative AI & LLM Applications", demandPercentage: 72, growth: "+85% YoY" },
    { skill: "Relational & NoSQL Databases (Postgres, Mongo)", demandPercentage: 84, growth: "+12% YoY" }
  ],
  yearOnYearTrends: [
    { year: "2022-2023", avgLpa: 11.2, highestLpa: 42.0, placementRate: 88.5 },
    { year: "2023-2024", avgLpa: 12.8, highestLpa: 46.5, placementRate: 91.2 },
    { year: "2024-2025", avgLpa: 14.1, highestLpa: 51.0, placementRate: 93.0 },
    { year: "2025-2026", avgLpa: 15.2, highestLpa: 54.5, placementRate: 94.2 }
  ]
};

module.exports = {
  placementStats,
};
