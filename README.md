# 🚀 HireReady – Campus Placement Preparation Platform

> **Resume-Worthy | Full-Stack MERN Application | Production Ready**  
> *A comprehensive, data-driven platform empowering college engineering students to prepare for, benchmark, and conquer campus placement drives.*

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://react.dev/)
[![React 18](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-brightgreen.svg)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Executive Summary

Campus placements determine the trajectory of an engineering student's career, yet preparation is frequently fragmented across separate platforms for aptitude questions, coding practice, company research, mock interviews, and resume drafting.

**HireReady** bridges this divide by delivering a unified, end-to-end recruitment preparation platform. Designed with inspiration from cutting-edge tools like **CrackedIn**, **CareerWise**, and high-fidelity ed-tech assessment dashboards, HireReady integrates 7 core capabilities into a cohesive MERN-stack experience.

---

## ⚡ Core Feature Highlights

### 1. 🧮 Aptitude Practice & Timed Diagnostic Tests
- **Full-Length Mock Tests** matching national qualifier patterns (**TCS NQT**, **Infosys HackWithInfy**, **AMCAT**, **eLitmus**).
- Real-time countdown timer with automatic warning states.
- Interactive **Question Palette** showing Answered, Marked for Review, and Unattempted states.
- **Instant Result & Scorecard**: Overall percentage, pass/fail badge, accuracy rate, section-by-section breakdown (Quantitative, Logical, Verbal, CS Core), and comprehensive step-by-step mathematical explanations.
- **Topic Question Bank**: Filter individual practice questions with live search.

### 2. 💻 Algorithmic Coding Sandbox
- In-browser code editor and runner modeled after **LeetCode** and **HackerRank**.
- Curated top campus placement problems (**Two Sum**, **Valid Parentheses**, **Stock Buy & Sell**, **Kadane's Algorithm**, **Container With Most Water**).
- **Multi-Language Support**: Starter code stubs in **JavaScript**, **Python**, **C++**, and **Java**.
- **Instant Execution Engine**: Sandboxed test case evaluation returning runtime (ms), memory (MB), and visual output diffs.
- **Editorial & Solution Tab**: Big-O time and space complexity explanations alongside optimal reference implementations.

### 3. 🏢 Company-Wise Preparation Tracks
- Dedicated recruitment intelligence blueprints for **Google**, **Amazon**, **Microsoft**, **Goldman Sachs**, **TCS**, and **Infosys**.
- **Round-by-Round Timeline**: Online Assessment, Technical DSA, Low-Level Design / Systems Core, and HR/Leadership rounds with duration and actionable insider tips.
- **Syllabus Topic Weightages**: Visual progress bars showing relative topic importance.
- **Eligibility Criteria**: Minimum CGPA, eligible departments, and backlog policy.
- **Past Interview Questions & Alumni Advice**: Verified experiences from placed students.

### 4. 🎙️ Mock Interview Suite & Live Room
- Schedule sessions targeting specific companies, rounds (DSA, System Design, HR), and modes (**AI Simulated Bar-Raiser**, **Peer-to-Peer**, **Mentor Review**).
- **Interactive Live Room (`/interviews/session/:id`)**:
  - Simulated active interviewer feed with speech waveform animation.
  - Candidate camera and microphone toggles.
  - Live shared code and pseudocode scratchpad.
  - Active prompt delivery tailored to the company round.
- **10-Point Evaluation Rubric**: Scores Technical Knowledge, Problem Solving, Communication (STAR format), and Confidence, automatically updating the candidate's Placement Readiness Score.

### 5. 🎯 Placement Readiness Score Engine
- **Circular Readiness Gauge**: Prominently displayed on the student dashboard with benchmark tier (*"Super Dream Ready"*, *"Dream Ready"*, *"Tier-1 Ready"*).
- **Multi-Factor Algorithm**: Combines coding test cases passed, aptitude accuracy rates, streak consistency, and mock interview rubric scores.
- **Recruitment Skill Mastery Breakdown**: Visual skill meters across DSA, Quantitative Math, Logic, Verbal, CS Fundamentals, and Communication.
- **Actionable Weak Area Diagnostics**: Recommends targeted problem sets based on recent test mistakes.

### 6. 📄 ATS-Optimized Resume Builder
- **Real-Time Side-by-Side Preview**: Live A4 resume updates instantly as you edit contact information, education, experience, projects, and skills.
- **Real-Time ATS Compatibility Score**: Live meter evaluating section completeness, formatting, and keyword density.
- **AI Bullet Point Enhancer**: Transforms basic bullets (e.g. *"built an in-memory cache using redis"*) into quantified achievement statements with metrics and action verbs.
- **Print & PDF Export**: Clean `@media print` styling strips platform chrome for professional single-page A4 printing.

### 7. 📊 Placement Statistics & Analytics Dashboard
- **Institutional Placement Intelligence**: Official recruitment audit for academic year 2025-2026.
- **Core KPIs**: Highest Package (54.5 LPA), Average Package (15.2 LPA), Median Package (12.8 LPA), Total Offers (1,245), and Placement Rate (94.2%).
- **Salary Distribution Visualizer**: Interactive visual breakdown across 3.5-6 LPA, 6-10 LPA, 10-20 LPA, and 20+ LPA bands.
- **Department-Wise Performance Table**: Compare CSE, IT, ECE, EEE, and Mechanical placement rates and CTCs.
- **Top Recruiter Directory**: Offers count and hiring tiers for major visiting tech corporations.

---

## 🏗️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | React 18, Vite 5, Tailwind CSS v3, React Router v6, Lucide React, Axios, Canvas-Confetti |
| **Backend** | Node.js, Express.js 4, RESTful Architecture, CORS, Morgan |
| **Database** | **MongoDB / Mongoose 8** with **Resilient Dual-Mode JSON Datastore Fallback** |
| **Security** | JWT (JSON Web Tokens), Bcrypt.js (Password Salting & Hashing) |
| **Code Runner** | Isolated Node `vm` execution sandbox with timeout enforcement |

> **💡 Zero-Config Resilience**: HireReady connects automatically to MongoDB if available (`MONGODB_URI`). If MongoDB is not running locally, the server seamlessly falls back to its built-in persistent local JSON datastore. **The application works 100% out-of-the-box on any computer without requiring a pre-installed MongoDB daemon!**

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/hireready.git
cd hireready
```

### 2. Install Dependencies
```bash
# Install root, backend, and frontend dependencies
npm run install:all
```
*(Or install individually: `cd server && npm install`, then `cd ../client && npm install`)*

### 3. Seed the Database
Populate the database with pre-configured questions, coding challenges, company tracks, mock interviews, and demo user data:
```bash
npm run seed
```

### 4. Start the Application
You can run both backend and frontend concurrently:

```bash
# Terminal 1 - Start the Backend Server (Port 5000)
npm run server

# Terminal 2 - Start the Frontend Dev Server (Port 5173)
npm run client
```

Or build the production client and run directly from the Express server:
```bash
cd client && npm run build
cd ../server && npm start
```

Visit **`http://localhost:5173`** (or `http://localhost:5000` in production) in your browser!

---

## 🔑 Demo Credentials

To test the application immediately without registration:

| Credential | Value |
|---|---|
| **Email** | `student@hireready.edu` |
| **Password** | `Password123!` |
| **1-Click Login** | Click the **"1-Click Instant Demo Login"** button on the Navbar or Login page |

---

## 📂 Detailed Documentation

For in-depth architecture and development details, explore the `docs/` directory:
- [Architecture & System Design](file:///C:/Users/bhavn/.gemini/antigravity/scratch/hireready/docs/ARCHITECTURE.md)
- [REST API Reference](file:///C:/Users/bhavn/.gemini/antigravity/scratch/hireready/docs/API_DOCUMENTATION.md)
- [Database Schema & Data Models](file:///C:/Users/bhavn/.gemini/antigravity/scratch/hireready/docs/DATABASE_SCHEMA.md)
- [Feature Walkthrough Guide](file:///C:/Users/bhavn/.gemini/antigravity/scratch/hireready/docs/FEATURES_GUIDE.md)

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
