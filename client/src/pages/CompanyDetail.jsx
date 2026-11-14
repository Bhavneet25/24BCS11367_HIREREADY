import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import {
  Building2,
  CalendarCheck2,
  GraduationCap,
  Award,
  Clock,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

const CompanyDetail = () => {
  const { slug } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get(`/companies/${slug}`);
        if (res.data.success) {
          setCompany(res.data.company);
        }
      } catch (err) {
        console.error('Failed to load company details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-slate-400 text-sm">Loading Company Track...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <Link to="/companies" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="w-16 h-16 rounded-2xl bg-white p-3 flex items-center justify-center shadow-xl">
              <img
                src={company?.logo}
                alt={company?.name}
                className="max-h-12 max-w-12 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `<span class="text-slate-900 font-extrabold text-lg">${company?.name.substring(0, 2)}</span>`;
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{company?.name}</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  {company?.tier}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{company?.roleTitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-center">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Package Offer</span>
              <span className="text-base font-extrabold text-emerald-400">{company?.packageRange}</span>
            </div>
            <Link
              to="/interviews"
              className="px-5 py-3 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
            >
              <CalendarCheck2 className="w-4 h-4" />
              <span>Schedule {company?.name} Mock</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Eligibility & Syllabus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Eligibility Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Eligibility Criteria</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Minimum CGPA Required</span>
              <span className="text-base font-bold text-white">{company?.eligibility?.minCgpa} CGPA (60% Equivalent)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Eligible Branches</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {company?.eligibility?.eligibleBranches?.map((b, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Active Backlogs Permitted</span>
              <span className="text-sm font-bold text-rose-400">{company?.eligibility?.backlogsAllowed} Allowed</span>
            </div>
          </div>
        </div>

        {/* Syllabus Topic Weightages (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Recruitment Assessment Syllabus & Weightage</span>
          </h3>

          <div className="space-y-3.5 pt-2">
            {company?.syllabus?.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">{item.topic}</span>
                  <span className="text-indigo-400">{item.weightage}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
                    style={{ width: item.weightage }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hiring Process Rounds Timeline */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <span>Hiring Process Rounds & Elimination Strategy</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Understanding each round's format and evaluator expectations prevents common rejection traps.
          </p>
        </div>

        <div className="relative border-l-2 border-indigo-500/40 ml-4 pl-6 space-y-8">
          {company?.hiringRounds?.map((round, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Pin */}
              <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center text-[10px] font-bold text-indigo-400 group-hover:scale-110 transition-transform">
                {round.roundNumber}
              </div>

              <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">
                    Round {round.roundNumber}: {round.roundName}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Duration: {round.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {round.description}
                </p>
                <div className="pt-2 flex items-start gap-2 text-xs text-amber-300 bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p><strong className="text-amber-200">Insider Tip:</strong> {round.tips}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Questions & Alumni Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Past Questions */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Past Asked Technical Questions</span>
          </h3>

          <div className="space-y-3">
            {company?.pastQuestions?.map((q, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{q.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{q.type} • {q.tags?.join(', ')}</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {q.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Insights */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Alumni Interview Insights</span>
          </h3>

          <div className="space-y-3">
            {company?.alumniInsights?.map((alumni, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <p className="text-xs text-slate-300 italic">"{alumni.quote}"</p>
                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span className="font-semibold text-white">{alumni.author} ({alumni.batch})</span>
                  <span className="text-emerald-400 font-bold">Offered {alumni.offerPackage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
