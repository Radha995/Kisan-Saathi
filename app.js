/* AgriScan - Main Application */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  setupNavigation();
  setupDiseaseUpload();
  setupQuickActions();
  setupCamera();
  setupChatbot();
  initVoiceAssistantSafe();
  initWeatherSafe();

  // Close modals on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });
}

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      pages.forEach(p => p.classList.remove('active'));
      const target = document.getElementById(`page-${page}`);
      if (target) target.classList.add('active');
      window.scrollTo(0, 0);
      if (page === 'home') {
        loadDashboardData();
        renderReports();
      }
      if (page === 'weather' && typeof fetchWeather === 'function') {
        fetchWeather();
      }
    });
  });
}

function setupQuickActions() {
  document.querySelectorAll('.quick-action[data-page]').forEach(el => {
    el.addEventListener('click', () => {
      const page = el.dataset.page;
      const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
      if (navItem) navItem.click();
    });
  });
}

function setupDiseaseUpload() {
  const uploadInput = document.getElementById('leafUpload');
  const uploadZone = document.getElementById('uploadZone');
  const preview = document.getElementById('leafPreview');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const changeBtn = document.getElementById('changeBtn');

  if (!uploadZone || !uploadInput) return;

  uploadZone.addEventListener('click', () => uploadInput.click());

  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });

  uploadInput.addEventListener('change', (e) => {
    if (e.target.files.length) handleFile(e.target.files[0]);
  });

  window.handleFile = handleFile;

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = 'block';
      uploadZone.classList.add('has-image');
      analyzeBtn.style.display = 'flex';
      changeBtn.style.display = 'flex';
    };
    reader.readAsDataURL(file);
  }

  if (changeBtn) {
    changeBtn.addEventListener('click', () => {
      uploadInput.value = '';
      preview.src = '';
      preview.style.display = 'none';
      uploadZone.classList.remove('has-image');
      analyzeBtn.style.display = 'none';
      changeBtn.style.display = 'none';
      document.getElementById('diseaseResults').innerHTML = '';
    });
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      if (preview.src && preview.src !== '') {
        detectDisease(preview.src);
      }
    });
  }
}

function setupCamera() {
  const captureBtn = document.getElementById('captureBtn');
  const cameraInput = document.getElementById('cameraInput');
  const preview = document.getElementById('leafPreview');
  const uploadZone = document.getElementById('uploadZone');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const changeBtn = document.getElementById('changeBtn');

  if (!cameraInput) return;

  cameraInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        preview.src = ev.target.result;
        preview.style.display = 'block';
        uploadZone.classList.add('has-image');
        analyzeBtn.style.display = 'flex';
        changeBtn.style.display = 'flex';
      };
      reader.readAsDataURL(file);
    }
  });
}

function setupChatbot() {
  const sendBtn = document.getElementById('chatSendBtn');
  const chatInput = document.getElementById('chatInput');

  if (sendBtn) sendBtn.addEventListener('click', sendChatMessage);
  if (chatInput) chatInput.addEventListener('keypress', handleChatKeyPress);

  // Init language toggle state
  const savedLang = localStorage.getItem('agriscan_chat_lang') || 'en';
  setTimeout(() => {
    if (typeof setChatbotLang === 'function') {
      setChatbotLang(savedLang);
    }
  }, 100);
}

function loadDashboardData() {
  updateDateTime();
  setInterval(updateDateTime, 30000);

  // Load stats
  const reports = JSON.parse(localStorage.getItem('agriscan_reports') || '[]');
  const healthy = reports.filter(r => r.type === 'healthy').length;
  const diseased = reports.filter(r => r.type !== 'healthy').length;

  document.getElementById('totalScans').textContent = reports.length;
  document.getElementById('healthyCount').textContent = healthy;
  document.getElementById('diseaseCount').textContent = diseased;

  // Dynamic greeting
  const hour = new Date().getHours();
  let greeting = 'Good Morning';
  if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
  else if (hour >= 17 || hour < 5) greeting = 'Good Evening';

  const farmerName = localStorage.getItem('farmerName') || 'Farmer';
  document.getElementById('heroGreeting').textContent = `${greeting}, ${farmerName}!`;
}

function updateDateTime() {
  const now = new Date();
  const el = document.getElementById('currentDateTime');
  if (el) {
    el.textContent = now.toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }
}

function navigateTo(page) {
  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) navItem.click();
}

function initVoiceAssistantSafe() {
  if (typeof initVoiceAssistant === 'function') {
    try { initVoiceAssistant(); } catch (e) {}
  }
}

function initWeatherSafe() {
  if (typeof initWeather === 'function') {
    // Will be called from showApp() when user logs in
  }
}

// Expose functions globally
window.navigateTo = navigateTo;
