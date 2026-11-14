const aptitudeQuestions = [
  // Quantitative
  {
    _id: "apt_q_01",
    title: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    category: "Quantitative",
    topic: "Speed, Time and Distance",
    difficulty: "Easy",
    options: [
      { id: "A", text: "120 metres" },
      { id: "B", text: "180 metres" },
      { id: "C", text: "324 metres" },
      { id: "D", text: "150 metres" }
    ],
    correctAnswer: "D",
    explanation: "Speed = 60 * (5/18) m/sec = 50/3 m/sec. Length of Train = Speed * Time = (50/3) * 9 = 150 metres.",
    companies: ["TCS", "Infosys", "Wipro", "Cognizant"],
    tags: ["Time & Distance", "Relative Speed"]
  },
  {
    _id: "apt_q_02",
    title: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:",
    category: "Quantitative",
    topic: "Time and Work",
    difficulty: "Medium",
    options: [
      { id: "A", text: "7/15" },
      { id: "B", text: "1/10" },
      { id: "C", text: "8/15" },
      { id: "D", text: "2/5" }
    ],
    correctAnswer: "C",
    explanation: "A's 1 day work = 1/15, B's 1 day work = 1/20. Together in 1 day = (1/15 + 1/20) = 7/60. In 4 days = 4 * (7/60) = 7/15. Remaining work = 1 - 7/15 = 8/15.",
    companies: ["Accenture", "TCS", "Capgemini"],
    tags: ["Time & Work", "Efficiency"]
  },
  {
    _id: "apt_q_03",
    title: "Find the compound interest on Rs. 16,000 at 20% per annum for 9 months, compounded quarterly.",
    category: "Quantitative",
    topic: "Simple and Compound Interest",
    difficulty: "Hard",
    options: [
      { id: "A", text: "Rs. 2,522" },
      { id: "B", text: "Rs. 2,400" },
      { id: "C", text: "Rs. 2,640" },
      { id: "D", text: "Rs. 2,750" }
    ],
    correctAnswer: "A",
    explanation: "Principal = 16000. Time = 9 months = 3 quarters. Rate = 20/4 = 5% per quarter. Amount = 16000 * (1 + 5/100)^3 = 16000 * (21/20)^3 = 18,522. CI = 18522 - 16000 = Rs. 2,522.",
    companies: ["Goldman Sachs", "Morgan Stanley", "Deloitte"],
    tags: ["Compound Interest", "Banking Quantitative"]
  },
  {
    _id: "apt_q_04",
    title: "In how many different ways can the letters of the word 'CORPORATION' be arranged so that the vowels always come together?",
    category: "Quantitative",
    topic: "Permutations & Combinations",
    difficulty: "Hard",
    options: [
      { id: "A", text: "840" },
      { id: "B", text: "50400" },
      { id: "C", text: "2880" },
      { id: "D", text: "14400" }
    ],
    correctAnswer: "B",
    explanation: "Vowels: O, O, A, I, O (5 vowels: three O's, 1 A, 1 I). Consonants: C, R, P, R, T, N (6 consonants: two R's). Treat vowels as 1 pack. Total entities = 6 + 1 = 7. Arrangements of 7 entities = 7! / 2! = 2520. Internal vowel arrangements = 5! / 3! = 20. Total ways = 2520 * 20 = 50,400.",
    companies: ["Amazon", "Microsoft", "Infosys"],
    tags: ["P&C", "Combinatorics"]
  },

  // Logical Reasoning
  {
    _id: "apt_q_05",
    title: "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
    category: "Logical Reasoning",
    topic: "Blood Relations",
    difficulty: "Easy",
    options: [
      { id: "A", text: "Brother" },
      { id: "B", text: "Uncle" },
      { id: "C", text: "Cousin" },
      { id: "D", text: "Father" }
    ],
    correctAnswer: "D",
    explanation: "The only son of Suresh's mother is Suresh himself. Therefore, the boy is the son of Suresh. Suresh is the boy's father.",
    companies: ["TCS", "Accenture", "Cognizant"],
    tags: ["Blood Relations", "Logical Deduction"]
  },
  {
    _id: "apt_q_06",
    title: "Find the missing term in the sequence: 4, 18, 48, 100, 180, ?",
    category: "Logical Reasoning",
    topic: "Number Series",
    difficulty: "Medium",
    options: [
      { id: "A", text: "248" },
      { id: "B", text: "294" },
      { id: "C", text: "310" },
      { id: "D", text: "272" }
    ],
    correctAnswer: "B",
    explanation: "Series pattern: n^3 - n^2. For n=2: 8 - 4 = 4. n=3: 27 - 9 = 18. n=4: 64 - 16 = 48. n=5: 125 - 25 = 100. n=6: 216 - 36 = 180. For n=7: 343 - 49 = 294.",
    companies: ["Amazon", "Google", "Infosys"],
    tags: ["Series", "Pattern Recognition"]
  },
  {
    _id: "apt_q_07",
    title: "Statements: All bags are cakes. All lamps are cakes. Conclusions: I. Some lamps are bags. II. No lamp is bag.",
    category: "Logical Reasoning",
    topic: "Syllogisms",
    difficulty: "Medium",
    options: [
      { id: "A", text: "Only conclusion I follows" },
      { id: "B", text: "Only conclusion II follows" },
      { id: "C", text: "Either I or II follows" },
      { id: "D", text: "Neither I nor II follows" }
    ],
    correctAnswer: "C",
    explanation: "Both premises are universal affirmative. Lamps and bags share the same middle term (cakes) as predicate in both. Between 'Some lamps are bags' (I) and 'No lamp is bag' (E), they form a complementary pair. Thus either I or II follows.",
    companies: ["Wipro", "TCS", "Capgemini"],
    tags: ["Syllogisms", "Logic"]
  },

  // Verbal Ability
  {
    _id: "apt_q_08",
    title: "Choose the word which is most nearly the OPPOSITE in meaning to: 'EPHEMERAL'",
    category: "Verbal Ability",
    topic: "Antonyms & Vocabulary",
    difficulty: "Easy",
    options: [
      { id: "A", text: "Transient" },
      { id: "B", text: "Permanent" },
      { id: "C", text: "Fleeting" },
      { id: "D", text: "Unstable" }
    ],
    correctAnswer: "B",
    explanation: "'Ephemeral' means lasting for a very short time. The opposite is 'Permanent' (enduring/everlasting).",
    companies: ["Infosys", "Deloitte", "Accenture"],
    tags: ["Vocabulary", "Antonyms"]
  },
  {
    _id: "apt_q_09",
    title: "Select the sentence with correct grammatical structure and subject-verb agreement:",
    category: "Verbal Ability",
    topic: "Sentence Correction",
    difficulty: "Medium",
    options: [
      { id: "A", text: "Each of the participants were given a certificate of merit." },
      { id: "B", text: "Neither the manager nor the developers was available for comment." },
      { id: "C", text: "The committee has submitted its final placement audit report today." },
      { id: "D", text: "A bouquet of yellow roses were left on the reception desk." }
    ],
    correctAnswer: "C",
    explanation: "'The committee' acting as a single unified collective noun takes singular verb 'has' and singular pronoun 'its'. Option A should be 'was', Option B should agree with plural 'developers were', Option D head noun is 'bouquet was'.",
    companies: ["Microsoft", "Goldman Sachs", "Amazon"],
    tags: ["Grammar", "Subject-Verb"]
  },

  // Technical Core
  {
    _id: "apt_q_10",
    title: "Which data structure is primarily used to implement LRU (Least Recently Used) cache with O(1) get and put operations?",
    category: "Technical Core",
    topic: "Data Structures & Algorithms",
    difficulty: "Medium",
    options: [
      { id: "A", text: "Doubly Linked List + Hash Map" },
      { id: "B", text: "Binary Search Tree + Array" },
      { id: "C", text: "Min-Heap + Queue" },
      { id: "D", text: "Stack + Singly Linked List" }
    ],
    correctAnswer: "A",
    explanation: "A Hash Map provides O(1) lookup to find node pointers, and a Doubly Linked List allows O(1) removal and insertion to maintain the recency order.",
    companies: ["Google", "Amazon", "Microsoft", "Uber"],
    tags: ["DSA", "System Design", "Cache"]
  },
  {
    _id: "apt_q_11",
    title: "In Operating Systems, what does Thrashing refer to?",
    category: "Technical Core",
    topic: "Operating Systems",
    difficulty: "Medium",
    options: [
      { id: "A", text: "A process spending more time in swapping/paging than executing instructions" },
      { id: "B", text: "A deadlock between more than two concurrent threads" },
      { id: "C", text: "A critical CPU cache miss leading to hardware reboot" },
      { id: "D", text: "A buffer overflow attack in the kernel address space" }
    ],
    correctAnswer: "A",
    explanation: "Thrashing occurs when the system spends an excessive amount of time paging pages in and out of virtual memory rather than executing instructions, dropping CPU utilization to near zero.",
    companies: ["Google", "Qualcomm", "Cisco"],
    tags: ["OS", "Virtual Memory"]
  },
  {
    _id: "apt_q_12",
    title: "Which normal form removes transitive dependencies in relational database management systems?",
    category: "Technical Core",
    topic: "Database Management Systems",
    difficulty: "Easy",
    options: [
      { id: "A", text: "First Normal Form (1NF)" },
      { id: "B", text: "Second Normal Form (2NF)" },
      { id: "C", text: "Third Normal Form (3NF)" },
      { id: "D", text: "Boyce-Codd Normal Form (BCNF)" }
    ],
    correctAnswer: "C",
    explanation: "3NF requires a relation to be in 2NF and have no transitive functional dependency of non-prime attributes on candidate keys.",
    companies: ["Oracle", "TCS", "Accenture", "SAP"],
    tags: ["DBMS", "Normalization"]
  }
];

const aptitudeTests = [
  {
    _id: "test_01",
    title: "National Qualifier Mock Test (TCS / Infosys Pattern)",
    description: "Full-length 12-question diagnostic test covering Quantitative Aptitude, Logical Reasoning, Verbal Ability, and CS Core.",
    category: "Comprehensive Placement Mock",
    durationMinutes: 20,
    totalMarks: 120,
    passingMarks: 70,
    difficulty: "Intermediate",
    companyTag: "TCS / Infosys",
    questions: [
      "apt_q_01", "apt_q_02", "apt_q_03", "apt_q_04",
      "apt_q_05", "apt_q_06", "apt_q_07",
      "apt_q_08", "apt_q_09",
      "apt_q_10", "apt_q_11", "apt_q_12"
    ]
  },
  {
    _id: "test_02",
    title: "Product Engineering Quantitative Sprint",
    description: "High-intensity quantitative test targeting P&C, Time & Work, Speed Distance, and Interest for Tier-1 Product Companies.",
    category: "Quantitative Special",
    durationMinutes: 15,
    totalMarks: 40,
    passingMarks: 25,
    difficulty: "Advanced",
    companyTag: "Product Companies (Amazon, Flipkart)",
    questions: ["apt_q_01", "apt_q_02", "apt_q_03", "apt_q_04"]
  },
  {
    _id: "test_03",
    title: "Technical Core & Systems Diagnostic",
    description: "Essential Computer Science fundamentals: Operating Systems, Computer Networks, DBMS Normalization, and Core Data Structures.",
    category: "Company Specific Assessment",
    durationMinutes: 10,
    totalMarks: 30,
    passingMarks: 20,
    difficulty: "Intermediate",
    companyTag: "Google / Microsoft",
    questions: ["apt_q_10", "apt_q_11", "apt_q_12"]
  }
];

module.exports = {
  aptitudeQuestions,
  aptitudeTests,
};
