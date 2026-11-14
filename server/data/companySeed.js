const companies = [
  {
    _id: "comp_01",
    name: "Google",
    slug: "google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    tier: "Super Dream (20+ LPA)",
    packageRange: "32.0 - 55.0 LPA",
    roleTitle: "Software Engineer (L3 - University Graduate)",
    difficultyLevel: "Very Hard",
    description: "Google seeks students who demonstrate supreme command over Data Structures, Algorithmic Complexity, and scalable system thinking with clear verbal problem breakdown.",
    eligibility: {
      minCgpa: 8.0,
      eligibleBranches: ["CSE", "IT", "ECE", "AI/ML", "Data Science"],
      backlogsAllowed: 0,
      criteriaNotes: "Strong mathematical aptitude and clean coding style under pressure."
    },
    hiringRounds: [
      {
        roundNumber: 1,
        roundName: "Online Assessment (OA)",
        roundType: "Online Coding Test",
        duration: "90 Mins",
        description: "2 LeetCode Medium/Hard algorithmic problems on Google's testing platform. Graph BFS/DFS, Segment Trees, or DP.",
        tips: "Edge cases matter severely. Write helper functions and modular code."
      },
      {
        roundNumber: 2,
        roundName: "Technical Interview 1 (DSA)",
        roundType: "Technical Round",
        duration: "45 Mins",
        description: "Live coding on Google Docs without syntax highlighting or compiler. Focus on algorithmic optimization.",
        tips: "Clarify input constraints and explain your thought process out loud before typing."
      },
      {
        roundNumber: 3,
        roundName: "Technical Interview 2 (Advanced Algorithms)",
        roundType: "Technical Round",
        duration: "45 Mins",
        description: "Deep dive into Tree traversals, Dynamic Programming, or greedy choice algorithms with scale discussion.",
        tips: "State Big-O time and space tradeoffs for both initial and optimized solutions."
      },
      {
        roundNumber: 4,
        roundName: "Googliness & Behavioral Fit",
        roundType: "HR / Cultural Fit",
        duration: "45 Mins",
        description: "Hypothetical scenario questions assessing collaboration, navigating ambiguity, and ethical decision-making.",
        tips: "Use the STAR method (Situation, Task, Action, Result) with tangible outcomes."
      }
    ],
    syllabus: [
      { topic: "Graphs & Disjoint Set Unions", weightage: "30%", description: "Shortest paths (Dijkstra), Topological Sort, Cycle detection" },
      { topic: "Dynamic Programming", weightage: "25%", description: "Multi-dimensional DP, Subsequences, State compression" },
      { topic: "Binary Trees & BST", weightage: "20%", description: "LCA, Path sums, View traversals, Serialization" },
      { topic: "CS Fundamentals & Design", weightage: "25%", description: "Memory hierarchy, Concurrency, Hash Map collisions" }
    ],
    pastQuestions: [
      { title: "Find Longest Increasing Path in a Matrix", type: "Coding", difficulty: "Hard", tags: ["DFS", "Memoization"] },
      { title: "Design a Rate Limiter with Token Bucket", type: "System Design", difficulty: "Medium", tags: ["Concurrency", "Hashing"] },
      { title: "Serialize and Deserialize Binary Tree", type: "Coding", difficulty: "Hard", tags: ["Tree", "Design"] }
    ],
    interviewTips: [
      "Always clarify edge cases: null inputs, negative numbers, extreme scale (e.g. 10^9 integers).",
      "Do NOT jump straight to code; spend the first 5 minutes agreeing on the optimal algorithm with the interviewer.",
      "Be receptive to hints. Interviewers look for how well you collaborate."
    ],
    alumniInsights: [
      {
        author: "Rohan V.",
        batch: "Batch of 2025",
        quote: "HireReady's mock interviews accurately reproduced the pressure of live coding without an IDE. Nailing the dry run was the key reason I got an offer!",
        offerPackage: "48.5 LPA"
      }
    ]
  },
  {
    _id: "comp_02",
    name: "Amazon",
    slug: "amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    tier: "Super Dream (20+ LPA)",
    packageRange: "28.0 - 45.0 LPA",
    roleTitle: "Software Development Engineer (SDE-1)",
    difficultyLevel: "Hard",
    description: "Amazon places immense weight on both high-velocity algorithmic problem-solving and the 16 Amazon Leadership Principles (Customer Obsession, Ownership, Bias for Action).",
    eligibility: {
      minCgpa: 7.5,
      eligibleBranches: ["CSE", "IT", "ECE", "EEE", "Mechanical (Special approval)"],
      backlogsAllowed: 0,
      criteriaNotes: "No active backlogs at the time of joining."
    },
    hiringRounds: [
      {
        roundNumber: 1,
        roundName: "Amazon OA (Hackerrank)",
        roundType: "Online Assessment",
        duration: "105 Mins",
        description: "2 Coding questions + 15 Work Style Assessment simulation questions based on Leadership Principles.",
        tips: "Complete both coding questions with 100% test cases passed and align with Amazon principles."
      },
      {
        roundNumber: 2,
        roundName: "Technical Round 1 (Problem Solving & DSA)",
        roundType: "Technical Round",
        duration: "60 Mins",
        description: "Live coding on Priority Queues, Binary Search on Answer, or Linked Lists + 1 LP question.",
        tips: "Spend 10 mins on LP question giving concrete metrics (e.g. 'reduced latency by 35%')."
      },
      {
        roundNumber: 3,
        roundName: "Technical Round 2 (OOP & Low Level Design)",
        roundType: "Technical Round",
        duration: "60 Mins",
        description: "Object Oriented Design (e.g., Design a Parking Lot, Movie Ticket Booking) + concurrency basics.",
        tips: "Apply SOLID principles and explain class diagrams and inheritance patterns."
      },
      {
        roundNumber: 4,
        roundName: "Bar Raiser Round",
        roundType: "Technical & Behavioral",
        duration: "60 Mins",
        description: "Deep dive into your past projects and complex challenges you overcame, conducted by an external Amazonian.",
        tips: "Emphasize Customer Obsession and Dive Deep leadership principles."
      }
    ],
    syllabus: [
      { topic: "Binary Heaps & Priority Queues", weightage: "25%", description: "Kth largest element, Merge K sorted lists" },
      { topic: "Trees, Tries & Graphs", weightage: "30%", description: "Word Search II, Course Schedule, Rotten Oranges" },
      { topic: "Low-Level Design (LLD)", weightage: "25%", description: "Design Patterns (Singleton, Factory, Observer), Class diagrams" },
      { topic: "Amazon Leadership Principles", weightage: "20%", description: "Behavioral STAR format stories for all 16 principles" }
    ],
    pastQuestions: [
      { title: "Rotting Oranges (BFS Multi-source)", type: "Coding", difficulty: "Medium", tags: ["BFS", "Matrix"] },
      { title: "Course Schedule II (Topological Sort)", type: "Coding", difficulty: "Medium", tags: ["Graph", "Kahn's"] },
      { title: "Design an In-Memory File System", type: "System Design", difficulty: "Hard", tags: ["Trie", "OOP"] }
    ],
    interviewTips: [
      "Prepare 2 distinct stories for each Leadership Principle from your college projects or internships.",
      "Write clean, production-ready code with meaningful variable names and modular methods."
    ],
    alumniInsights: [
      {
        author: "Pooja K.",
        batch: "Batch of 2025",
        quote: "Don't ignore the Work Style Assessment! You need both solid code and strong LP alignment to clear Amazon.",
        offerPackage: "36.2 LPA"
      }
    ]
  },
  {
    _id: "comp_03",
    name: "Microsoft",
    slug: "microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    tier: "Super Dream (20+ LPA)",
    packageRange: "26.0 - 44.0 LPA",
    roleTitle: "Software Engineer",
    difficultyLevel: "Hard",
    description: "Microsoft values clean code structure, solid fundamentals in Operating Systems, Thread Safety, and a growth mindset.",
    eligibility: {
      minCgpa: 7.0,
      eligibleBranches: ["CSE", "IT", "ECE", "EEE"],
      backlogsAllowed: 0,
      criteriaNotes: "High focus on writing testable code."
    },
    hiringRounds: [
      {
        roundNumber: 1,
        roundName: "Online Assessment (Codility)",
        roundType: "Online Coding Test",
        duration: "90 Mins",
        description: "3 Algorithmic questions focusing on arrays, strings, bit manipulation, and greedy algorithms.",
        tips: "Codility tests extreme boundary conditions and performance corner cases."
      },
      {
        roundNumber: 2,
        roundName: "Technical Round 1 (Data Structures)",
        roundType: "Technical Round",
        duration: "45 Mins",
        description: "Binary Trees, Linked Lists, and Hash Maps. Interviewer asks you to test code manually.",
        tips: "Proactively write down 5 test cases before asking the interviewer if you're done."
      },
      {
        roundNumber: 3,
        roundName: "Technical Round 2 (Algorithms & OS Core)",
        roundType: "Technical Round",
        duration: "45 Mins",
        description: "Dynamic Programming + OS concepts like Virtual Memory, Mutex vs Semaphore, and Process Scheduling.",
        tips: "Be prepared to write multi-threaded code or pseudo-code."
      },
      {
        roundNumber: 4,
        roundName: "AA Round (As-Appropriate / Hiring Manager)",
        roundType: "Managerial & Fit",
        duration: "45 Mins",
        description: "Resume drill-down, architecture discussions, why Microsoft, and technical leadership.",
        tips: "Show deep passion for developer tools, cloud infrastructure, or AI."
      }
    ],
    syllabus: [
      { topic: "Strings & Bit Manipulation", weightage: "25%", description: "Bitmasks, Bitwise operations, Substring search" },
      { topic: "Trees & Binary Search Trees", weightage: "30%", description: "Lowest Common Ancestor, Morris Traversal, Invert Tree" },
      { topic: "Operating Systems & Concurrency", weightage: "25%", description: "Deadlocks, Paging, Locks, Critical Section problem" },
      { topic: "DBMS & Indexing", weightage: "20%", description: "B-Trees vs B+ Trees, ACID transactions, Query optimization" }
    ],
    pastQuestions: [
      { title: "Binary Tree Zigzag Level Order Traversal", type: "Coding", difficulty: "Medium", tags: ["Tree", "BFS", "Deque"] },
      { title: "LRU Cache Implementation", type: "Coding", difficulty: "Medium", tags: ["Design", "Doubly Linked List"] },
      { title: "Median of Two Sorted Arrays", type: "Coding", difficulty: "Hard", tags: ["Binary Search"] }
    ],
    interviewTips: [
      "Microsoft interviewers love modular code. Separate logical steps into dedicated functions.",
      "Explain your unit test mindset: test for empty arrays, single elements, odd/even parity, and duplicates."
    ],
    alumniInsights: [
      {
        author: "Devansh S.",
        batch: "Batch of 2025",
        quote: "Mastering OS fundamentals alongside DSA was the turning point in clearing the AA round.",
        offerPackage: "38.0 LPA"
      }
    ]
  },
  {
    _id: "comp_04",
    name: "Goldman Sachs",
    slug: "goldman-sachs",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg",
    tier: "Super Dream (20+ LPA)",
    packageRange: "24.0 - 38.0 LPA",
    roleTitle: "Engineering Analyst",
    difficultyLevel: "Very Hard",
    description: "Goldman Sachs tests heavy mathematical aptitude, probability, dynamic programming, and systems architecture with extreme precision.",
    eligibility: {
      minCgpa: 8.0,
      eligibleBranches: ["All Engineering Branches (Open to EEE/Mech/Civil with strong coding)"],
      backlogsAllowed: 0,
      criteriaNotes: "Exceptional quantitative and logical reasoning marks required in Round 1."
    },
    hiringRounds: [
      {
        roundNumber: 1,
        roundName: "Aptitude + Coding Assessment",
        roundType: "Online Assessment",
        duration: "120 Mins",
        description: "Sectional test: Math & Probability MCQs (neg marking), CS Fundamentals MCQs, and 2 Hard coding questions.",
        tips: "Sectional cutoffs exist for all 3 sections! Balance your time across math and coding."
      },
      {
        roundNumber: 2,
        roundName: "Technical Round 1 (Math & Data Structures)",
        roundType: "Technical Round",
        duration: "60 Mins",
        description: "Probability puzzles, combinatorics, plus DP or Graph algorithms.",
        tips: "Practice standard interview puzzles (monty hall, defective coin, ant on cube)."
      },
      {
        roundNumber: 3,
        roundName: "Technical Round 2 (System Design & Java/C++)",
        roundType: "Technical Round",
        duration: "60 Mins",
        description: "Memory management, garbage collection mechanics, low latency trade-offs, and microservices.",
        tips: "Demonstrate knowledge of concurrency and thread-safe data structures."
      }
    ],
    syllabus: [
      { topic: "Probability & Combinatorics Puzzles", weightage: "25%", description: "Bayes Theorem, Expected values, Geometric distributions" },
      { topic: "Dynamic Programming & Math", weightage: "35%", description: "Matrix exponentiation, Number theory, Kadane's 2D" },
      { topic: "Java / C++ Internal Architecture", weightage: "20%", description: "Memory pools, volatile keyword, race conditions" },
      { topic: "Database Transactions", weightage: "20%", description: "Isolation levels, 2-Phase Commit, MVCC" }
    ],
    pastQuestions: [
      { title: "Coin Change Problem (Min Coins & Total Ways)", type: "Coding", difficulty: "Medium", tags: ["DP"] },
      { title: "High-Frequency Stock Price Ticker", type: "System Design", difficulty: "Hard", tags: ["Heap", "Map"] },
      { title: "Burning Rope Puzzle / Defective Pill Bottle", type: "Puzzle", difficulty: "Medium", tags: ["Logic", "Math"] }
    ],
    interviewTips: [
      "Never guess in the quantitative MCQs; negative marking pulls candidates below cutoff.",
      "Clearly calculate time and space complexity with big-O notation."
    ],
    alumniInsights: [
      {
        author: "Ananya M.",
        batch: "Batch of 2025",
        quote: "HireReady's Aptitude Module prepared me for the tricky probability questions that tripped up most candidates.",
        offerPackage: "32.0 LPA"
      }
    ]
  },
  {
    _id: "comp_05",
    name: "TCS (Tata Consultancy Services)",
    slug: "tcs",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    tier: "Tier-1 & Mass (3.5 - 9 LPA)",
    packageRange: "3.6 - 9.0 LPA (Ninja, Digital, Prime)",
    roleTitle: "Systems Engineer (Ninja / Digital / Prime)",
    difficultyLevel: "Medium",
    description: "TCS hires thousands via the National Qualifier Test (NQT). Scoring above 80% opens pathways to the elite Digital (7 LPA) and Prime (9 LPA) cadres.",
    eligibility: {
      minCgpa: 6.0,
      eligibleBranches: ["All Branches eligible"],
      backlogsAllowed: 1,
      criteriaNotes: "Minimum 60% throughout 10th, 12th, and B.Tech."
    },
    hiringRounds: [
      {
        roundNumber: 1,
        roundName: "TCS NQT (Foundation + Advanced)",
        roundType: "Online Assessment",
        duration: "165 Mins",
        description: "Numerical Ability, Reasoning, Verbal, plus Advanced Quantitative and 2 Advanced Coding questions.",
        tips: "No negative marking. Complete every question. Coding questions evaluate basic loops, arrays, strings."
      },
      {
        roundNumber: 2,
        roundName: "Technical + Managerial + HR Interview",
        roundType: "Combined Interview",
        duration: "30-45 Mins",
        description: "Single-panel interview touching your final year project, basic SQL queries, OOP concepts, and willingness to relocate.",
        tips: "Review your resume thoroughly; explain every project technology clearly."
      }
    ],
    syllabus: [
      { topic: "Numerical & Quantitative Aptitude", weightage: "35%", description: "Percentages, Profit & Loss, Ratio, Time & Work" },
      { topic: "Reasoning & Cognitive Ability", weightage: "30%", description: "Coding-decoding, Syllogisms, Blood relations, Visual puzzles" },
      { topic: "Foundational Programming (C/Python/Java)", weightage: "20%", description: "Loops, string reversals, array rotations, basic math logic" },
      { topic: "SQL & Relational Databases", weightage: "15%", description: "Joins, GROUP BY, Aggregate functions, Primary/Foreign keys" }
    ],
    pastQuestions: [
      { title: "Rotate Array by K positions", type: "Coding", difficulty: "Easy", tags: ["Array", "Modulo"] },
      { title: "Count Frequency of Elements in an Array", type: "Coding", difficulty: "Easy", tags: ["Hashing"] },
      { title: "Write SQL query to find 2nd highest salary", type: "SQL", difficulty: "Medium", tags: ["SQL", "Subquery"] }
    ],
    interviewTips: [
      "Strong confidence in your final year project and basic OOPS concepts guarantees selection.",
      "Be positive and enthusiastic during the HR/Managerial questions."
    ],
    alumniInsights: [
      {
        author: "Karthik N.",
        batch: "Batch of 2025",
        quote: "Cracked TCS Prime (9 LPA) simply by getting full marks in the Advanced Coding & Aptitude sections!",
        offerPackage: "9.0 LPA"
      }
    ]
  },
  {
    _id: "comp_06",
    name: "Infosys",
    slug: "infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    tier: "Tier-1 & Mass (3.5 - 9.5 LPA)",
    packageRange: "3.6 - 9.5 LPA (SE / DSE / Specialist Programmer)",
    roleTitle: "Specialist Programmer / DSE",
    difficultyLevel: "Medium",
    description: "Infosys offers three hiring tiers through InfyTQ and HackWithInfy: Systems Engineer (3.6 LPA), Differential Software Engineer (6.5 LPA), and Specialist Programmer (9.5 LPA).",
    eligibility: {
      minCgpa: 6.5,
      eligibleBranches: ["All Engineering Disciplines"],
      backlogsAllowed: 0,
      criteriaNotes: "65% or 6.5 CGPA with no active backlogs."
    },
    hiringRounds: [
      {
        roundNumber: 1,
        roundName: "InfyTQ / HackWithInfy Online Test",
        roundType: "Online Assessment",
        duration: "180 Mins",
        description: "3 Coding problems of increasing difficulty: Easy (Greedy/Math), Medium (DP/Graphs), and Hard (Trees/Trie).",
        tips: "Solving 2 complete questions qualifies you directly for the Specialist Programmer interview!"
      },
      {
        roundNumber: 2,
        roundName: "Technical Interview",
        roundType: "Technical Round",
        duration: "45 Mins",
        description: "Detailed code review of your test submissions, followed by live questions on DSA, DBMS, and Web development.",
        tips: "Remember your HackWithInfy logic; interviewers verify that you wrote your own code."
      }
    ],
    syllabus: [
      { topic: "Dynamic Programming & Recursion", weightage: "35%", description: "Knapsack variations, Grid paths, Edit distance" },
      { topic: "Graph Algorithms", weightage: "25%", description: "BFS/DFS, Connected Components, Minimum Spanning Tree" },
      { topic: "Object Oriented Programming (OOP)", weightage: "20%", description: "Encapsulation, Polymorphism, Abstraction, Interfaces" },
      { topic: "Database & Web Development", weightage: "20%", description: "REST APIs, HTTP status codes, SQL queries" }
    ],
    pastQuestions: [
      { title: "Longest Palindromic Substring", type: "Coding", difficulty: "Medium", tags: ["String", "DP"] },
      { title: "Coin Change Minimum", type: "Coding", difficulty: "Medium", tags: ["DP"] },
      { title: "Difference between Method Overloading and Overriding", type: "Technical Core", difficulty: "Easy", tags: ["OOP"] }
    ],
    interviewTips: [
      "Prepare your primary programming language (Java or Python) deeply, including collection frameworks.",
      "Explain both recursion and iterative dynamic programming approaches."
    ],
    alumniInsights: [
      {
        author: "Sneha R.",
        batch: "Batch of 2025",
        quote: "Clearing 2 questions in HackWithInfy landed me an interview directly for the Specialist Programmer role!",
        offerPackage: "9.5 LPA"
      }
    ]
  }
];

module.exports = {
  companies,
};
