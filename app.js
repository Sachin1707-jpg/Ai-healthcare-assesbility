/**
 * HealthAI - AI Healthcare Assistant
 * Main Application JavaScript
 */

// ══════════════════════════════════════════════
// State Management
// ══════════════════════════════════════════════
const state = {
  language: localStorage.getItem('healthai_lang') || 'en',
  isListening: false,
  recognition: null,
  history: JSON.parse(localStorage.getItem('healthai_history') || '[]'),
  currentResult: null,
};


// ══════════════════════════════════════════════
// Internationalization (i18n)
// ══════════════════════════════════════════════
const i18n = {
  en: {
    appName: "HealthAI",
    tagline: "AI Health Assistant",
    tabSymptoms: "Symptoms",
    tabHospitals: "Hospitals",
    tabSchemes: "Schemes",
    tabHistory: "History",
    inputPlaceholder: "Describe your symptoms here...\nExample: I have fever and headache\nया हिंदी में: मुझे बुखार और सर दर्द है",
    voiceBtn: "🎤",
    voiceListening: "🔴 Listening... Speak now",
    voiceReady: "Tap mic to speak in Hindi or English",
    quickLabel: "Quick symptoms:",
    analyzeBtn: "🔍 Analyze Symptoms",
    analyzing: "Analyzing your symptoms with AI...",
    resultTitle: "Analysis Results",
    detectedSymptoms: "Detected Symptoms",
    riskLevel: "Risk Level",
    advice: "Health Advice",
    action: "Recommended Action",
    emergencyBtn: "🚨 Call Emergency (108)",
    speakResult: "🔊 Speak Result",
    hospitalsTitle: "Nearby Hospitals & Clinics",
    hospitalsSubtitle: "Find healthcare facilities near you",
    mapLabel: "Hospital Map",
    govtSchemesTitle: "Government Health Schemes",
    govtSchemesSubtitle: "Check your eligibility for free healthcare",
    incomeLabel: "Your Income Level",
    incomeLow: "Low Income (BPL / Below ₹2.5 Lakh)",
    incomeOther: "Other",
    areaLabel: "Your Area",
    areaRural: "Rural (Gaon)",
    areaUrban: "Urban (Sheher)",
    checkEligibility: "🏥 Check Eligibility",
    historyTitle: "Previous Checkups",
    historyEmpty: "No previous checkups. Your analysis history will appear here.",
    clearHistory: "Clear History",
    disclaimer: "⚠️ This is an AI-based preliminary assessment tool. It is NOT a substitute for professional medical advice. Always consult a qualified doctor for proper diagnosis.",
    callLabel: "📞 Call",
    navigateLabel: "📍 Navigate",
    helpline: "Helpline",
    website: "Website",
    high: "HIGH RISK",
    medium: "MEDIUM RISK",
    low: "LOW RISK",
    noSymptoms: "Unable to detect symptoms. Please try describing in more detail.",
    emergencyModalTitle: "Emergency Call Initiated",
    emergencyModalText: "Calling nearest emergency services at 108. An ambulance is being dispatched to your location. Estimated arrival: 10-15 minutes.",
    emergencyModalClose: "Close",
    eligibleSchemes: "Eligible Schemes",
    schemeBenefits: "Benefits",
    suspectedConditions: "Suspected Conditions",
    recommendedSpecialists: "Recommended Specialists",
    fever: "Fever / Bukhar",
    cough: "Cough / Khansi",
    headache: "Headache / Sir Dard",
    chestPain: "Chest Pain",
    breathless: "Breathlessness",
    stomachPain: "Stomach Pain",
    vomiting: "Vomiting / Ulti",
    diarrhea: "Diarrhea / Dast",
    bodyPain: "Body Pain",
    weakness: "Weakness",
    aiAnalysis: "AI Detailed Analysis",
    possibleCauses: "Possible Causes",
    whenToSeeDoctor: "When to see a doctor",
  },
  hi: {
    appName: "HealthAI",
    tagline: "AI स्वास्थ्य सहायक",
    tabSymptoms: "लक्षण",
    tabHospitals: "अस्पताल",
    tabSchemes: "सरकारी योजनाएं",
    tabHistory: "इतिहास",
    inputPlaceholder: "अपने लक्षण यहाँ बताएं...\nउदाहरण: मुझे बुखार और सर दर्द है\nOr in English: I have fever and headache",
    voiceBtn: "🎤",
    voiceListening: "🔴 सुन रहे हैं... अभी बोलें",
    voiceReady: "हिंदी या English में बोलने के लिए mic दबाएं",
    quickLabel: "जल्दी चुनें:",
    analyzeBtn: "🔍 लक्षण जांचें",
    analyzing: "AI से आपके लक्षणों की जांच हो रही है...",
    resultTitle: "जांच रिपोर्ट",
    detectedSymptoms: "पहचाने गए लक्षण",
    riskLevel: "जोखिम स्तर",
    advice: "स्वास्थ्य सलाह",
    action: "सुझाई गई कार्रवाई",
    emergencyBtn: "🚨 Emergency कॉल करें (108)",
    speakResult: "🔊 रिपोर्ट सुनें",
    hospitalsTitle: "पास के अस्पताल",
    hospitalsSubtitle: "अपने नज़दीक के अस्पताल खोजें",
    mapLabel: "अस्पताल का नक्शा",
    govtSchemesTitle: "सरकारी स्वास्थ्य योजनाएं",
    govtSchemesSubtitle: "मुफ्त इलाज के लिए अपनी पात्रता जांचें",
    incomeLabel: "आपकी आय",
    incomeLow: "कम आय (BPL / ₹2.5 लाख से कम)",
    incomeOther: "अन्य",
    areaLabel: "आपका क्षेत्र",
    areaRural: "गाँव (Rural)",
    areaUrban: "शहर (Urban)",
    checkEligibility: "🏥 पात्रता जांचें",
    historyTitle: "पिछली जांचें",
    historyEmpty: "कोई पिछली जांच नहीं। आपकी जांच का इतिहास यहाँ दिखेगा।",
    clearHistory: "इतिहास मिटाएं",
    disclaimer: "⚠️ यह AI-आधारित प्रारंभिक जांच है। यह डॉक्टर की सलाह का विकल्प नहीं है। सही निदान के लिए हमेशा योग्य डॉक्टर से मिलें।",
    callLabel: "📞 कॉल",
    navigateLabel: "📍 रास्ता",
    helpline: "हेल्पलाइन",
    website: "वेबसाइट",
    high: "हाई रिस्क",
    medium: "मीडियम रिस्क",
    low: "लो रिस्क",
    noSymptoms: "लक्षण पहचान नहीं पाए। कृपया और विस्तार से बताएं।",
    emergencyModalTitle: "Emergency कॉल शुरू",
    emergencyModalText: "108 पर emergency call की जा रही है। Ambulance आपके पास भेजी जा रही है। अनुमानित समय: 10-15 मिनट।",
    emergencyModalClose: "बंद करें",
    eligibleSchemes: "पात्र योजनाएं",
    schemeBenefits: "लाभ",
    suspectedConditions: "संभावित स्थितियाँ",
    recommendedSpecialists: "अनुशंसित विशेषज्ञ",
    fever: "बुखार / Fever",
    cough: "खांसी / Cough",
    headache: "सर दर्द / Headache",
    chestPain: "सीने में दर्द",
    breathless: "सांस की तकलीफ़",
    stomachPain: "पेट दर्द",
    vomiting: "उल्टी / Vomiting",
    diarrhea: "दस्त / Diarrhea",
    bodyPain: "बदन दर्द",
    weakness: "कमज़ोरी",
    aiAnalysis: "AI विस्तृत विश्लेषण",
    possibleCauses: "संभावित कारण",
    whenToSeeDoctor: "डॉक्टर को कब दिखाएं",
  }
};

function t(key) {
  return i18n[state.language]?.[key] || i18n['en'][key] || key;
}

// ══════════════════════════════════════════════
// DOM Helpers
// ══════════════════════════════════════════════
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ══════════════════════════════════════════════
// Tab Navigation
// ══════════════════════════════════════════════
function switchTab(tabId) {
  $$('.nav-tab').forEach(t => t.classList.remove('active'));
  $$('.tab-content').forEach(t => t.classList.remove('active'));
  
  $(`.nav-tab[data-tab="${tabId}"]`)?.classList.add('active');
  $(`#tab-${tabId}`)?.classList.add('active');
}

// ══════════════════════════════════════════════
// Language Switching
// ══════════════════════════════════════════════
function switchLanguage(lang) {
  state.language = lang;
  localStorage.setItem('healthai_lang', lang);
  
  $$('.lang-btn').forEach(b => b.classList.remove('active'));
  $(`.lang-btn[data-lang="${lang}"]`)?.classList.add('active');
  
  updateUILanguage();
}

function updateUILanguage() {
  // Update all elements with data-i18n attribute
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  
  // Update select options
  $$('[data-i18n-option]').forEach(el => {
    const key = el.getAttribute('data-i18n-option');
    el.textContent = t(key);
  });
}

// ══════════════════════════════════════════════
// Voice Input (Web Speech API)
// ══════════════════════════════════════════════
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn('Speech Recognition not supported');
    const voiceBtn = $('#voiceBtn');
    if (voiceBtn) voiceBtn.style.display = 'none';
    return;
  }
  
  state.recognition = new SpeechRecognition();
  state.recognition.continuous = false;
  state.recognition.interimResults = true;
  state.recognition.lang = state.language === 'hi' ? 'hi-IN' : 'en-IN';
  
  state.recognition.onstart = () => {
    state.isListening = true;
    $('#voiceBtn')?.classList.add('listening');
    $('#voiceStatus').textContent = t('voiceListening');
    $('#voiceStatus').classList.add('active');
  };
  
  state.recognition.onresult = (event) => {
    const textarea = $('#symptomInput');
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    textarea.value = transcript;
  };
  
  state.recognition.onend = () => {
    state.isListening = false;
    $('#voiceBtn')?.classList.remove('listening');
    $('#voiceStatus').textContent = t('voiceReady');
    $('#voiceStatus').classList.remove('active');
  };
  
  state.recognition.onerror = (event) => {
    state.isListening = false;
    $('#voiceBtn')?.classList.remove('listening');
    $('#voiceStatus').textContent = `Error: ${event.error}`;
    $('#voiceStatus').classList.remove('active');
  };
}

function toggleVoice() {
  if (!state.recognition) {
    initSpeechRecognition();
  }
  
  if (!state.recognition) {
    alert('Voice input is not supported in this browser. Please use Chrome.');
    return;
  }
  
  if (state.isListening) {
    state.recognition.stop();
  } else {
    // Update language for recognition
    state.recognition.lang = state.language === 'hi' ? 'hi-IN' : 'en-IN';
    state.recognition.start();
  }
}

// ══════════════════════════════════════════════
// Quick Symptom Tags
// ══════════════════════════════════════════════
function addQuickSymptom(symptom) {
  const textarea = $('#symptomInput');
  const currentText = textarea.value.trim();
  if (currentText) {
    textarea.value = currentText + ', ' + symptom;
  } else {
    textarea.value = symptom;
  }
  textarea.focus();
}

// ══════════════════════════════════════════════
// Symptom Analysis
// ══════════════════════════════════════════════
async function analyzeSymptoms() {
  const text = $('#symptomInput')?.value?.trim();
  
  if (!text) {
    shakeElement($('#symptomInput'));
    return;
  }
  
  const age = $('#userAge')?.value || 25;
  const sex = $('#userSex')?.value || 'male';
  
  // Show loading
  $('#loadingState').classList.add('show');
  $('#resultsContainer').classList.remove('show');
  $('#analyzeBtn').disabled = true;
  
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language: state.language, age: parseInt(age), sex })
    });
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.success) {
      state.currentResult = data;
      displayResults(data);
      saveToHistory(data);
    } else {
      showError(t('noSymptoms'));
    }
  } catch (error) {
    console.error('Analysis error:', error);
    showError('Connection error. Please try again.');
  } finally {
    $('#loadingState').classList.remove('show');
    $('#analyzeBtn').disabled = false;
  }
}

function displayResults(data) {
  const container = $('#resultsContainer');
  const lang = state.language;
  
  // Risk badge
  const riskClass = data.risk.level.toLowerCase();
  const riskIcon = riskClass === 'high' ? '🚨' : riskClass === 'medium' ? '⚠️' : '✅';
  const riskText = lang === 'hi' ? 
    (riskClass === 'high' ? 'हाई रिस्क' : riskClass === 'medium' ? 'मीडियम रिस्क' : 'लो रिस्क') :
    data.risk.level + ' RISK';
  
  $('#riskBadge').className = `risk-badge risk-${riskClass}`;
  $('#riskBadge').innerHTML = `
    <div>
      <div class="risk-icon">${riskIcon}</div>
      <div class="risk-level" style="color: ${data.risk.color}">${riskText}</div>
      <div class="risk-label">${lang === 'hi' ? data.risk.reason_hi : data.risk.reason_en}</div>
    </div>
  `;
  
  // AI Analysis (Gemini)
  if (data.ai_analysis && !data.ai_analysis.error) {
    const ai = data.ai_analysis;
    $('#aiAnalysisCard').classList.remove('hidden');
    $('#aiAnalysisContent').innerHTML = `
      <div class="ai-summary" style="margin-bottom:16px; font-size:15px; line-height:1.6; color:var(--text-primary); font-weight:500;">
        ${ai.summary}
      </div>
      
      <div class="ai-section" style="margin-bottom:12px;">
        <div style="font-weight:700; font-size:14px; margin-bottom:6px; color:var(--primary);">🩺 ${t('possibleCauses')}</div>
        <ul style="padding-left:20px; font-size:14px; color:var(--text-muted);">
          ${ai.possible_causes.map(c => `<li style="margin-bottom:4px;">${c}</li>`).join('')}
        </ul>
      </div>

      <div class="ai-section" style="margin-bottom:12px;">
        <div style="font-weight:700; font-size:14px; margin-bottom:6px; color:var(--secondary);">📝 ${t('advice')}</div>
        <ul style="padding-left:20px; font-size:14px; color:var(--text-muted);">
          ${ai.recommended_actions.map(a => `<li style="margin-bottom:4px;">${a}</li>`).join('')}
        </ul>
      </div>

      <div class="ai-section" style="margin-bottom:12px;">
        <div style="font-weight:700; font-size:14px; margin-bottom:6px; color:var(--warning);">🏥 ${t('whenToSeeDoctor')}</div>
        <p style="font-size:14px; color:var(--text-muted); line-height:1.5;">${ai.when_to_see_doctor}</p>
      </div>

      <div class="ai-disclaimer" style="margin-top:16px; font-size:11px; font-style:italic; color:var(--text-muted); border-top:1px solid var(--border); padding-top:12px;">
        ${ai.disclaimer}
      </div>
    `;
  } else {
    $('#aiAnalysisCard').classList.add('hidden');
  }

  // Detected symptoms
  const symptomsHtml = data.detected_symptoms.length > 0 
    ? data.detected_symptoms.map(s => `<span class="symptom-chip">${s}</span>`).join('')
    : `<span class="symptom-chip">—</span>`;
  $('#detectedSymptoms').innerHTML = symptomsHtml;
  
  // Action
  $('#actionText').textContent = lang === 'hi' ? data.risk.action_hi : data.risk.action_en;
  
  // Advice
  const adviceHtml = data.advice.map(a => `
    <div class="advice-item">
      <div class="advice-symptom">💊 ${a.symptom}</div>
      <div class="advice-text">${lang === 'hi' ? a.advice_hi : a.advice_en}</div>
    </div>
  `).join('');
  $('#adviceList').innerHTML = adviceHtml;
  
  // Suspected Conditions
  if (data.conditions && data.conditions.length > 0) {
    $('#conditionsCard').classList.remove('hidden');
    $('#conditionsList').innerHTML = data.conditions.map(c => `
      <div class="condition-card">
        <div class="condition-header">
          <div class="condition-name">${lang === 'hi' ? c.common_hi : c.common_name}</div>
          <div class="badge badge-${c.severity}">${c.severity}</div>
        </div>
        <div class="badge badge-${c.acuteness}" style="margin-right:4px;">${c.acuteness}</div>
        <div class="badge badge-${c.prevalence}">${c.prevalence}</div>
        <div class="condition-hint">${lang === 'hi' ? c.hint_hi : c.hint}</div>
      </div>
    `).join('');
  } else {
    $('#conditionsCard').classList.add('hidden');
  }
  
  // Specialists
  if (data.specialists && data.specialists.length > 0) {
    $('#specialistsCard').classList.remove('hidden');
    $('#specialistsList').innerHTML = data.specialists.map(s => `
      <div class="specialist-item">
        <div class="specialist-icon">🏥</div>
        <div class="specialist-name">${lang === 'hi' ? s.hi : s.name}</div>
      </div>
    `).join('');
  } else {
    $('#specialistsCard').classList.add('hidden');
  }
  
  // Emergency button
  if (data.show_emergency) {
    $('#emergencySection').classList.remove('hidden');
  } else {
    $('#emergencySection').classList.add('hidden');
  }
  
  // Hospitals in results
  if (data.hospitals && data.hospitals.length > 0) {
    const hospitalsHtml = data.hospitals.map(h => createHospitalCard(h)).join('');
    $('#resultHospitals').innerHTML = `
      <div class="card-title">🏥 ${lang === 'hi' ? 'पास के अस्पताल' : 'Nearby Hospitals'}</div>
      ${hospitalsHtml}
    `;
    $('#resultHospitals').style.display = 'block';
  }
  
  container.classList.add('show');
  
  // Scroll to results
  setTimeout(() => {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function createHospitalCard(h) {
  const lang = state.language;
  const name = lang === 'hi' ? h.name_hi : h.name;
  return `
    <div class="hospital-card">
      <div class="hospital-icon">${h.emergency ? '🏥' : '🏨'}</div>
      <div class="hospital-info">
        <div class="hospital-name">${name}</div>
        <div class="hospital-meta">
          <span>📍 ${h.distance}</span>
          <span>⭐ ${h.rating}</span>
          <span>🏷️ ${h.type}</span>
        </div>
        <div class="hospital-actions">
          <button class="hospital-btn call-btn" onclick="simulateCall('${h.phone}')">
            📞 ${h.phone}
          </button>
          <button class="hospital-btn" onclick="navigateToHospital(${h.lat}, ${h.lng})">
            📍 ${lang === 'hi' ? 'रास्ता' : 'Navigate'}
          </button>
        </div>
      </div>
    </div>
  `;
}

// ══════════════════════════════════════════════
// Emergency Functions
// ══════════════════════════════════════════════
async function triggerEmergency() {
  const modal = $('#emergencyModal');
  const lang = state.language;
  
  // Show modal immediately
  modal.classList.add('show');
  
  // Mock API call
  try {
    const response = await fetch('/api/emergency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '108' })
    });
    const data = await response.json();
    
    $('#modalText').textContent = lang === 'hi' ? data.message_hi : data.message_en;
  } catch (e) {
    $('#modalText').textContent = t('emergencyModalText');
  }
  
  // TTS announcement
  speakText(lang === 'hi' 
    ? 'Emergency call ki ja rahi hai. Ambulance bheji ja rahi hai.' 
    : 'Emergency call initiated. Ambulance is being dispatched.'
  );
}

function closeModal() {
  $('#emergencyModal').classList.remove('show');
}

function simulateCall(phone) {
  // On mobile, this would open the dialer
  window.open(`tel:${phone}`, '_self');
}

function navigateToHospital(lat, lng) {
  // Open Google Maps navigation
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}

// ══════════════════════════════════════════════
// Hospitals Tab
// ══════════════════════════════════════════════
async function loadHospitals() {
  try {
    const response = await fetch('/api/hospitals');
    const data = await response.json();
    
    const hospitalsHtml = data.hospitals.map(h => createHospitalCard(h)).join('');
    $('#hospitalsList').innerHTML = hospitalsHtml;
  } catch (e) {
    console.error('Error loading hospitals:', e);
  }
}

// ══════════════════════════════════════════════
// Government Schemes
// ══════════════════════════════════════════════
async function checkSchemeEligibility() {
  const income = $('#incomeSelect').value;
  const area = $('#areaSelect').value;
  const lang = state.language;
  
  if (!income || !area) {
    shakeElement($('#schemeForm'));
    return;
  }
  
  try {
    const response = await fetch('/api/schemes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ income, area })
    });
    
    const data = await response.json();
    
    if (data.eligible_schemes.length > 0) {
      const schemesHtml = data.eligible_schemes.map(s => `
        <div class="scheme-card">
          <div class="scheme-name">🏛️ ${lang === 'hi' ? s.name_hi : s.name}</div>
          <div class="scheme-benefits">${lang === 'hi' ? s.benefits_hi : s.benefits_en}</div>
          <div class="scheme-actions">
            <span class="scheme-tag">📞 ${s.helpline}</span>
            <a href="${s.website}" target="_blank" class="scheme-tag" style="text-decoration:none">🌐 ${t('website')}</a>
          </div>
        </div>
      `).join('');
      
      $('#schemeResults').innerHTML = `
        <h3 style="margin-bottom:12px; font-size:16px; font-weight:700;">
          ✅ ${t('eligibleSchemes')} (${data.total})
        </h3>
        ${schemesHtml}
      `;
    } else {
      $('#schemeResults').innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <p>${lang === 'hi' ? 'कोई योजना नहीं मिली' : 'No eligible schemes found for your profile.'}</p>
        </div>
      `;
    }
  } catch (e) {
    console.error('Error checking schemes:', e);
  }
}

// ══════════════════════════════════════════════
// Text-to-Speech
// ══════════════════════════════════════════════
function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = state.language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
}

function speakResults() {
  if (!state.currentResult) return;
  
  const data = state.currentResult;
  const lang = state.language;
  
  let text = '';
  if (lang === 'hi') {
    text = `Aapka risk level hai ${data.risk.level}. ${data.risk.reason_hi}. ${data.risk.action_hi}`;
    data.advice.forEach(a => {
      text += `. ${a.symptom} ke liye: ${a.advice_hi}`;
    });
  } else {
    text = `Your risk level is ${data.risk.level}. ${data.risk.reason_en}. ${data.risk.action_en}`;
    data.advice.forEach(a => {
      text += `. For ${a.symptom}: ${a.advice_en}`;
    });
  }
  
  speakText(text);
}

// ══════════════════════════════════════════════
// History Management
// ══════════════════════════════════════════════
function saveToHistory(data) {
  const entry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    input: data.input,
    symptoms: data.detected_symptoms,
    risk: data.risk.level,
  };
  
  state.history.unshift(entry);
  if (state.history.length > 20) state.history.pop();
  
  localStorage.setItem('healthai_history', JSON.stringify(state.history));
  renderHistory();
}

function renderHistory() {
  const container = $('#historyList');
  if (!container) return;
  
  if (state.history.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <p>${t('historyEmpty')}</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = state.history.map(h => {
    const date = new Date(h.timestamp);
    const timeStr = date.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
    
    return `
      <div class="history-item" onclick="loadHistoryItem('${h.input}')">
        <div class="flex-between">
          <span class="history-time">${timeStr}</span>
          <span class="history-risk ${h.risk.toLowerCase()}">${h.risk}</span>
        </div>
        <div class="history-symptoms">${h.symptoms.join(', ') || h.input}</div>
      </div>
    `;
  }).join('');
}

function loadHistoryItem(input) {
  switchTab('symptoms');
  const textarea = $('#symptomInput');
  if (textarea) textarea.value = input;
}

function clearHistory() {
  if (confirm(state.language === 'hi' ? 'क्या आप इतिहास मिटाना चाहते हैं?' : 'Clear all history?')) {
    state.history = [];
    localStorage.removeItem('healthai_history');
    renderHistory();
  }
}

// ══════════════════════════════════════════════
// UI Utilities
// ══════════════════════════════════════════════
function shakeElement(el) {
  if (!el) return;
  el.style.animation = 'none';
  el.offsetHeight; // force reflow
  el.style.animation = 'shake 0.5s ease';
  setTimeout(() => el.style.animation = '', 500);
}

function showError(message) {
  const container = $('#resultsContainer');
  container.innerHTML = `
    <div class="card" style="border-color: var(--warning);">
      <div class="card-title">⚠️ ${message}</div>
    </div>
  `;
  container.classList.add('show');
}

// ══════════════════════════════════════════════
// Initialization
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Set initial language
  switchLanguage(state.language);
  
  // Initialize Speech Recognition
  initSpeechRecognition();
  
  // Load hospitals
  loadHospitals();
  
  // Render history
  renderHistory();
  
  // Tab click handlers
  $$('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
  
  // Language toggle handlers
  $$('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
  });
  
  // Enter key for textarea
  $('#symptomInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeSymptoms();
    }
  });
  
  // Add shake animation CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
      20%, 40%, 60%, 80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
});
