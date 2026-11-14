import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  BrainCircuit,
  Clock,
  Award,
  CheckCircle,
  HelpCircle,
  Search,
  Filter,
  Play,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

const AptitudeTests = () => {
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'practice'
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testsRes, questionsRes] = await Promise.all([
          api.get('/aptitude/tests'),
          api.get('/aptitude/practice-questions'),
        ]);

        if (testsRes.data.success) {
          setTests(testsRes.data.tests);
        }
        if (questionsRes.data.success) {
          setQuestions(questionsRes.data.questions);
        }
      } catch (err) {
        console.error('Error fetching aptitude data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = ['All', 'Quantitative', 'Logical Reasoning', 'Verbal Ability', 'Technical Core'];

  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <BrainCircuit className="w-7 h-7 text-indigo-400" />
            <span>Aptitude Practice & Diagnostic Tests</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Simulate company online assessment patterns (NQT, InfyTQ, AMCAT, eLitmus) with live timers and step-by-step solutions.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'tests'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Full-Length Mock Tests
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'practice'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Topic Question Bank ({questions.length})
          </button>
        </div>
      </div>

      {activeTab === 'tests' ? (
        /* Full-Length Tests Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div
              key={test._id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {test.companyTag || 'National Qualifier'}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      test.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : test.difficulty === 'Intermediate'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {test.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {test.description}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Questions</span>
                    <span className="text-xs font-bold text-white">{test.totalQuestionsCount || test.questions?.length || 12}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Duration</span>
                    <span className="text-xs font-bold text-white flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {test.durationMinutes}m
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Pass Marks</span>
                    <span className="text-xs font-bold text-emerald-400">{test.passingMarks}/{test.totalMarks}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <Link
                  to={`/aptitude/exam/${test._id}`}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Timed Assessment</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Topic Practice Bank */
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics (e.g. Speed, Logic)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const isExpanded = expandedQuestion === q._id;
              return (
                <div
                  key={q._id}
                  className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {q.category}
                        </span>
                        <span className="text-[10px] font-semibold text-indigo-400">
                          {q.topic}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                          {q.difficulty}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white pt-1">
                        {idx + 1}. {q.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => setExpandedQuestion(isExpanded ? null : q._id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 whitespace-nowrap"
                    >
                      {isExpanded ? 'Hide Solution' : 'View Answer'}
                    </button>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-xl border text-xs flex items-center space-x-2 ${
                          isExpanded && opt.id === q.correctAnswer
                            ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-semibold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-[11px] font-bold flex items-center justify-center text-slate-400">
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                        {isExpanded && opt.id === q.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Detailed Explanation Drawer */}
                  {isExpanded && (
                    <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs space-y-2 mt-3 animate-fadeIn">
                      <div className="flex items-center gap-1.5 font-bold text-indigo-300">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Step-by-Step Explanation (Correct Option: {q.correctAnswer})</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                        {q.explanation}
                      </p>
                      {q.companies && (
                        <p className="text-[10px] text-slate-400 pt-1">
                          Frequently asked in: <span className="text-white font-semibold">{q.companies.join(', ')}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AptitudeTests;
