const { getModel } = require('../config/db');
const CodingProblem = require('../models/CodingProblem');
const CodeSubmission = require('../models/CodeSubmission');
const User = require('../models/User');
const { evaluateMultiLanguage } = require('../utils/codeRunner');

// @desc    Get all coding problems with filtering
// @route   GET /api/coding/problems
const getAllProblems = async (req, res, next) => {
  try {
    const ProblemModel = getModel('CodingProblem', CodingProblem);
    const { category, difficulty, company, search } = req.query;

    let problems = await ProblemModel.find({});

    if (category && category !== 'All') {
      problems = problems.filter((p) => p.category === category);
    }

    if (difficulty && difficulty !== 'All') {
      problems = problems.filter((p) => p.difficulty === difficulty);
    }

    if (company && company !== 'All') {
      problems = problems.filter((p) => p.companies && p.companies.includes(company));
    }

    if (search) {
      const q = search.toLowerCase();
      problems = problems.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    res.status(200).json({
      success: true,
      count: problems.length,
      problems,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single problem by slug or id
// @route   GET /api/coding/problems/:slug
const getProblemBySlug = async (req, res, next) => {
  try {
    const ProblemModel = getModel('CodingProblem', CodingProblem);
    const { slug } = req.params;

    let problem = await ProblemModel.findOne({ slug });
    if (!problem) {
      problem = await ProblemModel.findById(slug);
    }

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Coding problem not found.' });
    }

    res.status(200).json({
      success: true,
      problem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Run code against visible test cases
// @route   POST /api/coding/run
const runCode = async (req, res, next) => {
  try {
    const { problemId, language, code } = req.body;
    const ProblemModel = getModel('CodingProblem', CodingProblem);

    const problem = await ProblemModel.findById(problemId);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    // Use visible test cases for quick dry-run
    const testCasesToRun = problem.testCases || [];
    const evaluation = evaluateMultiLanguage(language || 'javascript', code, testCasesToRun);

    res.status(200).json({
      success: true,
      evaluation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit final code and verify all test cases including hidden
// @route   POST /api/coding/submit
const submitCode = async (req, res, next) => {
  try {
    const { problemId, language, code } = req.body;
    const ProblemModel = getModel('CodingProblem', CodingProblem);
    const SubmissionModel = getModel('CodeSubmission', CodeSubmission);
    const UserModel = getModel('User', User);

    const problem = await ProblemModel.findById(problemId);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    const evaluation = evaluateMultiLanguage(language || 'javascript', code, problem.testCases || []);

    const submission = await SubmissionModel.create({
      user: req.user._id,
      problem: problem._id,
      problemTitle: problem.title,
      language,
      code,
      status: evaluation.status,
      runtime: evaluation.runtime,
      memory: evaluation.memory,
      passedTestCases: evaluation.passedTestCases,
      totalTestCases: evaluation.totalTestCases,
      createdAt: new Date().toISOString(),
    });

    if (evaluation.status === 'Accepted') {
      const user = await UserModel.findById(req.user._id);
      if (user) {
        const solved = (user.solvedProblemsCount || 0) + 1;
        const newScore = Math.min(99, (user.readinessScore || 70) + 1);
        await UserModel.findByIdAndUpdate(user._id, {
          solvedProblemsCount: solved,
          readinessScore: newScore,
        });
      }
    }

    res.status(200).json({
      success: true,
      submission,
      evaluation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's past submissions
// @route   GET /api/coding/submissions
const getMySubmissions = async (req, res, next) => {
  try {
    const SubmissionModel = getModel('CodeSubmission', CodeSubmission);
    const submissions = await SubmissionModel.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions: submissions.reverse ? submissions.reverse() : submissions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProblems,
  getProblemBySlug,
  runCode,
  submitCode,
  getMySubmissions,
};
