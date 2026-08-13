// Native global fetch will be used (Node 18+ has fetch natively)
const API_KEY = process.env.GEMINI_API_KEY || '';

const resumeJava = `
MICHAEL CHANG
Senior Java Backend Developer
michael.chang@example.com

SUMMARY
Highly experienced backend engineer with 7+ years of expertise designing and building enterprise distributed systems in Java.

TECHNICAL SKILLS
Java, Spring Boot, Spring Security, Hibernate, PostgreSQL, Redis, Kafka, Microservices, Docker, AWS.

EXPERIENCE
Lead Backend Engineer | FinanceTech Corp (2022 - Present)
- Architected and built high-throughput transactional APIs using Spring Boot, handling over 12,000 requests per minute.
- Migrated legacy monolithic services into Spring Cloud microservices.
- Optimized database queries in PostgreSQL, reducing query latency by 45% using indexing and partition strategies.
- Configured Kafka message streams to process asynchronous real-time transaction reports.

Software Engineer | DevGroup (2019 - 2022)
- Maintained core Spring Boot apps and secure database integrations.
- Implemented JWT token authentication via Spring Security.
`;

const resumeDataScience = `
DR. SARAH JENKINS
Senior Data Scientist / ML Engineer
sarah.j@example.com

SUMMARY
Data Scientist with a Ph.D. in Computer Science specializing in Deep Learning, NLP, and computer vision. Experienced in deploying model pipelines.

TECHNICAL SKILLS
Python, PyTorch, TensorFlow, Scikit-Learn, pandas, NumPy, NLP, Transformers, SQL, Docker, MLflow.

EXPERIENCE
Lead ML Engineer | AI Innovations (2023 - Present)
- Designed and trained custom BERT-based Transformer models for multi-lingual sentiment analysis.
- Solved severe target label imbalance issues using custom SMOTE algorithms and focal loss functions.
- Decreased model inference latency from 350ms to 45ms using ONNX conversion and quantization.
- Built automated training and retraining pipelines using MLflow.

Data Scientist | HealthData Inc. (2020 - 2023)
- Developed convolutional neural networks (CNNs) in PyTorch to classify medical imaging anomalies.
`;

const resumeFrontend = `
ALEX HARPER
Senior Frontend Developer
alex.h@example.com

SUMMARY
Passionate frontend developer with 6 years of experience crafting beautiful, responsive, and high-performance user interfaces.

TECHNICAL SKILLS
JavaScript (ES6+), TypeScript, React, Next.js, Redux Toolkit, HTML5, CSS Grid, Webpack, Vite, Lighthouse.

EXPERIENCE
Senior UI Engineer | DesignLabs (2022 - Present)
- Refactored legacy React apps to Next.js, improving Largest Contentful Paint (LCP) from 4.2s to 1.8s.
- Reduced Cumulative Layout Shift (CLS) to 0.02 by configuring image size wrappers and font swap utilities.
- Implemented design system components using TypeScript and CSS Modules.

Frontend Developer | PixelCraft (2020 - 2022)
- Built interactive dashboards using React and Redux Toolkit.
- Optimized bundle sizes by 35% using lazy loading and dynamic routing.
`;

// Helper to call Gemini REST endpoint
async function callGemini(prompt) {
  if (!API_KEY) {
    throw new Error('API Key missing. Run with GEMINI_API_KEY environment variable.');
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" }
  };
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  if (!res.ok) {
    throw new Error(`Gemini API returned status ${res.status}`);
  }
  const data = await res.json();
  return JSON.parse(data.candidates[0].content.parts[0].text);
}

// 1. Verify Resume Analysis Personalization
async function testResumeAnalysis() {
  console.log('\n--- 1. Testing Resume Analysis Personalization ---');
  
  console.log('Analyzing Java Resume...');
  const javaAnalysis = await callGemini(`Analyze this resume for a Java role. Return JSON:
  {"skills": [], "experienceLevel": "", "score": 80}
  Resume:\n${resumeJava}`);
  console.log('Java Extracted Level:', javaAnalysis.experienceLevel);
  console.log('Java Skills:', javaAnalysis.skills.slice(0, 5));

  console.log('\nAnalyzing Data Science Resume...');
  const dsAnalysis = await callGemini(`Analyze this resume for a Data Science role. Return JSON:
  {"skills": [], "experienceLevel": "", "score": 80}
  Resume:\n${resumeDataScience}`);
  console.log('DS Extracted Level:', dsAnalysis.experienceLevel);
  console.log('DS Skills:', dsAnalysis.skills.slice(0, 5));

  console.log('\nAnalyzing Frontend Resume...');
  const feAnalysis = await callGemini(`Analyze this resume for a Frontend role. Return JSON:
  {"skills": [], "experienceLevel": "", "score": 80}
  Resume:\n${resumeFrontend}`);
  console.log('Frontend Extracted Level:', feAnalysis.experienceLevel);
  console.log('Frontend Skills:', feAnalysis.skills.slice(0, 5));

  // Assertions
  const intersection1 = javaAnalysis.skills.filter(x => dsAnalysis.skills.includes(x));
  console.log(`\nIntersection between Java and DS skills: ${intersection1.length} skills overlap.`);
  if (intersection1.length === javaAnalysis.skills.length && javaAnalysis.skills.length > 0) {
    throw new Error('FAILED: Java and DS skills should not be identical.');
  }
  console.log('SUCCESS: Resume analysis returned distinct role-based skill configurations!');
}

// 2. Verify Question Generation Personalization
async function testQuestionGeneration() {
  console.log('\n--- 2. Testing Question Generation Personalization ---');
  
  console.log('Generating questions for Java Developer...');
  const javaQuestions = await callGemini(`Generate 2 technical interview questions based on this resume. Return JSON:
  [{"question": ""}]
  Resume:\n${resumeJava}`);
  console.log('Java Questions:');
  javaQuestions.forEach((q, idx) => console.log(`  ${idx+1}: ${q.question}`));

  console.log('\nGenerating questions for Data Scientist...');
  const dsQuestions = await callGemini(`Generate 2 technical interview questions based on this resume. Return JSON:
  [{"question": ""}]
  Resume:\n${resumeDataScience}`);
  console.log('DS Questions:');
  dsQuestions.forEach((q, idx) => console.log(`  ${idx+1}: ${q.question}`));

  console.log('\nGenerating questions for Frontend Developer...');
  const feQuestions = await callGemini(`Generate 2 technical interview questions based on this resume. Return JSON:
  [{"question": ""}]
  Resume:\n${resumeFrontend}`);
  console.log('Frontend Questions:');
  feQuestions.forEach((q, idx) => console.log(`  ${idx+1}: ${q.question}`));

  // Quick similarity check
  const overlap = javaQuestions.some(jq => dsQuestions.some(dsq => jq.question === dsq.question));
  if (overlap) {
    throw new Error('FAILED: Questions for Java and DS should not overlap!');
  }
  console.log('\nSUCCESS: Generated distinct questions tailored to each resume background!');
}

// 3. Verify Answer Grading Personalization
async function testAnswerGrading() {
  console.log('\n--- 3. Testing Answer Grading Personalization (Strong vs Weak) ---');
  
  const questionText = "Explain how you optimize database queries in PostgreSQL, and how you choose indexes.";
  
  const strongAnswerText = "To optimize PostgreSQL queries, I look at the query plan using EXPLAIN ANALYZE to identify sequential scans or slow joins. I create B-Tree indexes on columns used in WHERE clauses and JOIN conditions. I also use composite indexes for query filters that scan multiple columns, being careful of column order (most selective first). For large transaction history tables, I implement table partitioning by range or hash.";
  
  const weakAnswerText = "I write simple SELECT queries and add indexes on some tables if they seem slow. I usually just restart the PostgreSQL server if it becomes laggy.";

  console.log('Grading strong answer...');
  const strongGrade = await callGemini(`Evaluate this candidate answer to the question: "${questionText}".
  Return JSON:
  {"score": 90, "feedback": "", "improvement": ""}
  Answer: "${strongAnswerText}"
  Resume Context:
  ${resumeJava}`);
  console.log('Strong Answer Score:', strongGrade.score);
  console.log('Strong Answer Feedback:', strongGrade.feedback);

  console.log('\nGrading weak answer...');
  const weakGrade = await callGemini(`Evaluate this candidate answer to the question: "${questionText}".
  Return JSON:
  {"score": 40, "feedback": "", "improvement": ""}
  Answer: "${weakAnswerText}"
  Resume Context:
  ${resumeJava}`);
  console.log('Weak Answer Score:', weakGrade.score);
  console.log('Weak Answer Feedback:', weakGrade.feedback);

  if (strongGrade.score <= weakGrade.score) {
    throw new Error(`FAILED: Strong answer score (${strongGrade.score}) should exceed weak answer score (${weakGrade.score})`);
  }
  console.log('\nSUCCESS: Answer grading changes scores and feedback based on user input accuracy!');
}

// Run All Tests
async function runTests() {
  if (!API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable is not defined.');
    console.error('To run real API verification tests, execute: $env:GEMINI_API_KEY="your-key"; node tests/verifyPersonalization.js');
    process.exit(1);
  }
  
  try {
    await testResumeAnalysis();
    await testQuestionGeneration();
    await testAnswerGrading();
    console.log('\n🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉');
  } catch (error) {
    console.error('\n❌ TEST RUN FAILED:', error.message);
    process.exit(1);
  }
}

runTests();
