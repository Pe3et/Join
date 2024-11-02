window.addEventListener('resize', ensureCorrectContainerTransitionOnRezise);
let containerMode = 'login';
let policyAccepted = false;

function initLogin() {
    startAnimation();
    joinStorage.rememberMe == true ? location.href = '../summary.html' : renderLogin();
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
    joinStorage.rememberMe == true && toggleCheckbox('checked');
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

function toggleRememberMe() {
    const checkbox = document.getElementById('checkbox');
    joinStorage.rememberMe = !joinStorage.rememberMe;
    checkbox.addEventListener('click', toggleRememberMe);
}

async function checkLoginSucces() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const contactResults = await getFromDB('contacts');
    let loginSucces = false;
    if(contactResults) {
        Object.keys(contactResults).forEach(id => {
            if (contactResults[id].email == email && contactResults[id].password == password) {
                loginSucces = true;
                localStoreActiveUser(contactResults[id].name);
                location.href = "../summary.html"
            }
        });
    }
    (loginSucces == false) && loginError();
}

function loginError() {
    document.getElementById('emailInput').classList.add('inputError');
    removeErrorMessage(document.getElementById('passwordInput'));
    appendErrorMessage(document.getElementById('passwordInput'), 'Check your email and password. Please try again.')
}

function localStoreActiveUser(name) {
    joinStorage.userName = name;
    joinStorage.iconInitials = `${name[0]}${name.split(" ")[1][0]}`;
    localStorage.setItem('joinStorage', JSON.stringify(joinStorage));
    sessionStorage.setItem('loggedIn', JSON.stringify(true));
}

function loginGuest() {
    localStorage.clear();
    joinStorage = {iconInitials: 'G', rememberMe: false};
    localStorage.setItem('joinStorage', JSON.stringify(joinStorage));
    sessionStorage.setItem('loggedIn', JSON.stringify(true));
    location.href = '../summary.html'
}

async function signUp() {
    const newUser = {};
    newUser.name = getUpperCaseName(document.getElementById('nameInput').value);
    newUser.email = document.getElementById('emailInput').value;
    newUser.password = document.getElementById('confirmPasswordInput').value;
    newUser.color = getRandomColor();
    newUser.phone = '';
    await postToDB(newUser, 'contacts');
    localStoreActiveUser(newUser.name);
    signUpSuccessAnimationAndRedirect();
}

function signUpSuccessAnimationAndRedirect() {
    document.querySelector('.signUpSuccess').classList.remove('signupSuccessAnimationStartpoint');
    document.querySelector('.signUpSuccessBackground').classList.remove('hidden');
    document.querySelector('.signUpSuccessBackground').classList.remove('animationBackgroundColor');
    setTimeout(()=>{location.href = '../summary.html'}, 1000)
}

function togglePolicyAccept() {
    const checkbox = document.getElementById('checkbox');
    policyAccepted = !policyAccepted;
    checkbox.addEventListener('click', togglePolicyAccept);
    policyAccepted == true && validateSignUpInput();
}

function validateSignUpInput() {
    validateName(document.getElementById('nameInput'));
    validateEmail(document.getElementById('emailInput'));
    validateConfirmedPassword(document.getElementById('confirmPasswordInput'));
    if(validated.name == true && validated.email == true && validated.password == true && policyAccepted) {
        enableSignUpButton();
    } else {
        disableSignUpButton();
        togglePolicyAccept();
        toggleCheckbox('unchecked');
    }
}

function enableSignUpButton() {
    const signUpButton = document.getElementById('signUpButton');
    signUpButton.classList.remove('disabledButton');
    signUpButton.addEventListener('click', signUp);
}

function disableSignUpButton() {
    const signUpButton = document.getElementById('signUpButton');
    signUpButton.classList.add('disabledButton');
    signUpButton.removeEventListener('click', signUp);
}

function getPasswordVisibilityIcon(passwordInputRef) {
    if (passwordInputRef.value) {
        passwordInputRef.style.backgroundImage = 'none';
        const visibilityIcon = createVisibilityIcon(false);
        !passwordInputRef.closest('.passwordWrapper').querySelector('.visibilityIcon') && passwordInputRef.insertAdjacentElement('beforebegin', visibilityIcon);
    } else {
        passwordInputRef.closest('.passwordWrapper').querySelector('.visibilityIcon').remove();
        passwordInputRef.style.backgroundImage = 'url(../assets/img/login_lock.svg)';
    }
}

function createVisibilityIcon(isPasswordVisible = false) {
    const visibilityIcon = document.createElement('div');
    visibilityIcon.classList.add('visibilityIcon');
    if (isPasswordVisible) {
        visibilityIcon.innerHTML = getPasswordVisbilityOnSVG();
    } else {
        visibilityIcon.innerHTML = getPasswordVisibilityOffSVG();
    }
    return visibilityIcon;
}

function togglePasswordVisibility(svgRef) {
    const passwordWrapperRef = svgRef.closest('.passwordWrapper');
    const passwordInputRef = passwordWrapperRef.querySelector('input');
    passwordWrapperRef.querySelector('.visibilityIcon').remove();
    if (passwordInputRef.type == 'password') {
        passwordWrapperRef.append(createVisibilityIcon(true));
        passwordInputRef.type = 'text'
    } else {
        passwordWrapperRef.append(createVisibilityIcon(false));
        passwordInputRef.type = 'password'
    }
    passwordInputRef.focus();
}