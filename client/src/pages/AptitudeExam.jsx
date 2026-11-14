import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import confetti from 'canvas-confetti';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Send,
  RotateCcw,
  BookOpen,
  Award,
  BarChart2,
  Check,
} from 'lucide-react';

const AptitudeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qId]: 'A' }
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await api.get(`/aptitude/tests/${id}`);
        if (res.data.success) {
          setTest(res.data.test);
          setQuestions(res.data.test.questions || []);
          setTimeLeft((res.data.test.durationMinutes || 20) * 60);
        }
      } catch (err) {
        console.error('Failed to load test:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || loading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, loading, answers]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optId) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ._id]: optId,
    }));
  };

  const handleClearResponse = () => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ._id];
      return copy;
    });
  };

  const toggleMarkForReview = () => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ._id]: !prev[currentQ._id],
    }));
  };

  const handleSubmitTest = async () => {
    if (submitting || isSubmitted) return;
    setSubmitting(true);
    try {
      const totalDuration = (test?.durationMinutes || 20) * 60;
      const timeSpent = totalDuration - timeLeft;

      const res = await api.post(`/aptitude/tests/${id}/submit`, {
        answers,
        timeTakenSeconds: timeSpent,
      });

      if (res.data.success) {
        setTestResult(res.data.result);
        setIsSubmitted(true);
        if (res.data.result.passed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    } catch (err) {
      console.error('Error submitting test:', err);
      alert('Failed to submit test. Please check network.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-slate-400 text-sm">Preparing Examination Session...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const selectedOpt = currentQ ? answers[currentQ._id] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Timer Bar */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <Link to="/aptitude" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-base font-bold text-white leading-tight">{test?.title}</h2>
            <p className="text-xs text-slate-400">{test?.category} • Passing: {test?.passingMarks}/{test?.totalMarks} Marks</p>
          </div>
        </div>

        {!isSubmitted ? (
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm ${
              timeLeft < 300
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-emerald-400'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleSubmitTest}
              disabled={submitting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 flex items-center space-x-1.5 shadow-md shadow-indigo-600/30"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Evaluating...' : 'Submit Test'}</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/aptitude"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800"
            >
              Back to Tests
            </Link>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        /* Live Exam Layout: Question Area + Palette Sidebar */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Display */}
          <div className="lg:col-span-3 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Section: <strong className="text-slate-300">{currentQ?.category}</strong> ({currentQ?.topic})
                </span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                +10 Marks
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                {currentQ?.title}
              </h3>

              {/* Options Radio List */}
              <div className="space-y-2.5 pt-2">
                {currentQ?.options?.map((opt) => {
                  const isChecked = selectedOpt === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm flex items-center space-x-3 transition-all ${
                        isChecked
                          ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium ring-1 ring-indigo-500/50'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isChecked ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {opt.id}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMarkForReview}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    markedForReview[currentQ?._id]
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {markedForReview[currentQ?._id] ? 'Marked for Review ★' : 'Mark for Review'}
                </button>
                {selectedOpt && (
                  <button
                    onClick={handleClearResponse}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 border border-slate-800 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <button
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Question Palette</h4>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[q._id];
                const isMarked = markedForReview[q._id];

                let bgClass = 'bg-slate-900 text-slate-400 border-slate-800';
                if (isAnswered) bgClass = 'bg-emerald-600 text-white border-emerald-500';
                if (isMarked) bgClass = 'bg-amber-500 text-slate-950 font-bold border-amber-400';
                if (isCurrent) bgClass += ' ring-2 ring-indigo-400';

                return (
                  <button
                    key={q._id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600"></span>
                <span>Answered ({Object.keys(answers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500"></span>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-900 border border-slate-800"></span>
                <span>Unattempted ({questions.length - Object.keys(answers).length})</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Detailed Test Result & Scorecard View */
        <div className="space-y-6 animate-fadeIn">
          {/* Banner Score Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  testResult?.passed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {testResult?.passed ? 'QUALIFIED / PASSED' : 'NEEDS PRACTICE'}
                </span>
                <h2 className="text-3xl font-extrabold text-white">
                  Score: {testResult?.score} / {testResult?.maxScore} Marks
                </h2>
                <p className="text-xs text-slate-400">
                  Total Questions: {testResult?.totalQuestions} • Correct: {testResult?.correctAnswers} • Wrong: {testResult?.wrongAnswers} • Accuracy: {testResult?.accuracy}%
                </p>
              </div>

              <div className="flex items-center gap-4 text-center">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 min-w-28">
                  <p className="text-2xl font-bold text-indigo-400">{testResult?.percentage}%</p>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Percentage</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 min-w-28">
                  <p className="text-2xl font-bold text-white">{Math.round((testResult?.timeTakenSeconds || 0) / 60)}m</p>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Time Taken</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Full Question Review & Step-by-Step Solutions</span>
            </h3>

            {testResult?.answers?.map((ans, idx) => (
              <div
                key={ans.questionId || idx}
                className={`p-5 rounded-2xl border ${
                  ans.isCorrect
                    ? 'glass-panel border-emerald-500/30 bg-emerald-950/10'
                    : 'glass-panel border-rose-500/30 bg-rose-950/10'
                } space-y-3`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Q{idx + 1} • {ans.category} ({ans.topic})
                    </span>
                    <h4 className="text-sm font-semibold text-white pt-1">{ans.questionTitle}</h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 ${
                    ans.isCorrect ? 'text-emerald-400 bg-emerald-500/20' : 'text-rose-400 bg-rose-500/20'
                  }`}>
                    {ans.isCorrect ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {ans.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-semibold pt-1">
                  <span className="text-slate-400">
                    Your Choice: <strong className={ans.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>{ans.selectedOption || 'Unanswered'}</strong>
                  </span>
                  <span className="text-slate-400">
                    Correct Option: <strong className="text-emerald-400">{ans.correctAnswer}</strong>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1 text-slate-300">
                  <span className="font-bold text-indigo-400 block">Explanation:</span>
                  <p className="font-mono text-[11px] leading-relaxed">{ans.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AptitudeExam;
