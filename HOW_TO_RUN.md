# OPTIMAQ - AI Interview Prep Platform

## Quick Start

### Option A: Open instantly (no dev server needed)
Just open the `dist/index.html` file directly in your browser.
This works immediately with no installation.

### Option B: Run local development server (recommended)
1. Open a terminal in this folder
2. Install dependencies:
   npm install
3. Start the dev server:
   npm run dev
4. Open: http://localhost:3000

---

## Configure Gemini AI (Required for live AI features)
1. Go to https://aistudio.google.com/ and sign in with your Google account
2. Click "Get API key" in the sidebar and create a new key
3. Open the OPTIMAQ app and click "Settings" in the left sidebar
4. Paste your API key and click Save Configuration
5. The badge at the top of the sidebar will change to "GEMINI API ACTIVE"

---

## Enable Offline Mock Mode (No API key needed for testing)
1. Open the app, click "Settings" in the sidebar
2. Check the "Enable Offline Mock Mode" checkbox
3. Click Save — the app will use simulated AI responses

---

## Personalization Test Script
Run this to verify all 3 resume types generate different questions and scores:

  PowerShell:
  $env:GEMINI_API_KEY="YOUR_KEY_HERE"; node tests/verifyPersonalization.js

---

## Project Structure
  src/
    style.css              - Professional monochrome design system
    main.js                - App state machine & SPA router
    components/
      dashboard.js         - Progress dashboard & weakness detector
      profile.js           - Resume analyzer (PDF/DOCX support)
      generator.js         - AI interview session launcher
      interviewer.js       - AI Interviewer (Technical/Behavioral/Coding)
      evaluation.js        - Final evaluation & personalized plan
      settings.js          - Gemini API key configuration
    data/
      geminiService.js     - Google Gemini 1.5 Flash REST integration
      fileExtractor.js     - PDF.js & Mammoth.js resume parsers
      mockData.js          - Fallback offline data

  tests/
    verifyPersonalization.js  - Personalization test cases

  dist/                   - Pre-built production bundle (open dist/index.html)
  index.html              - App entry point
