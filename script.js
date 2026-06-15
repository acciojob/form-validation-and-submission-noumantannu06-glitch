// Form Validation and Submission

// Get form elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const genderSelect = document.getElementById('gender');
const prioritySelect = document.getElementById('priority');
const taskInput = document.getElementById('task');
const termsCheckbox = document.getElementById('termsCheckbox');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Validation functions - return true/false without showing errors on init
function validateName() {
  const name = nameInput.value.trim();
  return name.length > 0;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.length > 0 && emailRegex.test(email);
}

function validatePassword() {
  const password = passwordInput.value;
  return password.length >= 6;
}

function validateGender() {
  return genderSelect.value !== '';
}

function validatePriority() {
  return prioritySelect.value !== '';
}

function validateTask() {
  const task = taskInput.value.trim();
  return task.length > 0;
}

// Show error with validation
function validateNameWithError() {
  const name = nameInput.value.trim();
  if (name.length === 0) {
    showError('nameError', 'Name is required');
    nameInput.classList.add('error');
    return false;
  }
  hideError('nameError');
  nameInput.classList.remove('error');
  return true;
}

function validateEmailWithError() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email.length === 0) {
    showError('emailError', 'Email is required');
    emailInput.classList.add('error');
    return false;
  }
  if (!emailRegex.test(email)) {
    showError('emailError', 'Please enter a valid email');
    emailInput.classList.add('error');
    return false;
  }
  hideError('emailError');
  emailInput.classList.remove('error');
  return true;
}

function validatePasswordWithError() {
  const password = passwordInput.value;
  
  if (password.length === 0) {
    showError('passwordError', 'Password is required');
    passwordInput.classList.add('error');
    return false;
  }
  if (password.length < 6) {
    showError('passwordError', 'Password must be at least 6 characters');
    passwordInput.classList.add('error');
    return false;
  }
  hideError('passwordError');
  passwordInput.classList.remove('error');
  return true;
}

function validateGenderWithError() {
  if (genderSelect.value === '') {
    showError('genderError', 'Please select a gender');
    genderSelect.classList.add('error');
    return false;
  }
  hideError('genderError');
  genderSelect.classList.remove('error');
  return true;
}

function validatePriorityWithError() {
  if (prioritySelect.value === '') {
    showError('priorityError', 'Please select a priority');
    prioritySelect.classList.add('error');
    return false;
  }
  hideError('priorityError');
  prioritySelect.classList.remove('error');
  return true;
}

function validateTaskWithError() {
  const task = taskInput.value.trim();
  if (task.length === 0) {
    showError('taskError', 'Task is required');
    taskInput.classList.add('error');
    return false;
  }
  hideError('taskError');
  taskInput.classList.remove('error');
  return true;
}

// Show/Hide error messages
function showError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = message;
  errorElement.classList.add('show');
}

function hideError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.classList.remove('show');
}

// Check if all fields are valid (without showing errors)
function isAllFieldsValid() {
  return validateName() && 
         validateEmail() && 
         validatePassword() && 
         validateGender() && 
         validatePriority() && 
         validateTask();
}

// Check if form can be submitted (button enabling logic)
function canSubmitForm() {
  const allFieldsValid = isAllFieldsValid();
  const termsAccepted = termsCheckbox.checked;
  
  // Enable/disable submit button based on validation
  submitBtn.disabled = !(allFieldsValid && termsAccepted);
  
  return allFieldsValid && termsAccepted;
}

// Validate with error display (on submit or blur)
function validateAllFieldsWithError() {
  return validateNameWithError() && 
         validateEmailWithError() && 
         validatePasswordWithError() && 
         validateGenderWithError() && 
         validatePriorityWithError() && 
         validateTaskWithError();
}

// Event Listeners for real-time validation (enables button on input)
nameInput.addEventListener('input', canSubmitForm);
emailInput.addEventListener('input', canSubmitForm);
passwordInput.addEventListener('input', canSubmitForm);
genderSelect.addEventListener('change', canSubmitForm);
prioritySelect.addEventListener('change', canSubmitForm);
taskInput.addEventListener('input', canSubmitForm);

// Checkbox listener - enables button when checked (if fields valid)
termsCheckbox.addEventListener('change', function() {
  canSubmitForm();
});

// Form submission handler
form.addEventListener('submit', function(event) {
  // Validate with error display on submit
  const allFieldsValid = validateAllFieldsWithError();
  const termsAccepted = termsCheckbox.checked;
  
  // Prevent default submission if not valid
  if (!allFieldsValid || !termsAccepted) {
    event.preventDefault();
    return false;
  }

  // Prevent default for demo (use form.submit() in production)
  event.preventDefault();
  
  // Collect form data
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    gender: formData.get('gender'),
    priority: formData.get('priority'),
    task: formData.get('task'),
    terms: formData.get('terms') === 'on'
  };

  // Log form data
  console.log('Form Data:', data);
  
  // Show success message
  successMessage.classList.add('show');
  
  // Reset form after 2 seconds
  setTimeout(() => {
    form.reset();
    successMessage.classList.remove('show');
    submitBtn.disabled = true;
  }, 2000);
  
  // Uncomment for actual submission:
  // form.submit();
});

// Initial validation on page load
canSubmitForm();