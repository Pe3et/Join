let provided = {
    name: false,
    email: false,
    password: false
};

let validated = {
    name: false,
    email: false,
    password: false
};

function checkProvidedInput(inputRef) {
    const inputType = inputRef.id.slice(0, -5); //the id's are built like 'nameInput', so the type would be 'name'
    inputRef.value.trim() != '' ? provided[inputType] = true : provided[inputType] = false;
}

function validateName(inputRef) {
    const name = inputRef.value;
    if (name.trim().split(' ').length == 2) {
        validated.name = true
        removeErrorMessage(inputRef);
    } else {
        validated.name == false;
        appendErrorMessage(inputRef, 'Please enter first and last name.');
    }
}

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
    errorText.remove();
    inputRef.classList.remove('inputError');
}