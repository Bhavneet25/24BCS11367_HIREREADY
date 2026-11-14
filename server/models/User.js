const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
    select: false,
  },
  college: {
    type: String,
    default: 'Indian Institute of Technology / Engineering College',
  },
  branch: {
    type: String,
    default: 'Computer Science & Engineering',
  },
  graduationYear: {
    type: Number,
    default: 2026,
  },
  cgpa: {
    type: Number,
    default: 8.5,
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'interviewer'],
    default: 'student',
  },
  readinessScore: {
    type: Number,
    default: 72,
    min: 0,
    max: 100,
  },
  streakDays: {
    type: Number,
    default: 5,
  },
  solvedProblemsCount: {
    type: Number,
    default: 14,
  },
  testsCompletedCount: {
    type: Number,
    default: 6,
  },
  targetCompanies: [{
    type: String,
  }],
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
