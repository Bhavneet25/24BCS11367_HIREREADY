import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import confetti from 'canvas-confetti';
import {
  Code2,
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Lightbulb,
  Building2,
  Copy,
  Check,
} from 'lucide-react';

const CodingProblemDetail = () => {
  const { slug } = useParams();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'solution' | 'submissions'
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [activeTestCaseTab, setActiveTestCaseTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await api.get(`/coding/problems/${slug}`);
        if (res.data.success) {
          const prob = res.data.problem;
          setProblem(prob);
          setCode(prob.starterCode?.javascript || '// Write your code here');
        }
      } catch (err) {
        console.error('Error fetching problem details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [slug]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (problem?.starterCode?.[newLang]) {
      setCode(problem.starterCode[newLang]);
    }
  };

  const handleResetCode = () => {
    if (problem?.starterCode?.[language]) {
      setCode(problem.starterCode[language]);
      setRunResult(null);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    try {
      const res = await api.post('/coding/run', {
        problemId: problem._id,
        language,
        code,
      });

      if (res.data.success) {
        setRunResult(res.data.evaluation);
      }
    } catch (err) {
      console.error('Run code failed:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await api.post('/coding/submit', {
        problemId: problem._id,
        language,
        code,
      });

      if (res.data.success) {
        setRunResult(res.data.evaluation);
        if (res.data.evaluation.status === 'Accepted') {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        }
      }
    } catch (err) {
      console.error('Submit code failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-slate-400 text-sm">Loading Problem Workspace...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-4">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between glass-panel px-4 py-3 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <Link to="/coding" className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>{problem?.title}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  problem?.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : problem?.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'bg-rose-500/10 text-rose-400'
                }`}
              >
                {problem?.difficulty}
              </span>
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
          <button
            onClick={handleSubmitCode}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid: Left (Description / Editorial) & Right (Code Editor & Console) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[700px]">
        {/* Left Column: Problem Details Tabs (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center bg-slate-900/80 border-b border-slate-800 px-4">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'description'
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1 ${
                activeTab === 'solution'
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Editorial & Solution</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 max-h-[680px]">
            {activeTab === 'description' ? (
              <>
                {/* Description Text */}
                <div className="space-y-3">
                  <p className="whitespace-pre-line leading-relaxed text-slate-300 text-xs sm:text-sm">
                    {problem?.description}
                  </p>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Examples:</h4>
                  {problem?.examples?.map((ex, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 font-mono text-[11px]">
                      <p><span className="text-slate-500">Input:</span> <span className="text-emerald-400">{ex.input}</span></p>
                      <p><span className="text-slate-500">Output:</span> <span className="text-white font-bold">{ex.output}</span></p>
                      {ex.explanation && (
                        <p className="text-slate-400 pt-1 font-sans text-[11px]"><strong className="text-slate-300">Explanation:</strong> {ex.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Constraints:</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
                    {problem?.constraints?.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Target Companies */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-[11px] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Frequently Asked By:</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {problem?.companies?.map((comp, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Editorial / Solution View */
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs space-y-2">
                  <span className="font-bold text-indigo-300 block">Approach & Algorithmic Complexity:</span>
                  <p className="text-slate-300 leading-relaxed font-sans text-xs">
                    {problem?.solutionSnippet?.explanation}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-xs mb-2">Optimal Implementation ({language.toUpperCase()}):</h4>
                  <pre className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
                    {problem?.solutionSnippet?.[language] || problem?.solutionSnippet?.javascript}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Test Runner Console (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Editor Header Bar */}
          <div className="glass-panel px-4 py-2.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="javascript">JavaScript (Node.js v24)</option>
                <option value="python">Python 3.12</option>
                <option value="cpp">C++ (G++ 13)</option>
                <option value="java">Java 21 (OpenJDK)</option>
              </select>
            </div>

            {/* Utility Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleResetCode}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Reset to starter template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Code Editor Area */}
          <div className="glass-panel rounded-2xl border border-slate-800 flex-1 overflow-hidden flex flex-col min-h-[380px]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="w-full flex-1 p-4 bg-slate-950 font-mono text-xs sm:text-[13px] text-slate-100 resize-none focus:outline-none leading-relaxed selection:bg-indigo-600/30"
              placeholder="// Write your code here..."
            />
          </div>

          {/* Output & Testcase Console Panel */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Testcase Evaluation Console</span>
              {runResult && (
                <div className="flex items-center space-x-3 text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                    runResult.status === 'Accepted'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {runResult.status === 'Accepted' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{runResult.status}</span>
                  </span>
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {runResult.runtime}
                  </span>
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> {runResult.memory}
                  </span>
                </div>
              )}
            </div>

            {/* Test Cases Output Tabs */}
            {runResult?.results ? (
              <div className="space-y-3">
                <div className="flex space-x-2 border-b border-slate-800 pb-2">
                  {runResult.results.map((res, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestCaseTab(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        activeTestCaseTab === idx
                          ? 'bg-slate-800 text-white border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${res.passed ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      <span>Case {idx + 1} {res.isHidden ? '(Hidden)' : ''}</span>
                    </button>
                  ))}
                </div>

                {runResult.results[activeTestCaseTab] && (
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
                    <p><span className="text-slate-500 font-sans">Input:</span> <span className="text-emerald-300">{runResult.results[activeTestCaseTab].input}</span></p>
                    <p><span className="text-slate-500 font-sans">Expected:</span> <span className="text-white font-bold">{runResult.results[activeTestCaseTab].expectedOutput}</span></p>
                    <p><span className="text-slate-500 font-sans">Actual:</span> <span className={runResult.results[activeTestCaseTab].passed ? 'text-emerald-400' : 'text-rose-400 font-bold'}>{runResult.results[activeTestCaseTab].actualOutput}</span></p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono">
                Click "Run Code" or "Submit" to test your solution against official test cases.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingProblemDetail;
