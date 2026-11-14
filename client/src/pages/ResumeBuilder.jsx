import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  FileText,
  Sparkles,
  Download,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Printer,
  ChevronRight,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Wrench,
  Award,
} from 'lucide-react';

const ResumeBuilder = () => {
  const [resume, setResume] = useState(null);
  const [activeSection, setActiveSection] = useState('personal'); // 'personal' | 'education' | 'experience' | 'projects' | 'skills'
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [aiDraft, setAiDraft] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await api.get('/resume');
      if (res.data.success) {
        setResume(res.data.resume);
      }
    } catch (err) {
      console.error('Error fetching resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResume = async () => {
    if (saving || !resume) return;
    setSaving(true);
    try {
      const res = await api.put('/resume', resume);
      if (res.data.success) {
        setResume(res.data.resume);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save resume:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleAiEnhance = async () => {
    if (!aiDraft.trim() || loadingAi) return;
    setLoadingAi(true);
    try {
      const res = await api.post('/resume/ai-enhance', { draftText: aiDraft });
      if (res.data.success) {
        setAiSuggestions(res.data.suggestions);
      }
    } catch (err) {
      console.error('AI enhance failed:', err);
    } finally {
      setLoadingAi(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-slate-400 text-sm">Loading ATS Resume Studio...</p>
      </div>
    );
  }

  const pInfo = resume?.personalInfo || {};

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Controls Bar */}
      <div className="glass-panel px-6 py-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span>Interactive ATS Resume Builder</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time preview formatted to clear automated ATS screening algorithms for tier-1 campus drives.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* ATS Score Meter */}
          <div className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl flex items-center space-x-2">
            <span className="text-xs text-slate-400">ATS Score:</span>
            <span className="text-xs font-bold text-emerald-400">{resume?.atsScore || 92}%</span>
          </div>

          <button
            onClick={handleSaveResume}
            disabled={saving}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : saveSuccess ? 'Saved ✓' : 'Save Resume'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid: Left Editor (6 cols) & Right Live A4 Preview (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[750px]">
        {/* Left Column: Form Editor & AI Assistant (6 cols) */}
        <div className="lg:col-span-6 space-y-4 print:hidden">
          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
            {[
              { id: 'personal', label: 'Contact & Summary', icon: User },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'skills', label: 'Technical Skills', icon: Wrench },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                    activeSection === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 max-h-[640px] overflow-y-auto">
            {activeSection === 'personal' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Personal & Contact Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      value={pInfo.fullName || ''}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...pInfo, fullName: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      value={pInfo.email || ''}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...pInfo, email: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Phone</label>
                    <input
                      type="text"
                      value={pInfo.phone || ''}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...pInfo, phone: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      value={pInfo.location || ''}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...pInfo, location: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">LinkedIn Profile</label>
                    <input
                      type="text"
                      value={pInfo.linkedin || ''}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...pInfo, linkedin: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">GitHub / Portfolio</label>
                    <input
                      type="text"
                      value={pInfo.github || ''}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...pInfo, github: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Professional Summary</label>
                  <textarea
                    rows="3"
                    value={pInfo.summary || ''}
                    onChange={(e) =>
                      setResume({
                        ...resume,
                        personalInfo: { ...pInfo, summary: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>
              </div>
            )}

            {activeSection === 'education' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Academic Qualifications</h3>
                {resume?.education?.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={edu.institution || ''}
                        placeholder="Institution / College"
                        onChange={(e) => {
                          const list = [...resume.education];
                          list[idx].institution = e.target.value;
                          setResume({ ...resume, education: list });
                        }}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                      />
                      <input
                        type="text"
                        value={edu.degree || ''}
                        placeholder="Degree / Program"
                        onChange={(e) => {
                          const list = [...resume.education];
                          list[idx].degree = e.target.value;
                          setResume({ ...resume, education: list });
                        }}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={edu.startDate || ''}
                        placeholder="Start Year"
                        onChange={(e) => {
                          const list = [...resume.education];
                          list[idx].startDate = e.target.value;
                          setResume({ ...resume, education: list });
                        }}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                      />
                      <input
                        type="text"
                        value={edu.endDate || ''}
                        placeholder="End Year"
                        onChange={(e) => {
                          const list = [...resume.education];
                          list[idx].endDate = e.target.value;
                          setResume({ ...resume, education: list });
                        }}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                      />
                      <input
                        type="text"
                        value={edu.cgpaOrMarks || ''}
                        placeholder="CGPA / Score"
                        onChange={(e) => {
                          const list = [...resume.education];
                          list[idx].cgpaOrMarks = e.target.value;
                          setResume({ ...resume, education: list });
                        }}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Software Projects</h3>
                {resume?.projects?.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <input
                      type="text"
                      value={proj.title || ''}
                      placeholder="Project Title"
                      onChange={(e) => {
                        const list = [...resume.projects];
                        list[idx].title = e.target.value;
                        setResume({ ...resume, projects: list });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-bold"
                    />
                    <input
                      type="text"
                      value={proj.technologies || ''}
                      placeholder="Tech Stack (e.g. MERN, Redis, Docker)"
                      onChange={(e) => {
                        const list = [...resume.projects];
                        list[idx].technologies = e.target.value;
                        setResume({ ...resume, projects: list });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-indigo-300"
                    />
                    <textarea
                      rows="2"
                      value={proj.description || ''}
                      placeholder="Short description"
                      onChange={(e) => {
                        const list = [...resume.projects];
                        list[idx].description = e.target.value;
                        setResume({ ...resume, projects: list });
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Technical Skills Taxonomy</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Programming Languages (Comma separated)</label>
                    <input
                      type="text"
                      value={resume?.skills?.programmingLanguages?.join(', ') || ''}
                      onChange={(e) => {
                        setResume({
                          ...resume,
                          skills: {
                            ...resume.skills,
                            programmingLanguages: e.target.value.split(',').map((s) => s.trim()),
                          },
                        });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Frameworks & Web Technologies</label>
                    <input
                      type="text"
                      value={resume?.skills?.frameworksAndLibraries?.join(', ') || ''}
                      onChange={(e) => {
                        setResume({
                          ...resume,
                          skills: {
                            ...resume.skills,
                            frameworksAndLibraries: e.target.value.split(',').map((s) => s.trim()),
                          },
                        });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Databases & Developer Tools</label>
                    <input
                      type="text"
                      value={resume?.skills?.databasesAndTools?.join(', ') || ''}
                      onChange={(e) => {
                        setResume({
                          ...resume,
                          skills: {
                            ...resume.skills,
                            databasesAndTools: e.target.value.split(',').map((s) => s.trim()),
                          },
                        });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'experience' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Work & Internship Experience</h3>
                {resume?.experience?.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={exp.company || ''}
                        placeholder="Company Name"
                        onChange={(e) => {
                          const list = [...resume.experience];
                          list[idx].company = e.target.value;
                          setResume({ ...resume, experience: list });
                        }}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-bold"
                      />
                      <input
                        type="text"
                        value={exp.role || ''}
                        placeholder="Job Title / Role"
                        onChange={(e) => {
                          const list = [...resume.experience];
                          list[idx].role = e.target.value;
                          setResume({ ...resume, experience: list });
                        }}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Bullet Point Enhancer Widget */}
          <div className="glass-panel p-5 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>AI Resume Bullet Point Enhancer</span>
              </span>
              <span className="text-[10px] text-slate-400">Quantified Impact Generator</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Draft bullet: e.g. built a fast cache using node and redis"
                value={aiDraft}
                onChange={(e) => setAiDraft(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleAiEnhance}
                disabled={loadingAi || !aiDraft}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40"
              >
                {loadingAi ? 'Enhancing...' : 'Enhance'}
              </button>
            </div>

            {aiSuggestions.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended High-Impact Bullets:</span>
                {aiSuggestions.map((sug, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      navigator.clipboard.writeText(sug);
                      alert('Copied AI bullet to clipboard!');
                    }}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-[11px] text-slate-200 cursor-pointer transition-colors"
                  >
                    • {sug}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Printable ATS Resume Preview (6 cols) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl border border-slate-800 p-8 bg-white text-slate-900 shadow-2xl overflow-y-auto max-h-[850px] font-sans print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
          {/* Candidate Name & Header */}
          <div className="text-center border-b border-slate-300 pb-4 mb-4">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">{pInfo.fullName || 'Aarav Sharma'}</h2>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-700 font-medium mt-1">
              <span>{pInfo.email || 'aarav.sharma@campus.edu'}</span>
              <span>•</span>
              <span>{pInfo.phone || '+91 98765 43210'}</span>
              <span>•</span>
              <span>{pInfo.location || 'Bengaluru, India'}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-indigo-700 font-semibold mt-1">
              {pInfo.linkedin && <span>LinkedIn: {pInfo.linkedin.replace('https://', '')}</span>}
              {pInfo.github && <span>GitHub: {pInfo.github.replace('https://', '')}</span>}
            </div>
          </div>

          {/* Professional Summary */}
          {pInfo.summary && (
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 text-slate-900 mb-1.5">
                Professional Summary
              </h3>
              <p className="text-[11px] text-slate-800 leading-relaxed text-justify">
                {pInfo.summary}
              </p>
            </div>
          )}

          {/* Education */}
          {resume?.education?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 text-slate-900 mb-1.5">
                Education
              </h3>
              <div className="space-y-2">
                {resume.education.map((edu, idx) => (
                  <div key={idx} className="text-[11px]">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{edu.institution}</span>
                      <span>{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-800">
                      <span>{edu.degree} in {edu.fieldOfStudy || 'Computer Science'}</span>
                      <span className="font-semibold">{edu.cgpaOrMarks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Skills */}
          {resume?.skills && (
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 text-slate-900 mb-1.5">
                Technical Skills
              </h3>
              <div className="text-[11px] space-y-1 text-slate-800">
                <p><strong>Languages:</strong> {resume.skills.programmingLanguages?.join(', ')}</p>
                <p><strong>Frameworks & Web:</strong> {resume.skills.frameworksAndLibraries?.join(', ')}</p>
                <p><strong>Databases & Tools:</strong> {resume.skills.databasesAndTools?.join(', ')}</p>
                <p><strong>Core CS:</strong> Data Structures & Algorithms, OS, DBMS, Computer Networks, OOP</p>
              </div>
            </div>
          )}

          {/* Projects */}
          {resume?.projects?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 text-slate-900 mb-1.5">
                Projects
              </h3>
              <div className="space-y-3">
                {resume.projects.map((proj, idx) => (
                  <div key={idx} className="text-[11px]">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{proj.title} <span className="font-normal italic text-[10px] text-slate-700">| {proj.technologies}</span></span>
                    </div>
                    <p className="text-slate-800 mt-0.5">{proj.description}</p>
                    {proj.bulletPoints && (
                      <ul className="list-disc list-inside space-y-0.5 text-slate-800 text-[10.5px] mt-1 pl-1">
                        {proj.bulletPoints.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {resume?.experience?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 text-slate-900 mb-1.5">
                Work Experience
              </h3>
              <div className="space-y-3">
                {resume.experience.map((exp, idx) => (
                  <div key={idx} className="text-[11px]">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{exp.company} — <span className="font-medium">{exp.role}</span></span>
                      <span>{exp.startDate} – {exp.endDate}</span>
                    </div>
                    {exp.bulletPoints && (
                      <ul className="list-disc list-inside space-y-0.5 text-slate-800 text-[10.5px] mt-1 pl-1">
                        {exp.bulletPoints.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
