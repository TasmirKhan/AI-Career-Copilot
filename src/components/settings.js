import { getApiKey, setApiKey, isOfflineMode, setOfflineMode } from '../data/geminiService.js';

export function renderSettings(container, state, updateState, navigate) {
  let keyVisible = false;

  function renderInner() {
    const activeKey = getApiKey();
    const offlineActive = isOfflineMode();

    container.innerHTML = `
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
            <input type="${keyVisible ? 'text' : 'password'}" class="form-input" id="settings-api-key" value="${activeKey}" placeholder="AIzaSy...">
            <button class="btn btn-secondary" id="toggle-key-visibility-btn" style="padding: 0.75rem 1rem;">
              ${keyVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">
            Your key is stored securely in your local browser storage (localStorage). It is sent directly to Google Gemini APIs.
          </span>
        </div>

        <div class="form-group" style="margin-top: 1.5rem; background: rgba(255,255,255,0.02); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--glass-border);">
          <label style="display: flex; align-items: flex-start; gap: 0.75rem; cursor: pointer; font-size: 0.95rem;">
            <input type="checkbox" id="settings-offline-mode" ${offlineActive ? 'checked' : ''} style="margin-top: 0.25rem; accent-color: #ffffff;">
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
    `;

    // Bind settings clicks
    document.getElementById('toggle-key-visibility-btn').addEventListener('click', () => {
      keyVisible = !keyVisible;
      renderInner();
    });

    document.getElementById('save-settings-btn').addEventListener('click', () => {
      const apiKey = document.getElementById('settings-api-key').value.trim();
      const offlineMode = document.getElementById('settings-offline-mode').checked;

      setApiKey(apiKey);
      setOfflineMode(offlineMode);

      alert('Configuration saved successfully!');
      navigate('dashboard');
    });
  }

  renderInner();
}
