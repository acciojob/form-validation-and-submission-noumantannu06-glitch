javascript
const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const genderInput = document.getElementById("gender");
const priorityInput = document.getElementById("priority");
const taskInput = document.getElementById("task");

const checkbox = document.getElementById("termsCheckbox");
const submitBtn = document.getElementById("submitBtn");

// button disabled initially
submitBtn.disabled = true;

// enable button when checkbox checked
checkbox.addEventListener("change", function () {
    submitBtn.disabled = !checkbox.checked;
});

function showError(id, message) {
    document.getElementById(id).innerText = message;
}

function clearErrors() {
    showError("nameError", "");
    showError("emailError", "");
    showError("passwordError", "");
    showError("genderError", "");
    showError("priorityError", "");
    showError("taskError", "");
}

form.addEventListener("submit", function (event) {

    clearErrors();

    let valid = true;

    if (nameInput.value.trim() === "") {
        showError("nameError", "Name is required");
        valid = false;
    }

    if (emailInput.value.trim() === "") {
        showError("emailError", "Email is required");
        valid = false;
    }

    if (passwordInput.value.trim() === "") {
        showError("passwordError", "Password is required");
        valid = false;
    }

    if (genderInput.value === "") {
        showError("genderError", "Select gender");
        valid = false;
    }

    if (priorityInput.value === "") {
        showError("priorityError", "Select priority");
        valid = false;
    }

    if (taskInput.value.trim() === "") {
        showError("taskError", "Task is required");
        valid = false;
    }

    if (!checkbox.checked) {
        valid = false;
    }

    // stop submission only when invalid
    if (!valid) {
        event.preventDefault();
    }

    // if valid, browser automatically submits
    // POST request goes to submit-form.php
});
