import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  Flame,
  Award,
  BrainCircuit,
  Code2,
  CalendarCheck2,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Target,
  Sparkles,
  BarChart,
  Clock,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [readinessData, setReadinessData] = useState(null);
  const [upcomingMocks, setUpcomingMocks] = useState([]);
  const [recentTests, setRecentTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [readinessRes, mocksRes, historyRes] = await Promise.all([
          api.get('/stats/readiness'),
          api.get('/interviews'),
          api.get('/aptitude/history'),
        ]);

        if (readinessRes.data.success) {
          setReadinessData(readinessRes.data.readiness);
        }
        if (mocksRes.data.success) {
          setUpcomingMocks(mocksRes.data.interviews.slice(0, 3));
        }
        if (historyRes.data.success) {
          setRecentTests(historyRes.data.history.slice(0, 3));
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const readinessScore = readinessData?.overallScore || user?.readinessScore || 84;
  const domainScores = readinessData?.domainScores || {
    quantitative: 78,
    logical: 85,
    verbal: 80,
    dsaCoding: 88,
    csFundamentals: 82,
    interviewCommunication: 84,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Student Greeting */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Recruitment Drive 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.name || 'Aarav'}! 👋
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              {user?.college || 'National Institute of Technology'} • {user?.branch || 'Computer Science'} • Class of {user?.graduationYear || 2026}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Streak Counter */}
            <div className="flex items-center space-x-2 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-amber-500/20 shadow-lg">
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Practice Streak</p>
                <p className="text-lg font-bold text-amber-400">{user?.streakDays || 7} Days Strong</p>
              </div>
            </div>

            {/* Target Tier */}
            <div className="flex items-center space-x-2 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-indigo-500/20 shadow-lg">
              <Award className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Placement Benchmark</p>
                <p className="text-lg font-bold text-indigo-300">{readinessData?.benchmarkTier || 'Super Dream Ready'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Placement Readiness Gauge & Domain Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Readiness Score Gauge */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              Placement Readiness Index
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Evaluation
            </span>
          </div>

          <div className="py-6 flex flex-col items-center justify-center">
            {/* Circular Gauge */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-emerald-500 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * readinessScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-white">{readinessScore}%</span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                  Readiness Score
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center mt-4 max-w-xs leading-relaxed">
              Based on algorithmic submissions, aptitude accuracy, and mock interview rubric evaluations.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 text-center text-xs">
            <div>
              <p className="text-slate-400 text-[11px]">Coding Solved</p>
              <p className="text-base font-bold text-white mt-0.5">{user?.solvedProblemsCount || 28}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Tests Done</p>
              <p className="text-base font-bold text-white mt-0.5">{user?.testsCompletedCount || 9}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Mocks</p>
              <p className="text-base font-bold text-white mt-0.5">{readinessData?.mockInterviewsCompleted || 2}</p>
            </div>
          </div>
        </div>

        {/* Domain Mastery Radar / Topic Bars */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                Recruitment Skill Mastery Breakdown
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated against current Tier-1 recruitment assessment cutoffs.
              </p>
            </div>
            <Link to="/aptitude" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              <span>View Tests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { label: 'Data Structures & Algorithms', score: domainScores.dsaCoding, color: 'bg-indigo-500' },
              { label: 'Quantitative Aptitude (Speed & Math)', score: domainScores.quantitative, color: 'bg-blue-500' },
              { label: 'Logical Reasoning & Deductions', score: domainScores.logical, color: 'bg-emerald-500' },
              { label: 'Computer Science Core (OS, DBMS, Networks)', score: domainScores.csFundamentals, color: 'bg-amber-500' },
              { label: 'Verbal Ability & Grammar', score: domainScores.verbal, color: 'bg-teal-500' },
              { label: 'Interview Communication & Behavioral (STAR)', score: domainScores.interviewCommunication, color: 'bg-purple-500' },
            ].map((skill, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{skill.label}</span>
                  <span className="text-white">{skill.score}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${skill.color} transition-all duration-700`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Quick Preparation Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/aptitude"
            className="p-5 rounded-xl glass-card hover:border-blue-500/40 hover:bg-slate-900 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">Take Aptitude Test</h4>
            <p className="text-xs text-slate-400 mt-1">Timed diagnostic test matching TCS, Infosys & Cognizant formats.</p>
          </Link>

          <Link
            to="/coding"
            className="p-5 rounded-xl glass-card hover:border-emerald-500/40 hover:bg-slate-900 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">Solve Coding Challenges</h4>
            <p className="text-xs text-slate-400 mt-1">Interactive sandbox with 5 top interview problems & automated runner.</p>
          </Link>

          <Link
            to="/interviews"
            className="p-5 rounded-xl glass-card hover:border-purple-500/40 hover:bg-slate-900 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">Schedule Mock Interview</h4>
            <p className="text-xs text-slate-400 mt-1">Simulate real technical bar-raiser rounds with AI & structured feedback.</p>
          </Link>

          <Link
            to="/resume"
            className="p-5 rounded-xl glass-card hover:border-cyan-500/40 hover:bg-slate-900 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">ATS Resume Builder</h4>
            <p className="text-xs text-slate-400 mt-1">Craft a resume with live preview, AI bullet improver, and PDF export.</p>
          </Link>
        </div>
      </div>

      {/* Weak Areas & Upcoming Mock Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identified Focus Areas */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            Target Improvement Areas
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-white">Dynamic Programming (Knapsack & Subsequences)</p>
                <p className="text-xs text-slate-400 mt-1">Recommended: Solve 2 Medium DP problems to solidify recursion state caching.</p>
              </div>
              <Link to="/coding" className="px-3 py-1 rounded bg-indigo-600/20 text-indigo-400 text-xs font-semibold border border-indigo-500/30 whitespace-nowrap ml-3">
                Practice
              </Link>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-white">Permutations & Probability Aptitude</p>
                <p className="text-xs text-slate-400 mt-1">Essential for Goldman Sachs & Amazon sectional aptitude cutoffs.</p>
              </div>
              <Link to="/aptitude" className="px-3 py-1 rounded bg-blue-600/20 text-blue-400 text-xs font-semibold border border-blue-500/30 whitespace-nowrap ml-3">
                Review
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Mock Interviews */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CalendarCheck2 className="w-4 h-4 text-purple-400" />
              Scheduled Mock Interviews
            </h3>
            <Link to="/interviews" className="text-xs font-semibold text-purple-400 hover:text-purple-300">
              Manage All
            </Link>
          </div>

          {upcomingMocks.length > 0 ? (
            <div className="space-y-3">
              {upcomingMocks.map((mock) => (
                <div key={mock._id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{mock.targetCompany} {mock.interviewType}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        {mock.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{mock.scheduledDate} • {mock.timeSlot}</span>
                    </p>
                  </div>
                  <Link
                    to={`/interviews/session/${mock._id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                  >
                    Enter Room
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs text-slate-400">No upcoming interviews scheduled yet.</p>
              <Link
                to="/interviews"
                className="mt-3 inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
              >
                Schedule Your First Mock
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
