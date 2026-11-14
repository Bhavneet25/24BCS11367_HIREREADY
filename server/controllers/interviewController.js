const { getModel } = require('../config/db');
const MockInterview = require('../models/MockInterview');
const User = require('../models/User');

// @desc    Get user's scheduled & past mock interviews
// @route   GET /api/interviews
const getMyInterviews = async (req, res, next) => {
  try {
    const InterviewModel = getModel('MockInterview', MockInterview);
    const interviews = await InterviewModel.find({ student: req.user._id });

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Schedule a new mock interview session
// @route   POST /api/interviews/schedule
const scheduleInterview = async (req, res, next) => {
  try {
    const { interviewType, mode, targetCompany, scheduledDate, timeSlot, notes } = req.body;
    const InterviewModel = getModel('MockInterview', MockInterview);

    if (!interviewType || !targetCompany || !scheduledDate || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Please provide all required interview scheduling fields.' });
    }

    const meetingCode = 'HR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const interviewerName = mode === 'AI Simulated Interview' 
      ? `AI ${targetCompany} Senior Bar Raiser` 
      : mode === 'Peer-to-Peer Mock' 
        ? 'Verified Peer Candidate' 
        : `Senior Staff Engineer (${targetCompany} Alumni)`;

    const interview = await InterviewModel.create({
      student: req.user._id,
      studentName: req.user.name,
      studentEmail: req.user.email,
      interviewerName,
      interviewType,
      mode: mode || 'AI Simulated Interview',
      targetCompany,
      scheduledDate,
      timeSlot,
      status: 'Scheduled',
      meetingCode,
      notes: notes || '',
      feedback: {
        overallScore: 0,
        technicalKnowledge: 0,
        problemSolving: 0,
        communicationSkills: 0,
        confidenceAndBodyLanguage: 0,
        strengths: [],
        areasOfImprovement: [],
        detailedNotes: 'Interview not yet completed.',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Mock interview successfully scheduled!',
      interview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single interview details
// @route   GET /api/interviews/:id
const getInterviewById = async (req, res, next) => {
  try {
    const InterviewModel = getModel('MockInterview', MockInterview);
    const interview = await InterviewModel.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit feedback and rubric evaluation for completed mock interview
// @route   POST /api/interviews/:id/feedback
const submitFeedback = async (req, res, next) => {
  try {
    const {
      overallScore,
      technicalKnowledge,
      problemSolving,
      communicationSkills,
      confidenceAndBodyLanguage,
      strengths,
      areasOfImprovement,
      detailedNotes,
    } = req.body;

    const InterviewModel = getModel('MockInterview', MockInterview);
    const UserModel = getModel('User', User);

    const interview = await InterviewModel.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    const updated = await InterviewModel.findByIdAndUpdate(
      interview._id,
      {
        status: 'Completed',
        feedback: {
          overallScore: overallScore || 8.0,
          technicalKnowledge: technicalKnowledge || 8.0,
          problemSolving: problemSolving || 8.0,
          communicationSkills: communicationSkills || 8.0,
          confidenceAndBodyLanguage: confidenceAndBodyLanguage || 8.0,
          strengths: strengths || ['Strong algorithmic clarity', 'Calm problem-solving approach'],
          areasOfImprovement: areasOfImprovement || ['Deepen Operating Systems thread-safety principles'],
          detailedNotes: detailedNotes || 'Solid interview performance. Candidate is on track for target company standard.',
        },
      },
      { new: true }
    );

    // Boost readiness score upon mock completion
    const user = await UserModel.findById(interview.student);
    if (user) {
      const newScore = Math.min(99, (user.readinessScore || 70) + 2);
      await UserModel.findByIdAndUpdate(user._id, { readinessScore: newScore });
    }

    res.status(200).json({
      success: true,
      message: 'Interview evaluation recorded successfully.',
      interview: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyInterviews,
  scheduleInterview,
  getInterviewById,
  submitFeedback,
};
