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

// Simple validation - check if field has value
function isFieldValid(input) {
  return input.value.trim().length > 0;
}

function isSelectValid(select) {
  return select.value !== '';
}

function isPasswordValid(password) {
  return password.value.length >= 6;
}

// Check if all required fields are filled
function areAllFieldsFilled() {
  return isFieldValid(nameInput) &&
         isFieldValid(emailInput) &&
         isPasswordValid(passwordInput) &&
         isSelectValid(genderSelect) &&
         isSelectValid(prioritySelect) &&
         isFieldValid(taskInput);
}

// Enable/Disable submit button
function updateSubmitButton() {
  const allFieldsFilled = areAllFieldsFilled();
  const termsChecked = termsCheckbox.checked;
  
  // Button enables when all fields filled AND checkbox checked
  submitBtn.disabled = !(allFieldsFilled && termsChecked);
}

// Show errors for invalid fields
function showErrors() {
  if (!isFieldValid(nameInput)) {
    showError('nameError', 'Name is required');
    nameInput.classList.add('error');
  } else {
    hideError('nameError');
    nameInput.classList.remove('error');
  }
  
  if (!isFieldValid(emailInput)) {
    showError('emailError', 'Email is required');
    emailInput.classList.add('error');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    showError('emailError', 'Please enter a valid email');
    emailInput.classList.add('error');
  } else {
    hideError('emailError');
    emailInput.classList.remove('error');
  }
  
  if (!isPasswordValid(passwordInput)) {
    showError('passwordError', 'Password must be at least 6 characters');
    passwordInput.classList.add('error');
  } else {
    hideError('passwordError');
    passwordInput.classList.remove('error');
  }
  
  if (!isSelectValid(genderSelect)) {
    showError('genderError', 'Please select a gender');
    genderSelect.classList.add('error');
  } else {
    hideError('genderError');
    genderSelect.classList.remove('error');
  }
  
  if (!isSelectValid(prioritySelect)) {
    showError('priorityError', 'Please select a priority');
    prioritySelect.classList.add('error');
  } else {
    hideError('priorityError');
    prioritySelect.classList.remove('error');
  }
  
  if (!isFieldValid(taskInput)) {
    showError('taskError', 'Task is required');
    taskInput.classList.add('error');
  } else {
    hideError('taskError');
    taskInput.classList.remove('error');
  }
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

// Event Listeners - update button on every input
nameInput.addEventListener('input', updateSubmitButton);
emailInput.addEventListener('input', updateSubmitButton);
passwordInput.addEventListener('input', updateSubmitButton);
genderSelect.addEventListener('change', updateSubmitButton);
prioritySelect.addEventListener('change', updateSubmitButton);
taskInput.addEventListener('input', updateSubmitButton);

// Checkbox listener - THIS IS THE KEY FIX
termsCheckbox.addEventListener('change', function() {
  updateSubmitButton();
});

// Form submission handler
form.addEventListener('submit', function(event) {
  // Show errors if not valid
  if (!areAllFieldsFilled() || !termsCheckbox.checked) {
    showErrors();
    event.preventDefault();
    return false;
  }

  // Prevent default for demo
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
  console.log('Form submitted:', data);
  
  // Show success message
  successMessage.classList.add('show');
  
  // Reset form after 2 seconds
  setTimeout(() => {
    form.reset();
    successMessage.classList.remove('show');
    updateSubmitButton();
  }, 2000);
  
  // Uncomment for actual POST submission:
  // form.submit();
});

// Initialize button state on page load
updateSubmitButton();