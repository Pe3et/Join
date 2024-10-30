
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
        greeting = "Good Night,";
    } else if (timeOfDay < 12) {
        greeting = "Good Morning,";
    } else if (timeOfDay < 18) {
        greeting = "Welcome,";
    } else {
        greeting = "Good Evening,";
    }
    greetingTextRef.innerText = greeting;
}