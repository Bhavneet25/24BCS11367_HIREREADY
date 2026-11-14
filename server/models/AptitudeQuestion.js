const mongoose = require('mongoose');

const aptitudeQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Quantitative', 'Logical Reasoning', 'Verbal Ability', 'Technical Core'],
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  options: [
    {
      id: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  correctAnswer: {
    type: String, // corresponds to option id ('A', 'B', 'C', 'D')
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  companies: [String],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
