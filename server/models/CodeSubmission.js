const mongoose = require('mongoose');

const codeSubmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CodingProblem',
    required: true,
  },
  problemTitle: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ['javascript', 'python', 'cpp', 'java'],
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error'],
    required: true,
  },
  runtime: {
    type: String,
    default: '58 ms',
  },
  memory: {
    type: String,
    default: '42.1 MB',
  },
  passedTestCases: {
    type: Number,
    required: true,
  },
  totalTestCases: {
    type: Number,
    required: true,
  },
  errorMessage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CodeSubmission', codeSubmissionSchema);
