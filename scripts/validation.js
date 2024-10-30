let validated = {
    name: false,
    email: false,
    password: false
};

function validateName(inputRef) {
    const name = inputRef.value;
    if (name.trim().split(' ').length == 2) {
        validated.name = true
        removeErrorMessage(inputRef);
    } else {
        validated.name = false;
        appendErrorMessage(inputRef, 'Please enter first and last name.');
    }
}

function getUpperCaseName(nameInput="") {
    let splitName = nameInput.split(' ');
    splitName = splitName.map(name => name = name[0].toUpperCase() + name.slice(1));
    const upperCaseName = splitName[0] + " " + splitName[1];
    return upperCaseName
}

function validateEmail(inputRef) {
    const email = inputRef.value;
    if (email.includes('@') && email.includes('.')) {
        validated.email = true;
        removeErrorMessage(inputRef);
    } else {
        validated.email = false;
        appendErrorMessage(inputRef, 'Please enter valid email address.');
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

//to minimize html restructuring, this function wraps the input field in a div and creates the error message absolute below the wrapper
function appendErrorMessage(inputRef, errorMessage) {
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

function removeErrorMessage(inputRef) {
    const errorText = document.getElementById('error' + inputRef.id);
    errorText && errorText.remove();
    inputRef.classList.remove('inputError');
}