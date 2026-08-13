export const roles = {
  frontend: {
    title: 'Senior Frontend Engineer',
    skills: ['React', 'TypeScript', 'CSS/SCSS', 'Web Performance', 'REST APIs', 'Webpack/Vite', 'State Management'],
    companies: ['Google', 'Meta', 'Netflix', 'Stripe', 'Vercel'],
    keywords: ['Virtual DOM', 'React Fiber', 'Lighthouse', 'CLS/LCP/FID', 'Webpack bundle size', 'Tailwind', 'Intersection Observer', 'Redux Toolkit', 'CSS Grid', 'Semantic HTML'],
    resumeFeedback: {
      score: 72,
      parsedSkills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git', 'Webpack'],
      missingKeywords: ['React Fiber', 'Core Web Vitals (LCP, FID, CLS)', 'TypeScript', 'State Management (Redux/Zustand)', 'Server-Side Rendering (SSR)'],
      suggestions: [
        'Incorporate quantifiable achievements (e.g., "Improved bundle size by 35% using code splitting").',
        'Add TypeScript and Next.js to showcase modern framework experience.',
        'Detail your experience with Core Web Vitals optimization to demonstrate high-performance web practices.'
      ]
    },
    technicalQuestions: [
      {
        id: 'fe_1',
        question: 'Explain the difference between the Virtual DOM and the real DOM. How does React\'s reconciliation process work?',
        hints: 'Think about batching, diffing algorithm complexity O(n), and the Fiber architecture introduced in React 16.',
        idealKeywords: ['reconciliation', 'diffing', 'virtual dom', 'fiber', 'batching', 'repaint', 'reflow']
      },
      {
        id: 'fe_2',
        question: 'What are Core Web Vitals? How would you optimize a page that has a poor Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP)?',
        hints: 'CLS is about visual stability; LCP is about loading performance. Think about image dimensions, font-display, render-blocking resources, and critical CSS.',
        idealKeywords: ['cls', 'lcp', 'critical css', 'aspect-ratio', 'lazy loading', 'cdn', 'render-blocking']
      },
      {
        id: 'fe_3',
        question: 'Describe how closures work in JavaScript. Can you provide a practical use-case for a closure in a React application?',
        hints: 'A closure is a function that retains access to its outer scope. In React, hooks like useEffect and custom hooks leverage closures heavily.',
        idealKeywords: ['lexical scope', 'closure', 'hook', 'useState', 'encapsulation', 'stale state']
      }
    ],
    behavioralQuestions: [
      {
        id: 'fe_beh_1',
        question: 'Tell me about a time when you had to advocate for technical debt cleanup (e.g., refactoring a complex codebase) to product managers who wanted to focus on features.',
        focus: 'STAR structure (Situation, Task, Action, Result) - highlight how you quantified the impact of tech debt in business terms (e.g., developer velocity, bug rates).'
      },
      {
        id: 'fe_beh_2',
        question: 'Describe a situation where a production bug occurred due to a frontend performance issue. How did you diagnose and resolve it under pressure?',
        focus: 'STAR structure - highlight diagnosis steps (DevTools, profiling), immediate mitigation, long-term fix, and monitoring implementation.'
      }
    ],
    codingChallenges: [
      {
        id: 'fe_code_1',
        title: 'Deep Clone Object',
        description: `Write a function \`deepClone(obj)\` that takes an object and returns a deep copy of it. 
It should handle nested objects, arrays, and primitive values. Do not use \`JSON.parse(JSON.stringify(obj))\` as it loses methods, undefined, and symbols.

**Example:**
\`\`\`js
const original = { a: 1, b: { c: 2 }, d: [3, 4] };
const copy = deepClone(original);
copy.b.c = 99;
console.log(original.b.c); // Should still output 2
\`\`\`

**Function Signature:**
\`\`\`js
function deepClone(obj) {
  // Your code here
}
\`\`\``,
        starterCode: `function deepClone(obj) {
  // Write your code here
  
}`,
        testCases: [
          { input: '{ a: 1, b: { c: 2 } }', expected: 'Equal but different references' },
          { input: '[1, [2, 3], { d: 4 }]', expected: 'Equal structure, deep cloned array & object' }
        ],
        solutionTemplate: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  const cloned = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}`
      }
    ]
  },
  backend: {
    title: 'Senior Backend Engineer',
    skills: ['Node.js', 'Go/Python', 'PostgreSQL', 'Redis', 'Docker/K8s', 'System Design', 'Message Queues'],
    companies: ['AWS', 'Uber', 'Airbnb', 'Adyen', 'HashiCorp'],
    keywords: ['Connection pooling', 'Indexing', 'Sharding', 'CAP Theorem', 'ACID', 'Idempotency', 'gRPC', 'Distributed Locking', 'Event Sourcing', 'Rate Limiting'],
    resumeFeedback: {
      score: 68,
      parsedSkills: ['Python', 'Django', 'MySQL', 'REST API', 'Docker'],
      missingKeywords: ['Redis caching', 'Message Queues (Kafka/RabbitMQ)', 'Kubernetes', 'System Design Scale', 'Database Indexing/Optimization'],
      suggestions: [
        'Highlight experience with asynchronous task processing or event-driven architectures.',
        'Specify the scale of your systems (e.g., "Handled 10k+ requests/sec", "Managed 500GB database").',
        'Elaborate on database optimization techniques like indexing, partitioning, or query tuning.'
      ]
    },
    technicalQuestions: [
      {
        id: 'be_1',
        question: 'What is the CAP Theorem, and how does it affect database choice in a highly distributed system?',
        hints: 'Consistency, Availability, and Partition Tolerance. Real-world networks always have partition risk, so you must choose CP or AP.',
        idealKeywords: ['consistency', 'availability', 'partition tolerance', 'network partition', 'eventual consistency', 'mongodb', 'cassandra']
      },
      {
        id: 'be_2',
        question: 'How would you design a distributed rate limiter that handles 100,000 requests per second across multiple regions?',
        hints: 'Think about Redis cluster, Token Bucket or Sliding Window Log algorithms, synchronization issues, and local in-memory fallback caches.',
        idealKeywords: ['token bucket', 'sliding window', 'redis', 'distributed lock', 'low latency', 'rate limiting']
      },
      {
        id: 'be_3',
        question: 'Explain what database transaction isolation levels are and how they prevent anomalies like Dirty Reads and Phantom Reads.',
        hints: 'Four levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable. Talk about locking mechanisms and MVCC (Multi-Version Concurrency Control).',
        idealKeywords: ['dirty read', 'phantom read', 'serializable', 'isolation level', 'acid', 'locking', 'mvcc']
      }
    ],
    behavioralQuestions: [
      {
        id: 'be_beh_1',
        question: 'Describe a time when a system outage occurred on a service you owned. How did you isolate the problem, restore service, and prevent future incidents?',
        focus: 'STAR structure - Focus on logical troubleshooting, telemetry usage (APM, logs), blameless post-mortem, and corrective action items.'
      },
      {
        id: 'be_beh_2',
        question: 'Share an example of a technical decision you made that turned out to be wrong. What did you learn and how did you pivot?',
        focus: 'STAR structure - Focus on humility, analysis of the mistake, transparency with stakeholders, and the pivot execution strategy.'
      }
    ],
    codingChallenges: [
      {
        id: 'be_code_1',
        title: 'LRU Cache Implementation',
        description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(capacity)\` Initializes the LRU cache with positive size \`capacity\`.
- \`get(key)\` Returns the value of the \`key\` if the key exists, otherwise returns \`-1\`.
- \`put(key, value)\` Update the value of the \`key\` if the key exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, evict the least recently used key.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.

**Function Starter:**
\`\`\`js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Hint: JS Map remembers insertion order!
  }

  get(key) {
    // Your code here
  }

  put(key, value) {
    // Your code here
  }
}
\`\`\``,
        starterCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    // Write your code here
    
  }

  put(key, value) {
    // Write your code here
    
  }
}`,
        testCases: [
          { input: 'put(1, 1); put(2, 2); get(1); put(3, 3); get(2);', expected: 'get(1) -> 1; get(2) -> -1 (evicted)' }
        ],
        solutionTemplate: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // Refresh insertion order
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict first (least recently used)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}`
      }
    ]
  }
};

export const sampleResumes = {
  frontend: `TASMIR KHAN
Senior Frontend Engineer
tasmir@example.com | github.com/tasmirkhan

SUMMARY
Dynamic frontend developer with 5+ years of experience building web applications. Expert in Javascript, HTML, and CSS. Dedicated to clean UI and fast page loads.

EXPERIENCE
Frontend Developer | TechCorp Inc. (2023 - Present)
- Developed responsive web interfaces using React.js and CSS.
- Collaborated with design teams to translate Figma mockups into reusable React components.
- Integrated REST APIs and structured data bindings.
- Used Webpack to bundle application resources.

Software Engineer | WebStudio (2021 - 2023)
- Created static and dynamic websites using HTML5, CSS3, and jQuery.
- Optimized images and assets to improve load speeds.
- Set up Git version control for a team of 4 developers.

SKILLS
React, JavaScript, CSS, HTML, Webpack, Git, Responsive Design, Bootstrap`,
  backend: `JOHN DOE
Backend Software Engineer
john.doe@example.com | 123-456-7890

SUMMARY
Focused backend engineer specializing in server-side logic, database architecture, and API design. Proficient in Python, Django, and SQL. 

EXPERIENCE
Backend Engineer | DataSystems LLC (2022 - Present)
- Managed and queries MySQL databases containing client transaction records.
- Built RESTful APIs using Django Rest Framework.
- Dockerized deployment environments for dev and staging.
- Troubleshooted production API bugs and optimized query loading speeds.

Junior Dev | AppCrafters (2020 - 2022)
- Assited in maintaining Flask microservices.
- Wrote basic automated unit tests using pytest.
- Integrated third party payment processors.

SKILLS
Python, Django, Flask, MySQL, REST APIs, Docker, Git, Linux, Unit Testing`
};

export const defaultHistory = [
  {
    id: 'h_1',
    role: 'Senior Frontend Engineer',
    type: 'Technical',
    date: '2026-08-01',
    score: 82,
    feedback: 'Excellent explanation of closures and reactivity. Could focus more on Core Web Vitals details.',
    weaknesses: ['Core Web Vitals details (CLS, LCP)', 'TypeScript utility typing']
  },
  {
    id: 'h_2',
    role: 'Senior Frontend Engineer',
    type: 'Behavioral',
    date: '2026-08-05',
    score: 75,
    feedback: 'Good descriptions of projects. However, the STAR method structure was weak on the "Result" sections; needs quantitative impact.',
    weaknesses: ['STAR method results quantification', 'Conflict resolution phrasing']
  }
];

export const mockEvaluations = {
  excellent: {
    score: 91,
    grades: { accuracy: 93, communication: 90, style: 90 },
    summary: 'Outstanding performance. You hit almost all major keywords and structured your answers logically. You showed a deep engineering understanding of the underlying principles.',
    details: [
      { aspect: 'Accuracy', text: 'Highly accurate descriptions. Included advanced concepts such as React Fiber, reconciliation batching, and virtual diffing calculations.' },
      { aspect: 'Communication', text: 'Clear and structured flow. No filler words, answered exactly what was asked.' },
      { aspect: 'Style & Method', text: 'Showed professional level reasoning and architectural depth.' }
    ],
    weaknesses: ['TypeScript utility types configuration', 'Web performance profiling tools'],
    roadmap: [
      { id: 'step_1', title: 'Deep dive into TS advanced types (Omit, Pick, ReturnType)', type: 'exercise', completed: false },
      { id: 'step_2', title: 'Learn Chrome DevTools performance tab profiling', type: 'reading', completed: false }
    ]
  },
  good: {
    score: 78,
    grades: { accuracy: 76, communication: 80, style: 78 },
    summary: 'Solid effort. You understand the core concepts well, but your answers missed some key industry terms and would benefit from more concrete system level explanations.',
    details: [
      { aspect: 'Accuracy', text: 'Understands closures and DOM diffing, but missed mention of the fiber reconciliation process and memory leakage prevention.' },
      { aspect: 'Communication', text: 'Fluent, but answers tend to wander before reaching the point. Keep definitions concise.' },
      { aspect: 'Style & Method', text: 'Answer structures are a bit informal. Try using structured architectural terminology.' }
    ],
    weaknesses: ['React Fiber & Reconciliation details', 'Core Web Vitals metrics optimization'],
    roadmap: [
      { id: 'step_1', title: 'Read React Fiber Architecture documentation', type: 'reading', completed: false },
      { id: 'step_2', title: 'Practice CLS prevention: layout thrashing & dynamic imports', type: 'exercise', completed: false },
      { id: 'step_3', title: 'Run a sample project through Lighthouse and resolve all LCP flags', type: 'exercise', completed: false }
    ]
  },
  poor: {
    score: 55,
    grades: { accuracy: 52, communication: 60, style: 53 },
    summary: 'Needs improvement. Answers were very brief and missed basic components of the technical concepts. Take some time to study the core concepts before the next session.',
    details: [
      { aspect: 'Accuracy', text: 'Missed explaining how closures work or why the virtual DOM is efficient. Confused CLS with general CSS transitions.' },
      { aspect: 'Communication', text: 'Very short responses, no examples or elaboration provided.' },
      { aspect: 'Style & Method', text: 'Lacked systematic problem-solving approach.' }
    ],
    weaknesses: ['JavaScript basic scope & closures', 'Virtual DOM and React state cycle', 'Core Web Vitals definitions'],
    roadmap: [
      { id: 'step_1', title: 'Complete JS Closures & Execution Context tutorial', type: 'reading', completed: false },
      { id: 'step_2', title: 'Build a vanilla JS virtual DOM parser from scratch', type: 'exercise', completed: false },
      { id: 'step_3', title: 'Complete Web.dev Core Web Vitals pathway course', type: 'reading', completed: false }
    ]
  }
};
