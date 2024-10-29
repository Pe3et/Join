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
    containerTransitionEffectToSignUp(containerRef);
}

function renderSignUp() {
    const containerRef = document.getElementById('contentContainer');
    containerRef.innerHTML = getSignUpTemplate();
    document.getElementById('signUpOption').classList.add('dnone');
    containerTransitionEffectToLogin(containerRef);
}

function containerTransitionEffectToSignUp(containerRef) {
    containerRef.style.minHeight = `0`;
    containerRef.style.minWidth = `0`;
    setTimeout( () => {
        containerRef.style.maxHeight = `${containerRef.getBoundingClientRect().height}px`;
        containerRef.style.maxWidth = `${containerRef.getBoundingClientRect().width}px`;
    }, 300);
}

function containerTransitionEffectToLogin(containerRef) {
    containerRef.style.maxHeight = '1000px';
    containerRef.style.maxWidth = '1000px';
    setTimeout( () => {
        containerRef.style.minHeight = `${containerRef.getBoundingClientRect().height}px`;
        containerRef.style.minWidth = `${containerRef.getBoundingClientRect().width}px`;
    }, 300);
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

}