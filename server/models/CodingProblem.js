const mongoose = require('mongoose');

const codingProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  category: {
    type: String,
    enum: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Linked List', 'Trees & Graphs', 'Dynamic Programming', 'Binary Search', 'Stack & Queue'],
    required: true,
  },
  acceptanceRate: {
    type: String,
    default: '65%',
  },
  description: {
    type: String,
    required: true,
  },
  constraints: [String],
  examples: [
    {
      input: String,
      output: String,
      explanation: String,
    },
  ],
  testCases: [
    {
      input: String,
      expectedOutput: String,
      isHidden: { type: Boolean, default: false },
    },
  ],
  starterCode: {
    javascript: String,
    python: String,
    cpp: String,
    java: String,
  },
  solutionSnippet: {
    javascript: String,
    python: String,
    explanation: String,
  },
  companies: [String],
  tags: [String],
  hints: [String],
  submissionsCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CodingProblem', codingProblemSchema);
