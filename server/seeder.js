require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { aptitudeQuestions, aptitudeTests } = require('./data/aptitudeSeed');
const { codingProblems } = require('./data/codingSeed');
const { companies } = require('./data/companySeed');
const { placementStats } = require('./data/placementStatsSeed');
const { sampleResume } = require('./data/sampleResumes');

const User = require('./models/User');
const AptitudeQuestion = require('./models/AptitudeQuestion');
const AptitudeTest = require('./models/AptitudeTest');
const CodingProblem = require('./models/CodingProblem');
const Company = require('./models/Company');
const MockInterview = require('./models/MockInterview');
const Resume = require('./models/Resume');
const PlacementStatistic = require('./models/PlacementStatistic');

const { saveDb, rawDb } = require('./config/jsonStore');

async function seedData() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hireready';
  let mongoActive = false;

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    mongoActive = true;
    console.log('[Seeder] Connected to MongoDB. Seeding collections...');
  } catch (err) {
    console.log('[Seeder] MongoDB not reachable. Seeding embedded local JSON datastore...');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Password123!', salt);

  const demoUser = {
    _id: 'usr_demo_001',
    name: 'Aarav Sharma',
    email: 'student@hireready.edu',
    password: hashedPassword,
    college: 'National Institute of Technology (NIT)',
    branch: 'Computer Science & Engineering',
    graduationYear: 2026,
    cgpa: 8.92,
    role: 'student',
    readinessScore: 84,
    streakDays: 7,
    solvedProblemsCount: 28,
    testsCompletedCount: 9,
    targetCompanies: ['Google', 'Amazon', 'Microsoft', 'Goldman Sachs'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString(),
  };

  const demoInterview = {
    _id: 'mock_int_01',
    student: demoUser._id,
    studentName: demoUser.name,
    studentEmail: demoUser.email,
    interviewerName: 'AI SDE Evaluator & Senior Lead',
    interviewType: 'Full Mock (DSA + Core + HR)',
    mode: 'AI Simulated Interview',
    targetCompany: 'Amazon',
    scheduledDate: '2026-11-18',
    timeSlot: '16:00 - 17:00 IST',
    status: 'Scheduled',
    meetingCode: 'HR-AMZN-99',
    notes: 'Focus on System Design concepts, Graph BFS traversals, and Amazon LP stories.',
    feedback: {
      overallScore: 8.5,
      technicalKnowledge: 9,
      problemSolving: 8.5,
      communicationSkills: 8.0,
      confidenceAndBodyLanguage: 8.5,
      strengths: ['Clear Big-O notation articulation', 'Great edge-case identification in array problems', 'Structured STAR responses'],
      areasOfImprovement: ['Practice writing cleaner modular helper functions under strict time limits'],
      detailedNotes: 'Strong performance across technical criteria. Demonstrates clear structured communication.'
    },
    createdAt: new Date().toISOString(),
  };

  const userResume = {
    _id: 'res_demo_01',
    user: demoUser._id,
    ...sampleResume,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (mongoActive) {
    try {
      await User.deleteMany({});
      await AptitudeQuestion.deleteMany({});
      await AptitudeTest.deleteMany({});
      await CodingProblem.deleteMany({});
      await Company.deleteMany({});
      await MockInterview.deleteMany({});
      await Resume.deleteMany({});
      await PlacementStatistic.deleteMany({});

      // Insert User directly
      await mongoose.connection.collection('users').insertOne(demoUser);
      await AptitudeQuestion.insertMany(aptitudeQuestions);
      await AptitudeTest.insertMany(aptitudeTests);
      await CodingProblem.insertMany(codingProblems);
      await Company.insertMany(companies);
      await mongoose.connection.collection('mockinterviews').insertOne(demoInterview);
      await mongoose.connection.collection('resumes').insertOne(userResume);
      await PlacementStatistic.create(placementStats);

      console.log('✅ MongoDB Database seeded successfully with comprehensive data!');
      process.exit(0);
    } catch (error) {
      console.error('Error seeding MongoDB:', error);
      process.exit(1);
    }
  } else {
    // Seed JSON datastore
    rawDb.users = [demoUser];
    rawDb.aptitudequestions = aptitudeQuestions;
    rawDb.aptitudetests = aptitudeTests;
    rawDb.codingproblems = codingProblems;
    rawDb.companies = companies;
    rawDb.mockinterviews = [demoInterview];
    rawDb.resumes = [userResume];
    rawDb.placementstatistics = [placementStats];
    rawDb.testresults = [];
    rawDb.codesubmissions = [];

    saveDb();
    console.log('✅ Standalone local JSON database seeded successfully with comprehensive data!');
    process.exit(0);
  }
}

seedData();
