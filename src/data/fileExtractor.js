// Dynamic Script Loader — checks if already loaded before injecting
function loadScript(src) {
  return new Promise((resolve, reject) => {
    // Check if already loaded by comparing the end of the src URL
    const existing = Array.from(document.querySelectorAll('script')).find(s => s.src === src);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

// Extract text from PDF using PDF.js from CDN
async function extractTextFromPDF(file) {
  const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  try {
    await loadScript(PDFJS_CDN);

    // PDF.js from CDN exposes itself as window.pdfjsLib
    // Some CDN builds use a different global; try all known names
    const pdfjsLib = window.pdfjsLib || window['pdfjs-dist/build/pdf'] || window.PDFJS;

    if (!pdfjsLib) {
      throw new Error('PDF.js library not found after loading. The CDN may be unavailable.');
    }

    // Configure worker
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s{2,}/g, ' ');
      fullText += pageText + '\n\n';
    }

    const result = fullText.trim();
    if (!result) {
      throw new Error('PDF appears to be empty or contains only images (no extractable text).');
    }
    return result;
  } catch (err) {
    console.error('PDF extraction failed:', err);
    if (err.message.includes('PDF.js')) throw err;
    throw new Error(`PDF_PARSING_FAILED: ${err.message}`);
  }
}

// Extract text from DOCX using Mammoth.js from CDN
async function extractTextFromDocx(file) {
  const MAMMOTH_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';

  try {
    await loadScript(MAMMOTH_CDN);

    if (!window.mammoth) {
      throw new Error('Mammoth.js library not found after loading. The CDN may be unavailable.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const result = await window.mammoth.extractRawText({ arrayBuffer });

    const text = result.value?.trim();
    if (!text) {
      throw new Error('DOCX file appears to be empty.');
    }
    return text;
  } catch (err) {
    console.error('DOCX extraction failed:', err);
    throw new Error(`DOCX_PARSING_FAILED: ${err.message}`);
  }
}

// Fallback: Read plain text / markdown files
function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result?.trim();
      if (!text) reject(new Error('File is empty.'));
      else resolve(text);
    };
    reader.onerror = () => reject(new Error('FileReader failed to read the file.'));
    reader.readAsText(file);
  });
}

/**
 * Main router: extracts text from any supported file type.
 * Supports .pdf, .docx, .txt, .md
 */
export async function extractTextFromFile(file) {
  if (!file) throw new Error('No file provided.');

  const fileName = file.name.toLowerCase();
  const MAX_SIZE_MB = 10;

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`File is too large. Maximum supported size is ${MAX_SIZE_MB}MB.`);
  }

  if (fileName.endsWith('.pdf')) {
    return extractTextFromPDF(file);
  }

  if (fileName.endsWith('.docx')) {
    return extractTextFromDocx(file);
  }

  if (fileName.endsWith('.txt') || fileName.endsWith('.md') || fileName.endsWith('.rtf')) {
    return readAsText(file);
  }

  throw new Error(`Unsupported file type: "${file.name}". Please upload a .pdf, .docx, or .txt file.`);
}
