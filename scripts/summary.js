
function initSummary() {
    greeting();
}

function greeting() {
    const greetingContainer = document.getElementById('greetingContainer');
    daytimeGreeting();
    joinStorage.iconInitials == 'G' ? greetGuest() : greetUser();
    greetingContainer.classList.add('greetingAnimation');
}

function daytimeGreeting() {
    let timeOfDay = new Date();
    timeOfDay = timeOfDay.getHours();
    const greetingTextRef = document.getElementById('greetingText');
    let greeting;
    if (timeOfDay < 4) {
        greeting = "Good evening";
    } else if (timeOfDay < 12) {
        greeting = "Good morning";
    } else if (timeOfDay < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    greetingTextRef.innerText = greeting;
}

function greetGuest() {
    const greetingTextRef = document.getElementById('greetingText');
    greetingTextRef.innerText += '!';
}

function greetUser() {
    const greetingTextRef = document.getElementById('greetingText');
    greetingTextRef.innerText += ',';
    document.getElementById('userName').innerText = joinStorage.userName;
}