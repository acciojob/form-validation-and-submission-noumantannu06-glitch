//your JS code here. If required.
// Form Validation and Submission

// Get form elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const termsCheckbox = document.getElementById('termsCheckbox');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Validation functions
function validateName() {
  const name = nameInput.value.trim();
  if (name.length === 0) {
    showError('nameError', 'Name is required');
    return false;
  }
  if (name.length < 2) {
    showError('nameError', 'Name must be at least 2 characters');
    return false;
  }
  hideError('nameError');
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email.length === 0) {
    showError('emailError', 'Email is required');
    return false;
  }
  if (!emailRegex.test(email)) {
    showError('emailError', 'Please enter a valid email address');
    return false;
  }
  hideError('emailError');
  return true;
}

function validatePhone() {
  const phone = phoneInput.value.trim();
  const phoneRegex = /^[\d\s\-+]{10,}$/;
  
  if (phone.length === 0) {
    showError('phoneError', 'Phone number is required');
    return false;
  }
  if (!phoneRegex.test(phone)) {
    showError('phoneError', 'Please enter a valid phone number');
    return false;
  }
  hideError('phoneError');
  return true;
}

function validatePassword() {
  const password = passwordInput.value;
  
  if (password.length === 0) {
    showError('passwordError', 'Password is required');
    return false;
  }
  if (password.length < 6) {
    showError('passwordError', 'Password must be at least 6 characters');
    return false;
  }
  hideError('passwordError');
  return true;
}

// Show/Hide error messages
function showError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = message;
  errorElement.classList.add('show');
  
  // Add error class to input
  const inputId = errorId.replace('Error', '');
  document.getElementById(inputId).classList.add('error');
}

function hideError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.classList.remove('show');
  
  // Remove error class from input
  const inputId = errorId.replace('Error', '');
  document.getElementById(inputId).classList.remove('error');
}

// Check if all fields are valid
function validateAllFields() {
  const nameValid = validateName();
  const emailValid = validateEmail();
  const phoneValid = validatePhone();
  const passwordValid = validatePassword();
  
  return nameValid && emailValid && phoneValid && passwordValid;
}

// Check if form can be submitted
function canSubmitForm() {
  const allFieldsValid = validateAllFields();
  const termsAccepted = termsCheckbox.checked;
  
  // Enable/disable submit button based on validation
  submitBtn.disabled = !(allFieldsValid && termsAccepted);
  
  return allFieldsValid && termsAccepted;
}

// Event Listeners for real-time validation
nameInput.addEventListener('input', canSubmitForm);
emailInput.addEventListener('input', canSubmitForm);
phoneInput.addEventListener('input', canSubmitForm);
passwordInput.addEventListener('input', canSubmitForm);
termsCheckbox.addEventListener('change', canSubmitForm);

// Form submission handler
form.addEventListener('submit', function(event) {
  // Prevent default submission if not valid
  if (!canSubmitForm()) {
    event.preventDefault();
    return false;
  }

  // Prevent default submission for demo (remove this in production)
  event.preventDefault();
  
  // Collect form data
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
    terms: formData.get('terms') === 'on'
  };

  // Simulate POST request to submit-form.php
  // In production, use: form.submit();
  console.log('Form Data:', data);
  
  // Show success message
  successMessage.classList.add('show');
  
  // Reset form after 2 seconds
  setTimeout(() => {
    form.reset();
    successMessage.classList.remove('show');
    submitBtn.disabled = true;
  }, 2000);
  
  // Uncomment below for actual submission:
  // form.submit();
});

// Initial validation on page load
canSubmitForm();
