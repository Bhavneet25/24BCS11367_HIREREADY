const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getModel } = require('../config/db');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'hireready_placement_secret_key_2026_super_secure', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, college, branch, graduationYear, targetCompanies } = req.body;
    const UserModel = getModel('User', User);

    const userExists = await UserModel.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      college: college || 'National Institute of Technology',
      branch: branch || 'Computer Science & Engineering',
      graduationYear: graduationYear || 2026,
      targetCompanies: targetCompanies || ['Google', 'Amazon', 'Microsoft', 'TCS'],
      readinessScore: 70,
      streakDays: 1,
      solvedProblemsCount: 0,
      testsCompletedCount: 0,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        branch: user.branch,
        graduationYear: user.graduationYear,
        readinessScore: user.readinessScore,
        streakDays: user.streakDays,
        solvedProblemsCount: user.solvedProblemsCount,
        testsCompletedCount: user.testsCompletedCount,
        targetCompanies: user.targetCompanies,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password' });
    }

    const UserModel = getModel('User', User);
    let user;

    if (global.isMongoConnected) {
      user = await UserModel.findOne({ email: email.toLowerCase() }).select('+password');
    } else {
      user = await UserModel.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        branch: user.branch,
        graduationYear: user.graduationYear,
        readinessScore: user.readinessScore,
        streakDays: user.streakDays,
        solvedProblemsCount: user.solvedProblemsCount,
        testsCompletedCount: user.testsCompletedCount,
        targetCompanies: user.targetCompanies,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
const updateProfile = async (req, res, next) => {
  try {
    const UserModel = getModel('User', User);
    const { name, college, branch, graduationYear, targetCompanies, readinessScore } = req.body;

    const updated = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        ...(name && { name }),
        ...(college && { college }),
        ...(branch && { branch }),
        ...(graduationYear && { graduationYear }),
        ...(targetCompanies && { targetCompanies }),
        ...(readinessScore && { readinessScore }),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
};
