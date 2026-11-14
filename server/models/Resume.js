const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resumeTitle: {
    type: String,
    default: 'My Software Engineering Resume',
  },
  template: {
    type: String,
    enum: ['Modern Clean', 'Minimalist Tech', 'Executive Standard', 'Creative Developer'],
    default: 'Modern Clean',
  },
  personalInfo: {
    fullName: { type: String, default: 'Alex Sharma' },
    email: { type: String, default: 'alex.sharma@example.com' },
    phone: { type: String, default: '+91 98765 43210' },
    location: { type: String, default: 'Bengaluru, India' },
    linkedin: { type: String, default: 'https://linkedin.com/in/alexsharma' },
    github: { type: String, default: 'https://github.com/alexsharma' },
    portfolio: { type: String, default: 'https://alexsharma.dev' },
    summary: {
      type: String,
      default: 'Final-year Computer Science student with strong foundations in Data Structures, Algorithms, Full-Stack Web Development, and Distributed Systems. Passionate about architecting scalable web applications and solving real-world engineering challenges.',
    },
  },
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: String,
      endDate: String,
      cgpaOrMarks: String,
      highlights: String,
    },
  ],
  experience: [
    {
      company: String,
      role: String,
      location: String,
      startDate: String,
      endDate: String,
      current: Boolean,
      bulletPoints: [String],
    },
  ],
  projects: [
    {
      title: String,
      technologies: String,
      liveLink: String,
      githubLink: String,
      description: String,
      bulletPoints: [String],
    },
  ],
  skills: {
    programmingLanguages: [String],
    frameworksAndLibraries: [String],
    databasesAndTools: [String],
    coreSubjects: [String],
  },
  certifications: [
    {
      name: String,
      issuer: String,
      date: String,
      credentialUrl: String,
    },
  ],
  achievements: [String],
  atsScore: {
    type: Number,
    default: 88,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resume', resumeSchema);
