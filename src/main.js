import { roles, defaultHistory } from './data/mockData.js';
import { renderDashboard } from './components/dashboard.js';
import { renderProfile } from './components/profile.js';
import { renderGenerator } from './components/generator.js';
import { renderInterviewer } from './components/interviewer.js';
import { renderEvaluation } from './components/evaluation.js';
import { renderSettings } from './components/settings.js';
import { getApiKey, isOfflineMode } from './data/geminiService.js';

// Global Application State
const state = {
  activeView: 'dashboard',
  profile: {
    name: 'Tasmir Khan',
    roleKey: 'frontend',
    experience: '5',
    targetCompany: 'Google',
    skills: [...roles.frontend.skills],
    resumeText: '',
    analyzed: false,
    feedback: null
  },
  activeInterview: null, 
  history: [...defaultHistory],
  completedRoadmapSteps: new Set()
};

// State Modifier & Re-renderer
export function updateState(updates) {
  Object.assign(state, updates);
  
  // Sync quick profile sidebar view
  const currentRole = roles[state.profile.roleKey];
  document.getElementById('sidebar-user-name').textContent = state.profile.name || 'User Profile';
  document.getElementById('sidebar-user-role').textContent = currentRole ? currentRole.title : 'Configure Profile';
  document.getElementById('sidebar-avatar').textContent = (state.profile.name || 'U').charAt(0).toUpperCase();

  // Update API status badge
  const statusBadge = document.getElementById('api-status-badge');
  if (statusBadge) {
    if (isOfflineMode()) {
      statusBadge.textContent = 'MOCK MODE (OFFLINE)';
      statusBadge.style.background = 'rgba(255, 255, 255, 0.12)';
      statusBadge.style.color = '#ffffff';
      statusBadge.style.border = '1px solid rgba(255, 255, 255, 0.25)';
    } else if (getApiKey()) {
      statusBadge.textContent = 'GEMINI API ACTIVE';
      statusBadge.style.background = '#ffffff';
      statusBadge.style.color = '#000000';
      statusBadge.style.border = '1px solid #ffffff';
    } else {
      statusBadge.textContent = 'CONFIGURE GEMINI API';
      statusBadge.style.background = 'rgba(255, 255, 255, 0.04)';
      statusBadge.style.color = '#a3a3a3';
      statusBadge.style.border = '1px solid rgba(255, 255, 255, 0.08)';
    }
  }

  // Render the correct active view
  renderActiveView();
}

// Router - Navigates to a specific screen
export function navigate(viewId) {
  state.activeView = viewId;
  
  // Update sidebar active link UI
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-view') === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  renderActiveView();
}

// Renders content based on activeView state
function renderActiveView() {
  const container = document.getElementById('view-container');
  if (!container) return;
  
  // Clear previous view content
  container.innerHTML = '';
  
  switch (state.activeView) {
    case 'dashboard':
      renderDashboard(container, state, updateState, navigate);
      break;
    case 'profile':
      renderProfile(container, state, updateState, navigate);
      break;
    case 'generator':
      renderGenerator(container, state, updateState, navigate);
      break;
    case 'simulator':
      if (!state.activeInterview) {
        navigate('generator');
      } else {
        renderInterviewer(container, state, updateState, navigate);
      }
      break;
    case 'evaluation':
      renderEvaluation(container, state, updateState, navigate);
      break;
    case 'settings':
      renderSettings(container, state, updateState, navigate);
      break;
    default:
      renderDashboard(container, state, updateState, navigate);
  }
}

// Initial Setup on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  // Navigation Event Listeners
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      navigate(targetView);
    });
  });

  // Mobile navigation trigger
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Set initial sidebar profile data
  updateState({}); 
});
