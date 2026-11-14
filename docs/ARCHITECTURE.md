# 🏗️ HireReady Architecture & System Design

## 🌟 Executive Overview
**HireReady** is an advanced, resume-worthy **MERN stack** (MongoDB, Express.js, React.js 18, Node.js) web application engineered to solve the fragmented placement preparation journey for college engineering students. It synthesizes diagnostic aptitude tests, an in-browser algorithmic coding sandbox, company-specific recruitment blueprints, mock interview simulations with evaluation rubrics, an ATS-compliant resume builder, and batch-wide placement statistics into a unified high-performance platform.

---

## 🏛️ High-Level Architectural Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (React 18 + Vite)                  │
│                                                                        │
│   [Dashboard] ── [Aptitude Exam] ── [Coding Sandbox] ── [Company Prep] │
│   [Mock Interview Suite] ── [ATS Resume Studio] ── [Placement Stats]   │
│                                                                        │
│                    Axios HTTP Client + JWT Interceptors                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ REST APIs (/api/*)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     SERVER LAYER (Node.js + Express)                   │
│                                                                        │
│   [Auth Controller] ── [Aptitude Controller] ── [Coding Controller]    │
│   [Company Controller] ─ [Interview Controller] ─ [Resume Controller]  │
│   [Stats & Readiness Controller] ── [Sandboxed In-Browser VM Runner]   │
│                                                                        │
│                     JWT Authentication & Error Handler                 │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Mongoose ODM / Resilient Engine
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       PERSISTENCE LAYER (Dual-Mode)                    │
│                                                                        │
│   • Primary: MongoDB (Local / Atlas Cloud Clusters)                   │
│   • Fallback: Standalone Embedded Persistent JSON Engine              │
│     (Enables 100% zero-configuration execution on any grading machine) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Repository Layout

```
hireready/
├── server/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection & dual-mode dispatcher
│   │   └── jsonStore.js          # Persistent JSON store mimicking Mongoose
│   ├── controllers/
│   │   ├── authController.js     # User registration, JWT login, profile
│   │   ├── aptitudeController.js # Timed exam submission, diagnostics
│   │   ├── codingController.js   # Code execution, testcase verification
│   │   ├── companyController.js  # Hiring rounds, syllabus, past questions
│   │   ├── interviewController.js# Mock scheduling & 1-10 rubric grading
│   │   ├── resumeController.js   # ATS builder, AI bullet point enhancer
│   │   └── statsController.js    # Batch stats, student readiness gauge
│   ├── models/
│   │   ├── User.js               # User model with bcrypt encryption
│   │   ├── AptitudeQuestion.js   # Question bank with explanations
│   │   ├── AptitudeTest.js       # Diagnostic exams & passing marks
│   │   ├── TestResult.js         # Detailed exam results & category stats
│   │   ├── CodingProblem.js      # Problems, test cases, starter code
│   │   ├── CodeSubmission.js     # Submissions, runtime, memory, verdicts
│   │   ├── Company.js            # Recruitment blueprints & rounds
│   │   ├── MockInterview.js      # Mock schedules & evaluation rubrics
│   │   ├── Resume.js             # ATS resumes & bullet point data
│   │   └── PlacementStatistic.js # College placement audit metrics
│   ├── routes/                   # Modular Express routers
│   ├── middleware/
│   │   ├── auth.js               # JWT verification & req.user extraction
│   │   └── errorHandler.js       # Centralized HTTP error handling
│   ├── utils/
│   │   └── codeRunner.js         # Isolated VM runner for coding sandbox
│   ├── data/                     # Comprehensive seed datasets
│   ├── seeder.js                 # Automated database initialization
│   └── server.js                 # Express server & static dist delivery
├── client/
│   ├── src/
│   │   ├── components/layout/    # Navbar, Footer, Mobile Drawer
│   │   ├── components/common/    # ProtectedRoute
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth provider & 1-click demo login
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page with feature showcases
│   │   │   ├── Dashboard.jsx     # Student readiness gauge & streak
│   │   │   ├── AptitudeTests.jsx # Test list & topic question bank
│   │   │   ├── AptitudeExam.jsx  # Live timed exam & solution review
│   │   │   ├── CodingPlatform.jsx# Problem list & company filters
│   │   │   ├── CodingProblemDetail.jsx # In-browser IDE & runner
│   │   │   ├── CompanyPrep.jsx   # Super Dream & Mass company cards
│   │   │   ├── CompanyDetail.jsx # Rounds timeline, syllabus, insights
│   │   │   ├── MockInterviews.jsx# Mock scheduler & history
│   │   │   ├── InterviewSession.jsx # Live simulated room & rubric
│   │   │   ├── ResumeBuilder.jsx # Live ATS preview & AI bullet improver
│   │   │   ├── PlacementStats.jsx# Placement analytics dashboard
│   │   │   ├── Login.jsx         # Authentication form
│   │   │   └── Register.jsx      # Student registration
│   │   ├── services/api.js       # Axios client with JWT interceptor
│   │   ├── App.jsx               # React Router v6 tree
│   │   └── main.jsx              # React 18 DOM root
│   ├── index.html
│   ├── vite.config.js            # Reverse proxy configuration
│   └── tailwind.config.js        # Modern dark theme styles
└── README.md                     # Comprehensive setup guide
```

---

## 🔒 Security Architecture
- **Password Protection**: Passwords salted and hashed via `bcryptjs` with 10 salt rounds.
- **JWT Authorization**: Stateless `jsonwebtoken` with 30-day expiration stored in browser storage.
- **Isolated Code Runner**: Algorithmic code evaluated inside Node's native `vm` sandboxed execution context with timeouts (1,500 ms ceiling) to prevent infinite loops.
- **CORS & Environment Isolation**: Strict origin handling and parameter sanitization.
