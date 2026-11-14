import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BrainCircuit,
  Code2,
  Building2,
  CalendarCheck2,
  FileText,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Trophy,
  Users,
  ShieldCheck,
} from 'lucide-react';

const Home = () => {
  const { user, demoLogin } = useAuth();

  const features = [
    {
      title: 'Aptitude Practice Tests',
      desc: 'Timed online assessments with category-wise diagnostics in Quantitative, Logical Reasoning, Verbal, and CS Core. Instant scoring and detailed explanations.',
      icon: BrainCircuit,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Timed Exam Simulation',
      link: '/aptitude',
    },
    {
      title: 'Algorithmic Coding Sandbox',
      desc: 'HackerRank & LeetCode style in-browser coding platform with multi-language test case verification (JavaScript, Python, C++, Java) and instant runtime benchmarks.',
      icon: Code2,
      color: 'from-emerald-500 to-teal-600',
      badge: 'In-Browser Test Runner',
      link: '/coding',
    },
    {
      title: 'Company-Wise Preparation',
      desc: 'Dedicated tracks for Google, Amazon, Microsoft, Goldman Sachs, TCS, Infosys and more. Complete hiring round breakdown, past interview questions, and syllabus.',
      icon: Building2,
      color: 'from-amber-500 to-orange-600',
      badge: 'FAANG & Mass Recruiter Roadmaps',
      link: '/companies',
    },
    {
      title: 'Mock Interview Scheduler',
      desc: 'Interactive mock interview simulator with peer matching, AI technical interviewer mode, live video/code scratchpad, and comprehensive evaluation rubrics.',
      icon: CalendarCheck2,
      color: 'from-purple-500 to-pink-600',
      badge: 'AI & Peer Feedback Rubrics',
      link: '/interviews',
    },
    {
      title: 'ATS Resume Builder',
      desc: 'Interactive live-preview resume editor built for high ATS parse rates. AI bullet-point enhancer transforms ordinary bullets into quantified achievements.',
      icon: FileText,
      color: 'from-cyan-500 to-blue-600',
      badge: 'AI Bullet Optimizer + PDF Export',
      link: '/resume',
    },
    {
      title: 'Placement Statistics Dashboard',
      desc: 'Batch-wide placement intelligence with CTC distributions, branch-wise placement percentages, top recruiting domains, and tier comparisons.',
      icon: BarChart3,
      color: 'from-rose-500 to-red-600',
      badge: 'Salary Distributions & Benchmarks',
      link: '/stats',
    },
  ];

  const metrics = [
    { label: 'Average CTC Target', value: '15.2 LPA', sub: '+18% YoY growth' },
    { label: 'Practice Questions', value: '1,500+', sub: 'Company-curated' },
    { label: 'Placement Rate', value: '94.2%', sub: 'Tier-1 benchmarks' },
    { label: 'Readiness Accuracy', value: '96.8%', sub: 'Multi-factor algorithm' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/15 via-sky-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The All-In-One Campus Placement Preparation Suite</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Land Your Dream Offer With <br className="hidden sm:inline" />
          <span className="gradient-text">HireReady Placement Platform</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Prepare for technical assessments, aptitude rounds, coding challenges, and mock interviews tailored to top tech companies. Track your readiness score and build an ATS-approved resume.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Go to Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <button
                onClick={demoLogin}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-emerald-300 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 shadow-lg shadow-emerald-950 flex items-center justify-center space-x-2 transition-all"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Instant 1-Click Demo Login</span>
              </button>
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                <span>Register as Student</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
          <Link
            to="/stats"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all"
          >
            Explore Placement Statistics
          </Link>
        </div>

        {/* Key Platform Highlights Banner */}
        <div className="mt-14 pt-8 border-t border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {metrics.map((m, idx) => (
            <div key={idx} className="text-left bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
              <p className="text-2xl sm:text-3xl font-extrabold text-white">{m.value}</p>
              <p className="text-xs font-semibold text-indigo-400 mt-1">{m.label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Complete Placement Arsenal
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Every critical capability required to progress from day-one practice to receiving an offer letter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Link
                key={idx}
                to={user ? feat.link : '/login'}
                className="group relative p-6 rounded-2xl glass-card hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mt-2">
                  {feat.desc}
                </p>

                <div className="mt-4 flex items-center text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Launch Practice</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Target Companies Strip */}
      <section className="py-12 border-y border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-6">
            Tracks tailored for Top Recruiters visiting campus
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 font-semibold text-sm">
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors">Google (L3 SWE)</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors">Amazon (SDE-1)</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors">Microsoft (SWE)</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors">Goldman Sachs (Eng Analyst)</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors">TCS (Prime & Digital)</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors">Infosys (Specialist Programmer)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
