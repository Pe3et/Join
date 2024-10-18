const activePrioColors = {
    urgent: "#FF3D00",
    medium: "#FFA800",
    low: "#7AE229"
};

function setActivePrio(prio) {
    document.querySelectorAll(".prio").forEach(element => {
        element.classList.remove("activePrio");
        element.style.background = "white";
    });
    const clickedPrioRef = document.getElementById((prio) + "Prio");
    clickedPrioRef.classList.add("activePrio");
    clickedPrioRef.style.background = activePrioColors[prio];
    //TODO: functionality
}

function toggleDropdown() {
    const dropdown = document.getElementById("assignedToDropdown");
    dropdown.style.display === "block" ? dropdown.style.display = "none" : dropdown.style.display = "block";
}

function assignContact() {
    const testIdElement = document.getElementById("testId");
    const svgElement = document.querySelector("#testId svg");

    if (testIdElement.style.background === "white" || testIdElement.style.background === "") {
        testIdElement.style.background = "#091931";
        testIdElement.style.color = "white";
        svgElement.innerHTML = `<path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                <path d="M5 9L9 13L17 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    } else {
        testIdElement.style.background = "white";
        testIdElement.style.color = "black";
        svgElement.innerHTML = '<rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>';
    }
}