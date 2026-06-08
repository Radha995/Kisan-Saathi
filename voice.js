/* AgriScan - Multilingual Voice Assistant */

const VOICE_LANGS = {
  'hi-IN': { label: 'हिन्दी (Hindi)', voiceName: 'Google हिन्दी' },
  'en-IN': { label: 'English (Indian)', voiceName: 'Google English' },
  'bn-IN': { label: 'বাংলা (Bengali)', voiceName: 'Google বাংলা' },
  'te-IN': { label: 'తెలుగు (Telugu)', voiceName: 'Google తెలుగు' },
  'mr-IN': { label: 'मराठी (Marathi)', voiceName: 'Google मराठी' },
  'ta-IN': { label: 'தமிழ் (Tamil)', voiceName: 'Google தமிழ்' },
  'gu-IN': { label: 'ગુજરાતી (Gujarati)', voiceName: 'Google ગુજરાતી' },
  'kn-IN': { label: 'ಕನ್ನಡ (Kannada)', voiceName: 'Google ಕನ್ನಡ' },
  'ml-IN': { label: 'മലയാളം (Malayalam)', voiceName: 'Google മലയാളം' },
  'pa-IN': { label: 'ਪੰਜਾਬੀ (Punjabi)', voiceName: 'Google ਪੰਜਾਬੀ' }
};

class VoiceAssistant {
  constructor() {
    this.isListening = false;
    this.isSpeaking = false;
    this.recognition = null;
    this.synth = window.speechSynthesis;
    this.selectedLang = 'hi-IN';
    this.utterance = null;
    this.voiceTimeout = null;
    this.init();
  }

  init() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      this.updateStatus('Voice recognition not supported in this browser. Try Chrome on Android.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = this.selectedLang;

    this.recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.handleFinalTranscript(transcript);
        }
      }
      document.getElementById('voiceTranscriptText').textContent = transcript || '...';
    };

    this.recognition.onerror = (event) => {
      console.error('Speech error:', event.error);
      this.updateStatus(event.error === 'no-speech' ? 'No speech detected. Try again.' : `Error: ${event.error}. Please try again.`);
      this.stopListening();
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        this.isListening = false;
        this.updateAvatar(false);
        this.updateStatus('Tap the microphone to speak');
      }
    };

    this.populateLanguageSelector();
  }

  populateLanguageSelector() {
    const select = document.getElementById('voiceLangSelect');
    if (!select) return;
    select.innerHTML = Object.entries(VOICE_LANGS).map(([code, lang]) =>
      `<option value="${code}" ${code === this.selectedLang ? 'selected' : ''}>${lang.label}</option>`
    ).join('');
    select.addEventListener('change', (e) => {
      this.selectedLang = e.target.value;
      if (this.recognition) this.recognition.lang = this.selectedLang;
    });
  }

  toggleListening() {
    if (this.isSpeaking) {
      this.stopSpeaking();
      return;
    }
    if (this.isListening) {
      this.stopListening();
      return;
    }
    this.startListening();
  }

  startListening() {
    if (!this.recognition) {
      this.updateStatus('Speech recognition not available');
      return;
    }
    try {
      this.recognition.lang = this.selectedLang;
      this.recognition.start();
      this.isListening = true;
      this.updateAvatar(true, false);
      this.updateStatus('🎤 Listening... Speak now');
      document.getElementById('voiceTranscriptText').textContent = '';
      document.getElementById('voiceResponseText').textContent = '';
    } catch (e) {
      console.error('Start failed:', e);
      this.updateStatus('Tap microphone and try again');
    }
  }

  stopListening() {
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    this.isListening = false;
    this.updateAvatar(false);
    if (!this.isSpeaking) {
      this.updateStatus('Tap the microphone to speak');
    }
  }

  handleFinalTranscript(transcript) {
    this.isListening = false;
    this.stopListening();
    this.updateStatus('🤔 Processing your question...');
    const response = this.generateResponse(transcript);
    document.getElementById('voiceResponseText').textContent = response;
    this.speakResponse(response);
  }

  generateResponse(transcript) {
    const q = transcript.toLowerCase().trim();

    const responses = {
      disease: {
        keywords: ['disease', 'बीमारी', 'रोग', 'infected', 'बिमारी', 'leaf spot', 'blight', 'कीट'],
        response: 'To detect diseases, go to the Disease Detection section and upload a photo of the affected leaf. Our AI will analyze it and provide treatment recommendations. You can also consult your local Kisan Seva Kendra for field visits. रोग की पहचान के लिए पत्ती की फोटो अपलोड करें।'
      },
      weather: {
        keywords: ['weather', 'मौसम', 'rain', 'बारिश', 'temperature', 'तापमान', 'humidity', 'forecast', 'मौसम पूर्वानुमान'],
        response: 'Check the Weather section for current conditions, rainfall forecast, and farming advisories. We show temperature, humidity, wind speed, and 5-day forecast for your location. मौसम अनुभाग में आज का मौसम और 5 दिन का पूर्वानुमान देखें।'
      },
      fertilizer: {
        keywords: ['fertilizer', 'उर्वरक', 'खाद', 'nutrient', 'पोषक', 'manure', 'compost', 'urea', 'यूरिया', 'NPK', 'dap'],
        response: 'Use fertilizers based on soil testing. For general crops: apply Urea (nitrogen) at 1-2% foliar spray, DAP for phosphorus, and Potash for potassium. Organic options include vermicompost (5kg/plant), neem cake, and compost tea. Always get soil tested first. मिट्टी परीक्षण के बाद ही उर्वरक का उपयोग करें।'
      },
      pest: {
        keywords: ['pest', 'कीट', 'insect', 'कीड़ा', 'aphid', 'एफिड', 'whitefly', 'सफेद मक्खी', 'caterpillar', 'इल्ली', 'mite'],
        response: 'For pest control: use neem oil spray (30ml/L water) for most pests. Set up yellow sticky traps for whiteflies. For caterpillars, apply Bacillus thuringiensis (Bt). Always monitor fields regularly and use integrated pest management. कीट नियंत्रण के लिए नीम तेल का छिड़काव करें।'
      },
      water: {
        keywords: ['water', 'पानी', 'irrigation', 'सिंचाई', 'drip', 'ड्रिप', 'sprinkler', 'rainfall', 'बारिश'],
        response: 'Use drip irrigation for water efficiency (30-40% water saving). Water crops early morning or evening to reduce evaporation. For rice, maintain 5cm standing water. For vegetables, keep soil moist but not waterlogged. ड्रिप सिंचाई से पानी बचाएं और उपज बढ़ाएं।'
      },
      crop: {
        keywords: ['crop', 'फसल', 'plant', 'पौधा', 'grow', 'उगाना', 'sow', 'बुवाई', 'harvest', 'कटाई', 'wheat', 'गेहूं', 'rice', 'चावल'],
        response: 'Choose crops based on your soil type, climate, and season. Wheat grows well in cool weather (Nov-Apr in North India). Rice needs warm, wet conditions (Jun-Nov). Always use certified seeds and follow recommended spacing. फसल का चयन मिट्टी और मौसम के अनुसार करें।'
      },
      organic: {
        keywords: ['organic', 'जैविक', 'natural', 'प्राकृतिक', 'chemical free', 'रसायन मुक्त', 'vermicompost'],
        response: 'For organic farming: use vermicompost, neem cake, compost tea, and biofertilizers. Control pests with neem oil, garlic extract, and beneficial insects. Use crop rotation and green manure for soil health. जैविक खेती के लिए वर्मीकम्पोस्ट और नीम की खली का उपयोग करें।'
      },
      government: {
        keywords: ['government', 'सरकारी', 'subsidy', 'सब्सिडी', 'scheme', 'योजना', 'kisan', 'किसान', 'pm kisan', 'प्रधानमंत्री'],
        response: 'Farmers can benefit from PM Kisan Samman Nidhi (₹6000/year), PM Fasal Bima Yojana (crop insurance), and Kisan Credit Card. Visit your nearest Common Service Centre or Krishi Vigyan Kendra for assistance. प्रधानमंत्री किसान सम्मान निधि और फसल बीमा योजना का लाभ उठाएं।'
      },
      soil: {
        keywords: ['soil', 'मिट्टी', 'soil test', 'मिट्टी परीक्षण', 'pH', 'fertility', 'उपजाऊ', 'sandy', 'clay'],
        response: 'Get your soil tested every 2-3 years. Ideal soil pH for most crops is 6.0-7.5. Add lime to acidic soils, gypsum to alkaline soils. Use organic matter to improve soil structure. Visit your nearest soil testing lab - tests are often free or subsidized. मिट्टी की जांच हर 2-3 साल में करवाएं।'
      }
    };

    for (const [key, data] of Object.entries(responses)) {
      if (data.keywords.some(kw => q.includes(kw))) {
        return data.response;
      }
    }

    return this.generateGeneralResponse(q);
  }

  generateGeneralResponse(q) {
    if (q.includes('hello') || q.includes('hi') || q.includes('नमस्ते') || q.includes('namaste')) {
      return 'Namaste! I am AgriScan, your farming assistant. I can help with disease detection, weather updates, farming tips, and more. What would you like to know? नमस्ते! मैं एग्रीस्कैन हूं, आपका कृषि सहायक। किस चीज़ में मदद चाहिए?';
    }
    if (q.includes('thank') || q.includes('धन्यवाद')) {
      return 'You are welcome! Feel free to ask anytime. Happy farming! आपका स्वागत है! खेती करते रहें और पूछते रहें।';
    }
    if (q.includes('who') || q.includes('what is agriscan')) {
      return 'AgriScan is an AI-powered farming assistant. It helps detect crop diseases, provides weather updates, gives farming tips, and answers your agriculture questions in multiple Indian languages. एग्रीस्कैन एक कृत्रिम बुद्धिमत्ता आधारित कृषि सहायक है।';
    }

    return 'I understand you have a farming question. For specific help: try "crop disease" for disease detection, "weather" for forecasts, "fertilizer" for nutrition advice, or "organic" for natural farming methods. You can also upload a leaf photo in the Disease Detection section. मैं आपकी कृषि संबंधी प्रश्नों में मदद कर सकता हूं। कृपया स्पष्ट रूप से पूछें।';
  }

  speakResponse(text) {
    if (!this.synth) return;
    window.speechSynthesis.cancel();

    this.utterance = new SpeechSynthesisUtterance(text);

    const langCode = this.selectedLang;
    this.utterance.lang = langCode;
    this.utterance.rate = 0.9;
    this.utterance.pitch = 1.0;
    this.utterance.volume = 1.0;

    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(v =>
      v.lang.startsWith(langCode.substring(0, 2)) && v.name.includes('Google')
    ) || voices.find(v => v.lang.startsWith(langCode.substring(0, 2)))
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0];

    if (preferredVoice) this.utterance.voice = preferredVoice;

    this.utterance.onstart = () => {
      this.isSpeaking = true;
      this.updateAvatar(false, true);
      this.updateStatus('🔊 Speaking...');
    };

    this.utterance.onend = () => {
      this.isSpeaking = false;
      this.updateAvatar(false, false);
      this.updateStatus('Tap the microphone to speak');
    };

    this.utterance.onerror = () => {
      this.isSpeaking = false;
      this.updateAvatar(false, false);
      this.updateStatus('Tap the microphone to speak');
    };

    this.synth.speak(this.utterance);
    if (this.voiceTimeout) clearTimeout(this.voiceTimeout);
    this.voiceTimeout = setTimeout(() => {
      if (this.isSpeaking) {
        this.stopSpeaking();
      }
    }, 30000);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.updateAvatar(false, false);
    this.updateStatus('Tap the microphone to speak');
    if (this.voiceTimeout) clearTimeout(this.voiceTimeout);
  }

  updateAvatar(isListening, isSpeaking) {
    const avatar = document.getElementById('voiceAvatar');
    if (!avatar) return;
    avatar.classList.remove('listening', 'speaking');
    if (isListening) avatar.classList.add('listening');
    else if (isSpeaking) avatar.classList.add('speaking');
    avatar.textContent = isListening ? '🎤' : (isSpeaking ? '🔊' : '🤖');
  }

  updateStatus(text) {
    const el = document.getElementById('voiceStatus');
    if (el) el.textContent = text;
  }
}

let voiceAssistant = null;

function initVoiceAssistant() {
  voiceAssistant = new VoiceAssistant();
}

function toggleVoice() {
  if (voiceAssistant) voiceAssistant.toggleListening();
}

function stopVoice() {
  if (voiceAssistant) voiceAssistant.stopSpeaking();
}

// Load voices early
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  });
}
