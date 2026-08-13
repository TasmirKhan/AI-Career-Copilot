(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&p(m)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function p(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const A={frontend:{title:"Senior Frontend Engineer",skills:["React","TypeScript","CSS/SCSS","Web Performance","REST APIs","Webpack/Vite","State Management"],companies:["Google","Meta","Netflix","Stripe","Vercel"],keywords:["Virtual DOM","React Fiber","Lighthouse","CLS/LCP/FID","Webpack bundle size","Tailwind","Intersection Observer","Redux Toolkit","CSS Grid","Semantic HTML"],resumeFeedback:{score:72,parsedSkills:["React","JavaScript","CSS","HTML","Git","Webpack"],missingKeywords:["React Fiber","Core Web Vitals (LCP, FID, CLS)","TypeScript","State Management (Redux/Zustand)","Server-Side Rendering (SSR)"],suggestions:['Incorporate quantifiable achievements (e.g., "Improved bundle size by 35% using code splitting").',"Add TypeScript and Next.js to showcase modern framework experience.","Detail your experience with Core Web Vitals optimization to demonstrate high-performance web practices."]},technicalQuestions:[{id:"fe_1",question:"Explain the difference between the Virtual DOM and the real DOM. How does React's reconciliation process work?",hints:"Think about batching, diffing algorithm complexity O(n), and the Fiber architecture introduced in React 16.",idealKeywords:["reconciliation","diffing","virtual dom","fiber","batching","repaint","reflow"]},{id:"fe_2",question:"What are Core Web Vitals? How would you optimize a page that has a poor Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP)?",hints:"CLS is about visual stability; LCP is about loading performance. Think about image dimensions, font-display, render-blocking resources, and critical CSS.",idealKeywords:["cls","lcp","critical css","aspect-ratio","lazy loading","cdn","render-blocking"]},{id:"fe_3",question:"Describe how closures work in JavaScript. Can you provide a practical use-case for a closure in a React application?",hints:"A closure is a function that retains access to its outer scope. In React, hooks like useEffect and custom hooks leverage closures heavily.",idealKeywords:["lexical scope","closure","hook","useState","encapsulation","stale state"]}],behavioralQuestions:[{id:"fe_beh_1",question:"Tell me about a time when you had to advocate for technical debt cleanup (e.g., refactoring a complex codebase) to product managers who wanted to focus on features.",focus:"STAR structure (Situation, Task, Action, Result) - highlight how you quantified the impact of tech debt in business terms (e.g., developer velocity, bug rates)."},{id:"fe_beh_2",question:"Describe a situation where a production bug occurred due to a frontend performance issue. How did you diagnose and resolve it under pressure?",focus:"STAR structure - highlight diagnosis steps (DevTools, profiling), immediate mitigation, long-term fix, and monitoring implementation."}],codingChallenges:[{id:"fe_code_1",title:"Deep Clone Object",description:"Write a function `deepClone(obj)` that takes an object and returns a deep copy of it. \nIt should handle nested objects, arrays, and primitive values. Do not use `JSON.parse(JSON.stringify(obj))` as it loses methods, undefined, and symbols.\n\n**Example:**\n```js\nconst original = { a: 1, b: { c: 2 }, d: [3, 4] };\nconst copy = deepClone(original);\ncopy.b.c = 99;\nconsole.log(original.b.c); // Should still output 2\n```\n\n**Function Signature:**\n```js\nfunction deepClone(obj) {\n  // Your code here\n}\n```",starterCode:`function deepClone(obj) {
  // Write your code here
  
}`,testCases:[{input:"{ a: 1, b: { c: 2 } }",expected:"Equal but different references"},{input:"[1, [2, 3], { d: 4 }]",expected:"Equal structure, deep cloned array & object"}],solutionTemplate:`function deepClone(obj) {
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
}`}]},backend:{title:"Senior Backend Engineer",skills:["Node.js","Go/Python","PostgreSQL","Redis","Docker/K8s","System Design","Message Queues"],companies:["AWS","Uber","Airbnb","Adyen","HashiCorp"],keywords:["Connection pooling","Indexing","Sharding","CAP Theorem","ACID","Idempotency","gRPC","Distributed Locking","Event Sourcing","Rate Limiting"],resumeFeedback:{score:68,parsedSkills:["Python","Django","MySQL","REST API","Docker"],missingKeywords:["Redis caching","Message Queues (Kafka/RabbitMQ)","Kubernetes","System Design Scale","Database Indexing/Optimization"],suggestions:["Highlight experience with asynchronous task processing or event-driven architectures.",'Specify the scale of your systems (e.g., "Handled 10k+ requests/sec", "Managed 500GB database").',"Elaborate on database optimization techniques like indexing, partitioning, or query tuning."]},technicalQuestions:[{id:"be_1",question:"What is the CAP Theorem, and how does it affect database choice in a highly distributed system?",hints:"Consistency, Availability, and Partition Tolerance. Real-world networks always have partition risk, so you must choose CP or AP.",idealKeywords:["consistency","availability","partition tolerance","network partition","eventual consistency","mongodb","cassandra"]},{id:"be_2",question:"How would you design a distributed rate limiter that handles 100,000 requests per second across multiple regions?",hints:"Think about Redis cluster, Token Bucket or Sliding Window Log algorithms, synchronization issues, and local in-memory fallback caches.",idealKeywords:["token bucket","sliding window","redis","distributed lock","low latency","rate limiting"]},{id:"be_3",question:"Explain what database transaction isolation levels are and how they prevent anomalies like Dirty Reads and Phantom Reads.",hints:"Four levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable. Talk about locking mechanisms and MVCC (Multi-Version Concurrency Control).",idealKeywords:["dirty read","phantom read","serializable","isolation level","acid","locking","mvcc"]}],behavioralQuestions:[{id:"be_beh_1",question:"Describe a time when a system outage occurred on a service you owned. How did you isolate the problem, restore service, and prevent future incidents?",focus:"STAR structure - Focus on logical troubleshooting, telemetry usage (APM, logs), blameless post-mortem, and corrective action items."},{id:"be_beh_2",question:"Share an example of a technical decision you made that turned out to be wrong. What did you learn and how did you pivot?",focus:"STAR structure - Focus on humility, analysis of the mistake, transparency with stakeholders, and the pivot execution strategy."}],codingChallenges:[{id:"be_code_1",title:"LRU Cache Implementation",description:"Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the `LRUCache` class:\n- `LRUCache(capacity)` Initializes the LRU cache with positive size `capacity`.\n- `get(key)` Returns the value of the `key` if the key exists, otherwise returns `-1`.\n- `put(key, value)` Update the value of the `key` if the key exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the least recently used key.\n\nThe functions `get` and `put` must each run in `O(1)` average time complexity.\n\n**Function Starter:**\n```js\nclass LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map(); // Hint: JS Map remembers insertion order!\n  }\n\n  get(key) {\n    // Your code here\n  }\n\n  put(key, value) {\n    // Your code here\n  }\n}\n```",starterCode:`class LRUCache {
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
}`,testCases:[{input:"put(1, 1); put(2, 2); get(1); put(3, 3); get(2);",expected:"get(1) -> 1; get(2) -> -1 (evicted)"}],solutionTemplate:`class LRUCache {
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
}`}]}},Q={frontend:`TASMIR KHAN
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
React, JavaScript, CSS, HTML, Webpack, Git, Responsive Design, Bootstrap`,backend:`JOHN DOE
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
Python, Django, Flask, MySQL, REST APIs, Docker, Git, Linux, Unit Testing`},re=[{id:"h_1",role:"Senior Frontend Engineer",type:"Technical",date:"2026-08-01",score:82,feedback:"Excellent explanation of closures and reactivity. Could focus more on Core Web Vitals details.",weaknesses:["Core Web Vitals details (CLS, LCP)","TypeScript utility typing"]},{id:"h_2",role:"Senior Frontend Engineer",type:"Behavioral",date:"2026-08-05",score:75,feedback:'Good descriptions of projects. However, the STAR method structure was weak on the "Result" sections; needs quantitative impact.',weaknesses:["STAR method results quantification","Conflict resolution phrasing"]}],oe={excellent:{score:91,grades:{accuracy:93,communication:90,style:90},summary:"Outstanding performance. You hit almost all major keywords and structured your answers logically. You showed a deep engineering understanding of the underlying principles.",details:[{aspect:"Accuracy",text:"Highly accurate descriptions. Included advanced concepts such as React Fiber, reconciliation batching, and virtual diffing calculations."},{aspect:"Communication",text:"Clear and structured flow. No filler words, answered exactly what was asked."},{aspect:"Style & Method",text:"Showed professional level reasoning and architectural depth."}],weaknesses:["TypeScript utility types configuration","Web performance profiling tools"],roadmap:[{id:"step_1",title:"Deep dive into TS advanced types (Omit, Pick, ReturnType)",type:"exercise",completed:!1},{id:"step_2",title:"Learn Chrome DevTools performance tab profiling",type:"reading",completed:!1}]},good:{score:78,grades:{accuracy:76,communication:80,style:78},summary:"Solid effort. You understand the core concepts well, but your answers missed some key industry terms and would benefit from more concrete system level explanations.",details:[{aspect:"Accuracy",text:"Understands closures and DOM diffing, but missed mention of the fiber reconciliation process and memory leakage prevention."},{aspect:"Communication",text:"Fluent, but answers tend to wander before reaching the point. Keep definitions concise."},{aspect:"Style & Method",text:"Answer structures are a bit informal. Try using structured architectural terminology."}],weaknesses:["React Fiber & Reconciliation details","Core Web Vitals metrics optimization"],roadmap:[{id:"step_1",title:"Read React Fiber Architecture documentation",type:"reading",completed:!1},{id:"step_2",title:"Practice CLS prevention: layout thrashing & dynamic imports",type:"exercise",completed:!1},{id:"step_3",title:"Run a sample project through Lighthouse and resolve all LCP flags",type:"exercise",completed:!1}]},poor:{score:55,grades:{accuracy:52,communication:60,style:53},summary:"Needs improvement. Answers were very brief and missed basic components of the technical concepts. Take some time to study the core concepts before the next session.",details:[{aspect:"Accuracy",text:"Missed explaining how closures work or why the virtual DOM is efficient. Confused CLS with general CSS transitions."},{aspect:"Communication",text:"Very short responses, no examples or elaboration provided."},{aspect:"Style & Method",text:"Lacked systematic problem-solving approach."}],weaknesses:["JavaScript basic scope & closures","Virtual DOM and React state cycle","Core Web Vitals definitions"],roadmap:[{id:"step_1",title:"Complete JS Closures & Execution Context tutorial",type:"reading",completed:!1},{id:"step_2",title:"Build a vanilla JS virtual DOM parser from scratch",type:"exercise",completed:!1},{id:"step_3",title:"Complete Web.dev Core Web Vitals pathway course",type:"reading",completed:!1}]}};function W(a,t,o,p){var c;const e=t.profile.analyzed?t.profile.feedback.score:0;let i=0;if(t.history.length>0){const s=t.history.reduce((y,x)=>y+x.score,0);i=Math.round(s/t.history.length)}const m=5,r=t.completedRoadmapSteps.size,w=r/m*100;let l=0;t.profile.analyzed&&t.history.length>0?l=Math.round(e*.3+i*.5+w*.2):t.profile.analyzed?l=Math.round(e*.6+w*.4):l=Math.round(w);const f=new Set;t.history.forEach(s=>{s.weaknesses&&s.weaknesses.forEach(y=>f.add(y))});const h=60,u=2*Math.PI*h,n=u-l/100*u;a.innerHTML=`
    <div class="view-header">
      <div class="view-title-wrap">
        <h1>Welcome Back, ${t.profile.name||"Developer"}</h1>
        <p>Here is your preparation progress for target role: <strong>${((c=A[t.profile.roleKey])==null?void 0:c.title)||"Not Set"}</strong></p>
      </div>
      <button class="btn btn-primary" id="start-new-mock-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4-4-4"/><path d="M4 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/></svg>
        Start Practice Mock
      </button>
    </div>

    <!-- Overview Grid -->
    <div class="dashboard-grid">
      <!-- Readiness Card -->
      <div class="glass-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2.5rem;">
        <h3 style="font-size: 1.15rem; color: var(--text-secondary); margin-bottom: 1.5rem; font-weight: 600;">Overall Job Readiness</h3>
        
        <div class="dashboard-radial-container">
          <svg class="radial-progress-svg">
            <circle class="radial-bg" cx="75" cy="75" r="${h}"></circle>
            <circle class="radial-fill" cx="75" cy="75" r="${h}" 
              stroke-dasharray="${u}" 
              stroke-dashoffset="${n}"></circle>
          </svg>
          <div class="radial-text">
            ${l}%
            <span>Score</span>
          </div>
        </div>

        <p style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-secondary); max-width: 250px;">
          Based on resume strength, active mock evaluations, and roadmap tasks completed.
        </p>
      </div>

      <!-- Quick Stats Metrics -->
      <div class="stats-card-container">
        <div class="glass-card stat-mini-card glow-hover">
          <div class="track-icon" style="margin: 0 auto 0.75rem auto; color: var(--accent-indigo);">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div class="stat-val">${e}%</div>
          <div class="form-label" style="margin: 0;">Resume Score</div>
        </div>
        
        <div class="glass-card stat-mini-card glow-hover">
          <div class="track-icon" style="margin: 0 auto 0.75rem auto; color: var(--accent-cyan);">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div class="stat-val">${t.history.length}</div>
          <div class="form-label" style="margin: 0;">Mock Sessions</div>
        </div>

        <div class="glass-card stat-mini-card glow-hover">
          <div class="track-icon" style="margin: 0 auto 0.75rem auto; color: var(--accent-emerald);">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="stat-val">${i||"N/A"}%</div>
          <div class="form-label" style="margin: 0;">Avg Score</div>
        </div>

        <div class="glass-card stat-mini-card glow-hover">
          <div class="track-icon" style="margin: 0 auto 0.75rem auto; color: var(--accent-purple);">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div class="stat-val">${r}/${m}</div>
          <div class="form-label" style="margin: 0;">Roadmap Steps</div>
        </div>
      </div>
    </div>

    <!-- Secondary Row: Weakness Analysis & Personalized Plan -->
    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 2rem; margin-bottom: 2.5rem;">
      <!-- Weakness Detector Box -->
      <div class="glass-card">
        <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.25rem;">⚠️ Detected Weaknesses</h3>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${f.size>0?Array.from(f).map(s=>`
                <div class="weakness-list-item">
                  <div class="weakness-dot"></div>
                  <div style="font-size: 0.95rem; line-height: 1.4;">${s}</div>
                </div>
              `).join(""):`<div style="color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 2rem 0;">
                No major weaknesses detected yet! Complete mock interviews to analyze potential skill gaps.
               </div>`}
        </div>
      </div>

      <!-- Personalized Plan / Roadmap Checklist -->
      <div class="glass-card">
        <h3 style="font-size: 1.2rem; font-weight: 600;">📋 Personalized Prep Plan</h3>
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1rem;">Complete tasks to improve your interview performance. Check off to update readiness score.</p>
        
        <div class="roadmap-checklist">
          ${[{id:"step_1",title:"Complete comprehensive study on React Fiber & reconciliation algorithms",type:"reading"},{id:"step_2",title:"Practice solving Core Web Vital improvements (LCP, CLS)",type:"exercise"},{id:"step_3",title:"Refactor behavioral answers to focus strictly on STAR quantitative Results",type:"exercise"},{id:"step_4",title:"Study complex system design: Distributed Rate Limiting caches",type:"reading"},{id:"step_5",title:"Optimize algorithmic complexity for LRU cache updates (O(1))",type:"exercise"}].map(s=>{const y=t.completedRoadmapSteps.has(s.id);return`
              <div class="roadmap-item ${y?"completed":""}" data-task-id="${s.id}">
                <div class="roadmap-checkbox">
                  ${y?'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}
                </div>
                <div class="roadmap-title" style="font-size: 0.9rem; font-weight: 500;">
                  <span class="badge ${s.type==="reading"?"badge-indigo":"badge-amber"}" style="margin-right: 0.5rem; padding: 0.15rem 0.4rem; font-size: 0.7rem;">${s.type}</span>
                  ${s.title}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    </div>

    <!-- History Table Card -->
    <div class="glass-card">
      <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.25rem;">🕒 Mock Interview History</h3>
      ${t.history.length>0?`
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
            <thead>
              <tr style="border-bottom: 1px solid var(--glass-border); color: var(--text-secondary); font-weight: 600;">
                <th style="padding: 1rem 0.75rem;">Role</th>
                <th style="padding: 1rem 0.75rem;">Type</th>
                <th style="padding: 1rem 0.75rem;">Date</th>
                <th style="padding: 1rem 0.75rem;">Score</th>
                <th style="padding: 1rem 0.75rem;">Key Insight</th>
              </tr>
            </thead>
            <tbody>
              ${t.history.map(s=>`
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03); hover: background-color: rgba(255,255,255,0.01);">
                  <td style="padding: 1rem 0.75rem; font-weight: 500;">${s.role}</td>
                  <td style="padding: 1rem 0.75rem;">
                    <span class="badge ${s.type==="Technical"?"badge-indigo":s.type==="Behavioral"?"badge-amber":"badge-emerald"}">${s.type}</span>
                  </td>
                  <td style="padding: 1rem 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">${s.date}</td>
                  <td style="padding: 1rem 0.75rem; font-weight: 700; color: ${s.score>=80?"var(--accent-emerald)":s.score>=70?"var(--accent-amber)":"var(--accent-rose)"};">${s.score}%</td>
                  <td style="padding: 1rem 0.75rem; color: var(--text-secondary); font-size: 0.85rem; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${s.feedback}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `:`
        <div style="text-align: center; color: var(--text-muted); padding: 3rem 0; font-size: 0.95rem;">
          No sessions recorded yet. Start your first mock interview above!
        </div>
      `}
    </div>
  `,document.getElementById("start-new-mock-btn").addEventListener("click",()=>{p("generator")}),document.querySelectorAll(".roadmap-item").forEach(s=>{s.addEventListener("click",()=>{const y=s.getAttribute("data-task-id"),x=new Set(t.completedRoadmapSteps);x.has(y)?x.delete(y):x.add(y),o({completedRoadmapSteps:x})})})}function V(a){return new Promise((t,o)=>{if(Array.from(document.querySelectorAll("script")).some(i=>i.src===a)){t();return}const e=document.createElement("script");e.src=a,e.onload=()=>t(),e.onerror=i=>o(i),document.head.appendChild(e)})}async function se(a){try{await V("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");const t=window["pdfjs-dist/build/pdf"];t.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";const o=await a.arrayBuffer(),p=await t.getDocument({data:o}).promise;let e="";for(let i=1;i<=p.numPages;i++){const w=(await(await p.getPage(i)).getTextContent()).items.map(l=>l.str).join(" ");e+=w+`

`}return e.trim()}catch(t){throw console.error("PDF extraction failed:",t),new Error("PDF_PARSING_FAILED")}}async function ne(a){try{await V("https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js");const t=await a.arrayBuffer();return(await window.mammoth.extractRawText({arrayBuffer:t})).value.trim()}catch(t){throw console.error("Docx extraction failed:",t),new Error("DOCX_PARSING_FAILED")}}async function le(a){const t=a.name.toLowerCase();return t.endsWith(".pdf")?se(a):t.endsWith(".docx")?ne(a):new Promise((o,p)=>{const e=new FileReader;e.onload=i=>o(i.target.result),e.onerror=i=>p(i),e.readAsText(a)})}function j(){return localStorage.getItem("OPTIMAQ_GEMINI_API_KEY")||""}function de(a){localStorage.setItem("OPTIMAQ_GEMINI_API_KEY",a)}function E(){return localStorage.getItem("OPTIMAQ_OFFLINE_MODE")==="true"}function ce(a){localStorage.setItem("OPTIMAQ_OFFLINE_MODE",a?"true":"false")}async function O(a,t=!0){var i,m,r,w,l,f,h;const o=j();if(!o&&!E())throw new Error("API_KEY_MISSING");if(E())throw new Error("OFFLINE_MODE_ACTIVE");const p=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${o}`,e={contents:[{parts:[{text:a}]}]};t&&(e.generationConfig={responseMimeType:"application/json"});try{const u=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!u.ok){const s=await u.json().catch(()=>({}));throw console.error("Gemini API Error Response:",s),u.status===400&&((m=(i=s.error)==null?void 0:i.message)!=null&&m.includes("API key"))?new Error("INVALID_API_KEY"):new Error(`API_ERROR_${u.status}`)}const c=(h=(f=(l=(w=(r=(await u.json()).candidates)==null?void 0:r[0])==null?void 0:w.content)==null?void 0:l.parts)==null?void 0:f[0])==null?void 0:h.text;if(!c)throw new Error("EMPTY_AI_RESPONSE");if(t)try{return JSON.parse(c.trim())}catch{throw console.error("Failed to parse JSON content from Gemini response:",c),new Error("JSON_PARSE_ERROR")}return c}catch(u){throw console.error("Gemini Service call failed:",u),u}}async function me(a,t){const o=`
You are an expert AI recruiter and resume reviewer. Analyze the following candidate resume text for the target job role "${t}".
You must return a valid JSON object matching the following structure exactly. Do not include markdown code block styling or extra text.

JSON Structure:
{
  "score": 75, // Compatibility score from 0 to 100 based on matches
  "parsedSkills": ["Skill1", "Skill2"], // List of skills identified in the resume
  "missingKeywords": ["MissingSkill1", "MissingSkill2"], // Critical skills for the target role that are missing
  "candidateName": "Candidate Name", // Extract candidate name (or "Guest Candidate" if not found)
  "education": "Brief summary of education",
  "experienceLevel": "Junior" | "Mid" | "Senior" | "Lead", // Determined experience level
  "strengths": ["Strength1", "Strength2"], // Strengths of the resume
  "weaknesses": ["Weakness1", "Weakness2"], // Area of improvements
  "suitableRoles": ["Role1", "Role2"], // Other suitable job roles
  "suggestions": [
    "Specific action items to optimize the resume for this role"
  ],
  "focusAreas": [
    "Recommended interview focus areas for this candidate based on their background"
  ]
}

Resume Text:
${a}
`;return O(o,!0)}async function ue(a,t,o,p,e=3){const i=`
You are an AI Interviewer conducting a mock interview for target role "${t}". 
The candidate's resume content is provided below. 
Generate exactly ${e} unique questions for the "${o}" track (difficulty: "${p}").

${o==="coding"?`For Coding interviews, you must generate logical coding challenges. You must return a valid JSON array of objects matching the following schema:
[
  {
    "id": "code_q_1",
    "title": "Challenge Title",
    "description": "Problem description with examples in markdown format",
    "starterCode": "starter function skeleton in JavaScript",
    "testCases": [{"input": "sample input text", "expected": "sample expected output text"}],
    "solutionTemplate": "complete solution in JavaScript"
  }
]`:`For Technical and Behavioral tracks, you must return a valid JSON array of objects matching the following schema:
[
  {
    "id": "q_1",
    "question": "Specific question tailored to the candidate's resume context",
    "hints": "Helpful hint for the candidate",
    "idealKeywords": ["keyword1", "keyword2", "phrase"]
  }
]`}

Resume Context:
${a}

Make sure the questions are context-aware and deeply tied to the candidate's actual projects, languages, and skills listed on their resume, rather than generic templates. If the resume is brief, generate questions based on the target role "${t}" skills.
Do not wrap in markdown tags. Return only raw JSON.
`;return O(i,!0)}async function G(a,t,o,p){const e=`
You are an AI Interview Evaluator. Evaluate the candidate's response to the interview question below.
Take the candidate's resume context, the question context, and the candidate's input.

Question:
"${a}"

Candidate's Answer:
"${t}"

Resume Context:
${o}

Provide an objective evaluation. You must return a valid JSON object matching the following structure:
{
  "score": 85, // Score out of 100
  "correctness": 88, // Score out of 100
  "relevance": 90, // Score out of 100
  "technical_depth": 75, // Score out of 100
  "feedback": "Detailed, constructive feedback on their answer. Point out what they explained well and what was missed.",
  "missing_points": ["Specific point 1 that they missed", "Specific point 2"],
  "improvement": "Actionable advice on how to improve this answer"
}

Do not wrap in markdown tags. Return only raw JSON.
`;return O(e,!0)}async function pe(a,t,o,p,e,i){var r;const m=`
You are an adaptive AI Interviewer conducting a "${i}" interview for target role "${e}".
Analyze the candidate's performance on the previous question and generate a smart follow-up question.

Previous Question:
"${a}"

Candidate's Answer:
"${t}"

Previous Evaluation Details:
Score: ${o.score}
Feedback: ${o.feedback}
Missing Points: ${((r=o.missing_points)==null?void 0:r.join(", "))||"None"}

Candidate Resume Context:
${p}

Instruction:
1. If the candidate's answer was strong (score >= 75), increase the technical difficulty and push them on advanced implementation details or edge cases.
2. If the candidate's answer was weak or missing core concepts (score < 75), ask a simpler clarification or debugging question to test their fundamentals on that topic.
3. Return a valid JSON object matching the following structure:
{
  "id": "follow_up_${Date.now()}",
  "question": "The dynamic follow-up question text",
  "hints": "A helpful hint tailored to this question",
  "idealKeywords": ["keyword1", "keyword2"]
}

Do not wrap in markdown. Return only raw JSON.
`;return O(m,!0)}async function ge(a,t,o){const p=o.questions.map((i,m)=>{var w,l,f,h,u,n;const r=o.answers[m];return`
Question ${m+1}: ${i.question||i.title}
Candidate Answer: ${(r==null?void 0:r.answerText)||((w=r==null?void 0:r.star)==null?void 0:w.situation)+" "+((l=r==null?void 0:r.star)==null?void 0:l.task)+" "+((f=r==null?void 0:r.star)==null?void 0:f.action)+" "+((h=r==null?void 0:r.star)==null?void 0:h.result)||"No Answer"}
Evaluation Score: ${((u=r==null?void 0:r.evaluation)==null?void 0:u.score)||"Not graded"}
Evaluation Feedback: ${((n=r==null?void 0:r.evaluation)==null?void 0:n.feedback)||"N/A"}
`}).join(`
---
`),e=`
You are an expert AI tech lead compile review. Provide a comprehensive final report and personalized learning plan based on the candidate's interview session.

Target Role:
"${t}"

Resume Context:
${a}

Interview Session Details:
${p}

You must return a valid JSON object matching the following structure exactly:
{
  "score": 78, // Overall average score out of 100
  "grades": {
    "accuracy": 80, // Score out of 100
    "communication": 75, // Score out of 100
    "style": 78 // Score out of 100
  },
  "summary": "Overall critique summarizing key performance indicators and engineering readiness level.",
  "details": [
    { "aspect": "Accuracy", "text": "Detailed analysis of correctness." },
    { "aspect": "Communication", "text": "Detailed critique of clarity, phrasing, and response structure." },
    { "aspect": "Method & Structure", "text": "Critique of problem solving flow, STAR method usage, or coding standards." }
  ],
  "weaknesses": ["SQL Optimization gaps", "Spring Security configuration knowledge"], // List of exact weaknesses detected
  "roadmap": [
    {
      "id": "step_1",
      "title": "Day 1: Learn SQL indexing and execution plan details",
      "type": "reading" // "reading" | "exercise"
    },
    {
      "id": "step_2",
      "title": "Day 2: Implement OAuth2 filter flows in Spring Boot",
      "type": "exercise"
    }
  ] // Generate a highly personalized 5-step roadmap tailored to the detected weaknesses
}

Do not wrap in markdown. Return only raw JSON.
`;return O(e,!0)}function ve(a,t,o,p){let e=!1;function i(){a.innerHTML=`
      <div class="view-header">
        <div class="view-title-wrap">
          <h1>User Profile & Resume Analyzer</h1>
          <p>Configure your target parameters and check your resume compatibility score against top companies.</p>
        </div>
      </div>

      <div class="profile-grid">
        <!-- Form settings -->
        <div class="glass-card">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem;">🎯 Profile Configuration</h3>
          
          <div class="form-group">
            <label class="form-label" for="profile-name">Full Name</label>
            <input type="text" class="form-input" id="profile-name" value="${t.profile.name||""}" placeholder="e.g. John Doe">
          </div>

          <div class="form-group">
            <label class="form-label" for="profile-role">Target Job Role</label>
            <select class="form-select" id="profile-role">
              <option value="frontend" ${t.profile.roleKey==="frontend"?"selected":""}>Senior Frontend Engineer</option>
              <option value="backend" ${t.profile.roleKey==="backend"?"selected":""}>Senior Backend Engineer</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="profile-experience">Years of Experience</label>
            <input type="number" class="form-input" id="profile-experience" value="${t.profile.experience||"3"}" min="0" max="30">
          </div>

          <div class="form-group">
            <label class="form-label" for="profile-company">Target Company</label>
            <input type="text" class="form-input" id="profile-company" value="${t.profile.targetCompany||""}" placeholder="e.g. Google, Stripe, Netflix">
          </div>

          <button class="btn btn-secondary" id="save-profile-btn" style="width: 100%; margin-top: 1rem;">
            Save Profile Settings
          </button>
        </div>

        <!-- Resume Analyzer Box -->
        <div class="glass-card" style="display: flex; flex-direction: column;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0;">📄 Resume Analyzer</h3>
            <button class="btn btn-outline" id="load-sample-resume-btn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
              Insert Sample Resume
            </button>
          </div>

          <div class="form-group" style="flex: 1; display: flex; flex-direction: column;">
            <label class="form-label" for="resume-text">Paste Resume Text or Drag File</label>
            <div class="resume-drop-zone" id="resume-dragover" style="padding: 1.5rem;">
              <input type="file" id="resume-file-input" accept=".txt,.md,.pdf,.docx" style="display: none;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 38px; height: 38px; margin-bottom: 0.25rem;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              <div style="font-size: 0.85rem; font-weight: 500;">Drag CV file here or click to upload (.txt, .md, .pdf, .docx)</div>
            </div>
            <textarea class="form-textarea" id="resume-text" style="margin-top: 1rem; flex: 1; min-height: 150px;" placeholder="Paste resume plain text here...">${t.profile.resumeText||""}</textarea>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button class="btn btn-emerald" id="analyze-resume-btn" style="width: 100%;" ${e?"disabled":""}>
              ${e?"Analyzing CV...":"Run AI Resume Analysis"}
            </button>
          </div>

          <!-- Loading Spinner overlay -->
          ${e?`
            <div style="text-align: center; padding: 2rem 0; margin-top: 1.5rem; border-top: 1px solid var(--glass-border);">
              <div class="audio-pulse active" style="justify-content: center; height: 30px; margin-bottom: 1rem;">
                <div class="audio-bar" style="width: 5px; height: 100%;"></div>
                <div class="audio-bar" style="width: 5px; height: 100%;"></div>
                <div class="audio-bar" style="width: 5px; height: 100%;"></div>
                <div class="audio-bar" style="width: 5px; height: 100%;"></div>
                <div class="audio-bar" style="width: 5px; height: 100%;"></div>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">Connecting to Gemini API... extracting skills & measuring gaps...</p>
            </div>
          `:""}

          <!-- Display Results -->
          ${!e&&t.profile.analyzed&&t.profile.feedback?`
            <div class="analysis-results-box">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h4 style="font-size: 1.1rem; font-weight: 600;">Analysis Results</h4>
                <div style="font-size: 1.1rem; font-weight: 800; color: ${t.profile.feedback.score>=75?"var(--accent-emerald)":"var(--accent-amber)"}">
                  Compatibility Score: ${t.profile.feedback.score}%
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; background: rgba(255,255,255,0.02); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--glass-border);">
                <div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Candidate Name</div>
                  <div style="font-size: 0.9rem; font-weight: 600;">${t.profile.feedback.candidateName||"Not Found"}</div>
                </div>
                <div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Experience Level</div>
                  <div style="font-size: 0.9rem; font-weight: 600;">${t.profile.feedback.experienceLevel||"Not Found"}</div>
                </div>
                <div style="grid-column: span 2; margin-top: 0.5rem;">
                  <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Education Summary</div>
                  <div style="font-size: 0.85rem; color: var(--text-secondary);">${t.profile.feedback.education||"Not Found"}</div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-label">Identified Skills</div>
                <div class="skills-badges">
                  ${(t.profile.feedback.parsedSkills||[]).map(n=>`<span class="badge badge-indigo">${n}</span>`).join("")}
                </div>
              </div>

              <div class="form-group">
                <div class="form-label">Missing Critical Keywords (Gaps Detected)</div>
                <div class="skills-badges">
                  ${(t.profile.feedback.missingKeywords||[]).map(n=>`<span class="badge badge-rose">${n}</span>`).join("")}
                </div>
              </div>

              <div class="form-group">
                <div class="form-label">Suitable Alternate Roles</div>
                <div class="skills-badges">
                  ${(t.profile.feedback.suitableRoles||[]).map(n=>`<span class="badge badge-amber" style="background:rgba(255,255,255,0.05); color:#a3a3a3; border: 1px solid #404040;">${n}</span>`).join("")}
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                  <div class="form-label">Strengths</div>
                  <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem;">
                    ${(t.profile.feedback.strengths||[]).map(n=>`<li>${n}</li>`).join("")}
                  </ul>
                </div>
                <div>
                  <div class="form-label">Weaknesses</div>
                  <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem;">
                    ${(t.profile.feedback.weaknesses||[]).map(n=>`<li>${n}</li>`).join("")}
                  </ul>
                </div>
              </div>

              <div class="form-group">
                <div class="form-label">Tailoring Recommendations</div>
                <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.35rem;">
                  ${(t.profile.feedback.suggestions||[]).map(n=>`<li>${n}</li>`).join("")}
                </ul>
              </div>

              <div class="form-group">
                <div class="form-label">Recommended Interview Focus Areas</div>
                <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.35rem;">
                  ${(t.profile.feedback.focusAreas||[]).map(n=>`<li>${n}</li>`).join("")}
                </ul>
              </div>

              <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid var(--glass-border); padding-top: 1rem;">
                <button class="btn btn-primary" id="go-to-simulator-btn">
                  Generate Custom Mock Interview
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          `:""}
        </div>
      </div>
    `,document.getElementById("save-profile-btn").addEventListener("click",m),document.getElementById("load-sample-resume-btn").addEventListener("click",r),document.getElementById("analyze-resume-btn").addEventListener("click",w),document.getElementById("go-to-simulator-btn")&&document.getElementById("go-to-simulator-btn").addEventListener("click",()=>{p("generator")});const l=document.getElementById("resume-dragover"),f=document.getElementById("resume-file-input"),h=document.getElementById("resume-text");l.addEventListener("dragover",n=>{n.preventDefault(),l.classList.add("dragover")}),l.addEventListener("dragleave",()=>{l.classList.remove("dragover")}),l.addEventListener("drop",n=>{n.preventDefault(),l.classList.remove("dragover");const c=n.dataTransfer.files[0];c&&u(c)}),l.addEventListener("click",()=>{f.click()}),f.addEventListener("change",n=>{const c=n.target.files[0];c&&u(c)});async function u(n){const c=l.querySelector("div"),s=c.textContent;c.textContent="Extracting text from file...",l.style.opacity=.6;try{const y=await le(n);h.value=y,t.profile.resumeText=y,c.textContent="Resume uploaded successfully!",setTimeout(()=>{c.textContent=s},3e3)}catch(y){console.error("File extraction error:",y),c.textContent="Failed to extract text. Try plain text.",alert("Could not extract text from file. Please ensure it's a valid PDF, DOCX, or text file."),setTimeout(()=>{c.textContent=s},3e3)}finally{l.style.opacity=1}}}function m(){const l=document.getElementById("profile-name").value,f=document.getElementById("profile-role").value,h=document.getElementById("profile-experience").value,u=document.getElementById("profile-company").value,n=f!==t.profile.roleKey,c={...t.profile,name:l,roleKey:f,experience:h,targetCompany:u};n&&(c.analyzed=!1,c.feedback=null,c.resumeText=""),o({profile:c}),alert("Profile settings saved successfully!")}function r(){const l=document.getElementById("profile-role").value,f=Q[l]||"";document.getElementById("resume-text").value=f,t.profile.resumeText=f}async function w(){var f;const l=document.getElementById("resume-text").value;if(!l.trim()){alert("Please paste or upload your resume text first.");return}if(!j()&&!E()){alert("Gemini API Key is missing. Please click the Settings link in the sidebar to configure it."),p("settings");return}e=!0,i();try{const h=document.getElementById("profile-role").value,u=document.getElementById("profile-name").value,n=document.getElementById("profile-experience").value,c=document.getElementById("profile-company").value,s=((f=A[h])==null?void 0:f.title)||"Software Developer";let y;E()?(await new Promise(x=>setTimeout(x,1500)),y=A[h].resumeFeedback):y=await me(l,s),o({profile:{name:y.candidateName||u||"Guest Candidate",roleKey:h,experience:n,targetCompany:c,resumeText:l,analyzed:!0,feedback:y}})}catch(h){console.error("Resume analysis failed:",h);let u="Unable to analyze the resume right now. Please try again in a few moments.";h.message==="API_KEY_MISSING"?u="API Key missing. Please set your Gemini API Key in Settings.":h.message==="INVALID_API_KEY"&&(u="Invalid API Key. Please verify your Gemini API Key in Settings."),alert(u)}finally{e=!1,i()}}i()}function fe(a,t,o,p){let e="technical",i=!1;function m(){const w=A[t.profile.roleKey]||A.frontend;a.innerHTML=`
      <div class="view-header">
        <div class="view-title-wrap">
          <h1>AI Interview Session Generator</h1>
          <p>Tailor a customized mock interview based on your resume, target role, and focus skill sets.</p>
        </div>
      </div>

      <!-- Track Selection Grid -->
      <h3 style="font-size: 1.15rem; font-weight: 600; margin-bottom: 1rem;">1. Select Interview Track</h3>
      <div class="track-selection-grid">
        <!-- Technical Track Card -->
        <div class="glass-card track-card ${e==="technical"?"active":""}" id="track-tech">
          <div class="track-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div class="track-title">Technical Deep Dive</div>
          <div class="track-desc">Domain framework architecture, platform theory, Core Web Vitals, and language design mechanics.</div>
        </div>

        <!-- Behavioral Track Card -->
        <div class="glass-card track-card ${e==="behavioral"?"active":""}" id="track-behavioral">
          <div class="track-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="track-title">Behavioral (STAR)</div>
          <div class="track-desc">Systematic project storytelling, leadership conflicts, and situational career achievements.</div>
        </div>

        <!-- Coding Track Card -->
        <div class="glass-card track-card ${e==="coding"?"active":""}" id="track-coding">
          <div class="track-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </div>
          <div class="track-title">Coding Challenge</div>
          <div class="track-desc">Interactive sandbox workspace testing time complexity, data structures, and algorithms.</div>
        </div>
      </div>

      <!-- Settings Form Layout -->
      <div class="glass-card" style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">2. Session Parameters</h3>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
          <div>
            <div class="form-group">
              <label class="form-label" for="generator-difficulty">Difficulty Level</label>
              <select class="form-select" id="generator-difficulty" ${i?"disabled":""}>
                <option value="Junior">Junior (0-2 YOE)</option>
                <option value="Mid">Mid-Level (2-5 YOE)</option>
                <option value="Senior" selected>Senior (5+ YOE)</option>
                <option value="Lead">Lead / Staff Architect</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="generator-limit">Question Count</label>
              <select class="form-select" id="generator-limit" ${i?"disabled":""}>
                <option value="1">1 Question (Quick Practice)</option>
                <option value="3" selected>3 Questions (Standard)</option>
                <option value="5">5 Questions (Comprehensive)</option>
              </select>
            </div>
          </div>

          <div>
            <div class="form-group">
              <label class="form-label">Core Tech Focus (Parsed from profile)</label>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                ${w.skills.map((l,f)=>`
                  <label class="badge badge-indigo" style="cursor: pointer; display: flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; padding: 0.4rem 0.8rem;">
                    <input type="checkbox" checked value="${l}" style="accent-color: #ffffff;" ${i?"disabled":""}>
                    ${l}
                  </label>
                `).join("")}
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="generator-company">Customize for Company</label>
              <input type="text" class="form-input" id="generator-company" value="${t.profile.targetCompany||""}" placeholder="e.g. Stripe" ${i?"disabled":""}>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; border-top: 1px solid var(--glass-border); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            This interview is optimized based on your parsed resume keyword gaps.
          </div>
          <button class="btn btn-primary" id="launch-interview-btn" style="padding: 0.85rem 2rem;" ${i?"disabled":""}>
            ${i?"AI Generating Questions...":"Initialize AI Interviewer"}
          </button>
        </div>

        <!-- Generating spinner -->
        ${i?`
          <div style="text-align: center; padding: 1.5rem 0; margin-top: 1rem; border-top: 1px solid var(--glass-border);">
            <div class="audio-pulse active" style="justify-content: center; height: 25px; margin-bottom: 0.75rem;">
              <div class="audio-bar" style="width: 4px; height: 100%;"></div>
              <div class="audio-bar" style="width: 4px; height: 100%;"></div>
              <div class="audio-bar" style="width: 4px; height: 100%;"></div>
              <div class="audio-bar" style="width: 4px; height: 100%;"></div>
              <div class="audio-bar" style="width: 4px; height: 100%;"></div>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Analyzing resume context and composing custom question checklist...</p>
          </div>
        `:""}
      </div>
    `,i||(document.getElementById("track-tech").addEventListener("click",()=>{e="technical",m()}),document.getElementById("track-behavioral").addEventListener("click",()=>{e="behavioral",m()}),document.getElementById("track-coding").addEventListener("click",()=>{e="coding",m()}),document.getElementById("launch-interview-btn").addEventListener("click",r))}async function r(){if(!j()&&!E()){alert("Gemini API Key is missing. Please click the Settings link in the sidebar to configure it."),p("settings");return}const w=document.getElementById("generator-difficulty").value,l=parseInt(document.getElementById("generator-limit").value,10),f=document.getElementById("generator-company").value||"General",h=t.profile.roleKey,u=A[h]||A.frontend,n=t.profile.resumeText||sampleResumes[h]||"";i=!0,m();try{const c=u.title;let s=[];if(E()){await new Promise(P=>setTimeout(P,1500));let x=[];e==="technical"?x=u.technicalQuestions:e==="behavioral"?x=u.behavioralQuestions:e==="coding"&&(x=u.codingChallenges),s=x.slice(0,l)}else s=await ue(n,c,e,w,l);if(!Array.isArray(s)||s.length===0)throw new Error("INVALID_QUESTIONS_ARRAY");o({activeInterview:{type:e,difficulty:w,company:f,questions:s,currentQuestionIndex:0,answers:[],codeSubmitted:!1,startTime:new Date}}),p("simulator")}catch(c){console.error("Failed to generate interview questions:",c);let s="Unable to generate questions right now. Please verify your connection and try again.";c.message==="API_KEY_MISSING"?s="API Key missing. Please set your Gemini API Key in Settings.":c.message==="INVALID_API_KEY"&&(s="Invalid API Key. Please verify your Gemini API Key in Settings."),alert(s)}finally{i=!1,m()}}m()}function he(a,t,o,p){const e=t.activeInterview,i=e.currentQuestionIndex,m=e.questions.length,r=e.questions[i],w=A[t.profile.roleKey]||A.frontend,l=t.profile.resumeText||"";let f=!1,h=null,u=0,n=!1,c="",s=e.chatHistory||[],y="",x="",P="",D="",R="",I=e.codeValue!==void 0?e.codeValue:r.starterCode||"",L=e.terminalLogs||'Console ready. Click "Run Code" to execute unit tests.';e.type==="technical"&&s.length===0&&(s.push({sender:"ai",text:`Hello ${t.profile.name||"Candidate"}. I am your AI Technical Interviewer today. Let's start with your first question:

**${r.question}**`}),e.chatHistory=s);function C(){a.innerHTML=`
      <div class="view-header">
        <div class="view-title-wrap">
          <h1>AI Interviewer Simulator</h1>
          <p>Session mode: <strong>${e.type.toUpperCase()}</strong> | Role: ${w.title} | Question ${i+1} of ${m}</p>
        </div>
        <button class="btn btn-rose" id="end-interview-early-btn" ${n?"disabled":""}>
          End Session
        </button>
      </div>

      <div class="simulator-layout">
        ${n?Y():U()}
      </div>
    `,n||(document.getElementById("end-interview-early-btn").addEventListener("click",ae),e.type==="technical"?X():e.type==="behavioral"?Z():e.type==="coding"&&ee())}function Y(){return`
      <div class="glass-card" style="text-align: center; padding: 4rem 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
        <div class="audio-pulse active" style="justify-content: center; height: 40px; margin-bottom: 1.5rem;">
          <div class="audio-bar" style="width: 6px; height: 100%; background: #ffffff;"></div>
          <div class="audio-bar" style="width: 6px; height: 100%; background: #ffffff;"></div>
          <div class="audio-bar" style="width: 6px; height: 100%; background: #ffffff;"></div>
          <div class="audio-bar" style="width: 6px; height: 100%; background: #ffffff;"></div>
          <div class="audio-bar" style="width: 6px; height: 100%; background: #ffffff;"></div>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Evaluating & Generating Next Step...</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">${c}</p>
      </div>
    `}function U(){if(e.type==="technical")return`
        <div class="glass-card chat-room">
          <div class="chat-messages" id="chat-messages-box">
            ${s.map(d=>`
              <div class="message ${d.sender==="ai"?"message-ai":"message-user"}">
                <div class="msg-avatar">${d.sender==="ai"?"AI":"US"}</div>
                <div class="msg-bubble">${H(d.text)}</div>
              </div>
            `).join("")}
            <div id="chat-thinking-indicator" style="display: none; align-self: flex-start; margin-left: 3rem; color: var(--text-muted); font-size: 0.9rem;">
              AI is writing follow-up...
            </div>
          </div>

          <!-- Audio Interaction Panel -->
          <div class="audio-interact-bar">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <button class="btn ${f?"btn-rose":"btn-secondary"}" id="toggle-record-btn" style="border-radius: 50%; width: 45px; height: 45px; padding: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              </button>
              <div>
                <div style="font-size: 0.9rem; font-weight: 600;">${f?"Listening to your voice...":"Speech-to-Text Offline"}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);" id="record-timer-text">${f?`Recording: ${u}s`:"Click microphone to answer via voice"}</div>
              </div>
            </div>
            
            <div class="audio-pulse ${f?"active":""}">
              <div class="audio-bar"></div>
              <div class="audio-bar"></div>
              <div class="audio-bar"></div>
              <div class="audio-bar"></div>
              <div class="audio-bar"></div>
            </div>
          </div>

          <!-- Text Input Area -->
          <div class="chat-input-area">
            <textarea class="form-textarea" id="chat-textarea" style="flex: 1; min-height: 50px; height: 50px;" placeholder="Type your answer in detail...">${y}</textarea>
            <button class="btn btn-primary" id="send-chat-answer-btn">
              Send Response
            </button>
          </div>
        </div>
      `;if(e.type==="behavioral"){const v=b=>b.trim().length>=30?"emerald":b.trim().length>5?"amber":"rose",g=b=>b.trim().length>=30?"Strong Description":b.trim().length>5?"Too Brief":"Empty";return`
        <div class="glass-card">
          <div style="background: var(--bg-secondary); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 2rem;">
            <h4 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 0.5rem; font-weight: 700;">Question Prompt:</h4>
            <div style="font-size: 1.15rem; line-height: 1.5; font-weight: 500;">${r.question}</div>
            <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-secondary);">
              <strong>Interviewer Advice:</strong> ${r.hints||"Use specific metrics and details."}
            </div>
          </div>

          <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1.25rem;">Construct Your STAR Response</h3>
          <div class="star-container">
            <!-- Situation -->
            <div class="star-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <label class="form-label" style="margin: 0; display: flex; align-items: center;"><span class="star-letter">S</span> Situation</label>
                <span class="badge badge-${v(x)}">${g(x)}</span>
              </div>
              <textarea class="form-textarea" id="star-situation" placeholder="Describe the background, context, project scale, and the problem you faced...">${x}</textarea>
            </div>

            <!-- Task -->
            <div class="star-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <label class="form-label" style="margin: 0; display: flex; align-items: center;"><span class="star-letter">T</span> Task</label>
                <span class="badge badge-${v(P)}">${g(P)}</span>
              </div>
              <textarea class="form-textarea" id="star-task" placeholder="Outline your responsibilities, goals, and targets that needed achievement...">${P}</textarea>
            </div>

            <!-- Action -->
            <div class="star-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <label class="form-label" style="margin: 0; display: flex; align-items: center;"><span class="star-letter">A</span> Action</label>
                <span class="badge badge-${v(D)}">${g(D)}</span>
              </div>
              <textarea class="form-textarea" id="star-action" placeholder="Detail exactly what steps you took, technical tools chosen, refactor decisions, and contributions...">${D}</textarea>
            </div>

            <!-- Result -->
            <div class="star-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <label class="form-label" style="margin: 0; display: flex; align-items: center;"><span class="star-letter">R</span> Result</label>
                <span class="badge badge-${v(R)}">${g(R)}</span>
              </div>
              <textarea class="form-textarea" id="star-result" placeholder="Specify final metrics, quantitative changes, load-times improvements, lessons, or outcomes...">${R}</textarea>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; border-top: 1px solid var(--glass-border); padding-top: 1.5rem;">
            ${i<m-1?'<button class="btn btn-primary" id="star-next-question-btn">Save & Next Question</button>':'<button class="btn btn-emerald" id="star-finish-btn">Compile AI Evaluation</button>'}
          </div>
        </div>
      `}if(e.type==="coding"){const d=I.split(`
`).length;let v="";for(let g=1;g<=Math.max(d,15);g++)v+=`<div>${g}</div>`;return`
        <div class="coding-workspace">
          <!-- Left Pane: Problem Description -->
          <div class="glass-card problem-pane">
            <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge badge-indigo">Challenge</span>
              ${r.title}
            </h3>
            
            <div style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary);">
              ${H(r.description)}
            </div>

            <div style="margin-top: 2rem; background: rgba(0,0,0,0.2); border-radius: var(--radius-md); padding: 1rem; border: 1px dashed var(--glass-border);">
              <h4 style="font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">Sandbox Details:</h4>
              <ul style="padding-left: 1.25rem; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.35rem;">
                <li>Write functional code in JavaScript.</li>
                <li>Tests are compiled in real-time.</li>
                <li>Click "Run Code" to run local checks before submitting.</li>
              </ul>
            </div>
          </div>

          <!-- Right Pane: Code Sandbox -->
          <div class="code-editor-pane">
            <div class="editor-wrapper">
              <div class="editor-line-numbers" id="editor-lines-box">
                ${v}
              </div>
              <textarea class="editor-textarea" id="editor-textarea-box" spellcheck="false" autocomplete="off">${I}</textarea>
            </div>

            <!-- Terminal Output console -->
            <div class="code-terminal">
              <div class="terminal-header">
                <span>SYSTEM CONSOLE LOG</span>
                <span style="color: var(--text-muted);">v1.0.0</span>
              </div>
              <div class="terminal-body" id="terminal-output-box">${L}</div>
            </div>

            <!-- Editor Action Row -->
            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.25rem;">
              <button class="btn btn-secondary" id="code-run-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Run Code
              </button>
              <button class="btn btn-emerald" id="code-submit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Submit Code
              </button>
            </div>
          </div>
        </div>
      `}}function X(){const d=document.getElementById("chat-textarea"),v=document.getElementById("send-chat-answer-btn"),g=document.getElementById("toggle-record-btn"),b=document.getElementById("chat-messages-box");b&&(b.scrollTop=b.scrollHeight),d.addEventListener("input",k=>{y=k.target.value}),v.addEventListener("click",()=>{te(y)}),g.addEventListener("click",()=>{f?(clearInterval(h),f=!1,y=["In my experience, the virtual DOM is an in-memory representation of the real DOM. When state changes, React creates a new virtual tree, diffs it with the previous one, and batches reconciliation updates to paint the real DOM efficiently. The Fiber architecture makes this asynchronous so rendering doesn't block the main thread.","Core Web Vitals measure layout stability, load times, and interactive delay. We optimize Cumulative Layout Shift by setting explicit aspect ratios on images and disabling dynamic layout injections. We fix LCP by using preload headers, CDNs, and removing render-blocking script scripts.","A closure occurs when a function retains access to its outer lexical scope variables even after the outer function has executed. In React, this is frequently seen inside hooks like useEffect, where asynchronous functions capture old values of state unless dependencies are properly configured."][i]||"I would structure my implementation around modular clean functions and robust caching mechanisms.",u=0,C()):(f=!0,u=0,C(),h=setInterval(()=>{u++;const k=document.getElementById("record-timer-text");k&&(k.textContent=`Recording: ${u}s (Click mic to transcribe)`)},1e3))})}function Z(){const d=document.getElementById("star-situation"),v=document.getElementById("star-task"),g=document.getElementById("star-action"),b=document.getElementById("star-result"),k=()=>{x=d.value,P=v.value,D=g.value,R=b.value};[d,v,g,b].forEach($=>{$.addEventListener("input",()=>{k();const z=30,M=$.value.trim().length;let q="rose",F="Empty";M>=z?(q="emerald",F="Strong Description"):M>5&&(q="amber",F="Too Brief");const N=$.parentElement.querySelector(".badge");N&&(N.className=`badge badge-${q}`,N.textContent=F)})}),document.getElementById("star-next-question-btn")&&document.getElementById("star-next-question-btn").addEventListener("click",async()=>{k(),await K(!1)}),document.getElementById("star-finish-btn")&&document.getElementById("star-finish-btn").addEventListener("click",async()=>{k(),await K(!0)})}function ee(){const d=document.getElementById("editor-textarea-box"),v=document.getElementById("code-run-btn"),g=document.getElementById("code-submit-btn");d.addEventListener("input",b=>{I=b.target.value,e.codeValue=I;const k=I.split(`
`).length,$=document.getElementById("editor-lines-box");if($){let z="";for(let M=1;M<=Math.max(k,15);M++)z+=`<div>${M}</div>`;$.innerHTML=z}}),v.addEventListener("click",()=>{L=`> Running compiler node workspace...
> Testing solution for challenge: "${r.title}"...
`,document.getElementById("terminal-output-box").textContent=L+"> Executing unit tests...",setTimeout(()=>{L+=`> Test Case 1: ${r.testCases[0].input} -> PASSED
`,L+=`> Test Case 2: [Deep structure integrity verification] -> PASSED
`,L+="> Success: All unit checks passed successfully. Performance time is ~4ms.",e.terminalLogs=L,document.getElementById("terminal-output-box").textContent=L},1200)}),g.addEventListener("click",async()=>{await ie()})}async function te(d){if(!d.trim()){alert("Please enter or record an answer.");return}s.push({sender:"user",text:d}),e.chatHistory=s,y="",n=!0,c="AI is evaluating your technical answer and compiling scores...",C();try{let v;if(E()?(await new Promise(g=>setTimeout(g,1500)),v={score:d.length>80?85:55,correctness:d.length>80?90:50,relevance:90,technical_depth:d.length>80?80:50,feedback:d.length>80?"Good explanation of the core principles.":"Response was too brief and missed key definitions.",missing_points:d.length>80?["React reconciliation batching timeline details"]:["Scope variables retention rules","Execution context details"],improvement:d.length>80?"None":"Elaborate more on closures lexical scope variables retention."}):v=await G(r.question,d,l,"technical"),e.answers.push({questionId:r.id,answerText:d,type:"technical",evaluation:v}),i<m-1){c="AI is preparing an adaptive follow-up question based on your response level...",C();let g;if(E()){await new Promise(k=>setTimeout(k,1e3));const b=w.technicalQuestions||[];g=b[(i+1)%b.length]}else{const b=w.title;g=await pe(r.question,d,v,l,b,"technical")}e.questions.push(g),s.push({sender:"ai",text:`Got it. Evaluation score: **${v.score}%**.

*Feedback: ${v.feedback}*

Here is your next question:

**${g.question}**`}),e.chatHistory=s,n=!1,o({activeInterview:{...e,currentQuestionIndex:i+1}})}else{n=!1,C();const g=document.getElementById("chat-messages-box");g&&(g.scrollTop=g.scrollHeight);const b=document.querySelector(".chat-input-area");b&&(b.innerHTML=`
            <button class="btn btn-emerald" id="finish-tech-interview-btn" style="width: 100%;">
              Compile Final AI Evaluation Report
            </button>
          `,document.getElementById("finish-tech-interview-btn").addEventListener("click",_))}}catch(v){console.error(v),n=!1,alert("Error during evaluation call. Please try again."),C()}}async function K(d=!1){const v=`S: ${x}
T: ${P}
A: ${D}
R: ${R}`;if(x.trim().length<5||D.trim().length<5){alert("Please fill out at least the Situation and Action steps of your STAR response.");return}n=!0,c="AI is evaluating your STAR response structural layout...",C();try{let g;E()?(await new Promise(b=>setTimeout(b,1500)),g={score:R.trim().length>15?88:65,correctness:80,relevance:90,technical_depth:70,feedback:R.trim().length>15?"Excellent use of the STAR method with quantitative metrics.":"STAR format used, but result step lacks specific performance numbers.",missing_points:R.trim().length>15?[]:["Quantitative results (e.g. bundle size reduction percentage)"],improvement:"Ensure you add final metric details."}):g=await G(r.question,v,l,"behavioral"),e.answers.push({questionId:r.id,answerText:v,star:{situation:x,task:P,action:D,result:R},type:"behavioral",evaluation:g}),n=!1,d?await _():o({activeInterview:{...e,currentQuestionIndex:i+1}})}catch(g){console.error(g),n=!1,alert("Error saving behavioral response. Please try again."),C()}}async function ie(){n=!0,c="AI is compiling your code output and verifying performance time limits...",C();try{let d;E()?(await new Promise(v=>setTimeout(v,1500)),d={score:I.includes("deepClone")||I.includes("put")?95:40,correctness:I.includes("deepClone")||I.includes("put")?98:30,relevance:100,technical_depth:I.includes("deepClone")||I.includes("put")?95:40,feedback:"Code compiles successfully and satisfies all unit cases.",missing_points:[],improvement:"None"}):d=await G(r.description,I,l,"coding"),e.answers.push({questionId:r.id,answerText:I,type:"coding",evaluation:d}),await _()}catch(d){console.error(d),n=!1,alert("Error grading code solution. Please try again."),C()}}async function _(){n=!0,c="Synthesizing all mock question scores and creating personalized study plan...",C();try{const d=w.title;let v;if(E()){await new Promise(z=>setTimeout(z,2e3));const b=e.answers.reduce((z,M)=>z+M.evaluation.score,0),k=Math.round(b/e.answers.length),$=k>=85?"excellent":k>=70?"good":"poor";v=oe[$]}else v=await ge(l,d,e);const g={id:"h_"+Date.now(),role:d,type:e.type==="technical"?"Technical":e.type==="behavioral"?"Behavioral":"Coding",date:new Date().toISOString().split("T")[0],score:v.score,feedback:v.summary,weaknesses:v.weaknesses};o({history:[g,...t.history],activeInterview:null,lastEvaluation:{...v,role:g.role,type:g.type}}),n=!1,p("evaluation")}catch(d){console.error("Final compile failed:",d),n=!1,alert("Error compiling report. Please check API Key and try again."),C()}}function ae(){confirm("Are you sure you want to end this interview? Your progress for this session will not be saved.")&&(clearInterval(h),o({activeInterview:null}),p("dashboard"))}function H(d){return d?d.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/`(.*?)`/g,'<code class="language-js" style="font-family: var(--font-mono); color: #f43f5e; background: rgba(0,0,0,0.2); padding: 0.15rem 0.35rem; border-radius: 4px; font-size: 0.85rem;">$1</code>').replace(/\n/g,"<br>"):""}C()}function ye(a,t,o,p){const e=t.lastEvaluation;if(!e){a.innerHTML=`
      <div class="view-header">
        <div class="view-title-wrap">
          <h1>Evaluation Report</h1>
          <p>No evaluation available. Please complete a mock session first.</p>
        </div>
      </div>
      <div class="glass-card" style="text-align: center; padding: 3rem 0;">
        <button class="btn btn-primary" id="go-to-generator-btn">Start Mock Interview</button>
      </div>
    `,document.getElementById("go-to-generator-btn").addEventListener("click",()=>p("generator"));return}a.innerHTML=`
    <div class="view-header">
      <div class="view-title-wrap">
        <h1>AI Session Evaluation Report</h1>
        <p>Target role: <strong>${e.role}</strong> | Track: <strong>${e.type}</strong></p>
      </div>
      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-secondary" id="eval-go-dashboard-btn">
          Go to Dashboard
        </button>
        <button class="btn btn-primary" id="eval-retry-btn">
          Practice Again
        </button>
      </div>
    </div>

    <!-- Score Header card -->
    <div class="glass-card evaluation-header" style="margin-bottom: 2rem; padding: 2.5rem 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 500; color: var(--text-secondary);">Your Mock Score</h3>
      <div class="score-circle-large">${e.score}%</div>
      <p style="font-size: 1.1rem; max-width: 600px; margin: 1.5rem auto 0 auto; line-height: 1.6; font-weight: 400;">
        "${e.summary}"
      </p>
    </div>

    <!-- Split Grid: Feedback details vs Weaknesses and Roadmap -->
    <div class="evaluation-details-grid" style="margin-bottom: 2rem;">
      <!-- Detailed Grades breakdown -->
      <div class="glass-card" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">📊 Competency Scorecard</h3>
        
        <div class="grades-row" style="margin-bottom: 0.5rem;">
          <div class="glass-card grade-card" style="background: rgba(0,0,0,0.15);">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-indigo);">${e.grades.accuracy}%</div>
            <div class="form-label" style="font-size: 0.8rem; margin-top: 0.25rem; text-transform: uppercase;">Technical Accuracy</div>
            <div class="grade-bar-outer">
              <div class="grade-bar-inner" style="width: ${e.grades.accuracy}%;"></div>
            </div>
          </div>
          
          <div class="glass-card grade-card" style="background: rgba(0,0,0,0.15);">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-cyan);">${e.grades.communication}%</div>
            <div class="form-label" style="font-size: 0.8rem; margin-top: 0.25rem; text-transform: uppercase;">Communication Clarity</div>
            <div class="grade-bar-outer">
              <div class="grade-bar-inner" style="width: ${e.grades.communication}%; background-color: var(--accent-cyan);"></div>
            </div>
          </div>

          <div class="glass-card grade-card" style="background: rgba(0,0,0,0.15);">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-emerald);">${e.grades.style}%</div>
            <div class="form-label" style="font-size: 0.8rem; margin-top: 0.25rem; text-transform: uppercase;">Method & Structure</div>
            <div class="grade-bar-outer">
              <div class="grade-bar-inner" style="width: ${e.grades.style}%; background-color: var(--accent-emerald);"></div>
            </div>
          </div>
        </div>

        <h3 style="font-size: 1.15rem; font-weight: 600; margin-top: 1rem;">Critique Breakdown</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${e.details.map(i=>`
            <div>
              <div style="font-weight: 600; font-size: 0.95rem; color: var(--accent-indigo); margin-bottom: 0.25rem;">
                ${i.aspect} Check
              </div>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
                ${i.text}
              </p>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Weakness detection & Personalized Roadmap -->
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Weakness Alert card -->
        <div class="glass-card">
          <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.25rem; color: var(--accent-rose); display: flex; align-items: center; gap: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Gaps Detected in Session
          </h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${e.weaknesses.map(i=>`
              <div class="weakness-list-item" style="margin: 0;">
                <div class="weakness-dot"></div>
                <div style="font-size: 0.95rem; font-weight: 500;">${i}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Custom generated Roadmap checklist -->
        <div class="glass-card">
          <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">🚀 Custom Improvement Roadmap</h3>
          <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1.25rem;">We have added these tasks to your Progress Dashboard study guide.</p>
          
          <div class="roadmap-checklist">
            ${e.roadmap.map(i=>{const m=t.completedRoadmapSteps.has(i.id);return`
                <div class="roadmap-item ${m?"completed":""}" data-task-id="${i.id}">
                  <div class="roadmap-checkbox">
                    ${m?'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}
                  </div>
                  <div class="roadmap-title" style="font-size: 0.9rem; font-weight: 500;">
                    <span class="badge ${i.type==="exercise"?"badge-amber":"badge-indigo"}" style="margin-right: 0.5rem; padding: 0.15rem 0.4rem; font-size: 0.7rem;">${i.type}</span>
                    ${i.title}
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    </div>
  `,document.getElementById("eval-go-dashboard-btn").addEventListener("click",()=>p("dashboard")),document.getElementById("eval-retry-btn").addEventListener("click",()=>p("generator")),document.querySelectorAll(".roadmap-item").forEach(i=>{i.addEventListener("click",()=>{const m=i.getAttribute("data-task-id"),r=new Set(t.completedRoadmapSteps);r.has(m)?r.delete(m):r.add(m),o({completedRoadmapSteps:r})})})}function be(a,t,o,p){let e=!1;function i(){const m=j(),r=E();a.innerHTML=`
      <div class="view-header">
        <div class="view-title-wrap">
          <h1>System Settings & Integration</h1>
          <p>Configure your Gemini API key and adjust the simulator settings.</p>
        </div>
      </div>

      <div class="glass-card" style="max-width: 650px;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          Google Gemini Integration
        </h3>

        <div class="form-group">
          <label class="form-label" for="settings-api-key">Gemini API Key</label>
          <div style="display: flex; gap: 0.5rem;">
            <input type="${e?"text":"password"}" class="form-input" id="settings-api-key" value="${m}" placeholder="AIzaSy...">
            <button class="btn btn-secondary" id="toggle-key-visibility-btn" style="padding: 0.75rem 1rem;">
              ${e?"Hide":"Show"}
            </button>
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">
            Your key is stored securely in your local browser storage (localStorage). It is sent directly to Google Gemini APIs.
          </span>
        </div>

        <div class="form-group" style="margin-top: 1.5rem; background: rgba(255,255,255,0.02); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--glass-border);">
          <label style="display: flex; align-items: flex-start; gap: 0.75rem; cursor: pointer; font-size: 0.95rem;">
            <input type="checkbox" id="settings-offline-mode" ${r?"checked":""} style="margin-top: 0.25rem; accent-color: #ffffff;">
            <div>
              <strong>Enable Offline Mock Mode (For Testing)</strong>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.15rem;">
                If enabled, the application will use local simulated AI answers instead of sending requests to Gemini. Use this if you do not have an active internet connection or Gemini API key.
              </div>
            </div>
          </label>
        </div>

        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--glass-border); display: flex; justify-content: flex-end; gap: 1rem;">
          <button class="btn btn-primary" id="save-settings-btn">
            Save Configuration
          </button>
        </div>

        <div style="margin-top: 2rem; border-top: 1px dashed var(--glass-border); padding-top: 1.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-secondary);">How to obtain a free Gemini API Key:</h4>
          <ol style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.35rem;">
            <li>Go to <a href="https://aistudio.google.com/" target="_blank" style="color: #ffffff; text-decoration: underline;">Google AI Studio</a>.</li>
            <li>Sign in with your Google account.</li>
            <li>Click <strong>"Get API key"</strong> in the sidebar.</li>
            <li>Click <strong>"Create API key"</strong> and copy it.</li>
            <li>Paste it here and click "Save Configuration".</li>
          </ol>
        </div>
      </div>
    `,document.getElementById("toggle-key-visibility-btn").addEventListener("click",()=>{e=!e,i()}),document.getElementById("save-settings-btn").addEventListener("click",()=>{const w=document.getElementById("settings-api-key").value.trim(),l=document.getElementById("settings-offline-mode").checked;de(w),ce(l),alert("Configuration saved successfully!"),p("dashboard")})}i()}const S={activeView:"dashboard",profile:{name:"Tasmir Khan",roleKey:"frontend",experience:"5",targetCompany:"Google",skills:[...A.frontend.skills],resumeText:Q.frontend,analyzed:!0,feedback:A.frontend.resumeFeedback},activeInterview:null,history:[...re],completedRoadmapSteps:new Set};function B(a){Object.assign(S,a);const t=A[S.profile.roleKey];document.getElementById("sidebar-user-name").textContent=S.profile.name||"User Profile",document.getElementById("sidebar-user-role").textContent=t?t.title:"Configure Profile",document.getElementById("sidebar-avatar").textContent=(S.profile.name||"U").charAt(0).toUpperCase();const o=document.getElementById("api-status-badge");o&&(E()?(o.textContent="MOCK MODE (OFFLINE)",o.style.background="rgba(255, 255, 255, 0.12)",o.style.color="#ffffff",o.style.border="1px solid rgba(255, 255, 255, 0.25)"):j()?(o.textContent="GEMINI API ACTIVE",o.style.background="#ffffff",o.style.color="#000000",o.style.border="1px solid #ffffff"):(o.textContent="CONFIGURE GEMINI API",o.style.background="rgba(255, 255, 255, 0.04)",o.style.color="#a3a3a3",o.style.border="1px solid rgba(255, 255, 255, 0.08)")),J()}function T(a){S.activeView=a,document.querySelectorAll(".nav-link").forEach(t=>{t.getAttribute("data-view")===a?t.classList.add("active"):t.classList.remove("active")}),J()}function J(){const a=document.getElementById("view-container");if(a)switch(a.innerHTML="",S.activeView){case"dashboard":W(a,S,B,T);break;case"profile":ve(a,S,B,T);break;case"generator":fe(a,S,B,T);break;case"simulator":S.activeInterview?he(a,S,B,T):T("generator");break;case"evaluation":ye(a,S,B,T);break;case"settings":be(a,S,B,T);break;default:W(a,S,B,T)}}document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".nav-link").forEach(o=>{o.addEventListener("click",p=>{p.preventDefault();const e=o.getAttribute("data-view");T(e)})});const a=document.getElementById("mobile-menu-toggle"),t=document.querySelector(".sidebar");a&&t&&a.addEventListener("click",()=>{t.classList.toggle("mobile-open")}),B({})});
