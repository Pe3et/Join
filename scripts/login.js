window.addEventListener('resize', ensureCorrectContainerTransitionOnRezise);
let containerMode = 'login';
let policyAccepted = false;
let signUpValidation = {

}
let user = {

};

function initLogin() {
    startAnimation();
    renderLogin();
}

function startAnimation() {
    const logo = document.querySelector('.logo');
    const logoContainer = document.getElementById('logoContainer');
    logo.classList.add('logoEndPoint');
    document.querySelectorAll('.logo .logoFill').forEach( e => e.style.fill = "#2A3647");
    logoContainer.style.background = "#2a364700";
    setTimeout( () => logoContainer.style.height = 0, 800);
}

function renderLogin() {
    const containerRef = document.getElementById('contentContainer');
    containerRef.innerHTML = getLoginTemplate();
    document.getElementById('signUpOption').classList.remove('dnone');
    containerMode = "login";
    setupContainerTransition(containerRef);
}

function renderSignUp() {
    const containerRef = document.getElementById('contentContainer');
    containerRef.innerHTML = getSignUpTemplate();
    document.getElementById('signUpOption').classList.add('dnone');
    containerMode = "signup";
    setupContainerTransition(containerRef);
}

function setupContainerTransition(containerRef) {
    let transitionDirection = { start: '', end: ''};
    let startValue = containerMode == 'login' ? 0 : '1000px';
    containerMode == 'login' ? transitionDirection = {start:'min', end:'max'} : transitionDirection = {start:'max', end:'min'};
    containerRef.style[`${transitionDirection.start}Height`] = startValue;
    containerRef.style[`${transitionDirection.start}Width`] = startValue;
    setTimeout( () => {
        containerRef.style[`${transitionDirection.end}Height`] = `${containerRef.getBoundingClientRect().height}px`;
        containerRef.style[`${transitionDirection.end}Width`] = `${containerRef.getBoundingClientRect().width}px`;
    }, 125);
}

function ensureCorrectContainerTransitionOnRezise() {
    const containerRef = document.getElementById('contentContainer');
    containerRef.style.maxHeight = '';
    containerRef.style.maxWidth = '';
    containerRef.style.minHeight = '';
    containerRef.style.minWidth = '';
    setupContainerTransition(containerRef);
}

function toggleCheckbox(status) {
    const checkbox = document.getElementById('checkbox');
    checkbox.innerHTML = getCheckboxSVG(status);
    if (status == 'checked') {
        checkbox.setAttribute('onclick', "toggleCheckbox('unchecked')");
    } else {
        checkbox.setAttribute('onclick', "toggleCheckbox('checked')");
    }
}

function login() {

}

function loginGuest() {
    
}

function signUp() {
    console.log('test');
}

function togglePolicyAccept() {
    const checkbox = document.getElementById('checkbox');
    policyAccepted ? policyAccepted = false : policyAccepted = true;
    checkbox.addEventListener('click', togglePolicyAccept);
}

function validateSignUpInput(refID) {
    
}

function enableSignUpButton() {
    const signUpButton = document.getElementById('signUpButton');
    signUpButton.classList.remove('disabledButton');
    signUpButton.onclick = 'signUp()';
}

function disableSignUpButton() {
    const signUpButton = document.getElementById('signUpButton');
    signUpButton.classList.add('disabledButton');
    signUpButton.onclick = '';
}