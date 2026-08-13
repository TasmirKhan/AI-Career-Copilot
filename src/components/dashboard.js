import { roles } from '../data/mockData.js';

export function renderDashboard(container, state, updateState, navigate) {
  const resumeScore = state.profile.analyzed ? state.profile.feedback.score : 0;
  
  // Calculate average interview score
  let avgInterviewScore = 0;
  if (state.history.length > 0) {
    const sum = state.history.reduce((acc, curr) => acc + curr.score, 0);
    avgInterviewScore = Math.round(sum / state.history.length);
  }

  // Calculate overall readiness
  // Weight: 30% resume score, 50% average interview score, 20% roadmap completion progress
  const totalRoadmapSteps = 5; // Fixed simulated total steps
  const completedStepsCount = state.completedRoadmapSteps.size;
  const roadmapCompletionPercent = totalRoadmapSteps > 0 ? (completedStepsCount / totalRoadmapSteps) * 100 : 0;
  
  let readinessScore = 0;
  if (state.profile.analyzed && state.history.length > 0) {
    readinessScore = Math.round(
      (resumeScore * 0.3) + 
      (avgInterviewScore * 0.5) + 
      (roadmapCompletionPercent * 0.2)
    );
  } else if (state.profile.analyzed) {
    readinessScore = Math.round((resumeScore * 0.6) + (roadmapCompletionPercent * 0.4));
  } else {
    readinessScore = Math.round(roadmapCompletionPercent);
  }

  // Gather unique weaknesses from historical logs and latest evaluation
  const allWeaknesses = new Set();
  state.history.forEach(item => {
    if (item.weaknesses) {
      item.weaknesses.forEach(w => allWeaknesses.add(w));
    }
  });

  // Calculate SVG stroke offset for readiness wheel
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

  container.innerHTML = `
    <div class="view-header">
      <div class="view-title-wrap">
        <h1>Welcome Back, ${state.profile.name || 'Developer'}</h1>
        <p>Here is your preparation progress for target role: <strong>${roles[state.profile.roleKey]?.title || 'Not Set'}</strong></p>
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
            <circle class="radial-bg" cx="75" cy="75" r="${radius}"></circle>
            <circle class="radial-fill" cx="75" cy="75" r="${radius}" 
              stroke-dasharray="${circumference}" 
              stroke-dashoffset="${strokeDashoffset}"></circle>
          </svg>
          <div class="radial-text">
            ${readinessScore}%
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
          <div class="stat-val">${resumeScore}%</div>
          <div class="form-label" style="margin: 0;">Resume Score</div>
        </div>
        
        <div class="glass-card stat-mini-card glow-hover">
          <div class="track-icon" style="margin: 0 auto 0.75rem auto; color: var(--accent-cyan);">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div class="stat-val">${state.history.length}</div>
          <div class="form-label" style="margin: 0;">Mock Sessions</div>
        </div>

        <div class="glass-card stat-mini-card glow-hover">
          <div class="track-icon" style="margin: 0 auto 0.75rem auto; color: var(--accent-emerald);">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="stat-val">${avgInterviewScore || 'N/A'}%</div>
          <div class="form-label" style="margin: 0;">Avg Score</div>
        </div>

        <div class="glass-card stat-mini-card glow-hover">
          <div class="track-icon" style="margin: 0 auto 0.75rem auto; color: var(--accent-purple);">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div class="stat-val">${completedStepsCount}/${totalRoadmapSteps}</div>
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
          ${allWeaknesses.size > 0 
            ? Array.from(allWeaknesses).map(w => `
                <div class="weakness-list-item">
                  <div class="weakness-dot"></div>
                  <div style="font-size: 0.95rem; line-height: 1.4;">${w}</div>
                </div>
              `).join('')
            : `<div style="color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 2rem 0;">
                No major weaknesses detected yet! Complete mock interviews to analyze potential skill gaps.
               </div>`
          }
        </div>
      </div>

      <!-- Personalized Plan / Roadmap Checklist -->
      <div class="glass-card">
        <h3 style="font-size: 1.2rem; font-weight: 600;">📋 Personalized Prep Plan</h3>
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1rem;">Complete tasks to improve your interview performance. Check off to update readiness score.</p>
        
        <div class="roadmap-checklist">
          ${[
            { id: 'step_1', title: 'Complete comprehensive study on React Fiber & reconciliation algorithms', type: 'reading' },
            { id: 'step_2', title: 'Practice solving Core Web Vital improvements (LCP, CLS)', type: 'exercise' },
            { id: 'step_3', title: 'Refactor behavioral answers to focus strictly on STAR quantitative Results', type: 'exercise' },
            { id: 'step_4', title: 'Study complex system design: Distributed Rate Limiting caches', type: 'reading' },
            { id: 'step_5', title: 'Optimize algorithmic complexity for LRU cache updates (O(1))', type: 'exercise' }
          ].map(task => {
            const isCompleted = state.completedRoadmapSteps.has(task.id);
            return `
              <div class="roadmap-item ${isCompleted ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="roadmap-checkbox">
                  ${isCompleted ? '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                </div>
                <div class="roadmap-title" style="font-size: 0.9rem; font-weight: 500;">
                  <span class="badge ${task.type === 'reading' ? 'badge-indigo' : 'badge-amber'}" style="margin-right: 0.5rem; padding: 0.15rem 0.4rem; font-size: 0.7rem;">${task.type}</span>
                  ${task.title}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- History Table Card -->
    <div class="glass-card">
      <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.25rem;">🕒 Mock Interview History</h3>
      ${state.history.length > 0 ? `
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
              ${state.history.map(item => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03); hover: background-color: rgba(255,255,255,0.01);">
                  <td style="padding: 1rem 0.75rem; font-weight: 500;">${item.role}</td>
                  <td style="padding: 1rem 0.75rem;">
                    <span class="badge ${item.type === 'Technical' ? 'badge-indigo' : item.type === 'Behavioral' ? 'badge-amber' : 'badge-emerald'}">${item.type}</span>
                  </td>
                  <td style="padding: 1rem 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">${item.date}</td>
                  <td style="padding: 1rem 0.75rem; font-weight: 700; color: ${item.score >= 80 ? 'var(--accent-emerald)' : item.score >= 70 ? 'var(--accent-amber)' : 'var(--accent-rose)'};">${item.score}%</td>
                  <td style="padding: 1rem 0.75rem; color: var(--text-secondary); font-size: 0.85rem; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.feedback}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div style="text-align: center; color: var(--text-muted); padding: 3rem 0; font-size: 0.95rem;">
          No sessions recorded yet. Start your first mock interview above!
        </div>
      `}
    </div>
  `;

  // Attach Event Handlers
  document.getElementById('start-new-mock-btn').addEventListener('click', () => {
    navigate('generator');
  });

  // Attach clicks to roadmap items
  document.querySelectorAll('.roadmap-item').forEach(item => {
    item.addEventListener('click', () => {
      const taskId = item.getAttribute('data-task-id');
      const updatedSteps = new Set(state.completedRoadmapSteps);
      if (updatedSteps.has(taskId)) {
        updatedSteps.delete(taskId);
      } else {
        updatedSteps.add(taskId);
      }
      updateState({ completedRoadmapSteps: updatedSteps });
    });
  });
}
