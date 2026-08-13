// Gemini AI REST API Integration Service

// Get API Key from localStorage
export function getApiKey() {
  return localStorage.getItem('OPTIMAQ_GEMINI_API_KEY') || '';
}

// Set API Key in localStorage
export function setApiKey(key) {
  localStorage.setItem('OPTIMAQ_GEMINI_API_KEY', key);
}

// Get Offline Mock Mode flag
export function isOfflineMode() {
  return localStorage.getItem('OPTIMAQ_OFFLINE_MODE') === 'true';
}

// Set Offline Mock Mode flag
export function setOfflineMode(value) {
  localStorage.setItem('OPTIMAQ_OFFLINE_MODE', value ? 'true' : 'false');
}

// Strip markdown code fences that some models add even in JSON mode
function stripMarkdownFences(text) {
  if (!text) return '';
  // Remove ```json ... ``` or ``` ... ``` wrappers
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();
}

// Base Fetch Wrapper for Gemini API — with retry on 503
async function callGeminiAPI(prompt, jsonMode = true, retries = 2) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  // Use gemini-2.0-flash for best availability and speed
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      ...(jsonMode ? { responseMimeType: 'application/json' } : {})
    }
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMsg = errorData?.error?.message || '';
        console.error('Gemini API Error Response:', response.status, errMsg);

        if (response.status === 400 && errMsg.toLowerCase().includes('api key')) {
          throw new Error('INVALID_API_KEY');
        }
        if (response.status === 429 || response.status === 503) {
          if (attempt < retries) {
            // Exponential back-off: 1s, 2s
            await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
            continue;
          }
          throw new Error('API_OVERLOADED');
        }
        throw new Error(`API_ERROR_${response.status}`);
      }

      const data = await response.json();
      const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textContent) {
        // Check for safety blocks
        const finishReason = data.candidates?.[0]?.finishReason;
        if (finishReason === 'SAFETY') throw new Error('SAFETY_BLOCK');
        throw new Error('EMPTY_AI_RESPONSE');
      }

      if (jsonMode) {
        try {
          const cleaned = stripMarkdownFences(textContent);
          return JSON.parse(cleaned);
        } catch (parseErr) {
          console.error('Failed to parse JSON from Gemini response:', textContent);
          throw new Error('JSON_PARSE_ERROR');
        }
      }

      return textContent;
    } catch (error) {
      // Re-throw non-network errors immediately (don't retry)
      if (!['API_OVERLOADED', 'ECONNRESET', 'ETIMEDOUT'].includes(error.message) || attempt >= retries) {
        console.error('Gemini Service call failed:', error.message);
        throw error;
      }
    }
  }
}

/**
 * 1. Resume Analyzer
 * Compares the candidate resume text against the target role and outputs structured feedback.
 */
export async function analyzeResume(resumeText, targetRole) {
  const prompt = `You are an expert AI recruiter and resume reviewer. Analyze the following candidate resume for the target job role "${targetRole}".

Return ONLY a valid JSON object with this exact structure. No markdown, no comments, no extra text:

{
  "score": 75,
  "parsedSkills": ["Skill1", "Skill2"],
  "missingKeywords": ["MissingSkill1", "MissingSkill2"],
  "candidateName": "Candidate Name",
  "education": "Brief summary of education",
  "experienceLevel": "Senior",
  "strengths": ["Strength1", "Strength2"],
  "weaknesses": ["Weakness1", "Weakness2"],
  "suitableRoles": ["Role1", "Role2"],
  "suggestions": ["Specific action item to improve the resume for this role"],
  "focusAreas": ["Recommended interview topic based on candidate background"]
}

Rules:
- score: integer 0-100 (how well the resume matches the target role)
- experienceLevel must be exactly one of: "Junior", "Mid", "Senior", "Lead"
- parsedSkills: list all technologies and skills found in the resume
- missingKeywords: critical skills for "${targetRole}" that are NOT in the resume
- candidateName: extract from resume or use "Guest Candidate"
- All array fields must have at least 2 items

Resume Text:
---
${resumeText}
---`;

  return callGeminiAPI(prompt, true);
}

/**
 * 2. Dynamic Question Generator
 * Generates custom interview questions based on the candidate's parsed resume and target role.
 */
export async function generateQuestions(resumeText, targetRole, interviewType, difficulty, count = 3) {
  let schemaDescription;
  let exampleItem;

  if (interviewType === 'coding') {
    schemaDescription = `a JSON array of exactly ${count} coding challenge objects`;
    exampleItem = `[
  {
    "id": "code_q_1",
    "title": "Challenge Title",
    "description": "Problem description with input/output examples in plain text",
    "starterCode": "function solution() {\\n  // Write your code here\\n}",
    "testCases": [{"input": "sample input", "expected": "expected output"}],
    "solutionTemplate": "function solution() {\\n  // complete solution\\n}"
  }
]`;
  } else {
    schemaDescription = `a JSON array of exactly ${count} interview question objects`;
    exampleItem = `[
  {
    "id": "q_1",
    "question": "Specific question tailored to the candidate resume and target role",
    "hints": "Helpful hint that guides the candidate without giving the answer",
    "idealKeywords": ["keyword1", "keyword2", "key phrase"]
  }
]`;
  }

  const prompt = `You are an AI Interviewer conducting a ${interviewType} mock interview for the role "${targetRole}" at difficulty level "${difficulty}".

Generate ${schemaDescription} tailored to this specific candidate's resume.
The questions must be directly tied to their actual skills, projects, and experience listed in the resume.
Do NOT generate generic questions. Reference their specific technologies and experience.

Return ONLY raw JSON matching this schema exactly, no markdown or extra text:
${exampleItem}

Candidate Resume:
---
${resumeText || `A candidate applying for ${targetRole}`}
---`;

  return callGeminiAPI(prompt, true);
}

/**
 * 3. Dynamic Answer Evaluator
 * Evaluates a user's answer to an interview question.
 */
export async function evaluateAnswer(questionText, answerText, resumeText, interviewType) {
  const prompt = `You are an AI Interview Evaluator assessing a candidate's response.

Question:
"${questionText}"

Candidate's Answer:
"${answerText}"

Candidate Resume Context:
${resumeText ? resumeText.substring(0, 1500) : 'Not provided'}

Evaluate the answer objectively. Return ONLY a valid JSON object with no markdown or comments:

{
  "score": 85,
  "correctness": 88,
  "relevance": 90,
  "technical_depth": 75,
  "feedback": "Detailed constructive feedback. What did they explain well and what was missed?",
  "missing_points": ["Specific point they missed", "Another missed concept"],
  "improvement": "Specific actionable advice to improve this answer"
}

Rules:
- score: overall integer 0-100
- correctness, relevance, technical_depth: each integer 0-100
- Be strict and fair. A short vague answer should score below 50. A detailed answer with examples scores 80+.
- missing_points must list at least 1 item even for great answers`;

  return callGeminiAPI(prompt, true);
}

/**
 * 4. Dynamic Follow-Up Question Generator
 * Generates an adaptive next question based on the previous question, answer, and evaluation.
 */
export async function generateFollowUpQuestion(previousQuestionText, answerText, evaluation, resumeText, targetRole, interviewType) {
  const scoreLevel = evaluation.score >= 75 ? 'strong (score >= 75)' : 'weak (score < 75)';
  const instruction = evaluation.score >= 75
    ? 'Increase difficulty. Push on advanced implementation details, edge cases, or system-level thinking.'
    : 'Ask a simpler clarifying or foundational question to test whether they understand the basics of what they missed.';

  const prompt = `You are an adaptive AI Interviewer conducting a "${interviewType}" interview for role "${targetRole}".

The candidate's previous answer was ${scoreLevel}.
Score: ${evaluation.score}
Feedback: ${evaluation.feedback}
Missing Points: ${(evaluation.missing_points || []).join(', ') || 'None'}

Previous Question: "${previousQuestionText}"
Candidate's Answer: "${answerText}"

Instruction: ${instruction}

Generate one follow-up question. Return ONLY a valid JSON object with no markdown:

{
  "id": "followup_1",
  "question": "The adaptive follow-up question text",
  "hints": "A helpful hint tailored to this specific follow-up",
  "idealKeywords": ["keyword1", "keyword2"]
}`;

  return callGeminiAPI(prompt, true);
}

/**
 * 5. Final Report and Recommendations Compiler
 * Compiles the entire session into a comprehensive performance report.
 */
export async function generateFinalReport(resumeText, targetRole, interviewSession) {
  const sessionSummary = interviewSession.questions.map((q, idx) => {
    const ans = interviewSession.answers[idx];
    const answerText = ans?.answerText || 'No answer provided';
    const score = ans?.evaluation?.score ?? 'Not graded';
    const feedback = ans?.evaluation?.feedback || 'N/A';
    return `Q${idx + 1}: ${q.question || q.title}\nAnswer: ${answerText}\nScore: ${score}\nFeedback: ${feedback}`;
  }).join('\n---\n');

  const prompt = `You are an expert tech lead compiling a final interview performance report.

Target Role: "${targetRole}"

Interview Session:
${sessionSummary}

Candidate Resume Summary:
${resumeText ? resumeText.substring(0, 1000) : 'Not provided'}

Return ONLY a valid JSON object with no markdown or comments:

{
  "score": 78,
  "grades": {
    "accuracy": 80,
    "communication": 75,
    "style": 78
  },
  "summary": "Overall performance critique summarizing engineering readiness.",
  "details": [
    {"aspect": "Accuracy", "text": "Detailed analysis of answer correctness."},
    {"aspect": "Communication", "text": "Critique of clarity and structure."},
    {"aspect": "Method & Structure", "text": "Critique of problem-solving approach."}
  ],
  "weaknesses": ["Specific weakness 1", "Specific weakness 2"],
  "roadmap": [
    {"id": "step_1", "title": "Day 1: Study topic X in depth", "type": "reading"},
    {"id": "step_2", "title": "Day 2: Build a project using Y", "type": "exercise"},
    {"id": "step_3", "title": "Day 3: Practice Z pattern", "type": "exercise"},
    {"id": "step_4", "title": "Day 4: Review concept W", "type": "reading"},
    {"id": "step_5", "title": "Day 5: Mock interview on topic V", "type": "exercise"}
  ]
}

Rules:
- score is the average of all question scores, integer 0-100
- roadmap must have exactly 5 steps personalized to the candidate's detected weaknesses
- type must be exactly "reading" or "exercise"`;

  return callGeminiAPI(prompt, true);
}
