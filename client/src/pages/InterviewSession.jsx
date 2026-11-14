import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import confetti from 'canvas-confetti';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Bot,
  User,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Award,
  ArrowLeft,
  Code2,
  FileCheck,
} from 'lucide-react';

const InterviewSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [candidateNotes, setCandidateNotes] = useState('// Live interview scratchpad / solution pseudo-code\nfunction solution() {\n  // 1. Discuss constraints & edge cases\n  // 2. Identify optimal data structure\n  // 3. Write modular code\n}');
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Rubric Scores
  const [techRating, setTechRating] = useState(8.5);
  const [problemSolvingRating, setProblemSolvingRating] = useState(9.0);
  const [commRating, setCommRating] = useState(8.0);
  const [confidenceRating, setConfidenceRating] = useState(8.5);
  const [strengthsText, setStrengthsText] = useState('Precise time complexity calculation, structured communication using STAR framework.');
  const [improvementsText, setImprovementsText] = useState('Practice dry-running code with null/edge inputs before declaring solution complete.');
  const [detailedNotes, setDetailedNotes] = useState('Exceptional grasp of foundational data structures. Candidate effectively broke down problem into discrete components.');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await api.get(`/interviews/${id}`);
        if (res.data.success) {
          setInterview(res.data.interview);
        }
      } catch (err) {
        console.error('Failed to load interview room:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFinishInterview = async (e) => {
    e.preventDefault();
    if (submittingFeedback) return;
    setSubmittingFeedback(true);

    try {
      const overall = Number(((techRating + problemSolvingRating + commRating + confidenceRating) / 4).toFixed(1));
      const res = await api.post(`/interviews/${id}/feedback`, {
        overallScore: overall,
        technicalKnowledge: techRating,
        problemSolving: problemSolvingRating,
        communicationSkills: commRating,
        confidenceAndBodyLanguage: confidenceRating,
        strengths: strengthsText.split(',').map((s) => s.trim()),
        areasOfImprovement: improvementsText.split(',').map((s) => s.trim()),
        detailedNotes,
      });

      if (res.data.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setShowFeedbackModal(false);
        navigate('/interviews');
      }
    } catch (err) {
      console.error('Error submitting evaluation rubric:', err);
      alert('Could not submit feedback.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-slate-400 text-sm">Joining Interview Room...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-4">
      {/* Top Session Control Bar */}
      <div className="glass-panel px-5 py-3 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/interviews" className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>{interview?.targetCompany} Mock Interview</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 font-bold">
                {interview?.interviewType}
              </span>
            </h2>
            <p className="text-xs text-slate-400">Meeting Room: {interview?.meetingCode} • Mode: {interview?.mode}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>

          <button
            onClick={() => setShowFeedbackModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 flex items-center gap-1.5 shadow-md shadow-rose-600/30"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>End & Complete Rubric</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Video Feeds (5 cols) & Right Live Problem / Scratchpad (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[640px]">
        {/* Left Column: Video Feeds & Prompts */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* AI / Peer Interviewer Feed */}
          <div className="glass-panel rounded-2xl border border-slate-800 p-5 flex flex-col justify-between relative overflow-hidden h-64 bg-gradient-to-b from-slate-900 to-indigo-950/20">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center space-x-2 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                <Bot className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">{interview?.interviewerName}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Speaking
              </span>
            </div>

            {/* Speaking Waveform Animation */}
            <div className="flex items-center justify-center space-x-1.5 py-6">
              {[40, 65, 30, 85, 45, 90, 50, 75, 35].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-indigo-500 rounded-full animate-pulse"
                  style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>

            <div className="z-10 p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300">
              <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-0.5">Current Prompt:</span>
              <p className="leading-relaxed">
                "Welcome to the {interview?.targetCompany} Technical Assessment. Let's start with your approach to designing an in-memory cache with O(1) reads and writes under extreme concurrency."
              </p>
            </div>
          </div>

          {/* Student Feed with Controls */}
          <div className="glass-panel rounded-2xl border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden h-56 bg-slate-900/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">{interview?.studentName} (Candidate)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                HD 1080p
              </span>
            </div>

            {/* Video Placeholder */}
            <div className="flex items-center justify-center">
              {videoOn ? (
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-indigo-500/30">
                  {interview?.studentName ? interview.studentName.charAt(0) : 'A'}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <VideoOff className="w-8 h-8 mb-1" />
                  <span className="text-xs">Camera Turned Off</span>
                </div>
              )}
            </div>

            {/* AV Controls */}
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-2 rounded-xl transition-colors ${
                  micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                }`}
                title={micOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-2 rounded-xl transition-colors ${
                  videoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                }`}
                title={videoOn ? 'Turn Video Off' : 'Turn Video On'}
              >
                {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Collaborative Scratchpad & Problem Space (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Live Shared Scratchpad & Pseudocode</span>
            </div>
            <span className="text-[10px] text-slate-400">Sync Active • Real-Time Collaborative Canvas</span>
          </div>

          <textarea
            value={candidateNotes}
            onChange={(e) => setCandidateNotes(e.target.value)}
            spellCheck="false"
            className="w-full flex-1 p-5 bg-slate-950 font-mono text-xs sm:text-sm text-slate-100 resize-none focus:outline-none leading-relaxed selection:bg-indigo-600/30"
          />

          <div className="bg-slate-900/90 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Tip: Explain trade-offs out loud while drafting code or data model schemas.</span>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500"
            >
              Finish Round
            </button>
          </div>
        </div>
      </div>

      {/* Evaluation Rubric & Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Interview Performance Rubric & Feedback</h3>
              </div>
              <button onClick={() => setShowFeedbackModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleFinishInterview} className="space-y-4 text-xs">
              <p className="text-slate-400">
                Score the candidate across primary campus recruitment evaluation criteria (1 - 10 scale).
              </p>

              {/* Sliders */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-300">Technical Knowledge</span>
                    <span className="text-emerald-400">{techRating} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={techRating}
                    onChange={(e) => setTechRating(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-300">Problem Solving & Logic</span>
                    <span className="text-emerald-400">{problemSolvingRating} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={problemSolvingRating}
                    onChange={(e) => setProblemSolvingRating(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-300">Communication Skills</span>
                    <span className="text-emerald-400">{commRating} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={commRating}
                    onChange={(e) => setCommRating(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-300">Confidence & Clarity</span>
                    <span className="text-emerald-400">{confidenceRating} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={confidenceRating}
                    onChange={(e) => setConfidenceRating(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Key Strengths Demonstrated</label>
                <input
                  type="text"
                  value={strengthsText}
                  onChange={(e) => setStrengthsText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Areas for Improvement</label>
                <input
                  type="text"
                  value={improvementsText}
                  onChange={(e) => setImprovementsText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Detailed Interviewer Remarks</label>
                <textarea
                  rows="3"
                  value={detailedNotes}
                  onChange={(e) => setDetailedNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Return to Interview
                </button>
                <button
                  type="submit"
                  disabled={submittingFeedback}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-600/30"
                >
                  {submittingFeedback ? 'Saving Evaluation...' : 'Submit Evaluation & Update Score'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSession;
