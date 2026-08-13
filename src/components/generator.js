import { roles, sampleResumes } from '../data/mockData.js';
import { generateQuestions, getApiKey, isOfflineMode } from '../data/geminiService.js';

export function renderGenerator(container, state, updateState, navigate) {
  let selectedTrack = 'technical'; 
  let generating = false;

  function renderInner() {
    const currentRoleData = roles[state.profile.roleKey] || roles.frontend;
    
    container.innerHTML = `
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
        <div class="glass-card track-card ${selectedTrack === 'technical' ? 'active' : ''}" id="track-tech">
          <div class="track-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div class="track-title">Technical Deep Dive</div>
          <div class="track-desc">Domain framework architecture, platform theory, Core Web Vitals, and language design mechanics.</div>
        </div>

        <!-- Behavioral Track Card -->
        <div class="glass-card track-card ${selectedTrack === 'behavioral' ? 'active' : ''}" id="track-behavioral">
          <div class="track-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="track-title">Behavioral (STAR)</div>
          <div class="track-desc">Systematic project storytelling, leadership conflicts, and situational career achievements.</div>
        </div>

        <!-- Coding Track Card -->
        <div class="glass-card track-card ${selectedTrack === 'coding' ? 'active' : ''}" id="track-coding">
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
              <select class="form-select" id="generator-difficulty" ${generating ? 'disabled' : ''}>
                <option value="Junior">Junior (0-2 YOE)</option>
                <option value="Mid">Mid-Level (2-5 YOE)</option>
                <option value="Senior" selected>Senior (5+ YOE)</option>
                <option value="Lead">Lead / Staff Architect</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="generator-limit">Question Count</label>
              <select class="form-select" id="generator-limit" ${generating ? 'disabled' : ''}>
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
                ${currentRoleData.skills.map((skill, idx) => `
                  <label class="badge badge-indigo" style="cursor: pointer; display: flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; padding: 0.4rem 0.8rem;">
                    <input type="checkbox" checked value="${skill}" style="accent-color: #ffffff;" ${generating ? 'disabled' : ''}>
                    ${skill}
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="generator-company">Customize for Company</label>
              <input type="text" class="form-input" id="generator-company" value="${state.profile.targetCompany || ''}" placeholder="e.g. Stripe" ${generating ? 'disabled' : ''}>
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; border-top: 1px solid var(--glass-border); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            This interview is optimized based on your parsed resume keyword gaps.
          </div>
          <button class="btn btn-primary" id="launch-interview-btn" style="padding: 0.85rem 2rem;" ${generating ? 'disabled' : ''}>
            ${generating ? 'AI Generating Questions...' : 'Initialize AI Interviewer'}
          </button>
        </div>

        <!-- Generating spinner -->
        ${generating ? `
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
        ` : ''}
      </div>
    `;

    // Add track card listeners if not generating
    if (!generating) {
      document.getElementById('track-tech').addEventListener('click', () => {
        selectedTrack = 'technical';
        renderInner();
      });
      document.getElementById('track-behavioral').addEventListener('click', () => {
        selectedTrack = 'behavioral';
        renderInner();
      });
      document.getElementById('track-coding').addEventListener('click', () => {
        selectedTrack = 'coding';
        renderInner();
      });
      document.getElementById('launch-interview-btn').addEventListener('click', launchInterview);
    }
  }

  async function launchInterview() {
    if (!getApiKey() && !isOfflineMode()) {
      alert('Gemini API Key is missing. Please click the Settings link in the sidebar to configure it.');
      navigate('settings');
      return;
    }

    const difficulty = document.getElementById('generator-difficulty').value;
    const limit = parseInt(document.getElementById('generator-limit').value, 10);
    const company = document.getElementById('generator-company').value || 'General';
    
    const roleKey = state.profile.roleKey;
    const currentRoleData = roles[roleKey] || roles.frontend;
    const resumeText = state.profile.resumeText || sampleResumes[roleKey] || '';

    generating = true;
    renderInner();

    try {
      const targetRole = currentRoleData.title;
      let finalQuestions = [];

      if (isOfflineMode()) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        let mockSet = [];
        if (selectedTrack === 'technical') mockSet = currentRoleData.technicalQuestions;
        else if (selectedTrack === 'behavioral') mockSet = currentRoleData.behavioralQuestions;
        else if (selectedTrack === 'coding') mockSet = currentRoleData.codingChallenges;
        finalQuestions = mockSet.slice(0, limit);
      } else {
        finalQuestions = await generateQuestions(resumeText, targetRole, selectedTrack, difficulty, limit);
      }

      if (!Array.isArray(finalQuestions) || finalQuestions.length === 0) {
        throw new Error('INVALID_QUESTIONS_ARRAY');
      }

      const activeInterview = {
        type: selectedTrack,
        difficulty,
        company,
        questions: finalQuestions,
        maxQuestions: Math.min(limit, finalQuestions.length),
        currentQuestionIndex: 0,
        answers: [],
        codeSubmitted: false,
        startTime: new Date()
      };

      updateState({ activeInterview });
      navigate('simulator');
    } catch (err) {
      console.error('Failed to generate interview questions:', err);
      let errorMsg = 'Unable to generate questions right now. Please verify your connection and API key, then try again.';
      if (err.message === 'API_KEY_MISSING') {
        errorMsg = 'Gemini API Key is missing. Please go to Settings and paste your key.';
      } else if (err.message === 'INVALID_API_KEY') {
        errorMsg = 'Invalid API Key. Please verify your Gemini API Key in Settings.';
      } else if (err.message === 'API_OVERLOADED') {
        errorMsg = 'Gemini API is overloaded right now. Please wait 30 seconds and try again.';
      } else if (err.message === 'JSON_PARSE_ERROR') {
        errorMsg = 'AI returned an unexpected format. Please try again.';
      } else if (err.message === 'INVALID_QUESTIONS_ARRAY') {
        errorMsg = 'AI returned empty or invalid questions. Please try again with a different resume or track.';
      }
      alert(errorMsg);
    } finally {
      generating = false;
      renderInner();
    }
  }

  renderInner();
}
