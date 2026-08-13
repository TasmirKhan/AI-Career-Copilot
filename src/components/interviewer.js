import { roles, mockEvaluations } from '../data/mockData.js';
import { evaluateAnswer, generateFollowUpQuestion, generateFinalReport, getApiKey, isOfflineMode } from '../data/geminiService.js';

export function renderInterviewer(container, state, updateState, navigate) {
  const interview = state.activeInterview;
  const currentIdx = interview.currentQuestionIndex;
  const totalLimit = interview.maxQuestions || interview.questions.length; // Max questions in configuration
  const question = interview.questions[currentIdx];
  const roleData = roles[state.profile.roleKey] || roles.frontend;
  const resumeText = state.profile.resumeText || '';

  // UI state variables
  let isRecording = false;
  let recordingInterval = null;
  let recordingSeconds = 0;
  
  // Local loading states
  let processing = false;
  let processingMessage = '';
  
  let chatHistory = interview.chatHistory || [];
  let textInput = '';
  
  // STAR responses for Behavioral
  let starSituation = '';
  let starTask = '';
  let starAction = '';
  let starResult = '';

  // Code editor values
  let codeValue = interview.codeValue !== undefined ? interview.codeValue : (question.starterCode || '');
  let terminalLogs = interview.terminalLogs || 'Console ready. Click "Run Code" to execute unit tests.';

  // Initialise technical chat if history is empty
  if (interview.type === 'technical' && chatHistory.length === 0) {
    chatHistory.push({
      sender: 'ai',
      text: `Hello ${state.profile.name || 'Candidate'}. I am your AI Technical Interviewer today. Let's start with your first question:\n\n**${question.question}**`
    });
    interview.chatHistory = chatHistory;
  }

  function renderInner() {
    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-wrap">
          <h1>AI Interviewer Simulator</h1>
          <p>Session mode: <strong>${interview.type.toUpperCase()}</strong> | Role: ${roleData.title} | Question ${currentIdx + 1} of ${totalLimit}</p>
        </div>
        <button class="btn btn-rose" id="end-interview-early-btn" ${processing ? 'disabled' : ''}>
          End Session
        </button>
      </div>

      <div class="simulator-layout">
        ${processing ? renderProcessingSpinner() : renderSimulatorWorkspace()}
      </div>
    `;

    // Bind common events
    if (!processing) {
      document.getElementById('end-interview-early-btn').addEventListener('click', endInterview);
      
      // Bind track specific events
      if (interview.type === 'technical') {
        bindTechnicalEvents();
      } else if (interview.type === 'behavioral') {
        bindBehavioralEvents();
      } else if (interview.type === 'coding') {
        bindCodingEvents();
      }
    }
  }

  function renderProcessingSpinner() {
    return `
      <div class="glass-card" style="text-align: center; padding: 4rem 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
        <div class="audio-pulse active" style="justify-content: center; height: 40px; margin-bottom: 1.5rem;">
          <div class="audio-bar" style="width: 6px; height: 100%; background: #ffffff;"></div>
          <div class="audio-bar" style="width: 6px; height: 100%; background: #ffffff;"></div>
          <div class="audio-bar" style="width: 6px; height: 100%; background: #ffffff;"></div>
          <div class="audio-bar" style="width: 6px; height: 100%; background: #ffffff;"></div>
          <div class="audio-bar" style="width: 6px; height: 100%; background: #ffffff;"></div>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Evaluating & Generating Next Step...</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">${processingMessage}</p>
      </div>
    `;
  }

  function renderSimulatorWorkspace() {
    if (interview.type === 'technical') {
      const isLast = currentIdx >= totalLimit - 1;
      
      return `
        <div class="glass-card chat-room">
          <div class="chat-messages" id="chat-messages-box">
            ${chatHistory.map(msg => `
              <div class="message ${msg.sender === 'ai' ? 'message-ai' : 'message-user'}">
                <div class="msg-avatar">${msg.sender === 'ai' ? 'AI' : 'US'}</div>
                <div class="msg-bubble">${formatMarkdown(msg.text)}</div>
              </div>
            `).join('')}
            <div id="chat-thinking-indicator" style="display: none; align-self: flex-start; margin-left: 3rem; color: var(--text-muted); font-size: 0.9rem;">
              AI is writing follow-up...
            </div>
          </div>

          <!-- Audio Interaction Panel -->
          <div class="audio-interact-bar">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <button class="btn ${isRecording ? 'btn-rose' : 'btn-secondary'}" id="toggle-record-btn" style="border-radius: 50%; width: 45px; height: 45px; padding: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              </button>
              <div>
                <div style="font-size: 0.9rem; font-weight: 600;">${isRecording ? 'Listening to your voice...' : 'Speech-to-Text Offline'}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);" id="record-timer-text">${isRecording ? `Recording: ${recordingSeconds}s` : 'Click microphone to answer via voice'}</div>
              </div>
            </div>
            
            <div class="audio-pulse ${isRecording ? 'active' : ''}">
              <div class="audio-bar"></div>
              <div class="audio-bar"></div>
              <div class="audio-bar"></div>
              <div class="audio-bar"></div>
              <div class="audio-bar"></div>
            </div>
          </div>

          <!-- Text Input Area -->
          <div class="chat-input-area">
            <textarea class="form-textarea" id="chat-textarea" style="flex: 1; min-height: 50px; height: 50px;" placeholder="Type your answer in detail...">${textInput}</textarea>
            <button class="btn btn-primary" id="send-chat-answer-btn">
              Send Response
            </button>
          </div>
        </div>
      `;
    } 
    
    if (interview.type === 'behavioral') {
      const charLimit = 30;
      const getStrength = (text) => text.trim().length >= charLimit ? 'emerald' : text.trim().length > 5 ? 'amber' : 'rose';
      const getLabel = (text) => text.trim().length >= charLimit ? 'Strong Description' : text.trim().length > 5 ? 'Too Brief' : 'Empty';

      return `
        <div class="glass-card">
          <div style="background: var(--bg-secondary); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 2rem;">
            <h4 style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 0.5rem; font-weight: 700;">Question Prompt:</h4>
            <div style="font-size: 1.15rem; line-height: 1.5; font-weight: 500;">${question.question}</div>
            <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-secondary);">
              <strong>Interviewer Advice:</strong> ${question.hints || 'Use specific metrics and details.'}
            </div>
          </div>

          <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1.25rem;">Construct Your STAR Response</h3>
          <div class="star-container">
            <!-- Situation -->
            <div class="star-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <label class="form-label" style="margin: 0; display: flex; align-items: center;"><span class="star-letter">S</span> Situation</label>
                <span class="badge badge-${getStrength(starSituation)}">${getLabel(starSituation)}</span>
              </div>
              <textarea class="form-textarea" id="star-situation" placeholder="Describe the background, context, project scale, and the problem you faced...">${starSituation}</textarea>
            </div>

            <!-- Task -->
            <div class="star-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <label class="form-label" style="margin: 0; display: flex; align-items: center;"><span class="star-letter">T</span> Task</label>
                <span class="badge badge-${getStrength(starTask)}">${getLabel(starTask)}</span>
              </div>
              <textarea class="form-textarea" id="star-task" placeholder="Outline your responsibilities, goals, and targets that needed achievement...">${starTask}</textarea>
            </div>

            <!-- Action -->
            <div class="star-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <label class="form-label" style="margin: 0; display: flex; align-items: center;"><span class="star-letter">A</span> Action</label>
                <span class="badge badge-${getStrength(starAction)}">${getLabel(starAction)}</span>
              </div>
              <textarea class="form-textarea" id="star-action" placeholder="Detail exactly what steps you took, technical tools chosen, refactor decisions, and contributions...">${starAction}</textarea>
            </div>

            <!-- Result -->
            <div class="star-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <label class="form-label" style="margin: 0; display: flex; align-items: center;"><span class="star-letter">R</span> Result</label>
                <span class="badge badge-${getStrength(starResult)}">${getLabel(starResult)}</span>
              </div>
              <textarea class="form-textarea" id="star-result" placeholder="Specify final metrics, quantitative changes, load-times improvements, lessons, or outcomes...">${starResult}</textarea>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; border-top: 1px solid var(--glass-border); padding-top: 1.5rem;">
            ${currentIdx < totalLimit - 1 
              ? `<button class="btn btn-primary" id="star-next-question-btn">Save & Next Question</button>`
              : `<button class="btn btn-emerald" id="star-finish-btn">Compile AI Evaluation</button>`
            }
          </div>
        </div>
      `;
    }

    if (interview.type === 'coding') {
      const lineCount = codeValue.split('\n').length;
      let lineNumbersHTML = '';
      for (let i = 1; i <= Math.max(lineCount, 15); i++) {
        lineNumbersHTML += `<div>${i}</div>`;
      }

      return `
        <div class="coding-workspace">
          <!-- Left Pane: Problem Description -->
          <div class="glass-card problem-pane">
            <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge badge-indigo">Challenge</span>
              ${question.title}
            </h3>
            
            <div style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary);">
              ${formatMarkdown(question.description)}
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
                ${lineNumbersHTML}
              </div>
              <textarea class="editor-textarea" id="editor-textarea-box" spellcheck="false" autocomplete="off">${codeValue}</textarea>
            </div>

            <!-- Terminal Output console -->
            <div class="code-terminal">
              <div class="terminal-header">
                <span>SYSTEM CONSOLE LOG</span>
                <span style="color: var(--text-muted);">v1.0.0</span>
              </div>
              <div class="terminal-body" id="terminal-output-box">${terminalLogs}</div>
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
      `;
    }
  }

  // ----------------------------------------------------
  // EVENT BINDERS
  // ----------------------------------------------------

  function bindTechnicalEvents() {
    const textarea = document.getElementById('chat-textarea');
    const sendBtn = document.getElementById('send-chat-answer-btn');
    const recordBtn = document.getElementById('toggle-record-btn');
    
    const chatbox = document.getElementById('chat-messages-box');
    if (chatbox) chatbox.scrollTop = chatbox.scrollHeight;

    textarea.addEventListener('input', (e) => {
      textInput = e.target.value;
    });

    sendBtn.addEventListener('click', () => {
      submitTechnicalAnswer(textInput);
    });

    recordBtn.addEventListener('click', () => {
      if (isRecording) {
        clearInterval(recordingInterval);
        isRecording = false;
        
        let mockAnswersList = [
          `In my experience, the virtual DOM is an in-memory representation of the real DOM. When state changes, React creates a new virtual tree, diffs it with the previous one, and batches reconciliation updates to paint the real DOM efficiently. The Fiber architecture makes this asynchronous so rendering doesn't block the main thread.`,
          `Core Web Vitals measure layout stability, load times, and interactive delay. We optimize Cumulative Layout Shift by setting explicit aspect ratios on images and disabling dynamic layout injections. We fix LCP by using preload headers, CDNs, and removing render-blocking script scripts.`,
          `A closure occurs when a function retains access to its outer lexical scope variables even after the outer function has executed. In React, this is frequently seen inside hooks like useEffect, where asynchronous functions capture old values of state unless dependencies are properly configured.`
        ];
        
        const responseText = mockAnswersList[currentIdx] || "I would structure my implementation around modular clean functions and robust caching mechanisms.";
        textInput = responseText;
        recordingSeconds = 0;
        
        renderInner();
      } else {
        isRecording = true;
        recordingSeconds = 0;
        renderInner();

        recordingInterval = setInterval(() => {
          recordingSeconds++;
          const timerText = document.getElementById('record-timer-text');
          if (timerText) {
            timerText.textContent = `Recording: ${recordingSeconds}s (Click mic to transcribe)`;
          }
        }, 1000);
      }
    });
  }

  function bindBehavioralEvents() {
    const sitBox = document.getElementById('star-situation');
    const taskBox = document.getElementById('star-task');
    const actBox = document.getElementById('star-action');
    const resBox = document.getElementById('star-result');

    const updateStarState = () => {
      starSituation = sitBox.value;
      starTask = taskBox.value;
      starAction = actBox.value;
      starResult = resBox.value;
    };

    [sitBox, taskBox, actBox, resBox].forEach(box => {
      box.addEventListener('input', () => {
        updateStarState();
        const charLimit = 30;
        const currentLength = box.value.trim().length;
        
        let strength = 'rose';
        let label = 'Empty';
        if (currentLength >= charLimit) {
          strength = 'emerald';
          label = 'Strong Description';
        } else if (currentLength > 5) {
          strength = 'amber';
          label = 'Too Brief';
        }

        const badge = box.parentElement.querySelector('.badge');
        if (badge) {
          badge.className = `badge badge-${strength}`;
          badge.textContent = label;
        }
      });
    });

    if (document.getElementById('star-next-question-btn')) {
      document.getElementById('star-next-question-btn').addEventListener('click', async () => {
        updateStarState();
        await evaluateStarAndMove(false);
      });
    }

    if (document.getElementById('star-finish-btn')) {
      document.getElementById('star-finish-btn').addEventListener('click', async () => {
        updateStarState();
        await evaluateStarAndMove(true);
      });
    }
  }

  function bindCodingEvents() {
    const codeArea = document.getElementById('editor-textarea-box');
    const runBtn = document.getElementById('code-run-btn');
    const submitBtn = document.getElementById('code-submit-btn');

    codeArea.addEventListener('input', (e) => {
      codeValue = e.target.value;
      interview.codeValue = codeValue;
      
      const lineCount = codeValue.split('\n').length;
      const linesBox = document.getElementById('editor-lines-box');
      if (linesBox) {
        let linesHTML = '';
        for (let i = 1; i <= Math.max(lineCount, 15); i++) {
          linesHTML += `<div>${i}</div>`;
        }
        linesBox.innerHTML = linesHTML;
      }
    });

    runBtn.addEventListener('click', () => {
      terminalLogs = `> Running compiler node workspace...\n> Testing solution for challenge: "${question.title}"...\n`;
      document.getElementById('terminal-output-box').textContent = terminalLogs + '> Executing unit tests...';

      setTimeout(() => {
        terminalLogs += `> Test Case 1: ${question.testCases[0].input} -> PASSED\n`;
        terminalLogs += `> Test Case 2: [Deep structure integrity verification] -> PASSED\n`;
        terminalLogs += `> Success: All unit checks passed successfully. Performance time is ~4ms.`;
        interview.terminalLogs = terminalLogs;
        document.getElementById('terminal-output-box').textContent = terminalLogs;
      }, 1200);
    });

    submitBtn.addEventListener('click', async () => {
      await evaluateCodingAndFinish();
    });
  }

  // ----------------------------------------------------
  // SUBMISSION & AI GRADING LOGIC
  // ----------------------------------------------------

  async function submitTechnicalAnswer(text) {
    if (!text.trim()) {
      alert('Please enter or record an answer.');
      return;
    }

    chatHistory.push({
      sender: 'user',
      text: text
    });
    interview.chatHistory = chatHistory;

    textInput = ''; 
    processing = true;
    processingMessage = 'AI is evaluating your technical answer and compiling scores...';
    renderInner();

    try {
      let gradingResult;
      if (isOfflineMode()) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        gradingResult = {
          score: text.length > 80 ? 85 : 55,
          correctness: text.length > 80 ? 90 : 50,
          relevance: 90,
          technical_depth: text.length > 80 ? 80 : 50,
          feedback: text.length > 80 ? 'Good explanation of the core principles.' : 'Response was too brief and missed key definitions.',
          missing_points: text.length > 80 ? ['React reconciliation batching timeline details'] : ['Scope variables retention rules', 'Execution context details'],
          improvement: text.length > 80 ? 'None' : 'Elaborate more on closures lexical scope variables retention.'
        };
      } else {
        gradingResult = await evaluateAnswer(question.question, text, resumeText, 'technical');
      }

      interview.answers.push({
        questionId: question.id,
        answerText: text,
        type: 'technical',
        evaluation: gradingResult
      });

      // Check if we need to generate adaptive follow-up question
      if (currentIdx < totalLimit - 1) {
        processingMessage = 'AI is preparing an adaptive follow-up question based on your response level...';
        renderInner();

        let followUpQ;
        if (isOfflineMode()) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const mockSet = roleData.technicalQuestions || [];
          followUpQ = mockSet[(currentIdx + 1) % mockSet.length];
        } else {
          const targetRole = roleData.title;
          followUpQ = await generateFollowUpQuestion(question.question, text, gradingResult, resumeText, targetRole, 'technical');
        }

        // Store the adaptive follow-up in the next configured slot without
        // increasing the intended session length. Previously this appended on
        // every technical answer, so the finish condition kept moving and the
        // interview could never reach its final report button.
        interview.questions[currentIdx + 1] = followUpQ;
        
        chatHistory.push({
          sender: 'ai',
          text: `Got it. Evaluation score: **${gradingResult.score}%**.\n\n*Feedback: ${gradingResult.feedback}*\n\nHere is your next question:\n\n**${followUpQ.question}**`
        });
        interview.chatHistory = chatHistory;

        processing = false;
        updateState({
          activeInterview: {
            ...interview,
            currentQuestionIndex: currentIdx + 1
          }
        });
      } else {
        // Last question answered
        processing = false;
        renderInner();
        
        const chatBox = document.getElementById('chat-messages-box');
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;

        // Replace input area with compile results button
        const inputArea = document.querySelector('.chat-input-area');
        if (inputArea) {
          inputArea.innerHTML = `
            <button class="btn btn-emerald" id="finish-tech-interview-btn" style="width: 100%;">
              Compile Final AI Evaluation Report
            </button>
          `;
          document.getElementById('finish-tech-interview-btn').addEventListener('click', finalizeSession);
        }
      }
    } catch (err) {
      console.error(err);
      processing = false;
      alert('Error during evaluation call. Please try again.');
      renderInner();
    }
  }

  async function evaluateStarAndMove(isLast = false) {
    const combinedAnswer = `S: ${starSituation}\nT: ${starTask}\nA: ${starAction}\nR: ${starResult}`;
    if (starSituation.trim().length < 5 || starAction.trim().length < 5) {
      alert('Please fill out at least the Situation and Action steps of your STAR response.');
      return;
    }

    processing = true;
    processingMessage = 'AI is evaluating your STAR response structural layout...';
    renderInner();

    try {
      let gradingResult;
      if (isOfflineMode()) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        gradingResult = {
          score: starResult.trim().length > 15 ? 88 : 65,
          correctness: 80,
          relevance: 90,
          technical_depth: 70,
          feedback: starResult.trim().length > 15 ? 'Excellent use of the STAR method with quantitative metrics.' : 'STAR format used, but result step lacks specific performance numbers.',
          missing_points: starResult.trim().length > 15 ? [] : ['Quantitative results (e.g. bundle size reduction percentage)'],
          improvement: 'Ensure you add final metric details.'
        };
      } else {
        gradingResult = await evaluateAnswer(question.question, combinedAnswer, resumeText, 'behavioral');
      }

      interview.answers.push({
        questionId: question.id,
        answerText: combinedAnswer,
        star: {
          situation: starSituation,
          task: starTask,
          action: starAction,
          result: starResult
        },
        type: 'behavioral',
        evaluation: gradingResult
      });

      processing = false;

      if (!isLast) {
        // Go to next question index
        updateState({
          activeInterview: {
            ...interview,
            currentQuestionIndex: currentIdx + 1
          }
        });
      } else {
        await finalizeSession();
      }
    } catch (err) {
      console.error(err);
      processing = false;
      alert('Error saving behavioral response. Please try again.');
      renderInner();
    }
  }

  async function evaluateCodingAndFinish() {
    processing = true;
    processingMessage = 'AI is compiling your code output and verifying performance time limits...';
    renderInner();

    try {
      let gradingResult;
      if (isOfflineMode()) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        gradingResult = {
          score: codeValue.includes('deepClone') || codeValue.includes('put') ? 95 : 40,
          correctness: codeValue.includes('deepClone') || codeValue.includes('put') ? 98 : 30,
          relevance: 100,
          technical_depth: codeValue.includes('deepClone') || codeValue.includes('put') ? 95 : 40,
          feedback: 'Code compiles successfully and satisfies all unit cases.',
          missing_points: [],
          improvement: 'None'
        };
      } else {
        gradingResult = await evaluateAnswer(question.description, codeValue, resumeText, 'coding');
      }

      interview.answers.push({
        questionId: question.id,
        answerText: codeValue,
        type: 'coding',
        evaluation: gradingResult
      });

      await finalizeSession();
    } catch (err) {
      console.error(err);
      processing = false;
      alert('Error grading code solution. Please try again.');
      renderInner();
    }
  }

  async function finalizeSession() {
    processing = true;
    processingMessage = 'Synthesizing all mock question scores and creating personalized study plan...';
    renderInner();

    try {
      const targetRole = roleData.title;
      let finalReport;

      if (isOfflineMode()) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Average the score from answers
        const sum = interview.answers.reduce((acc, curr) => acc + curr.evaluation.score, 0);
        const avg = Math.round(sum / interview.answers.length);
        const cat = avg >= 85 ? 'excellent' : avg >= 70 ? 'good' : 'poor';
        finalReport = mockEvaluations[cat];
      } else {
        finalReport = await generateFinalReport(resumeText, targetRole, interview);
      }

      const newHistoryItem = {
        id: 'h_' + Date.now(),
        role: targetRole,
        type: interview.type === 'technical' ? 'Technical' : interview.type === 'behavioral' ? 'Behavioral' : 'Coding',
        date: new Date().toISOString().split('T')[0],
        score: finalReport.score,
        feedback: finalReport.summary,
        weaknesses: finalReport.weaknesses
      };

      updateState({
        history: [newHistoryItem, ...state.history],
        activeInterview: null, 
        lastEvaluation: {
          ...finalReport,
          role: newHistoryItem.role,
          type: newHistoryItem.type
        }
      });

      processing = false;
      navigate('evaluation');
    } catch (err) {
      console.error('Final compile failed:', err);
      processing = false;
      alert('Error compiling report. Please check API Key and try again.');
      renderInner();
    }
  }

  function endInterview() {
    if (confirm('Are you sure you want to end this interview? Your progress for this session will not be saved.')) {
      clearInterval(recordingInterval);
      updateState({ activeInterview: null });
      navigate('dashboard');
    }
  }

  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code class="language-js" style="font-family: var(--font-mono); color: #f43f5e; background: rgba(0,0,0,0.2); padding: 0.15rem 0.35rem; border-radius: 4px; font-size: 0.85rem;">$1</code>')
      .replace(/\n/g, '<br>');
  }

  renderInner();
}
