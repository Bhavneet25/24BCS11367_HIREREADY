import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Building2,
  Briefcase,
  GraduationCap,
  Award,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

const CompanyPrep = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedTier, setSelectedTier] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get('/companies');
        if (res.data.success) {
          setCompanies(res.data.companies);
        }
      } catch (err) {
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const tiers = ['All', 'Super Dream', 'Tier-1', 'Mass'];

  const filteredCompanies = companies.filter((c) => {
    const matchTier = selectedTier === 'All' || c.tier.includes(selectedTier);
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchTier && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-amber-400" />
            <span>Company-Wise Preparation Roadmaps</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Tailored preparation tracks for campus placement drives with interview rounds, past questions, and eligibility criteria.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTier(t)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTier === t
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t === 'All' ? 'All Tiers' : t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company (e.g. Google, TCS)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((comp) => (
          <div
            key={comp._id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-amber-500/40 hover:bg-slate-900/90 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shadow-md">
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="max-h-8 max-w-8 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<span class="text-slate-900 font-extrabold text-xs">${comp.name.substring(0, 2)}</span>`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {comp.name}
                    </h3>
                    <p className="text-xs text-slate-400">{comp.roleTitle}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
                  {comp.difficultyLevel}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 inline-block">
                  💰 {comp.packageRange}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {comp.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Eligibility CGPA:</span>
                  <span className="text-white font-semibold">{comp.eligibility?.minCgpa}+</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Hiring Rounds:</span>
                  <span className="text-white font-semibold">{comp.hiringRounds?.length || 4} Rounds</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Past Questions:</span>
                  <span className="text-white font-semibold">{comp.pastQuestions?.length || 3} Core Problems</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <Link
                to={`/companies/${comp.slug}`}
                className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center gap-1.5 transition-all group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600"
              >
                <span>View Full Recruitment Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyPrep;
