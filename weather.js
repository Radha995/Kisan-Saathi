/* AgriScan - Weather Module */

const AGRI_ADVISORIES = [
  { condition: 'rain_heavy', message: 'Heavy rain expected! Delay fertilizer and pesticide application. Ensure proper drainage in fields. Ensure proper drainage in low-lying areas.', icon: '🌧️' },
  { condition: 'rain_light', message: 'Light rain expected. Good time for transplanting seedlings. Rain expected - good for recently sown seeds. Hold off on irrigation for today.', icon: '🌦️' },
  { condition: 'sunny', message: 'Sunny weather. Ensure adequate irrigation for crops. Check soil moisture and irrigate if needed. Protect young plants from heat stress with shade nets.', icon: '☀️' },
  { condition: 'cloudy', message: 'Overcast conditions. Good day for transplanting and field preparation. Monitor for pest activity as cloudy weather can increase pest pressure.', icon: '☁️' },
  { condition: 'windy', message: 'Strong winds expected. Avoid spraying pesticides. Strong winds - delay any spraying operations. Secure plant stakes and trellises.', icon: '💨' },
  { condition: 'hot', message: 'High temperature alert! Provide shade for seedlings. Irrigate in early morning or evening. Apply mulch to retain soil moisture and reduce heat stress.', icon: '🔥' },
  { condition: 'cold', message: 'Low temperature alert! Protect sensitive crops with plastic mulch or row covers. Delay sowing of heat-loving crops like tomato and brinjal.', icon: '❄️' },
  { condition: 'humid', message: 'High humidity increases disease risk. Monitor for fungal diseases. Apply preventive fungicide if needed. Ensure good air circulation in fields.', icon: '💧' },
  { condition: 'normal', message: 'Favorable weather for farming activities. Continue regular irrigation and pest monitoring schedule. Good day for sowing, transplanting, and harvesting.', icon: '🌤️' }
];

const FARMING_TIPS_BY_CONDITION = {
  rain: 'Rainy season tip: Plant paddy, maize, and sugarcane. Ensure good drainage. Apply nitrogen fertilizer in split doses.',
  summer: 'Summer tip: Grow heat-tolerant varieties. Mulch heavily. Irrigate early morning. Plant cowpea, moong, and groundnut.',
  winter: 'Winter tip: Sow wheat, mustard, and peas. Protect from frost. Reduce irrigation frequency. Apply phosphorus-rich fertilizers.',
  spring: 'Spring tip: Prepare nursery for kharif crops. Harvest rabi crops. Plow fields for summer preparation.',
  monsoon: 'Monsoon tip: Complete paddy transplanting. Control weeds. Monitor for pest outbreaks. Ensure drainage channels are clear.'
};

const CROP_CALENDAR = [
  { month: 'June-July', crop: 'Rice/Paddy', activity: 'Nursery sowing & transplanting', region: 'All India' },
  { month: 'October-November', crop: 'Wheat', activity: 'Sowing', region: 'North India' },
  { month: 'June-July', crop: 'Maize', activity: 'Sowing', region: 'All India' },
  { month: 'July-August', crop: 'Cotton', activity: 'Sowing & early care', region: 'Central/West' },
  { month: 'October-November', crop: 'Mustard', activity: 'Sowing', region: 'North India' },
  { month: 'June-August', crop: 'Sugarcane', activity: 'Planting', region: 'North/West' },
  { month: 'January-February', crop: 'Potato', activity: 'Harvesting', region: 'North India' },
  { month: 'March-April', crop: 'Watermelon', activity: 'Sowing', region: 'All India' },
  { month: 'July-September', crop: 'Tomato', activity: 'Planting', region: 'All India' },
  { month: 'December-January', crop: 'Green Peas', activity: 'Sowing', region: 'North India' }
];

const INDIA_CITIES = [
  { name: 'Delhi', lat: 28.61, lon: 77.23 },
  { name: 'Mumbai', lat: 19.07, lon: 72.87 },
  { name: 'Bengaluru', lat: 12.97, lon: 77.59 },
  { name: 'Hyderabad', lat: 17.38, lon: 78.46 },
  { name: 'Chennai', lat: 13.08, lon: 80.27 },
  { name: 'Kolkata', lat: 22.57, lon: 88.36 },
  { name: 'Pune', lat: 18.52, lon: 73.85 },
  { name: 'Ahmedabad', lat: 23.02, lon: 72.57 },
  { name: 'Jaipur', lat: 26.91, lon: 75.78 },
  { name: 'Lucknow', lat: 26.84, lon: 80.94 },
  { name: 'Chandigarh', lat: 30.73, lon: 76.78 },
  { name: 'Bhopal', lat: 23.25, lon: 77.41 },
  { name: 'Patna', lat: 25.59, lon: 85.13 },
  { name: 'Guwahati', lat: 26.14, lon: 91.73 },
  { name: 'Bhubaneswar', lat: 20.29, lon: 85.82 },
  { name: 'Amritsar', lat: 31.63, lon: 74.87 },
  { name: 'Nagpur', lat: 21.14, lon: 79.08 },
  { name: 'Indore', lat: 22.71, lon: 75.85 },
  { name: 'Coimbatore', lat: 11.01, lon: 76.96 },
  { name: 'Varanasi', lat: 25.31, lon: 82.97 }
];

let userLocation = { lat: 28.61, lon: 77.23, name: 'Delhi' };

function initWeather() {
  getUserLocation();
}

function getUserLocation() {
  updateLocationDisplay();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.lat = position.coords.latitude;
        userLocation.lon = position.coords.longitude;
        userLocation.name = '📍 Your Location';
        updateLocationDisplay();
        fetchWeather();
      },
      () => {
        fetchWeather();
      },
      { timeout: 5000, enableHighAccuracy: false }
    );
  } else {
    fetchWeather();
  }
}

let searchTimeout = null;
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

function selectCity(name) {
  const city = INDIA_CITIES.find(c => c.name === name);
  if (city) {
    userLocation = { lat: city.lat, lon: city.lon, name: city.name };
    updateLocationDisplay();
    closeModal('locationModal');
    fetchWeather();
  }
}

function setCustomLocation(name, lat, lon) {
  userLocation = { lat, lon, name };
  updateLocationDisplay();
  closeModal('locationModal');
  fetchWeather();
}

function updateLocationDisplay() {
  const el = document.getElementById('locationDisplay');
  if (el) el.textContent = userLocation.name;
}

function showLocationPicker() {
  const modal = document.getElementById('locationModal');
  const list = document.getElementById('cityList');
  const searchInput = document.getElementById('locationSearch');
  if (searchInput) searchInput.value = '';
  renderCityList(list, INDIA_CITIES);
  modal.classList.add('active');
  if (searchInput) setTimeout(() => searchInput.focus(), 300);
}

function renderCityList(container, cities) {
  if (!container) return;
  if (!cities || cities.length === 0) {
    container.innerHTML = '<div class="search-no-results">No cities found matching your search.</div>';
    return;
  }
  container.innerHTML = cities.map(c =>
    `<button class="btn btn-secondary btn-sm mt-8" onclick="selectCity('${c.name}')" style="text-align:left;justify-content:flex-start;padding:10px 14px">
      📍 ${c.name}
    </button>`
  ).join('');
}

function searchLocations(query) {
  const suggestions = document.getElementById('searchSuggestions');
  const list = document.getElementById('cityList');
  const q = query.trim();

  if (searchTimeout) clearTimeout(searchTimeout);

  if (!q || q.length < 2) {
    suggestions.style.display = 'none';
    renderCityList(list, INDIA_CITIES);
    return;
  }

  const lower = q.toLowerCase();
  const filtered = INDIA_CITIES.filter(c => c.name.toLowerCase().includes(lower));

  if (filtered.length > 0) {
    suggestions.style.display = 'none';
    renderCityList(list, filtered);
  }

  searchTimeout = setTimeout(() => {
    fetchGeocodingResults(q, suggestions, list, filtered);
  }, 400);
}

async function fetchGeocodingResults(query, suggestionsEl, listEl, localResults) {
  try {
    const resp = await fetch(`${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
    const data = await resp.json();
    const results = data.results || [];

    if (results.length === 0) {
      if (localResults.length === 0) {
        suggestionsEl.style.display = 'none';
        listEl.innerHTML = `<div class="search-no-results">No results for "${query}".<br>Try a nearby city or use "Use My Current Location".</div>`;
      }
      return;
    }

    const geocoded = results.filter(r => r.country_code === 'IN' || !r.country_code).slice(0, 5);
    if (geocoded.length === 0 && results.length > 0) {
      geocoded.push(results[0]);
    }

    suggestionsEl.innerHTML = geocoded.map(r => {
      const name = r.name || r.city || '';
      const region = [r.admin1, r.country].filter(Boolean).join(', ');
      return `<div class="search-suggestion-item" onclick="selectGeocoded('${r.name}', ${r.latitude}, ${r.longitude})">
        <span class="sugg-icon">🌍</span>
        <div>
          <div class="sugg-name">${name}</div>
          <div class="sugg-region">${region}</div>
        </div>
      </div>`;
    }).join('');
    suggestionsEl.style.display = 'block';
    listEl.innerHTML = '';
  } catch (e) {
    console.error('Geocoding error:', e);
  }
}

function selectGeocoded(name, lat, lon) {
  document.getElementById('searchSuggestions').style.display = 'none';
  setCustomLocation(name, lat, lon);
}

function useDeviceLocation() {
  const statusMsg = document.getElementById('cityList');
  if (statusMsg) statusMsg.innerHTML = '<div style="text-align:center;padding:20px"><div class="loading-spinner"></div><div class="loading-text mt-8">Detecting your location...</div></div>';

  if (!navigator.geolocation) {
    if (statusMsg) statusMsg.innerHTML = '<div class="search-no-results">Geolocation not supported on this device.</div>';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      userLocation = { lat, lon, name: '📍 Your Location' };
      updateLocationDisplay();
      closeModal('locationModal');
      fetchWeather();
    },
    (err) => {
      const list = document.getElementById('cityList');
      if (list) list.innerHTML = `<div class="search-no-results">Could not detect location (${err.message}).<br>Please search for a city above.</div>`;
    },
    { enableHighAccuracy: false, timeout: 10000 }
  );
}

// Expose globally for HTML onclick handlers
window.showLocationPicker = showLocationPicker;
window.selectCity = selectCity;
window.searchLocations = searchLocations;
window.useDeviceLocation = useDeviceLocation;
window.selectGeocoded = selectGeocoded;

async function fetchWeather() {
  const weatherEl = document.getElementById('weatherDisplay');
  if (!weatherEl) return;

  weatherEl.innerHTML = '<div class="loading-spinner"></div><div class="loading-text mt-8">Fetching weather data...</div>';

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${userLocation.lat}&longitude=${userLocation.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto&forecast_days=6`;

    const resp = await fetch(url);
    const data = await resp.json();
    displayWeather(data);
  } catch (err) {
    weatherEl.innerHTML = `
      <div style="text-align:center;padding:30px;color:var(--text-muted)">
        <div style="font-size:40px;margin-bottom:12px">📡</div>
        <div>Unable to fetch weather data.</div>
        <button class="btn btn-secondary btn-sm mt-12" onclick="fetchWeather()">Retry</button>
      </div>`;
  }
}

function getWeatherInfo(code) {
  const wmoCodes = {
    0: { text: 'Clear Sky', icon: '☀️', condition: 'sunny' },
    1: { text: 'Mainly Clear', icon: '🌤️', condition: 'sunny' },
    2: { text: 'Partly Cloudy', icon: '⛅', condition: 'cloudy' },
    3: { text: 'Overcast', icon: '☁️', condition: 'cloudy' },
    45: { text: 'Foggy', icon: '🌫️', condition: 'cloudy' },
    48: { text: 'Foggy', icon: '🌫️', condition: 'cloudy' },
    51: { text: 'Light Drizzle', icon: '🌦️', condition: 'rain_light' },
    53: { text: 'Moderate Drizzle', icon: '🌦️', condition: 'rain_light' },
    55: { text: 'Heavy Drizzle', icon: '🌧️', condition: 'rain_heavy' },
    56: { text: 'Freezing Drizzle', icon: '🌧️', condition: 'rain_heavy' },
    61: { text: 'Slight Rain', icon: '🌦️', condition: 'rain_light' },
    63: { text: 'Moderate Rain', icon: '🌧️', condition: 'rain_heavy' },
    65: { text: 'Heavy Rain', icon: '🌧️', condition: 'rain_heavy' },
    71: { text: 'Slight Snow', icon: '🌨️', condition: 'cold' },
    73: { text: 'Moderate Snow', icon: '🌨️', condition: 'cold' },
    75: { text: 'Heavy Snow', icon: '❄️', condition: 'cold' },
    80: { text: 'Rain Showers', icon: '🌦️', condition: 'rain_light' },
    81: { text: 'Moderate Showers', icon: '🌧️', condition: 'rain_heavy' },
    82: { text: 'Heavy Showers', icon: '🌧️', condition: 'rain_heavy' },
    95: { text: 'Thunderstorm', icon: '⛈️', condition: 'rain_heavy' },
    96: { text: 'Thunderstorm', icon: '⛈️', condition: 'rain_heavy' },
    99: { text: 'Severe Storm', icon: '⛈️', condition: 'rain_heavy' }
  };
  return wmoCodes[code] || { text: 'Unknown', icon: '❓', condition: 'normal' };
}

function getAdvisory(temp, humidity, precipitation, condition) {
  const tempC = temp;
  let advisoryCategory = 'normal';

  if (precipitation > 5) advisoryCategory = 'rain_heavy';
  else if (precipitation > 0) advisoryCategory = 'rain_light';
  else if (tempC > 40) advisoryCategory = 'hot';
  else if (tempC < 10) advisoryCategory = 'cold';
  else if (humidity > 85) advisoryCategory = 'humid';
  else if (condition === 'cloudy') advisoryCategory = 'cloudy';

  const advisory = AGRI_ADVISORIES.find(a => a.condition === advisoryCategory) || AGRI_ADVISORIES.find(a => a.condition === 'normal');

  if (!advisory) return { icon: '🌤️', message: 'Favorable weather for farming activities.' };

  return advisory;
}

function displayWeather(data) {
  const weatherEl = document.getElementById('weatherDisplay');
  const current = data.current;
  const daily = data.daily;
  const weather = getWeatherInfo(current.weather_code);

  const advisory = getAdvisory(
    current.temperature_2m,
    current.relative_humidity_2m,
    current.precipitation,
    weather.condition
  );

  // Seasonal tip
  const month = new Date().getMonth();
  let seasonalTip = '';
  if (month >= 5 && month <= 9) {
    seasonalTip = FARMING_TIPS_BY_CONDITION.monsoon || '';
  } else if (month >= 10 && month <= 11) {
    seasonalTip = FARMING_TIPS_BY_CONDITION.winter || '';
  } else if (month >= 0 && month <= 1) {
    seasonalTip = FARMING_TIPS_BY_CONDITION.winter || '';
  } else {
    seasonalTip = FARMING_TIPS_BY_CONDITION.summer || '';
  }

  // Build forecast HTML
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const forecastHTML = daily.time.slice(0, 5).map((date, i) => {
    const dayWeather = getWeatherInfo(daily.weather_code[i]);
    const dayName = i === 0 ? 'Today' : days[new Date(date).getDay()];
    return `<div class="forecast-day">
      <div class="forecast-day-name">${dayName}</div>
      <div class="forecast-day-icon">${dayWeather.icon}</div>
      <div class="forecast-day-temp">${Math.round(daily.temperature_2m_max[i])}°/${Math.round(daily.temperature_2m_min[i])}°</div>
      <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${dayWeather.text}</div>
    </div>`;
  }).join('');

  weatherEl.innerHTML = `
    <div class="weather-current">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div class="weather-location">📍 ${userLocation.name}</div>
          <div style="font-size:12px;opacity:0.8">${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <div class="weather-temp">${Math.round(current.temperature_2m)}°C</div>
          <div class="weather-condition">${weather.icon} ${weather.text}</div>
        </div>
        <button class="location-btn" onclick="showLocationPicker()" style="background:rgba(255,255,255,0.2);color:white;border:1px solid rgba(255,255,255,0.3);font-size:11px;padding:6px 10px">
          📍 Change
        </button>
      </div>
      <div class="weather-details">
        <div class="weather-detail">
          <div class="weather-detail-value">${current.relative_humidity_2m}%</div>
          <div class="weather-detail-label">Humidity</div>
        </div>
        <div class="weather-detail">
          <div class="weather-detail-value">${current.precipitation || 0} mm</div>
          <div class="weather-detail-label">Rain</div>
        </div>
        <div class="weather-detail">
          <div class="weather-detail-value">${Math.round(current.wind_speed_10m)} km/h</div>
          <div class="weather-detail-label">Wind</div>
        </div>
      </div>
    </div>

    <div style="margin-top:14px">
      <div class="card-title mb-12">📅 5-Day Forecast</div>
      <div class="weather-forecast">
        ${forecastHTML}
      </div>
    </div>

    <div class="advisory-card">
      <div style="display:flex;align-items:flex-start;gap:10px">
        <span class="advisory-icon">${advisory.icon}</span>
        <div>
          <div style="font-weight:600;font-size:14px;color:#5a3e00;margin-bottom:3px">🌾 Farming Advisory</div>
          <div class="advisory-text">${advisory.message}</div>
        </div>
      </div>
    </div>

    ${seasonalTip ? `
    <div style="margin-top:12px;padding:12px 16px;background:var(--green-50);border-radius:var(--radius-sm);border:1px solid var(--green-200)">
      <div style="display:flex;align-items:flex-start;gap:10px">
        <span style="font-size:18px">📖</span>
        <div>
          <div style="font-weight:600;font-size:13px;color:var(--green-700);margin-bottom:2px">Seasonal Guide</div>
          <div style="font-size:12px;color:var(--text-secondary);line-height:1.5">${seasonalTip}</div>
        </div>
      </div>
    </div>` : ''}

    <div style="margin-top:14px">
      <div class="card-title mb-12">🌾 Crop Calendar</div>
      <div style="background:white;border-radius:var(--radius-sm);overflow:hidden;border:1px solid var(--green-100)">
        ${CROP_CALENDAR.slice(0, 5).map(c => `
          <div style="display:flex;padding:10px 14px;border-bottom:1px solid var(--green-100);align-items:center;gap:8px">
            <span style="font-size:18px">🌱</span>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600">${c.crop}</div>
              <div style="font-size:11px;color:var(--text-muted)">${c.activity} · ${c.region}</div>
            </div>
            <span style="font-size:11px;color:var(--green-600);font-weight:500">${c.month}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
