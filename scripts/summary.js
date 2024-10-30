
function initSummary() {
    greeting();
}

function greeting() {
    daytimeGreeting();
    document.getElementById('userName').innerText = localStorage.getItem('userName');
}

function daytimeGreeting() {
    let timeOfDay = new Date();
    timeOfDay = timeOfDay.getHours();
    const greetingTextRef = document.getElementById('greetingText');
    let greeting;
    if (timeOfDay < 6) {
        greeting = "Good night,";
    } else if (timeOfDay < 12) {
        greeting = "Good morning,";
    } else if (timeOfDay < 18) {
        greeting = "Good afternoon,";
    } else {
        greeting = "Good evening,";
    }
    greetingTextRef.innerText = greeting;
}