const { getModel } = require('../config/db');
const AptitudeTest = require('../models/AptitudeTest');
const AptitudeQuestion = require('../models/AptitudeQuestion');
const TestResult = require('../models/TestResult');
const User = require('../models/User');

// @desc    Get all available aptitude tests
// @route   GET /api/aptitude/tests
const getAllTests = async (req, res, next) => {
  try {
    const TestModel = getModel('AptitudeTest', AptitudeTest);
    const QuestionModel = getModel('AptitudeQuestion', AptitudeQuestion);

    const tests = await TestModel.find({});
    // Attach question counts
    const enhancedTests = await Promise.all(
      tests.map(async (t) => {
        const count = t.questions ? t.questions.length : 0;
        return {
          ...t,
          totalQuestionsCount: count,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: enhancedTests.length,
      tests: enhancedTests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single test with full question objects
// @route   GET /api/aptitude/tests/:id
const getTestById = async (req, res, next) => {
  try {
    const TestModel = getModel('AptitudeTest', AptitudeTest);
    const QuestionModel = getModel('AptitudeQuestion', AptitudeQuestion);

    const test = await TestModel.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    // Retrieve questions
    let questions = [];
    if (test.questions && test.questions.length > 0) {
      questions = await QuestionModel.find({ _id: { $in: test.questions } });
    }

    // Return sanitized questions (without exposing correctAnswer immediately during exam)
    const sanitizedQuestions = questions.map((q) => ({
      _id: q._id,
      title: q.title,
      category: q.category,
      topic: q.topic,
      difficulty: q.difficulty,
      options: q.options,
      tags: q.tags,
      companies: q.companies,
    }));

    res.status(200).json({
      success: true,
      test: {
        ...test,
        questions: sanitizedQuestions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit answers for a test and generate detailed performance report
// @route   POST /api/aptitude/tests/:id/submit
const submitTest = async (req, res, next) => {
  try {
    const { answers, timeTakenSeconds } = req.body;
    // answers format: { [questionId]: selectedOptionKey } e.g. { "apt_q_01": "D" }

    const TestModel = getModel('AptitudeTest', AptitudeTest);
    const QuestionModel = getModel('AptitudeQuestion', AptitudeQuestion);
    const ResultModel = getModel('TestResult', TestResult);
    const UserModel = getModel('User', User);

    const test = await TestModel.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    const questionDocs = await QuestionModel.find({ _id: { $in: test.questions } });
    const totalQuestions = questionDocs.length;
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const detailedAnswers = [];
    const categoryStats = {};

    for (const q of questionDocs) {
      const qId = String(q._id);
      const selected = answers ? answers[qId] : null;
      const isCorrect = selected && selected.toUpperCase() === q.correctAnswer.toUpperCase();

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { correct: 0, total: 0, percentage: 0 };
      }
      categoryStats[q.category].total += 1;

      if (!selected) {
        unansweredCount++;
      } else if (isCorrect) {
        correctCount++;
        categoryStats[q.category].correct += 1;
      } else {
        wrongCount++;
      }

      detailedAnswers.push({
        questionId: qId,
        questionTitle: q.title,
        category: q.category,
        topic: q.topic,
        difficulty: q.difficulty,
        selectedOption: selected || 'Unanswered',
        correctAnswer: q.correctAnswer,
        options: q.options,
        isCorrect: Boolean(isCorrect),
        explanation: q.explanation,
      });
    }

    // Compute category percentages
    for (const cat in categoryStats) {
      const stat = categoryStats[cat];
      stat.percentage = Math.round((stat.correct / stat.total) * 100);
    }

    const marksPerQuestion = test.totalMarks / Math.max(1, totalQuestions);
    const earnedScore = Math.round(correctCount * marksPerQuestion);
    const percentage = Math.round((earnedScore / test.totalMarks) * 100);
    const passed = earnedScore >= test.passingMarks;
    const answeredCount = correctCount + wrongCount;
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    const testResult = await ResultModel.create({
      user: req.user._id,
      test: test._id,
      testTitle: test.title,
      score: earnedScore,
      maxScore: test.totalMarks,
      percentage,
      passed,
      totalQuestions,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      unanswered: unansweredCount,
      timeTakenSeconds: timeTakenSeconds || 0,
      accuracy,
      categoryBreakdown: categoryStats,
      answers: detailedAnswers,
    });

    // Update user stats and streak
    const user = await UserModel.findById(req.user._id);
    if (user) {
      const newTestsCount = (user.testsCompletedCount || 0) + 1;
      // Incrementally improve placement readiness score
      const newReadiness = Math.min(98, Math.round((user.readinessScore || 70) * 0.95 + percentage * 0.05));
      await UserModel.findByIdAndUpdate(user._id, {
        testsCompletedCount: newTestsCount,
        readinessScore: newReadiness,
      });
    }

    res.status(200).json({
      success: true,
      result: testResult,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user test results history
// @route   GET /api/aptitude/history
const getMyTestHistory = async (req, res, next) => {
  try {
    const ResultModel = getModel('TestResult', TestResult);
    const results = await ResultModel.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: results.length,
      history: results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get practice questions with filters (category, difficulty, topic)
// @route   GET /api/aptitude/practice-questions
const getPracticeQuestions = async (req, res, next) => {
  try {
    const QuestionModel = getModel('AptitudeQuestion', AptitudeQuestion);
    const { category, difficulty, search } = req.query;

    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (difficulty && difficulty !== 'All') filter.difficulty = difficulty;

    let questions = await QuestionModel.find(filter);

    if (search) {
      const q = search.toLowerCase();
      questions = questions.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.topic.toLowerCase().includes(q) ||
          (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTests,
  getTestById,
  submitTest,
  getMyTestHistory,
  getPracticeQuestions,
};
