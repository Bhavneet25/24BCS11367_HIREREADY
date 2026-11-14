const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AptitudeTest',
    required: true,
  },
  testTitle: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  maxScore: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  passed: {
    type: Boolean,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  wrongAnswers: {
    type: Number,
    required: true,
  },
  unanswered: {
    type: Number,
    required: true,
  },
  timeTakenSeconds: {
    type: Number,
    required: true,
  },
  accuracy: {
    type: Number,
    default: 0,
  },
  categoryBreakdown: {
    type: Map,
    of: {
      correct: Number,
      total: Number,
      percentage: Number,
    },
  },
  answers: [
    {
      questionId: String,
      questionTitle: String,
      selectedOption: String,
      correctAnswer: String,
      isCorrect: Boolean,
      explanation: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TestResult', testResultSchema);
