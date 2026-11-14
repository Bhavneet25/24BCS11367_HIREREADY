# 📡 HireReady REST API Documentation

All API endpoints are prefixed with `/api`. Protected routes require standard HTTP header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 1. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
Creates a new student account.
- **Request Body**:
  ```json
  {
    "name": "Aarav Sharma",
    "email": "student@hireready.edu",
    "password": "Password123!",
    "college": "National Institute of Technology",
    "branch": "Computer Science & Engineering",
    "graduationYear": 2026
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOi...",
    "user": { "_id": "...", "name": "Aarav Sharma", "readinessScore": 70 }
  }
  ```

### `POST /api/auth/login`
Authenticates a user and returns a token.
- **Request Body**:
  ```json
  {
    "email": "student@hireready.edu",
    "password": "Password123!"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOi...",
    "user": { ... }
  }
  ```

### `GET /api/auth/me` *(Protected)*
Returns the currently authenticated user's profile.

---

## 2. Aptitude & Diagnostic Tests (`/api/aptitude`)

### `GET /api/aptitude/tests`
Returns all full-length aptitude tests with question counts and passing benchmarks.

### `GET /api/aptitude/tests/:id`
Retrieves a specific test and its sanitized questions for live exam participation.

### `POST /api/aptitude/tests/:id/submit` *(Protected)*
Submits answers, evaluates scores, accuracy, and topic breakdown, and updates the student's Placement Readiness Score.
- **Request Body**:
  ```json
  {
    "answers": {
      "apt_q_01": "D",
      "apt_q_02": "C"
    },
    "timeTakenSeconds": 540
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "result": {
      "score": 100,
      "maxScore": 120,
      "percentage": 83,
      "passed": true,
      "accuracy": 92,
      "categoryBreakdown": { ... },
      "answers": [ ... ]
    }
  }
  ```

### `GET /api/aptitude/practice-questions`
Queries the topic question bank with optional `?category=Quantitative&difficulty=Medium&search=time`.

---

## 3. Algorithmic Coding Sandbox (`/api/coding`)

### `GET /api/coding/problems`
Returns all coding problems with optional filters:
- `category` (e.g. `Arrays & Hashing`, `Two Pointers`, `Dynamic Programming`)
- `difficulty` (`Easy`, `Medium`, `Hard`)
- `company` (`Google`, `Amazon`, `Microsoft`, `TCS`, `Infosys`)

### `GET /api/coding/problems/:slug`
Fetches a specific problem by slug or ID with examples, starter code in multiple languages, and constraints.

### `POST /api/coding/run`
Executes code against sample test cases in an isolated VM sandbox.
- **Request Body**:
  ```json
  {
    "problemId": "code_prob_01",
    "language": "javascript",
    "code": "function twoSum(nums, target) { ... }"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "evaluation": {
      "status": "Accepted",
      "passedTestCases": 3,
      "totalTestCases": 3,
      "runtime": "48 ms",
      "memory": "42.1 MB",
      "results": [ ... ]
    }
  }
  ```

### `POST /api/coding/submit` *(Protected)*
Submits final solution, evaluates against hidden edge cases, updates solved problems counter, and boosts readiness score.

---

## 4. Company Recruitment Tracks (`/api/companies`)

### `GET /api/companies`
Lists all company profiles with filters by recruitment tier (`Super Dream`, `Tier-1`, `Mass`).

### `GET /api/companies/:slug`
Returns full recruitment blueprints including hiring rounds timeline, syllabus weightages, past questions, and alumni tips.

---

## 5. Mock Interviews (`/api/interviews`)

### `GET /api/interviews` *(Protected)*
Returns the user's scheduled, in-progress, and completed mock interview sessions.

### `POST /api/interviews/schedule` *(Protected)*
Schedules a new interview session.
- **Request Body**:
  ```json
  {
    "targetCompany": "Amazon",
    "interviewType": "Data Structures & Algorithms",
    "mode": "AI Simulated Interview",
    "scheduledDate": "2026-11-20",
    "timeSlot": "16:00 - 17:00 IST",
    "notes": "Focus on priority queues and BFS."
  }
  ```

### `POST /api/interviews/:id/feedback` *(Protected)*
Records evaluation scores across the 10-point rubric and updates candidate metrics.

---

## 6. ATS Resume Builder (`/api/resume`)

### `GET /api/resume` *(Protected)*
Returns the student's active resume.

### `PUT /api/resume` *(Protected)*
Saves resume content and computes ATS compatibility score.

### `POST /api/resume/ai-enhance` *(Protected)*
Transforms basic bullets into quantifiable achievement statements.
- **Request Body**:
  ```json
  {
    "draftText": "built a search index using redis and node"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "suggestions": [
      "Architected a search index using Redis and Node, improving query latency by 38% and scaling throughput to 5,000+ RPS."
    ]
  }
  ```

---

## 7. Placement Analytics & Diagnostics (`/api/stats`)

### `GET /api/stats/placement`
Returns batch-wide CTC distributions, branch-wise placement percentages, and top recruiter statistics.

### `GET /api/stats/readiness` *(Protected)*
Calculates the student's live Placement Readiness Score (0-100%), topic strengths, and recommended actions.
