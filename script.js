// Front-end demo only. Do not use this for real authentication or sensitive data.
function showMessage(form, text, type) {
  const message = form.querySelector('.message');
  if (message) {
    message.textContent = text;
    message.className = 'message ' + type;
  }
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    if (password !== confirm) {
      showMessage(registerForm, 'Passwords do not match. Please try again.', 'error');
      return;
    }
    const users = JSON.parse(localStorage.getItem('connectHubUsers') || '{}');
    if (users[email]) {
      showMessage(registerForm, 'This email is already registered. Please log in.', 'error');
      return;
    }
    users[email] = { name, password };
    localStorage.setItem('connectHubUsers', JSON.stringify(users));
    showMessage(registerForm, 'Registration successful! Taking you to login…', 'success');
    registerForm.reset();
    setTimeout(() => { window.location.href = 'login.html'; }, 900);
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('connectHubUsers') || '{}');
    if (users[email] && users[email].password === password) {
      sessionStorage.setItem('connectHubCurrentUser', email);
      showMessage(loginForm, 'Login successful! Welcome, ' + users[email].name + '.', 'success');
    } else {
      showMessage(loginForm, 'Email or password is incorrect. You can register or use Forgot password.', 'error');
    }
  });
}

const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem('connectHubUsers') || '{}');
    if (users[email]) {
      showMessage(forgotForm, 'This is a front-end demo. A real reset link cannot be sent without a backend and email service.', 'success');
    } else {
      showMessage(forgotForm, 'No demo account found for this email. Check it or register first.', 'error');
    }
  });
}

const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const feedback = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      rating: document.getElementById('rating').value,
      message: document.getElementById('feedback').value.trim(),
      submittedAt: new Date().toISOString()
    };
    const items = JSON.parse(localStorage.getItem('connectHubFeedback') || '[]');
    items.push(feedback);
    localStorage.setItem('connectHubFeedback', JSON.stringify(items));
    showMessage(feedbackForm, 'Thank you! Your feedback has been saved in this browser for demo purposes.', 'success');
    feedbackForm.reset();
  });
}
