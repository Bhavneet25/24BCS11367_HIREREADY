const mongoose = require('mongoose');

const aptitudeTestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Comprehensive Placement Mock', 'Quantitative Special', 'Logical Reasoning Mastery', 'Verbal Skills', 'Company Specific Assessment'],
    default: 'Comprehensive Placement Mock',
  },
  durationMinutes: {
    type: Number,
    default: 30,
  },
  totalMarks: {
    type: Number,
    default: 100,
  },
  passingMarks: {
    type: Number,
    default: 60,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Intermediate', 'Advanced'],
    default: 'Intermediate',
  },
  companyTag: {
    type: String,
    default: 'General',
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AptitudeQuestion',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AptitudeTest', aptitudeTestSchema);
