colors = [
    "#FF7A00",
    "#9327FF",
    "#6E52FF",
    "#FC71FF",
    "#FFBB2B",
    "#1FD7C1",
    "#462F8A",
    "#FF4646",
    "#00BEE8",
    "#FF7A00"
];
let joinStorage = {};
document.addEventListener('DOMContentLoaded', generalInit);

function generalInit() {
    redirectUnauthorizedUserToLogin();
    loadUserIconForHeader();
    const headerDropdown = document.getElementById('headerDropdown');
    if(headerDropdown) {
        document.addEventListener('click', closeHeaderDropdownCheck);
    }
}

function redirectUnauthorizedUserToLogin() {
    const userIsAuthorized = JSON.parse(sessionStorage.getItem('loggedIn')) ?? false;
    joinStorage = JSON.parse(localStorage.getItem('joinStorage')) ?? {rememberMe: false};
    if ((userIsAuthorized == false) 
        && (window.location.pathname.split("/").pop() != 'index.html')
        && joinStorage.rememberMe == false) {
        location.href = "./index.html";
    }
}

function loadUserIconForHeader() {
    const headerIconTextRef = document.querySelector('.userIcon p');
    if(headerIconTextRef) {
        headerIconTextRef.innerText = joinStorage.iconInitials;
    }
}

function getRandomColor() {
    const randomColor = colors[(Math.round(Math.random() * (colors.length - 1)))];
    return randomColor;
}

function goBack() {
    window.history.back();
}

function toggleHeaderDropdown() {
    const headerDropdown = document.getElementById('headerDropdown');
    headerDropdown.classList.toggle('dnone');
}

function closeHeaderDropdownCheck(event) {
    const headerDropdown = document.getElementById('headerDropdown');
    const clickedElement = event.target;
    if ((!headerDropdown.classList.contains('dnone') && !headerDropdown.contains(clickedElement)) || document.querySelector('.userIcon').contains(clickedElement)) {
        toggleHeaderDropdown();
    }
}

function logOut() {
    localStorage.clear();
    sessionStorage.clear();
    location.href = './index.html'
}
