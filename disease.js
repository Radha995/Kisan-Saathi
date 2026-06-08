/* AgriScan - Disease Detection Module */

const DISEASE_DB = [
  {
    id: 'rice_blast',
    name: 'Rice Blast',
    crop: 'Rice',
    pathogen: 'Magnaporthe oryzae',
    type: 'fungal',
    symptoms: ['Diamond-shaped lesions on leaves', 'White/gray centers with brown borders', 'Lesions on nodes/panicles', 'Yellowing of leaves'],
    severity: 'high',
    confidence: 0,
    description: 'Rice blast is a devastating fungal disease affecting all parts of the rice plant. It causes significant yield losses worldwide.',
    causes: ['High humidity (>90%)', 'Excessive nitrogen fertilizer', 'Dense planting', 'Cool temperatures (24-28°C)'],
    prevention: [
      'Use resistant rice varieties',
      'Maintain proper plant spacing',
      'Avoid excessive nitrogen',
      'Practice crop rotation',
      'Keep fields clean of debris'
    ],
    treatment: [
      'Apply Tricyclazole (0.06%) at first sign',
      'Use Carbendazim 50 WP (1g/L water)',
      'Spray Propiconazole 25 EC (0.1%)',
      'Apply weekly during wet season',
      'Remove and destroy infected plants'
    ],
    organic_treatment: [
      'Neem oil spray (30ml/L water)',
      'Baking soda solution (5g/L water)',
      'Garlic-chili extract spray',
      'Apply Trichoderma biofungicide'
    ]
  },
  {
    id: 'wheat_rust',
    name: 'Wheat Rust (Brown/Yellow)',
    crop: 'Wheat',
    pathogen: 'Puccinia triticina / Puccinia striiformis',
    type: 'fungal',
    symptoms: ['Orange-brown pustules on leaves', 'Yellow stripes on leaves', 'Powdery spores on surfaces', 'Stunted plant growth'],
    severity: 'high',
    confidence: 0,
    description: 'Wheat rust appears as orange-brown or yellow pustules on leaves and stems. It spreads rapidly in humid conditions and can cause complete crop loss.',
    causes: ['Moderate temperatures (15-22°C)', 'High humidity', 'Wind-borne spores', 'Susceptible wheat varieties'],
    prevention: [
      'Plant rust-resistant varieties',
      'Early sowing to avoid disease pressure',
      'Remove volunteer wheat plants',
      'Avoid dense planting',
      'Balanced fertilization'
    ],
    treatment: [
      'Apply Tebuconazole 250 EW (1L/ha)',
      'Spray Propiconazole 25 EC (0.1%)',
      'Use Mancozeb 75 WP (2.5g/L)',
      'Spray at 10-14 day intervals',
      'Complete 2-3 sprays per season'
    ],
    organic_treatment: [
      'Sulfur-based fungicide spray',
      'Bicarbonate solution (5g/L)',
      'Neem oil with garlic extract',
      'Milk spray (10% solution)'
    ]
  },
  {
    id: 'corn_leaf_blight',
    name: 'Northern Corn Leaf Blight',
    crop: 'Maize/Corn',
    pathogen: 'Exserohilum turcicum',
    type: 'fungal',
    symptoms: ['Large cigar-shaped lesions', 'Gray-green to tan lesions', 'Lesions along leaf midrib', 'Premature leaf death'],
    severity: 'medium',
    confidence: 0,
    description: 'Northern Corn Leaf Blight causes long, elliptical lesions on corn leaves. Severe infection leads to reduced photosynthesis and yield loss.',
    causes: ['Cool, wet weather', 'Continuous corn cropping', 'Infected crop residue', 'Susceptible hybrids'],
    prevention: [
      'Plant resistant hybrids',
      'Rotate with non-host crops',
      'Tillage to bury residue',
      'Avoid overhead irrigation',
      'Balanced soil fertility'
    ],
    treatment: [
      'Apply Azoxystrobin (0.3L/ha)',
      'Spray Propiconazole (0.5L/ha)',
      'Use Pyraclostrobin fungicide',
      'Begin at first symptom appearance',
      'Repeat every 14-21 days'
    ],
    organic_treatment: [
      'Copper fungicide spray',
      'Bacillus subtilis biofungicide',
      'Compost tea foliar spray',
      'Crop rotation with legumes'
    ]
  },
  {
    id: 'tomato_blight',
    name: 'Tomato Late Blight',
    crop: 'Tomato',
    pathogen: 'Phytophthora infestans',
    type: 'fungal',
    symptoms: ['Water-soaked lesions on leaves', 'White fungal growth under leaves', 'Brown spots on fruits', 'Rapid wilting of plants'],
    severity: 'critical',
    confidence: 0,
    description: 'Late blight is a devastating disease of tomatoes. It spreads extremely fast in wet conditions and can destroy entire crop within days.',
    causes: ['Cool wet weather (10-20°C)', 'High humidity', 'Dense foliage', 'Rain splash dispersal'],
    prevention: [
      'Use disease-free transplants',
      'Space plants for air circulation',
      'Water at base of plants',
      'Mulch to reduce soil splash',
      'Apply preventive fungicides weekly'
    ],
    treatment: [
      'Apply Chlorothalonil (2g/L water)',
      'Spray Metalaxyl + Mancozeb',
      'Use Copper oxychloride (3g/L)',
      'Remove affected leaves immediately',
      'Spray every 5-7 days in wet weather'
    ],
    organic_treatment: [
      'Copper sulfate solution',
      'Baking soda + horticultural oil',
      'Garlic-chili-peppermint spray',
      'Bacillus subtilis spray'
    ]
  },
  {
    id: 'potato_early_blight',
    name: 'Potato Early Blight',
    crop: 'Potato',
    pathogen: 'Alternaria solani',
    type: 'fungal',
    symptoms: ['Dark concentric rings on leaves', 'Target spot pattern', 'Yellowing around lesions', 'Defoliation from bottom up'],
    severity: 'medium',
    confidence: 0,
    description: 'Early blight causes target-like spots on older leaves. It reduces yield by limiting photosynthesis and can affect tubers.',
    causes: ['Warm humid weather', 'Poor plant nutrition', 'Alternating wet/dry periods', 'Infected seed tubers'],
    prevention: [
      'Use certified disease-free seed',
      'Rotate crops for 3-4 years',
      'Maintain good nutrition',
      'Avoid overhead irrigation',
      'Hill soil around plants'
    ],
    treatment: [
      'Apply Mancozeb (2.5g/L water)',
      'Spray Azoxystrobin fungicide',
      'Use Chlorothalonil weekly',
      'Begin when first symptoms appear',
      'Continue through growing season'
    ],
    organic_treatment: [
      'Compost tea spray weekly',
      'Neem oil (2% solution)',
      'Baking soda spray',
      'Copper fungicide (limited use)'
    ]
  },
  {
    id: 'grape_powdery_mildew',
    name: 'Grape Powdery Mildew',
    crop: 'Grape',
    pathogen: 'Erysiphe necator',
    type: 'fungal',
    symptoms: ['White powdery coating on leaves', 'Distorted new growth', 'Cracked/blemished berries', 'Stunted vine growth'],
    severity: 'high',
    confidence: 0,
    description: 'Powdery mildew appears as white powdery patches on both leaf surfaces. It reduces fruit quality and vine vigor significantly.',
    causes: ['Moderate temperatures (20-27°C)', 'High humidity without rain', 'Dense canopy', 'Susceptible varieties'],
    prevention: [
      'Plant resistant grape varieties',
      'Prune for good air circulation',
      'Avoid excessive shade',
      'Remove infected clusters',
      'Sulfur dust prevention program'
    ],
    treatment: [
      'Apply Sulfur dust (weekly)',
      'Spray Myclobutanil fungicide',
      'Use Potassium bicarbonate',
      'Spray thoroughly on all surfaces',
      'Repeat every 7-14 days'
    ],
    organic_treatment: [
      'Sulfur dust or wettable sulfur',
      'Baking soda + soap spray',
      'Milk spray (30% milk, 70% water)',
      'Neem oil spray weekly'
    ]
  },
  {
    id: 'cotton_leaf_curl',
    name: 'Cotton Leaf Curl Virus',
    crop: 'Cotton',
    pathogen: 'Cotton leaf curl virus (CLCuV)',
    type: 'viral',
    symptoms: ['Leaf curling upward/downward', 'Thickened dark veins', 'Stunted plant growth', 'Reduced boll formation'],
    severity: 'critical',
    confidence: 0,
    description: 'Cotton leaf curl virus is transmitted by whiteflies. Infected plants show severe curling and reduced yields.',
    causes: ['Whitefly vector infestation', 'Infected crop residue', 'Adjacent infected crops', 'Hot dry conditions favor whiteflies'],
    prevention: [
      'Plant virus-resistant varieties',
      'Control whitefly populations',
      'Remove infected plants promptly',
      'Use barrier crops (sorghum/maize)',
      'Avoid planting near old cotton fields'
    ],
    treatment: [
      'No direct chemical cure',
      'Control whiteflies with Imidacloprid',
      'Remove and destroy infected plants',
      'Apply neem-based insecticides',
      'Use reflective mulches'
    ],
    organic_treatment: [
      'Neem oil spray for whiteflies',
      'Yellow sticky traps',
      'Garlic-pepper insecticidal soap',
      'Release beneficial insects (lacewings)'
    ]
  },
  {
    id: 'mango_anthracnose',
    name: 'Mango Anthracnose',
    crop: 'Mango',
    pathogen: 'Colletotrichum gloeosporioides',
    type: 'fungal',
    symptoms: ['Black sunken spots on fruits', 'Leaf spot and blight', 'Flower blight', 'Twig dieback'],
    severity: 'high',
    confidence: 0,
    description: 'Anthracnose affects mango flowers, leaves, and fruits. It causes black spots on developing mangoes and leads to fruit drop.',
    causes: ['Extended wet periods', 'High humidity', 'Rain during flowering', 'Dense canopy'],
    prevention: [
      'Prune for open canopy',
      'Remove infected plant parts',
      'Apply protective copper sprays',
      'Avoid overhead irrigation',
      'Harvest fruits at proper maturity'
    ],
    treatment: [
      'Spray Copper oxychloride (3g/L)',
      'Apply Carbendazim (1g/L water)',
      'Use Mancozeb during flowering',
      'Spray at 10-14 day intervals',
      'Treat at flowering and fruit set'
    ],
    organic_treatment: [
      'Copper fungicide (limited)',
      'Neem oil spray weekly',
      'Garlic extract solution',
      'Trichoderma biofungicide spray'
    ]
  },
  {
    id: 'nitrogen_deficiency',
    name: 'Nitrogen Deficiency',
    crop: 'General',
    pathogen: 'Nutrient Deficiency',
    type: 'deficiency',
    symptoms: ['Pale yellow-green leaves', 'Stunted plant growth', 'Yellowing of older leaves first', 'Thin stems', 'Small leaves'],
    severity: 'medium',
    confidence: 0,
    description: 'Nitrogen deficiency causes leaves to turn pale yellow-green. Older leaves show symptoms first as nitrogen moves to new growth.',
    causes: ['Low soil nitrogen', 'Heavy rainfall leaching N', 'Sandy soils', 'High carbon materials in soil'],
    prevention: [
      'Regular soil testing',
      'Apply balanced fertilizer',
      'Use organic compost',
      'Practice crop rotation with legumes',
      'Avoid over-irrigation'
    ],
    treatment: [
      'Apply Urea (1-2% foliar spray)',
      'Use NPK 20:10:10 fertilizer',
      'Add well-decomposed manure',
      'Side-dress with nitrogen during growth',
      'Foliar spray of DAP (2% solution)'
    ],
    organic_treatment: [
      'Apply vermicompost (5kg/plant)',
      'Liquid manure/compost tea',
      'Green manure with legumes',
      'Fish emulsion foliar spray',
      'Blood meal or feather meal'
    ]
  },
  {
    id: 'potassium_deficiency',
    name: 'Potassium Deficiency',
    crop: 'General',
    pathogen: 'Nutrient Deficiency',
    type: 'deficiency',
    symptoms: ['Yellow/brown leaf edges', 'Leaf tip burn', 'Weak stems', 'Poor fruit quality', 'Increased disease susceptibility'],
    severity: 'medium',
    confidence: 0,
    description: 'Potassium deficiency shows as yellowing and browning of leaf margins. It affects fruit quality and plant disease resistance.',
    causes: ['Low soil potassium', 'Sandy or leached soils', 'High-yielding crop varieties', 'Excessive nitrogen without K'],
    prevention: [
      'Regular soil testing',
      'Apply potassic fertilizers',
      'Use organic matter',
      'Balance NPK application',
      'Avoid excessive nitrogen'
    ],
    treatment: [
      'Apply Muriate of Potash (KCl)',
      'Use NPK with high potassium',
      'Foliar spray of KNO3 (1%)',
      'Apply Potassium sulfate for quality',
      'Split application during growth'
    ],
    organic_treatment: [
      'Wood ash application',
      'Banana peel compost',
      'Compost enriched with kelp',
      'Green manure crops',
      'Apply basalt rock dust'
    ]
  },
  {
    id: 'healthy_leaf',
    name: 'Healthy Leaf',
    crop: 'General',
    pathogen: 'None',
    type: 'healthy',
    symptoms: ['Uniform green color', 'Normal leaf shape', 'No spots or lesions', 'Good turgor pressure', 'Normal growth pattern'],
    severity: 'none',
    confidence: 0,
    description: 'The leaf appears healthy with no signs of disease, pest damage, or nutrient deficiency. Continue good farming practices.',
    causes: [],
    prevention: ['Continue regular crop maintenance', 'Maintain balanced nutrition', 'Monitor regularly for early signs', 'Follow good agricultural practices'],
    treatment: ['No treatment needed - plant is healthy'],
    organic_treatment: ['Continue organic practices', 'Apply preventive neem spray monthly', 'Maintain soil health with compost']
  }
];

function detectDisease(imageDataUrl) {
  return new Promise((resolve) => {
    simulateAIAnalysis(imageDataUrl, resolve);
  });
}

function simulateAIAnalysis(imageDataUrl, resolve) {
  const resultsDiv = document.getElementById('diseaseResults');
  resultsDiv.innerHTML = '<div class="loading-spinner"></div><div class="loading-text">Analyzing leaf image with AI...</div>';

  const progressBar = document.getElementById('analysisProgress');
  if (progressBar) {
    progressBar.style.display = 'block';
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress > 100) progress = 100;
      progressBar.value = progress;
      if (progress >= 100) clearInterval(interval);
    }, 200);
  }

  setTimeout(() => {
    const imageHash = simpleHash(imageDataUrl);
    const candidate = DISEASE_DB[imageHash % DISEASE_DB.length];
    const score = 65 + (imageHash % 31);
    const confidence = Math.min(99, score);
    const isHealthy = candidate.type === 'healthy' && confidence > 70;

    let selected;
    if (isHealthy) {
      selected = DISEASE_DB.find(d => d.id === 'healthy_leaf');
    } else if (confidence > 80) {
      selected = candidate;
    } else {
      const randomIndex = Math.floor(Math.random() * DISEASE_DB.length);
      selected = DISEASE_DB[randomIndex];
    }

    selected = JSON.parse(JSON.stringify(selected));
    selected.confidence = confidence;

    if (selected.type === 'healthy') {
      selected.confidence = 92 + (imageHash % 7);
    }

    if (progressBar) progressBar.style.display = 'none';

    displayResults(selected, imageDataUrl);
    saveReport(selected);
    resolve(selected);
  }, 2000 + Math.random() * 1500);
}

function simpleHash(str) {
  const s = str.split('').reduce((a, c) => ((a << 5) - a) + c.charCodeAt(0), 0);
  return Math.abs(s);
}

function displayResults(disease, imageDataUrl) {
  const resultsDiv = document.getElementById('diseaseResults');
  const isHealthy = disease.type === 'healthy';
  const isCritical = disease.severity === 'critical';
  const isWarning = disease.severity === 'high' || disease.severity === 'medium';

  let severityClass = 'healthy';
  let severityIcon = '✅';
  if (!isHealthy && isCritical) { severityClass = 'disease'; severityIcon = '🔴'; }
  else if (!isHealthy && isWarning) { severityClass = 'warning'; severityIcon = '⚠️'; }
  else if (!isHealthy) { severityClass = 'disease'; severityIcon = '🔴'; }

  let severityText = isHealthy ? 'No Issues Detected' : (isCritical ? 'Critical - Take Action Immediately' : (disease.severity === 'high' ? 'High Risk - Treatment Needed' : 'Moderate Risk - Monitor Closely'));

  const diseaseName = isHealthy ? 'Healthy Plant' : disease.name;
  const diseaseCrop = disease.crop !== 'General' ? `Crop: ${disease.crop}` : '';
  const diseasePathogen = isHealthy ? '' : `<div style="font-size:13px;color:var(--text-muted);margin-top:4px">Pathogen: ${disease.pathogen}</div>`;

  let confidenceColor = 'var(--green-500)';
  let fillClass = '';
  if (disease.confidence >= 85) { confidenceColor = 'var(--red)'; fillClass = 'critical'; }
  else if (disease.confidence >= 70) { confidenceColor = 'var(--orange)'; fillClass = 'high'; }

  let treatmentsHTML = '';
  if (disease.treatment && disease.treatment.length > 0) {
    treatmentsHTML = `
      <div style="margin-top:14px">
        <h4 style="font-size:14px;font-weight:600;margin-bottom:6px;color:var(--text)">💊 Treatment Recommendations</h4>
        <ul class="treatment-list">
          ${disease.treatment.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>`;
  }

  let organicHTML = '';
  if (disease.organic_treatment && disease.organic_treatment.length > 0) {
    organicHTML = `
      <div style="margin-top:14px">
        <h4 style="font-size:14px;font-weight:600;margin-bottom:6px;color:var(--green-600)">🌱 Organic/Natural Treatment</h4>
        <ul class="treatment-list">
          ${disease.organic_treatment.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>`;
  }

  let preventionHTML = '';
  if (disease.prevention && disease.prevention.length > 0) {
    preventionHTML = `
      <div style="margin-top:14px">
        <h4 style="font-size:14px;font-weight:600;margin-bottom:6px;color:var(--blue)">🛡️ Prevention Measures</h4>
        <ul class="treatment-list">
          ${disease.prevention.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>`;
  }

  let symptomsHTML = '';
  if (disease.symptoms && disease.symptoms.length > 0 && !isHealthy) {
    symptomsHTML = `
      <div style="margin-top:14px">
        <h4 style="font-size:14px;font-weight:600;margin-bottom:6px;color:var(--text)">🔍 Symptoms Observed</h4>
        <div>${disease.symptoms.map(s => `<span class="symptom-tag">${s}</span>`).join('')}</div>
      </div>`;
  }

  resultsDiv.innerHTML = `
    <div class="result-card ${severityClass}" style="margin-top:0">
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:12px">
        <div style="font-size:40px">${severityIcon}</div>
        <div style="flex:1">
          <div class="result-title ${isHealthy ? 'result-healthy' : 'result-disease'}">${diseaseName}</div>
          <div style="font-size:12px;color:var(--text-muted)">${severityText}</div>
          ${diseaseCrop ? `<div style="font-size:12px;color:var(--green-600);margin-top:2px">${diseaseCrop}</div>` : ''}
          ${diseasePathogen}
        </div>
      </div>

      <div class="confidence-label">
        <span>AI Confidence Score</span>
        <span style="font-weight:700;color:${confidenceColor}">${disease.confidence}%</span>
      </div>
      <div class="confidence-bar">
        <div class="confidence-fill ${fillClass}" style="width:${disease.confidence}%"></div>
      </div>

      ${disease.description ? `<p style="font-size:13px;color:var(--text-secondary);margin-top:10px;line-height:1.5">${disease.description}</p>` : ''}

      ${symptomsHTML}
      ${treatmentsHTML}
      ${organicHTML}
      ${preventionHTML}

      ${!isHealthy ? `
      <div style="margin-top:16px;padding:12px;background:var(--green-50);border-radius:10px">
        <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary)">
          <span>💡</span>
          <span>Consult a local agricultural officer for region-specific advice</span>
        </div>
      </div>` : `
      <div style="margin-top:16px;padding:12px;background:var(--green-50);border-radius:10px">
        <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary)">
          <span>🌿</span>
          <span>Your plant looks healthy! Continue good farming practices.</span>
        </div>
      </div>`}
    </div>
  `;

  // Add to crop health report
  addToReport({
    id: Date.now(),
    name: diseaseName,
    confidence: disease.confidence,
    severity: disease.severity,
    type: disease.type,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    image: imageDataUrl
  });
}

function addToReport(report) {
  let reports = JSON.parse(localStorage.getItem('agriscan_reports') || '[]');
  reports.unshift(report);
  if (reports.length > 50) reports = reports.slice(0, 50);
  localStorage.setItem('agriscan_reports', JSON.stringify(reports));
  renderReports();
}

function renderReports() {
  const container = document.getElementById('reportsList');
  if (!container) return;
  const reports = JSON.parse(localStorage.getItem('agriscan_reports') || '[]');
  if (reports.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:30px 16px;color:var(--text-muted);font-size:14px">📋 No health reports yet.<br>Upload a leaf image to get started!</div>';
    return;
  }
  container.innerHTML = reports.slice(0, 20).map(r => {
    const isHealthy = r.type === 'healthy';
    const sevClass = isHealthy ? 'badge-green' : (r.severity === 'critical' ? 'badge-red' : 'badge-gold');
    const sevText = isHealthy ? 'Healthy' : (r.severity === 'critical' ? 'Critical' : (r.severity === 'high' ? 'At Risk' : 'Monitor'));
    const icon = isHealthy ? 'bg-green-100' : (r.severity === 'critical' ? 'bg-red-light' : 'bg-gold-light');
    const iconEmoji = isHealthy ? '🌿' : (r.severity === 'critical' ? '🔴' : '⚠️');
    return `<div class="report-item" onclick="showReportDetail(${r.id})">
      <div class="report-icon" style="background:var(--green-50)">${iconEmoji}</div>
      <div class="report-info">
        <div class="report-name">${r.name}</div>
        <div class="report-date">${r.date} at ${r.time || ''} · ${r.confidence}% confidence</div>
      </div>
      <span class="report-status ${sevClass}">${sevText}</span>
    </div>`;
  }).join('');
}

function showReportDetail(id) {
  const reports = JSON.parse(localStorage.getItem('agriscan_reports') || '[]');
  const report = reports.find(r => r.id === id);
  if (!report) return;

  const modal = document.getElementById('reportModal');
  const content = document.getElementById('reportModalContent');
  const isHealthy = report.type === 'healthy';

  content.innerHTML = `
    <div class="modal-handle"></div>
    <div class="modal-title">${report.name}</div>
    <div style="text-align:center;margin:16px 0">
      <img src="${report.image}" style="max-width:100%;max-height:200px;border-radius:10px;border:2px solid var(--green-100)">
    </div>
    <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--text-muted)">
      <span>📅 ${report.date}</span>
      <span>⏰ ${report.time || ''}</span>
    </div>
    <div style="margin-top:12px">
      <div class="confidence-label"><span>Confidence</span><span style="font-weight:700">${report.confidence}%</span></div>
      <div class="confidence-bar"><div class="confidence-fill" style="width:${report.confidence}%"></div></div>
    </div>
    <div style="margin-top:12px;font-size:13px;color:var(--text-secondary)">
      Status: <strong>${isHealthy ? '✅ Healthy' : (report.severity === 'critical' ? '🔴 Critical' : '⚠️ Needs Attention')}</strong>
    </div>
    <button class="btn btn-secondary mt-16" onclick="closeModal('reportModal')">Close</button>
  `;
  modal.classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}
