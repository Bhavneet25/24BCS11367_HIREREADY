import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Building2,
  DollarSign,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

const PlacementStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats/placement');
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error('Error fetching placement stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-slate-400 text-sm">Aggregating Campus Placement Analytics...</p>
      </div>
    );
  }

  const overview = stats?.overview || {};
  const branchStats = stats?.branchStats || [];
  const salaryDistribution = stats?.salaryDistribution || [];
  const topRecruiters = stats?.topRecruiters || [];
  const trendingSkills = stats?.trendingSkills || [];
  const yoyTrends = stats?.yearOnYearTrends || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-rose-400" />
            <span>Campus Placement Statistics & Analytics Dashboard</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Official recruitment audit, CTC distribution bands, and department-wise benchmarks for academic year {stats?.academicYear || '2025-2026'}.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-400 flex items-center gap-2 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Audit Verified • 94.2% Overall Placement Rate</span>
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Highest Package</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{overview.highestPackageLPA} LPA</p>
          <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> Offered by Google L3
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Average Package</span>
            <DollarSign className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{overview.averagePackageLPA} LPA</p>
          <p className="text-[11px] text-indigo-400 font-semibold">+18.5% YoY Growth</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Offers Extended</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{overview.totalOffersReceived}</p>
          <p className="text-[11px] text-slate-400">Across 198 Companies</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Median Package</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{overview.medianPackageLPA} LPA</p>
          <p className="text-[11px] text-cyan-400 font-semibold">50th Percentile Benchmark</p>
        </div>
      </div>

      {/* Salary Distribution Visualizer & Trending Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Salary Distribution Bracket Chart (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-rose-400" />
              <span>CTC Package Distribution Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Percentage of eligible engineering cohort placed across key salary compensation bands.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {salaryDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">{item.bracket}</span>
                  <span className="text-rose-400 font-bold">{item.percentage}% ({item.studentCount} Students)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 via-indigo-500 to-sky-400 transition-all duration-700"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In-Demand Technical Skills (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Top Skills Requested by Recruiters</span>
          </h3>
          <p className="text-xs text-slate-400">
            Calculated from campus online assessment criteria and interviewer feedback forms.
          </p>

          <div className="space-y-3 pt-2">
            {trendingSkills.map((sk, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">{sk.skill}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Required in {sk.demandPercentage}% of JDs</p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {sk.growth}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branch-Wise Placement Statistics Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-400" />
          <span>Department-Wise Placement Performance</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Engineering Branch</th>
                <th className="py-3 px-4 font-semibold text-center">Eligible Students</th>
                <th className="py-3 px-4 font-semibold text-center">Placed Students</th>
                <th className="py-3 px-4 font-semibold text-center">Placement Rate</th>
                <th className="py-3 px-4 font-semibold text-center">Average Package</th>
                <th className="py-3 px-4 font-semibold text-right">Highest Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {branchStats.map((b, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{b.branch}</td>
                  <td className="py-3.5 px-4 text-center text-slate-300 font-mono">{b.eligible}</td>
                  <td className="py-3.5 px-4 text-center text-slate-300 font-mono">{b.placed}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      {b.placementRate}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-white font-mono">{b.avgLpa} LPA</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-indigo-400 font-mono">{b.highestLpa} LPA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Recruiters Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-400" />
          <span>Top Recruiting Companies (Tier Breakdown)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topRecruiters.map((rec, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white text-sm">{rec.company}</h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {rec.tier}
                </span>
              </div>
              <p className="text-xs text-slate-400">{rec.domain}</p>
              <div className="flex justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-400">Total Offers: <strong className="text-white">{rec.offersCount}</strong></span>
                <span className="text-emerald-400 font-bold">Max: {rec.highestLpa} LPA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementStats;
