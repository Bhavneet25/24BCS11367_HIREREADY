const sampleResume = {
  resumeTitle: "Software Engineer - Campus Placement Resume",
  template: "Modern Clean",
  personalInfo: {
    fullName: "Aarav Sharma",
    email: "aarav.sharma@campus.edu",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    linkedin: "https://linkedin.com/in/aarav-sharma-dev",
    github: "https://github.com/aaravsharma",
    portfolio: "https://aaravsharma.dev",
    summary: "High-achieving Computer Science undergraduate with 400+ LeetCode problems solved, top 5% rank in college, and hands-on experience designing full-stack distributed web applications with React, Node.js, and MongoDB. Seeking an SDE role to build performant, resilient software systems."
  },
  education: [
    {
      institution: "National Institute of Technology (NIT)",
      degree: "Bachelor of Technology (B.Tech)",
      fieldOfStudy: "Computer Science & Engineering",
      startDate: "2022",
      endDate: "2026",
      cgpaOrMarks: "8.92 / 10.0 (Dean's Honor List)",
      highlights: "Ranked #4 in CSE Department. Led the ACM Student Chapter algorithmic coding cell."
    },
    {
      institution: "Delhi Public School",
      degree: "Senior Secondary (Class XII)",
      fieldOfStudy: "PCM with Computer Science",
      startDate: "2020",
      endDate: "2022",
      cgpaOrMarks: "96.4%",
      highlights: "School Topper in Computer Science (100/100)."
    }
  ],
  experience: [
    {
      company: "InnovateTech Labs",
      role: "Software Engineering Intern",
      location: "Bengaluru, India",
      startDate: "Jun 2025",
      endDate: "Aug 2025",
      current: false,
      bulletPoints: [
        "Architected a real-time collaborative document editor using Node.js, WebSockets, and Redis, serving 12,000+ daily active users.",
        "Optimized MongoDB indexing and query pipelines, reducing 95th percentile database latency by 42%.",
        "Configured Dockerized CI/CD pipelines on GitHub Actions, cutting release deployment turnaround from 35 mins to 8 mins."
      ]
    }
  ],
  projects: [
    {
      title: "HireReady - Placement Preparation Platform",
      technologies: "MongoDB, Express.js, React.js, Node.js, Tailwind CSS",
      liveLink: "https://hireready-prep.vercel.app",
      githubLink: "https://github.com/aaravsharma/hireready",
      description: "Comprehensive campus placement preparation suite with aptitude tests, coding sandbox, company tracks, and live interview scheduling.",
      bulletPoints: [
        "Engineered an in-browser code evaluation sandbox with multi-language test case verification and sub-100ms execution times.",
        "Built an interactive ATS-friendly resume builder with real-time PDF generation and AI bullet-point scoring engine.",
        "Developed full-fidelity company recruitment tracks featuring historical rounds breakdown and interview pattern analysis."
      ]
    },
    {
      title: "Distributed Task Scheduler & Rate Limiter",
      technologies: "Node.js, Redis, Express, Jest",
      liveLink: "https://github.com/aaravsharma/distributed-limiter",
      githubLink: "https://github.com/aaravsharma/distributed-limiter",
      description: "Distributed sliding-window rate limiter preventing API abuse across clustered Node.js microservices.",
      bulletPoints: [
        "Implemented Sliding Window Log and Token Bucket algorithms with atomicity guaranteed via Redis Lua scripting.",
        "Handled 8,500+ requests per second under Apache Benchmark load testing with zero data race conditions."
      ]
    }
  ],
  skills: {
    programmingLanguages: ["C++", "Java", "JavaScript (ES6+)", "TypeScript", "Python", "SQL"],
    frameworksAndLibraries: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "Redux Toolkit", "Next.js"],
    databasesAndTools: ["MongoDB", "PostgreSQL", "Redis", "Git", "Docker", "Postman", "Linux/Bash"],
    coreSubjects: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "Database Management Systems (DBMS)", "OOPs"]
  },
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "2025",
      credentialUrl: "https://aws.amazon.com/verification"
    },
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Coursera / Meta",
      date: "2024",
      credentialUrl: "https://coursera.org/verify/professional-cert"
    }
  ],
  achievements: [
    "Global Rank 342 in LeetCode Weekly Contest 388 among 24,000+ international participants (Knight Badge, 2045 Rating).",
    "Finalist at Smart India Hackathon (SIH 2025) among 1,200+ competing engineering teams nationwide.",
    "5-Star C++ & Problem Solving rating on HackerRank."
  ],
  atsScore: 94
};

module.exports = {
  sampleResume,
};
