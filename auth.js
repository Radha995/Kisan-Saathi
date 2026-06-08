/* AgriScan - Authentication Module */

const AUTH_KEY = 'agriscan_users';
const SESSION_KEY = 'agriscan_session';

function getUsers() {
  return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(users));
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
}

function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    email: user.email,
    name: user.name,
    loggedInAt: Date.now()
  }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function isLoggedIn() {
  return getSession() !== null;
}

function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  return users.find(u => u.email === session.email) || null;
}

function showAuthPage() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const authPage = document.getElementById('page-auth');
  if (authPage) authPage.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
}

function showApp() {
  const authPage = document.getElementById('page-auth');
  if (authPage) authPage.classList.remove('active');
  const homePage = document.getElementById('page-home');
  if (homePage) homePage.classList.add('active');
  const homeNav = document.querySelector('.nav-item[data-page="home"]');
  if (homeNav) homeNav.classList.add('active');
  updateHeaderUser();
  if (typeof loadDashboardData === 'function') loadDashboardData();
  if (typeof initWeather === 'function') initWeather();
  if (typeof renderReports === 'function') renderReports();
}

function updateHeaderUser() {
  const user = getCurrentUser();
  const headerName = document.getElementById('headerUserName');
  const headerAction = document.getElementById('headerAuthAction');
  if (!headerName || !headerAction) return;
  if (user) {
    headerName.textContent = user.name.split(' ')[0];
    headerName.style.display = 'inline';
    headerAction.innerHTML = '🚪';
    headerAction.title = 'Logout';
    headerAction.onclick = logout;
  } else {
    headerName.textContent = '';
    headerName.style.display = 'none';
    headerAction.innerHTML = '👤';
    headerAction.title = 'Login / Sign Up';
    headerAction.onclick = showAuthPage;
  }
}

function signup(name, email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'An account with this email already exists. Please login instead.' };
  }
  if (password.length < 4) {
    return { success: false, error: 'Password must be at least 4 characters.' };
  }
  const newUser = { name: name.trim(), email: email.trim().toLowerCase(), password, createdAt: Date.now() };
  users.push(newUser);
  saveUsers(users);
  saveSession(newUser);
  return { success: true };
}

function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email.trim().toLowerCase());
  if (!user) {
    return { success: false, error: 'No account found with this email. Please sign up first.' };
  }
  if (user.password !== password) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }
  saveSession(user);
  return { success: true };
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    clearSession();
    showAuthPage();
    updateHeaderUser();
  }
}

function switchToSignup() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
  document.getElementById('loginToggle').style.display = 'none';
  document.getElementById('signupToggle').style.display = 'block';
  document.getElementById('authError').textContent = '';
  document.getElementById('authError').style.display = 'none';
}

function switchToLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('loginToggle').style.display = 'block';
  document.getElementById('signupToggle').style.display = 'none';
  document.getElementById('authError').textContent = '';
  document.getElementById('authError').style.display = 'none';
}

function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('authError');
  if (!email || !password) {
    errorEl.textContent = 'Please enter both email and password.';
    errorEl.style.display = 'block';
    return;
  }
  const result = login(email, password);
  if (result.success) {
    showApp();
  } else {
    errorEl.textContent = result.error;
    errorEl.style.display = 'block';
  }
}

function handleSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;
  const errorEl = document.getElementById('authError');
  if (!name || !email || !password || !confirm) {
    errorEl.textContent = 'Please fill in all fields.';
    errorEl.style.display = 'block';
    return;
  }
  if (password !== confirm) {
    errorEl.textContent = 'Passwords do not match.';
    errorEl.style.display = 'block';
    return;
  }
  const result = signup(name, email, password);
  if (result.success) {
    showApp();
  } else {
    errorEl.textContent = result.error;
    errorEl.style.display = 'block';
  }
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

function handleForgotPassword() {
  const email = document.getElementById('loginEmail').value.trim();
  const errorEl = document.getElementById('authError');
  if (!email) {
    errorEl.textContent = 'Enter your email first, then click Forgot Password.';
    errorEl.style.display = 'block';
    return;
  }
  const users = getUsers();
  const user = users.find(u => u.email === email.toLowerCase());
  if (!user) {
    errorEl.textContent = 'No account found with this email. Please sign up.';
    errorEl.style.display = 'block';
    return;
  }
  errorEl.textContent = 'Your password is: ' + user.password + ' (demo mode)';
  errorEl.style.display = 'block';
  errorEl.style.background = 'var(--green-50)';
  errorEl.style.color = 'var(--green-700)';
}

function initAuth() {
  updateHeaderUser();
  if (isLoggedIn()) {
    showApp();
  } else {
    showAuthPage();
  }
  // Enter key support
  document.getElementById('loginPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
  document.getElementById('signupConfirm').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSignup();
  });
}

// Expose globally
window.login = login;
window.logout = logout;
window.signup = signup;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.switchToSignup = switchToSignup;
window.switchToLogin = switchToLogin;
window.togglePasswordVisibility = togglePasswordVisibility;
window.handleForgotPassword = handleForgotPassword;
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;

// Auto-init
document.addEventListener('DOMContentLoaded', initAuth);
