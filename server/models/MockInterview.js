const mongoose = require('mongoose');

const mockInterviewSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  interviewerName: {
    type: String,
    default: 'Senior SDE Mentor / AI Bot',
  },
  interviewType: {
    type: String,
    enum: ['Data Structures & Algorithms', 'System Design & CS Fundamentals', 'HR & Behavioral', 'Full Mock (DSA + Core + HR)'],
    required: true,
  },
  mode: {
    type: String,
    enum: ['AI Simulated Interview', 'Peer-to-Peer Mock', 'Mentor Review'],
    default: 'AI Simulated Interview',
  },
  targetCompany: {
    type: String,
    required: true,
  },
  scheduledDate: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  timeSlot: {
    type: String, // e.g. "14:00 - 15:00"
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
  meetingCode: {
    type: String,
    default: () => 'HR-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
  },
  notes: {
    type: String,
    default: '',
  },
  feedback: {
    overallScore: { type: Number, min: 0, max: 10, default: 0 },
    technicalKnowledge: { type: Number, min: 0, max: 10, default: 0 },
    problemSolving: { type: Number, min: 0, max: 10, default: 0 },
    communicationSkills: { type: Number, min: 0, max: 10, default: 0 },
    confidenceAndBodyLanguage: { type: Number, min: 0, max: 10, default: 0 },
    strengths: [String],
    areasOfImprovement: [String],
    detailedNotes: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MockInterview', mockInterviewSchema);
