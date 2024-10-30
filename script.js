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
document.addEventListener('DOMContentLoaded', redirectUnauthorizedUserToLogin);

function getRandomColor() {
    const randomColor = colors[(Math.round(Math.random() * (colors.length - 1)))];
    return randomColor;
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