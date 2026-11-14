import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  CalendarCheck2,
  Clock,
  Video,
  Bot,
  User,
  Plus,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Award,
  Sparkles,
  X,
} from 'lucide-react';

const MockInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [targetCompany, setTargetCompany] = useState('Amazon');
  const [interviewType, setInterviewType] = useState('Data Structures & Algorithms');
  const [mode, setMode] = useState('AI Simulated Interview');
  const [scheduledDate, setScheduledDate] = useState('2026-11-20');
  const [timeSlot, setTimeSlot] = useState('16:00 - 17:00 IST');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await api.get('/interviews');
      if (res.data.success) {
        setInterviews(res.data.interviews);
      }
    } catch (err) {
      console.error('Failed to load interviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await api.post('/interviews/schedule', {
        targetCompany,
        interviewType,
        mode,
        scheduledDate,
        timeSlot,
        notes,
      });

      if (res.data.success) {
        setIsModalOpen(false);
        fetchInterviews();
      }
    } catch (err) {
      console.error('Error scheduling mock:', err);
      alert('Could not schedule interview. Please check fields.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <CalendarCheck2 className="w-7 h-7 text-purple-400" />
            <span>Mock Interview Simulation Suite</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Simulate realistic technical and behavioral bar-raiser interviews with AI or peer evaluators.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 flex items-center gap-2 self-start md:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Mock Interview</span>
        </button>
      </div>

      {/* Mode Explanations Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs">
            <Bot className="w-4 h-4" />
            <span>AI Simulated Bar-Raiser</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Real-time automated technical interviewer asking company-specific problem solving & behavioral questions.
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
            <User className="w-4 h-4" />
            <span>Peer-to-Peer Exchange</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Practice live problem coding with fellow batchmates using standard campus recruitment rubrics.
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
            <Award className="w-4 h-4" />
            <span>Comprehensive Evaluation Rubric</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Detailed scoring on Algorithmic Logic, System Design, Communication, and STAR format mastery.
          </p>
        </div>
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Your Scheduled & Past Interview Sessions</h2>

        {interviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviews.map((mock) => {
              const isCompleted = mock.status === 'Completed';
              return (
                <div
                  key={mock._id}
                  className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white px-2.5 py-1 rounded-md bg-slate-800">
                          {mock.targetCompany}
                        </span>
                        <span className="text-[10px] font-semibold text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full bg-purple-500/10">
                          {mock.mode}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-indigo-500/15 text-indigo-400 animate-pulse'
                      }`}>
                        {mock.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {mock.interviewType}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{mock.scheduledDate}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-slate-500" />
                        <span>{mock.timeSlot}</span>
                      </p>
                    </div>

                    {isCompleted && mock.feedback && (
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-300">Overall Rubric Score:</span>
                          <span className="text-sm font-extrabold text-emerald-400">{mock.feedback.overallScore}/10</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed italic">
                          "{mock.feedback.detailedNotes}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">Code: {mock.meetingCode}</span>
                    <Link
                      to={`/interviews/session/${mock._id}`}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
                    >
                      <span>{isCompleted ? 'Review Rubric' : 'Enter Interview Room'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-3">
            <p className="text-sm text-slate-400">No mock interview scheduled yet.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Schedule Your First Interview
            </button>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Schedule Mock Interview Session</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Target Company</label>
                <select
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Google">Google (L3 SWE Track)</option>
                  <option value="Amazon">Amazon (SDE-1 Track)</option>
                  <option value="Microsoft">Microsoft (Software Engineer)</option>
                  <option value="Goldman Sachs">Goldman Sachs (Engineering Analyst)</option>
                  <option value="TCS">TCS (Prime & Digital Cadre)</option>
                  <option value="Infosys">Infosys (Specialist Programmer)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Interview Round Focus</label>
                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Data Structures & Algorithms">Data Structures & Algorithms (DSA)</option>
                  <option value="System Design & CS Fundamentals">System Design & CS Fundamentals</option>
                  <option value="HR & Behavioral">HR & Behavioral (STAR Leadership)</option>
                  <option value="Full Mock (DSA + Core + HR)">Full Comprehensive Mock</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Evaluation Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="AI Simulated Interview">AI Simulated Bar-Raiser (Instant Start)</option>
                  <option value="Peer-to-Peer Mock">Peer-to-Peer Candidate Exchange</option>
                  <option value="Mentor Review">Senior Alumni / Mentor Review</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="10:00 - 11:00 IST">10:00 - 11:00 IST</option>
                    <option value="14:00 - 15:00 IST">14:00 - 15:00 IST</option>
                    <option value="16:00 - 17:00 IST">16:00 - 17:00 IST</option>
                    <option value="19:00 - 20:00 IST">19:00 - 20:00 IST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Preparation Goals / Candidate Notes</label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Focus on Graph traversals and STAR answers for team conflict."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/30"
                >
                  {submitting ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterviews;
