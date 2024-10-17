const activePrioColors = {
    urgent: "#FF3D00",
    medium: "#FFA800",
    low: "#7AE229"
};

function setActivePrio(prio){
    document.querySelectorAll(".prio").forEach(element => {
        element.classList.remove("activePrio");
        element.style.background = "white";
    });
    const clickedPrioRef = document.getElementById((prio) + "Prio");
    clickedPrioRef.classList.add("activePrio");
    clickedPrioRef.style.background = activePrioColors[prio];
    //TODO: functionality
}