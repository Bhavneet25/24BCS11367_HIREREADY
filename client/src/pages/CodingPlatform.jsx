import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Code2,
  CheckCircle2,
  Search,
  Filter,
  Building2,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
} from 'lucide-react';

const CodingPlatform = () => {
  const [problems, setProblems] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await api.get('/coding/problems');
        if (res.data.success) {
          setProblems(res.data.problems);
        }
      } catch (err) {
        console.error('Failed to load problems:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const categories = [
    'All',
    'Arrays & Hashing',
    'Two Pointers',
    'Dynamic Programming',
    'Stack & Queue',
  ];

  const companiesList = ['All', 'Google', 'Amazon', 'Microsoft', 'Goldman Sachs', 'TCS', 'Infosys'];

  const filteredProblems = problems.filter((p) => {
    const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchComp = selectedCompany === 'All' || (p.companies && p.companies.includes(selectedCompany));
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

    return matchDiff && matchCat && matchComp && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Platform Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Code2 className="w-7 h-7 text-emerald-400" />
            <span>Algorithmic Coding Sandbox</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Solve frequently asked campus coding interview questions with in-browser code evaluation and multi-language support.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs">
            <span className="text-slate-400">Total Solved: </span>
            <span className="font-bold text-emerald-400">28 Problems</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problem title or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Difficulty Chips */}
          <div className="flex items-center space-x-2 self-start lg:self-auto">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedDifficulty === diff
                    ? diff === 'Easy'
                      ? 'bg-emerald-600 text-white'
                      : diff === 'Medium'
                      ? 'bg-amber-600 text-white'
                      : diff === 'Hard'
                      ? 'bg-rose-600 text-white'
                      : 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Company Filter Dropdown */}
          <div className="flex items-center space-x-2 self-start lg:self-auto">
            <Building2 className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              {companiesList.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Companies' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mr-2">Topic:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-indigo-400 font-bold border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Problem Title</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Difficulty</th>
                <th className="py-3.5 px-4 font-semibold">Acceptance</th>
                <th className="py-3.5 px-4 font-semibold">Target Companies</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProblems.map((prob) => {
                const diffColor =
                  prob.difficulty === 'Easy'
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : prob.difficulty === 'Medium'
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-rose-400 bg-rose-500/10';

                return (
                  <tr
                    key={prob._id}
                    className="hover:bg-slate-900/60 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500/40 group-hover:text-emerald-400 transition-colors" />
                    </td>
                    <td className="py-4 px-4 font-medium text-white">
                      <Link
                        to={`/coding/${prob.slug}`}
                        className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                      >
                        <span>{prob.title}</span>
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-slate-400">
                      {prob.category}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${diffColor}`}>
                        {prob.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-mono">
                      {prob.acceptanceRate || '52.0%'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {prob.companies?.slice(0, 3).map((comp, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to={`/coding/${prob.slug}`}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all"
                      >
                        <span>Solve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CodingPlatform;
