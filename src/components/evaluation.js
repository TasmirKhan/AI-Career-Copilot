export function renderEvaluation(container, state, updateState, navigate) {
  const evaluation = state.lastEvaluation;

  if (!evaluation) {
    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-wrap">
          <h1>Evaluation Report</h1>
          <p>No evaluation available. Please complete a mock session first.</p>
        </div>
      </div>
      <div class="glass-card" style="text-align: center; padding: 3rem 0;">
        <button class="btn btn-primary" id="go-to-generator-btn">Start Mock Interview</button>
      </div>
    `;
    document.getElementById('go-to-generator-btn').addEventListener('click', () => navigate('generator'));
    return;
  }

  container.innerHTML = `
    <div class="view-header">
      <div class="view-title-wrap">
        <h1>AI Session Evaluation Report</h1>
        <p>Target role: <strong>${evaluation.role}</strong> | Track: <strong>${evaluation.type}</strong></p>
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
      <div class="score-circle-large">${evaluation.score}%</div>
      <p style="font-size: 1.1rem; max-width: 600px; margin: 1.5rem auto 0 auto; line-height: 1.6; font-weight: 400;">
        "${evaluation.summary}"
      </p>
    </div>

    <!-- Split Grid: Feedback details vs Weaknesses and Roadmap -->
    <div class="evaluation-details-grid" style="margin-bottom: 2rem;">
      <!-- Detailed Grades breakdown -->
      <div class="glass-card" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">📊 Competency Scorecard</h3>
        
        <div class="grades-row" style="margin-bottom: 0.5rem;">
          <div class="glass-card grade-card" style="background: rgba(0,0,0,0.15);">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-indigo);">${evaluation.grades.accuracy}%</div>
            <div class="form-label" style="font-size: 0.8rem; margin-top: 0.25rem; text-transform: uppercase;">Technical Accuracy</div>
            <div class="grade-bar-outer">
              <div class="grade-bar-inner" style="width: ${evaluation.grades.accuracy}%;"></div>
            </div>
          </div>
          
          <div class="glass-card grade-card" style="background: rgba(0,0,0,0.15);">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-cyan);">${evaluation.grades.communication}%</div>
            <div class="form-label" style="font-size: 0.8rem; margin-top: 0.25rem; text-transform: uppercase;">Communication Clarity</div>
            <div class="grade-bar-outer">
              <div class="grade-bar-inner" style="width: ${evaluation.grades.communication}%; background-color: var(--accent-cyan);"></div>
            </div>
          </div>

          <div class="glass-card grade-card" style="background: rgba(0,0,0,0.15);">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-emerald);">${evaluation.grades.style}%</div>
            <div class="form-label" style="font-size: 0.8rem; margin-top: 0.25rem; text-transform: uppercase;">Method & Structure</div>
            <div class="grade-bar-outer">
              <div class="grade-bar-inner" style="width: ${evaluation.grades.style}%; background-color: var(--accent-emerald);"></div>
            </div>
          </div>
        </div>

        <h3 style="font-size: 1.15rem; font-weight: 600; margin-top: 1rem;">Critique Breakdown</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${evaluation.details.map(detail => `
            <div>
              <div style="font-weight: 600; font-size: 0.95rem; color: var(--accent-indigo); margin-bottom: 0.25rem;">
                ${detail.aspect} Check
              </div>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
                ${detail.text}
              </p>
            </div>
          `).join('')}
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
            ${evaluation.weaknesses.map(w => `
              <div class="weakness-list-item" style="margin: 0;">
                <div class="weakness-dot"></div>
                <div style="font-size: 0.95rem; font-weight: 500;">${w}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Custom generated Roadmap checklist -->
        <div class="glass-card">
          <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">🚀 Custom Improvement Roadmap</h3>
          <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1.25rem;">We have added these tasks to your Progress Dashboard study guide.</p>
          
          <div class="roadmap-checklist">
            ${evaluation.roadmap.map(step => {
              const isCompleted = state.completedRoadmapSteps.has(step.id);
              return `
                <div class="roadmap-item ${isCompleted ? 'completed' : ''}" data-task-id="${step.id}">
                  <div class="roadmap-checkbox">
                    ${isCompleted ? '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                  </div>
                  <div class="roadmap-title" style="font-size: 0.9rem; font-weight: 500;">
                    <span class="badge ${step.type === 'exercise' ? 'badge-amber' : 'badge-indigo'}" style="margin-right: 0.5rem; padding: 0.15rem 0.4rem; font-size: 0.7rem;">${step.type}</span>
                    ${step.title}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind clicks
  document.getElementById('eval-go-dashboard-btn').addEventListener('click', () => navigate('dashboard'));
  document.getElementById('eval-retry-btn').addEventListener('click', () => navigate('generator'));

  // Attach clicks to roadmap steps
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
