import React from 'react';
import { Briefcase, Heart, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white">HireReady</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Complete MERN-stack placement preparation platform helping college engineering students crack dream companies through aptitude diagnostics, coding challenges, company roadmaps, and mock interviews.
            </p>
          </div>

          {/* Quick Modules */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Preparation Modules</h4>
            <ul className="space-y-2">
              <li><Link to="/aptitude" className="hover:text-indigo-400 transition-colors">Aptitude & Diagnostic Tests</Link></li>
              <li><Link to="/coding" className="hover:text-indigo-400 transition-colors">Algorithmic Coding Sandbox</Link></li>
              <li><Link to="/companies" className="hover:text-indigo-400 transition-colors">Company Tracks (FAANG & Mass)</Link></li>
              <li><Link to="/interviews" className="hover:text-indigo-400 transition-colors">Mock Interview Simulation</Link></li>
              <li><Link to="/resume" className="hover:text-indigo-400 transition-colors">ATS-Optimized Resume Builder</Link></li>
            </ul>
          </div>

          {/* Placement Intelligence */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Placement Analytics</h4>
            <ul className="space-y-2">
              <li><Link to="/stats" className="hover:text-indigo-400 transition-colors">College CTC Distributions</Link></li>
              <li><Link to="/stats" className="hover:text-indigo-400 transition-colors">Branch-wise Placement %</Link></li>
              <li><Link to="/companies" className="hover:text-indigo-400 transition-colors">Super Dream vs Dream Tiers</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Readiness Benchmarking</Link></li>
            </ul>
          </div>

          {/* Tech Stack Spec */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">MERN Architecture</h4>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">MongoDB</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Express.js</span>
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px]">React.js 18</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">Node.js</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px]">Tailwind CSS</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px]">JWT & Bcrypt</span>
            </div>
            <div className="mt-4 flex items-center space-x-2 text-[11px] text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Production Submission Ready</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
          <p>© 2026 HireReady. Built with MERN Stack for Campus Placement Excellence.</p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>Placement Readiness Score Engine</span>
            <span>•</span>
            <span>ATS Resume Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
