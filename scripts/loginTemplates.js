function getCheckboxSVG(status) {
    switch (status) {
        case "checked":
            return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                        <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`;
        case "unchecked":
            return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                    </svg>`;
        default:
            break;
    }
}

function getLoginTemplate() {
    return `
            <h1>Log in</h1>
            <div class="spacer"></div>
            <input type="text" id="emailInput" placeholder="Email">
            <input type="text" id="passwordInput" placeholder="Password">
            <div class="rememberMe">
                <div id="checkbox" onclick="toggleRememberMe('checked')">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1.5" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                    </svg>
                </div>
                <p>Remember me</p>
            </div>
            <div class="buttonContainer">
                <div id="loginButton" class="fullButton button" onclick="login()">Log in</div>
                <div id="loginGuestButton" class="hollowButton button" onclick="loginGuest()">Guest Log in</div>
            </div>
    `
}

function getSignUpTemplate() {
    return `
            <div id="backArrow" onclick="renderLogin()">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.43701 9.16673H19.333C20.0694 9.16673 20.6663 9.76368 20.6663 10.5001C20.6663 11.2364 20.0694 11.8334 19.333 11.8334H4.43701L10.6463 18.0427C11.167 18.5634 11.167 19.4074 10.6463 19.9281C10.1257 20.4487 9.28163 20.4487 8.76101 19.9281L0.74722 11.9143C-0.0338288 11.1332 -0.0338272 9.8669 0.747221 9.08585L8.76101 1.07206C9.28163 0.55144 10.1257 0.551441 10.6463 1.07206C11.167 1.59268 11.167 2.43677 10.6463 2.95739L4.43701 9.16673Z" fill="#29ABE2"/>
                </svg>
            </div>                
            <h1>Sign up</h1>
            <div class="spacer"></div>
            <input type="text" id="nameInput" placeholder="Name">
            <input type="text" id="emailInput" placeholder="Email">
            <input type="text" id="passwordInput" placeholder="Password">
            <input type="text" id="confirmPasswordInput" placeholder="Confirm Password">
            <div class="acceptPrivatePolicy">
                <div id="checkbox" onclick="toggleCheckbox('checked')">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1.5" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                    </svg>
                </div>
                <p>I accept the <a href="#">Privacy policy</a></p>
            </div>
            <div class="button fullButton" onclick="signUp()">Sign up</div>
    `
}