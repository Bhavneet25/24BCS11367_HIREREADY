# 🗄️ HireReady Database Schema & Data Models

HireReady is built with **Mongoose schemas** designed for MongoDB, with graceful fallback to an embedded JSON datastore.

---

## 1. User (`users`)
Stores student authentication, profile information, and aggregated readiness analytics.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId / String | Primary Key | Unique user identifier |
| `name` | String | Required | Full candidate name |
| `email` | String | Unique, Indexed | Student email address |
| `password` | String | Required, Hidden | Bcrypt-hashed password |
| `college` | String | Default NIT | University/Institute name |
| `branch` | String | Default CSE | Academic engineering branch |
| `graduationYear` | Number | Default 2026 | Expected graduation year |
| `cgpa` | Number | Default 8.5 | Current academic CGPA |
| `role` | String | Enum (`student`, `admin`) | Authorization role |
| `readinessScore` | Number | 0 - 100 | Dynamic placement readiness metric |
| `streakDays` | Number | Default 1 | Consecutive days practiced |
| `solvedProblemsCount` | Number | Counter | Accepted coding problems |
| `testsCompletedCount` | Number | Counter | Completed aptitude tests |
| `targetCompanies` | Array of Strings | Optional | Companies targeted by student |
| `avatar` | String | URL | Profile avatar image |
| `createdAt` | Date | Default now | Registration timestamp |

---

## 2. Aptitude Question (`aptitudequestions`)
Stores granular multiple-choice aptitude, logical, and technical core questions.

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId / String | Question ID |
| `title` | String | Full question text |
| `category` | Enum | `Quantitative`, `Logical Reasoning`, `Verbal Ability`, `Technical Core` |
| `topic` | String | Sub-topic (e.g. `Time & Work`, `Blood Relations`, `Operating Systems`) |
| `difficulty` | Enum | `Easy`, `Medium`, `Hard` |
| `options` | Array of `{ id, text }` | 4 distinct options ('A', 'B', 'C', 'D') |
| `correctAnswer` | String | Correct option key ('A', 'B', 'C', 'D') |
| `explanation` | String | Step-by-step mathematical or logical solution |
| `companies` | Array of Strings | Companies where this topic was asked |
| `tags` | Array of Strings | Searchable tags |

---

## 3. Aptitude Test (`aptitudetests`)
Full diagnostic examinations mapped to company assessment formats.

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId / String | Test ID |
| `title` | String | Name of assessment (e.g. `National Qualifier Mock`) |
| `description` | String | Test summary and scope |
| `category` | String | Examination category |
| `durationMinutes`| Number | Countdown timer duration (e.g. 20) |
| `totalMarks` | Number | Maximum possible score (e.g. 120) |
| `passingMarks` | Number | Cutoff score to qualify (e.g. 70) |
| `difficulty` | Enum | `Easy`, `Intermediate`, `Advanced` |
| `companyTag` | String | Targeted company (e.g. `TCS / Infosys`) |
| `questions` | Array of ObjectIds | References to `AptitudeQuestion` |

---

## 4. Test Result (`testresults`)
Permanent records of student assessment attempts.

| Field | Type | Description |
|---|---|---|
| `user` | ObjectId (Ref: User) | Student who took the test |
| `test` | ObjectId (Ref: AptitudeTest) | Test taken |
| `score` | Number | Marks achieved |
| `maxScore` | Number | Maximum possible marks |
| `percentage` | Number | Percentage score (0 - 100) |
| `passed` | Boolean | Whether score >= passingMarks |
| `accuracy` | Number | Correct answers / attempted answers (%) |
| `timeTakenSeconds` | Number | Elapsed time during session |
| `categoryBreakdown` | Map of Objects | Section-wise performance |
| `answers` | Array of Objects | Detailed logs of every selected vs correct option |

---

## 5. Coding Problem (`codingproblems`)
Algorithmic programming challenges with in-browser compiler support.

| Field | Type | Description |
|---|---|---|
| `title` | String | Problem title (e.g. `Two Sum`) |
| `slug` | String (Unique) | URL slug (e.g. `two-sum`) |
| `difficulty` | Enum | `Easy`, `Medium`, `Hard` |
| `category` | Enum | `Arrays & Hashing`, `Two Pointers`, `Dynamic Programming`, etc. |
| `description` | String | Problem statement |
| `constraints` | Array of Strings | Runtime and memory constraints |
| `examples` | Array of Objects | Input, expected output, and explanation |
| `testCases` | Array of Objects | Test suite (including hidden edge cases) |
| `starterCode` | Object | Code stubs for JavaScript, Python, C++, Java |
| `solutionSnippet` | Object | Reference solutions and time/space complexity notes |
| `companies` | Array of Strings | Frequently asked by recruiters |

---

## 6. Code Submission (`codesubmissions`)
Candidate code evaluations and execution performance logs.

| Field | Type | Description |
|---|---|---|
| `user` | ObjectId (Ref: User) | Submitting candidate |
| `problem` | ObjectId (Ref: CodingProblem) | Problem solved |
| `language` | Enum | `javascript`, `python`, `cpp`, `java` |
| `code` | String | Submitted source code |
| `status` | Enum | `Accepted`, `Wrong Answer`, `Runtime Error` |
| `runtime` | String | Execution time (e.g. `48 ms`) |
| `memory` | String | RAM utilization (e.g. `41.2 MB`) |
| `passedTestCases` | Number | Successful test count |
| `totalTestCases` | Number | Total test suite count |

---

## 7. Company (`companies`)
Recruitment intelligence dossiers for top campus recruiters.

| Field | Type | Description |
|---|---|---|
| `name` | String | Company name (e.g. Google, Amazon) |
| `slug` | String (Unique) | URL parameter |
| `tier` | Enum | `Super Dream (20+ LPA)`, `Dream`, `Tier-1`, `Mass` |
| `packageRange` | String | CTC offering (e.g. `32 - 55 LPA`) |
| `roleTitle` | String | Target campus job role |
| `eligibility` | Object | Minimum CGPA, eligible branches, backlogs |
| `hiringRounds` | Array of Objects | Round name, duration, description, tips |
| `syllabus` | Array of Objects | Topic names and percentage weightages |
| `pastQuestions` | Array of Objects | Previously asked interview questions |
| `interviewTips` | Array of Strings | Actionable tips from previous successful candidates |

---

## 8. Mock Interview (`mockinterviews`)
Scheduling and rubric evaluations for live interview practice.

| Field | Type | Description |
|---|---|---|
| `student` | ObjectId (Ref: User) | Candidate |
| `interviewerName` | String | Evaluator name / AI bot identifier |
| `interviewType` | Enum | `Data Structures & Algorithms`, `System Design`, `HR` |
| `mode` | Enum | `AI Simulated Interview`, `Peer-to-Peer Mock`, `Mentor Review` |
| `targetCompany` | String | Specific company interview style |
| `scheduledDate` | String | Date of session |
| `timeSlot` | String | Session time |
| `status` | Enum | `Scheduled`, `In Progress`, `Completed` |
| `meetingCode` | String | Unique meeting room code |
| `feedback` | Object | 10-point rubric scores for Tech, Problem Solving, Communication, Strengths |

---

## 9. Resume (`resumes`)
Structured candidate resume data and ATS optimization metrics.

| Field | Type | Description |
|---|---|---|
| `user` | ObjectId (Ref: User) | Candidate owner |
| `template` | Enum | ATS template identifier |
| `personalInfo` | Object | Contact info, LinkedIn, GitHub, summary |
| `education` | Array of Objects | College, degree, GPA, duration |
| `experience` | Array of Objects | Internships, bullet points |
| `projects` | Array of Objects | Project title, technologies, links, bullets |
| `skills` | Object | Languages, frameworks, databases, core CS |
| `atsScore` | Number | Real-time ATS compatibility rating (0 - 100) |
