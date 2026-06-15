// Form Validation and Submission

// Get form elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const genderSelect = document.getElementById('gender');
const prioritySelect = document.getElementById('priority');
const taskInput = document.getElementById('task');
const termsCheckbox = document.getElementById('termsCheckbox');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Validation functions
function validateName() {
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

function validateEmail() {
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

function validateGender() {
  if (genderSelect.value === '') {
    showError('genderError', 'Please select a gender');
    genderSelect.classList.add('error');
    return false;
  }
  hideError('genderError');
  genderSelect.classList.remove('error');
  return true;
}

function validatePriority() {
  if (prioritySelect.value === '') {
    showError('priorityError', 'Please select a priority');
    prioritySelect.classList.add('error');
    return false;
  }
  hideError('priorityError');
  prioritySelect.classList.remove('error');
  return true;
}

function validateTask() {
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

// Check if all fields are valid
function validateAllFields() {
  const nameValid = validateName();
  const emailValid = validateEmail();
  const genderValid = validateGender();
  const priorityValid = validatePriority();
  const taskValid = validateTask();
  
  return nameValid && emailValid && genderValid && priorityValid && taskValid;
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
genderSelect.addEventListener('change', canSubmitForm);
prioritySelect.addEventListener('change', canSubmitForm);
taskInput.addEventListener('input', canSubmitForm);
termsCheckbox.addEventListener('change', canSubmitForm);

// Form submission handler
form.addEventListener('submit', function(event) {
  // Prevent default submission if not valid
  if (!canSubmitForm()) {
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