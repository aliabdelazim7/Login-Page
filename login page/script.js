// Enhanced Login Page JavaScript

// DOM Elements
const loadingOverlay = document.querySelector('.loading-overlay');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const submitBtn = document.getElementById('submitBtn');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const signupLink = document.getElementById('signupLink');

// Form validation state
let isFormValid = {
  email: false,
  password: false
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  hideLoading();
  initializeFormValidation();
  initializePasswordToggle();
  initializeSocialLogin();
  initializeAnimations();
  initializeEventListeners();
});

// Hide loading overlay
function hideLoading() {
  setTimeout(() => {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
    }, 500);
  }, 1500);
}

// Initialize form validation
function initializeFormValidation() {
  // Email validation
  emailInput.addEventListener('input', (e) => {
    validateEmail(e.target.value);
  });

  emailInput.addEventListener('blur', (e) => {
    validateEmail(e.target.value);
  });

  // Password validation
  passwordInput.addEventListener('input', (e) => {
    validatePassword(e.target.value);
  });

  passwordInput.addEventListener('blur', (e) => {
    validatePassword(e.target.value);
  });

  // Form submission
  loginForm.addEventListener('submit', handleFormSubmission);
}

// Validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  if (email === '') {
    showFieldError(emailError, 'Email is required');
    isFormValid.email = false;
  } else if (!isValid) {
    showFieldError(emailError, 'Please enter a valid email address');
    isFormValid.email = false;
  } else {
    clearFieldError(emailError);
    isFormValid.email = true;
  }
  
  updateSubmitButton();
  return isValid;
}

// Validate password
function validatePassword(password) {
  const isValid = password.length >= 6;
  
  if (password === '') {
    showFieldError(passwordError, 'Password is required');
    isFormValid.password = false;
  } else if (password.length < 6) {
    showFieldError(passwordError, 'Password must be at least 6 characters');
    isFormValid.password = false;
  } else {
    clearFieldError(passwordError);
    isFormValid.password = true;
  }
  
  updateSubmitButton();
  return isValid;
}

// Show field error
function showFieldError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add('show');
  errorElement.style.animation = 'shake 0.5s ease';
}

// Clear field error
function clearFieldError(errorElement) {
  errorElement.textContent = '';
  errorElement.classList.remove('show');
  errorElement.style.animation = '';
}

// Update submit button state
function updateSubmitButton() {
  const isValid = isFormValid.email && isFormValid.password;
  submitBtn.disabled = !isValid;
  submitBtn.style.opacity = isValid ? '1' : '0.6';
  submitBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
}

// Initialize password toggle
function initializePasswordToggle() {
  passwordToggle.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    const icon = passwordToggle.querySelector('i');
    icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    
    // Add animation
    passwordToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      passwordToggle.style.transform = 'scale(1)';
    }, 150);
  });
}

// Initialize social login
function initializeSocialLogin() {
  const socialButtons = document.querySelectorAll('.social-btn');
  
  socialButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const provider = btn.classList.contains('google') ? 'Google' :
                      btn.classList.contains('facebook') ? 'Facebook' : 'GitHub';
      
      showNotification(`Connecting to ${provider}...`, 'info');
      
      // Simulate social login
      setTimeout(() => {
        showNotification(`${provider} login successful!`, 'success');
      }, 2000);
    });
  });
}

// Initialize animations
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  // Observe elements for animation
  document.querySelectorAll('.feature-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });

  // Animate floating shapes
  animateFloatingShapes();
}

// Animate floating shapes
function animateFloatingShapes() {
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 0.5}s`;
  });
}

// Initialize event listeners
function initializeEventListeners() {
  // Forgot password link
  document.querySelector('.forgot-link').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Password reset link sent to your email!', 'success');
  });

  // Signup link
  signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Redirecting to signup page...', 'info');
  });

  // Modal close on outside click
  [successModal, errorModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !submitBtn.disabled) {
      handleFormSubmission(e);
    }
    
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Input focus effects
  [emailInput, passwordInput].forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'scale(1)';
    });
  });
}

// Handle form submission
function handleFormSubmission(e) {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const remember = document.getElementById('remember').checked;
  
  // Validate form
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  
  if (!isEmailValid || !isPasswordValid) {
    showNotification('Please fix the errors in the form', 'error');
    return;
  }
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    // Simulate login success/failure
    const isSuccess = Math.random() > 0.3; // 70% success rate
    
    if (isSuccess) {
      showSuccessModal();
      showNotification('Login successful!', 'success');
    } else {
      showErrorModal('Invalid email or password. Please try again.');
      showNotification('Login failed. Please check your credentials.', 'error');
    }
    
    // Reset button state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }, 2000);
}

// Show success modal
function showSuccessModal() {
  successModal.style.display = 'flex';
  
  // Animate success icon
  const successIcon = successModal.querySelector('.success-animation i');
  successIcon.style.animation = 'none';
  setTimeout(() => {
    successIcon.style.animation = 'bounce 0.6s ease';
  }, 10);
}

// Show error modal
function showErrorModal(message) {
  errorMessage.textContent = message;
  errorModal.style.display = 'flex';
  
  // Animate error icon
  const errorIcon = errorModal.querySelector('.error-animation i');
  errorIcon.style.animation = 'none';
  setTimeout(() => {
    errorIcon.style.animation = 'shake 0.6s ease';
  }, 10);
}

// Close modal
function closeModal() {
  [successModal, errorModal].forEach(modal => {
    if (modal) {
      modal.style.display = 'none';
    }
  });
}

// Show notification
function showNotification(message, type) {
  const notificationElement = document.createElement('div');
  notificationElement.className = `notification ${type}`;
  notificationElement.innerHTML = `
    <div class="notification-content">
      <i class="notification-icon fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span class="notification-message">${message}</span>
    </div>
  `;
  
  document.body.appendChild(notificationElement);
  
  // Animate in
  setTimeout(() => {
    notificationElement.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notificationElement.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notificationElement);
    }, 300);
  }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .input-wrapper {
    transition: transform 0.3s ease;
  }
  
  .password-toggle {
    transition: transform 0.3s ease;
  }
  
  .feature-item {
    transition: all 0.3s ease;
  }
  
  .social-btn {
    transition: all 0.3s ease;
  }
  
  .submit-btn {
    transition: all 0.3s ease;
  }
  
  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .submit-btn:disabled:hover {
    transform: none;
    box-shadow: none;
  }
  
  .notification {
    animation: slideInRight 0.3s ease;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
    }
    to {
      transform: translateX(0);
    }
  }
  
  .error-message {
    animation: shake 0.5s ease;
  }
  
  .form-input:focus {
    animation: pulse 0.3s ease;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  
  .logo {
    animation: pulse 2s infinite;
  }
  
  .welcome-icon {
    animation: bounce 2s infinite;
  }
  
  .floating-shapes .shape {
    animation: float 6s ease-in-out infinite;
  }
  
  .shape-1 { animation-delay: 0s; }
  .shape-2 { animation-delay: 1s; }
  .shape-3 { animation-delay: 2s; }
  .shape-4 { animation-delay: 3s; }
  .shape-5 { animation-delay: 4s; }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 1;
    }
  }
  
  .login-card::before {
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  .submit-btn::before {
    animation: shimmer 2s infinite;
  }
  
  .social-btn:hover {
    animation: bounce 0.6s ease;
  }
  
  .feature-item:hover {
    animation: slideInRight 0.3s ease;
  }
  
  .welcome-panel {
    animation: slideInRight 1s ease-out;
  }
  
  .login-card {
    animation: slideInLeft 1s ease-out;
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  .modal {
    animation: fadeIn 0.3s ease;
  }
  
  .modal-content {
    animation: slideInUp 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .success-animation i {
    animation: bounce 0.6s ease;
  }
  
  .error-animation i {
    animation: shake 0.6s ease;
  }
  
  .loading-spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .btn-loader i {
    animation: spin 1s linear infinite;
  }
  
  .checkmark::after {
    animation: fadeIn 0.3s ease;
  }
  
  .input-line {
    animation: expand 0.3s ease;
  }
  
  @keyframes expand {
    from { width: 0; }
    to { width: 100%; }
  }
  
  .logo {
    animation: pulse 2s infinite;
  }
  
  .welcome-icon {
    animation: bounce 2s infinite;
  }
  
  .floating-shapes .shape {
    animation: float 6s ease-in-out infinite;
  }
  
  .shape-1 { animation-delay: 0s; }
  .shape-2 { animation-delay: 1s; }
  .shape-3 { animation-delay: 2s; }
  .shape-4 { animation-delay: 3s; }
  .shape-5 { animation-delay: 4s; }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 1;
    }
  }
  
  .login-card::before {
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  .submit-btn::before {
    animation: shimmer 2s infinite;
  }
  
  .social-btn:hover {
    animation: bounce 0.6s ease;
  }
  
  .feature-item:hover {
    animation: slideInRight 0.3s ease;
  }
  
  .welcome-panel {
    animation: slideInRight 1s ease-out;
  }
  
  .login-card {
    animation: slideInLeft 1s ease-out;
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  .modal {
    animation: fadeIn 0.3s ease;
  }
  
  .modal-content {
    animation: slideInUp 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .success-animation i {
    animation: bounce 0.6s ease;
  }
  
  .error-animation i {
    animation: shake 0.6s ease;
  }
  
  .loading-spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .btn-loader i {
    animation: spin 1s linear infinite;
  }
  
  .checkmark::after {
    animation: fadeIn 0.3s ease;
  }
  
  .input-line {
    animation: expand 0.3s ease;
  }
  
  @keyframes expand {
    from { width: 0; }
    to { width: 100%; }
  }
`;
document.head.appendChild(style);

// Performance optimization
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    // Handle scroll-based animations if needed
  }, 16);
});

// Initialize on window load
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Global functions for modal
window.closeModal = closeModal;
