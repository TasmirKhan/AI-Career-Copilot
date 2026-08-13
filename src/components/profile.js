import { roles, sampleResumes } from '../data/mockData.js';
import { extractTextFromFile } from '../data/fileExtractor.js';
import { analyzeResume, getApiKey, isOfflineMode } from '../data/geminiService.js';

export function renderProfile(container, state, updateState, navigate) {
  let analyzing = false;

  function renderInner() {
    container.innerHTML = `
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
            <input type="text" class="form-input" id="profile-name" value="${state.profile.name || ''}" placeholder="e.g. John Doe">
          </div>

          <div class="form-group">
            <label class="form-label" for="profile-role">Target Job Role</label>
            <select class="form-select" id="profile-role">
              <option value="frontend" ${state.profile.roleKey === 'frontend' ? 'selected' : ''}>Senior Frontend Engineer</option>
              <option value="backend" ${state.profile.roleKey === 'backend' ? 'selected' : ''}>Senior Backend Engineer</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="profile-experience">Years of Experience</label>
            <input type="number" class="form-input" id="profile-experience" value="${state.profile.experience || '3'}" min="0" max="30">
          </div>

          <div class="form-group">
            <label class="form-label" for="profile-company">Target Company</label>
            <input type="text" class="form-input" id="profile-company" value="${state.profile.targetCompany || ''}" placeholder="e.g. Google, Stripe, Netflix">
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
            <textarea class="form-textarea" id="resume-text" style="margin-top: 1rem; flex: 1; min-height: 150px;" placeholder="Paste resume plain text here...">${state.profile.resumeText || ''}</textarea>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button class="btn btn-emerald" id="analyze-resume-btn" style="width: 100%;" ${analyzing ? 'disabled' : ''}>
              ${analyzing ? 'Analyzing CV...' : 'Run AI Resume Analysis'}
            </button>
          </div>

          <!-- Loading Spinner overlay -->
          ${analyzing ? `
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
          ` : ''}

          <!-- Display Results -->
          ${!analyzing && state.profile.analyzed && state.profile.feedback ? `
            <div class="analysis-results-box">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h4 style="font-size: 1.1rem; font-weight: 600;">Analysis Results</h4>
                <div style="font-size: 1.1rem; font-weight: 800; color: ${state.profile.feedback.score >= 75 ? 'var(--accent-emerald)' : 'var(--accent-amber)'}">
                  Compatibility Score: ${state.profile.feedback.score}%
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; background: rgba(255,255,255,0.02); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--glass-border);">
                <div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Candidate Name</div>
                  <div style="font-size: 0.9rem; font-weight: 600;">${state.profile.feedback.candidateName || 'Not Found'}</div>
                </div>
                <div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Experience Level</div>
                  <div style="font-size: 0.9rem; font-weight: 600;">${state.profile.feedback.experienceLevel || 'Not Found'}</div>
                </div>
                <div style="grid-column: span 2; margin-top: 0.5rem;">
                  <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Education Summary</div>
                  <div style="font-size: 0.85rem; color: var(--text-secondary);">${state.profile.feedback.education || 'Not Found'}</div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-label">Identified Skills</div>
                <div class="skills-badges">
                  ${(state.profile.feedback.parsedSkills || []).map(s => `<span class="badge badge-indigo">${s}</span>`).join('')}
                </div>
              </div>

              <div class="form-group">
                <div class="form-label">Missing Critical Keywords (Gaps Detected)</div>
                <div class="skills-badges">
                  ${(state.profile.feedback.missingKeywords || []).map(s => `<span class="badge badge-rose">${s}</span>`).join('')}
                </div>
              </div>

              <div class="form-group">
                <div class="form-label">Suitable Alternate Roles</div>
                <div class="skills-badges">
                  ${(state.profile.feedback.suitableRoles || []).map(s => `<span class="badge badge-amber" style="background:rgba(255,255,255,0.05); color:#a3a3a3; border: 1px solid #404040;">${s}</span>`).join('')}
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                  <div class="form-label">Strengths</div>
                  <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem;">
                    ${(state.profile.feedback.strengths || []).map(s => `<li>${s}</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <div class="form-label">Weaknesses</div>
                  <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem;">
                    ${(state.profile.feedback.weaknesses || []).map(s => `<li>${s}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div class="form-group">
                <div class="form-label">Tailoring Recommendations</div>
                <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.35rem;">
                  ${(state.profile.feedback.suggestions || []).map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>

              <div class="form-group">
                <div class="form-label">Recommended Interview Focus Areas</div>
                <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.35rem;">
                  ${(state.profile.feedback.focusAreas || []).map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>

              <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid var(--glass-border); padding-top: 1rem;">
                <button class="btn btn-primary" id="go-to-simulator-btn">
                  Generate Custom Mock Interview
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Bind events
    document.getElementById('save-profile-btn').addEventListener('click', saveProfile);
    document.getElementById('load-sample-resume-btn').addEventListener('click', loadSampleResume);
    document.getElementById('analyze-resume-btn').addEventListener('click', runAnalysis);
    
    if (document.getElementById('go-to-simulator-btn')) {
      document.getElementById('go-to-simulator-btn').addEventListener('click', () => {
        navigate('generator');
      });
    }

    // Drag-and-drop listener and file input loading
    const zone = document.getElementById('resume-dragover');
    const fileInput = document.getElementById('resume-file-input');
    const resumeTextarea = document.getElementById('resume-text');

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('dragover');
    });
    
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    });

    zone.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFile(file);
      }
    });

    async function handleFile(file) {
      const dragLabel = zone.querySelector('div');
      const originalText = dragLabel.textContent;
      dragLabel.textContent = "Extracting text from file...";
      zone.style.opacity = 0.6;
      
      try {
        const text = await extractTextFromFile(file);
        resumeTextarea.value = text;
        state.profile.resumeText = text;
        dragLabel.textContent = "Resume uploaded successfully!";
        setTimeout(() => {
          dragLabel.textContent = originalText;
        }, 3000);
      } catch (err) {
        console.error('File extraction error:', err);
        dragLabel.textContent = "Failed to extract text. Try plain text.";
        alert("Could not extract text from file. Please ensure it's a valid PDF, DOCX, or text file.");
        setTimeout(() => {
          dragLabel.textContent = originalText;
        }, 3000);
      } finally {
        zone.style.opacity = 1.0;
      }
    }
  }

  function saveProfile() {
    const name = document.getElementById('profile-name').value;
    const roleKey = document.getElementById('profile-role').value;
    const experience = document.getElementById('profile-experience').value;
    const targetCompany = document.getElementById('profile-company').value;
    
    const roleChanged = roleKey !== state.profile.roleKey;
    const newProfile = {
      ...state.profile,
      name,
      roleKey,
      experience,
      targetCompany
    };

    if (roleChanged) {
      newProfile.analyzed = false;
      newProfile.feedback = null;
      newProfile.resumeText = '';
    }

    updateState({ profile: newProfile });
    alert('Profile settings saved successfully!');
  }

  function loadSampleResume() {
    const roleKey = document.getElementById('profile-role').value;
    const text = sampleResumes[roleKey] || '';
    document.getElementById('resume-text').value = text;
    state.profile.resumeText = text;
  }

  async function runAnalysis() {
    const resumeText = document.getElementById('resume-text').value;
    if (!resumeText.trim()) {
      alert('Please paste or upload your resume text first.');
      return;
    }

    if (!getApiKey() && !isOfflineMode()) {
      alert('Gemini API Key is missing. Please click Settings in the sidebar to configure it.');
      navigate('settings');
      return;
    }

    // Capture all form values BEFORE re-rendering (renderInner wipes DOM)
    const roleKey = document.getElementById('profile-role').value;
    const name = document.getElementById('profile-name').value;
    const experience = document.getElementById('profile-experience').value;
    const targetCompany = document.getElementById('profile-company').value;

    analyzing = true;
    renderInner();

    try {
      const targetRole = roles[roleKey]?.title || 'Software Developer';

      let parsedResults;
      if (isOfflineMode()) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        parsedResults = roles[roleKey]?.resumeFeedback || roles.frontend.resumeFeedback;
      } else {
        parsedResults = await analyzeResume(resumeText, targetRole);
      }

      updateState({
        profile: {
          name: parsedResults.candidateName || name || 'Guest Candidate',
          roleKey,
          experience,
          targetCompany,
          resumeText,
          analyzed: true,
          feedback: parsedResults
        }
      });
    } catch (err) {
      console.error('Resume analysis failed:', err);
      let errorMsg = 'Unable to analyze the resume right now. Please try again.';
      if (err.message === 'API_KEY_MISSING') {
        errorMsg = 'API Key missing. Please set your Gemini API Key in Settings.';
        navigate('settings');
      } else if (err.message === 'INVALID_API_KEY') {
        errorMsg = 'Invalid API Key. Please verify your Gemini API Key in Settings.';
        navigate('settings');
      } else if (err.message === 'API_OVERLOADED') {
        errorMsg = 'Gemini API is currently overloaded. Please wait 30 seconds and try again.';
      } else if (err.message === 'JSON_PARSE_ERROR') {
        errorMsg = 'AI returned an unexpected format. Please try again — this is usually temporary.';
      } else if (err.message === 'EMPTY_AI_RESPONSE') {
        errorMsg = 'AI returned an empty response. Please try again.';
      }
      alert(errorMsg);
    } finally {
      analyzing = false;
      renderInner();
    }
  }

  renderInner();
}
