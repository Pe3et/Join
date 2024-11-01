let validated = {
    name: false,
    email: false,
    password: false,
    title: false,
    dueDate: false,
    category: false
};

function validateName(inputRef, errorContainer = inputRef) {
    const name = inputRef.value;
    if (name.trim().split(' ').length == 2) {
        validated.name = true
        removeErrorMessage(errorContainer);
    } else {
        validated.name = false;
        appendErrorMessage(errorContainer, 'Please enter first and last name.');
    }
}

function getUpperCaseName(nameInput="") {
    let splitName = nameInput.trim().split(' ');
    splitName = splitName.map(name => name = name[0].toUpperCase() + name.slice(1));
    const upperCaseName = splitName[0] + " " + splitName[1];
    return upperCaseName
}

function validateEmail(inputRef, errorContainer = inputRef) {
    const email = inputRef.value;
    if (email.includes('@') && email.includes('.')) {
        validated.email = true;
        removeErrorMessage(errorContainer);
    } else {
        validated.email = false;
        appendErrorMessage(errorContainer, 'Please enter valid email address.');
    }
}

function validateConfirmedPassword(inputRef) {
    const password = inputRef.value;
    const checkPassword = document.getElementById('passwordInput').value;
    if (password == checkPassword && password.trim() != '') {
        validated.password = true;
        removeErrorMessage(inputRef);
    } else {
        validated.password = false;
        appendErrorMessage(inputRef, "Your passwords don't match. Please try again.");
    }
}

function validateInputNotEmpty(inputRef) {
    const inputValue = inputRef.value;
    const inputType = inputRef.id.slice(0, -5);
    if (inputValue.trim() != '') {
        validated[inputType] = true
        removeErrorMessage(inputRef);
    } else {
        validated[inputType] = false;
        appendErrorMessage(inputRef, 'This field is required.');
    }
}

function validateTaskCategory() {
    const categoryTextRef = document.querySelector('#categoryDropdownButton p');
    if (categoryTextRef.textContent != 'Select task category') {
        validated.category = true;
        categoryTextRef.style.color = '';
        categoryTextRef.parentElement.style.border = '1px solid #d1d1d1'
    } else {
        validated.category = false;
        categoryTextRef.style.color = '#FF8190';
        categoryTextRef.parentElement.style.border = '1px solid #FF001F'
    }
}

//to minimize html restructuring, this function wraps the input field in a div and creates the error message absolute below the wrapper
function appendErrorMessage(inputRef, errorMessage) {
    if(!inputRef.classList.contains('inputError')){
        const errorText = document.createElement('p');
        const validationContainer = document.createElement('div');
        validationContainer.classList.add('validationContainer');
        inputRef.insertAdjacentElement('beforebegin', validationContainer);
        validationContainer.append(inputRef);
        errorText.classList.add('errorText');
        errorText.innerText = errorMessage;
        errorText.id = 'error' + inputRef.id;
        inputRef.classList.add('inputError');
        inputRef.insertAdjacentElement('afterend', errorText);
    }
}

function removeErrorMessage(inputRef) {
    const errorText = document.getElementById('error' + inputRef.id);
    errorText && errorText.remove();
    inputRef.classList.remove('inputError');
}