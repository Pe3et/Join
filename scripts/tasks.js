window.addEventListener("DOMContentLoaded", renderContactsDropdown);
const activePrioColors = {
    urgent: "#FF3D00",
    medium: "#FFA800",
    low: "#7AE229"
};
let assignedContacts = [];
let subtasks = [];

async function renderContactsDropdown() {
    const dropdownRef = document.getElementById("assignedToDropdown");
    const contactResults = await getFromDB("contacts");
    contactsArray = getContactsArray(contactResults);
    contactsArray.forEach(contact => dropdownRef.innerHTML += getContactDropdownTemplate(contact));
}

function getContactDropdownTemplate(contact) {
    return `
        <div class="dropdownContent" id="${contact.id}" onclick='assignContact(${JSON.stringify(contact)})'>
            <div class="dropdownContactIconAndName">
              <div class="contactIcon" style='background: ${contact.color}'><p>${contact.name[0]}${contact.name.split(" ")[1][0]}</p></div>
              <p>${contact.name}</p>
            </div>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
            </svg>
        </div>
    `
}

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

function toggleDropdown(dropdownID) {
    const dropdown = document.getElementById(dropdownID);
    const dropdownArrow = document.querySelector(`#${dropdownID}Button svg`);
    dropdown.style.display === "block" ? dropdown.style.display = "none" : dropdown.style.display = "block";
    dropdownArrow.classList.toggle("arrowFlip");
}

function assignContact(contact) {
    const idElement = document.getElementById(contact.id);
    const svgElement = document.querySelector(`#${contact.id} svg`);
    idElement.classList.toggle("activeDropdownContact");
    if(idElement.classList.contains("activeDropdownContact")){
        svgElement.innerHTML = getCheckboxSVG("checked");
        assignedContacts.push(contact);
    } else {
        svgElement.innerHTML = getCheckboxSVG("unchecked");
        assignedContacts = assignedContacts.filter(item => item.id != contact.id);
    }
    renderAssignedContactsIconRow()
}

function getCheckboxSVG(status) {
    switch (status) {
        case "checked":
            return `<path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M5 9L9 13L17 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
        case "unchecked":
            return '<rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>';
        default:
            break;
    }
}

function renderAssignedContactsIconRow() {
    const rowRef = document.getElementById("assignedContactsIconRow");
    rowRef.innerHTML = "";
    assignedContacts.forEach(contact => rowRef.innerHTML += `<div class="contactIcon" style='background: ${contact.color}'><p>${contact.name[0]}${contact.name.split(" ")[1][0]}</p></div>`);
}

function setCategory(category) {
    document.querySelector("#categoryDropdownButton p").innerHTML = category;
    toggleDropdown("categoryDropdown");
}

function toggleSubtaskInputIcons() {
    document.getElementById("subtaskInputClearIcon").classList.toggle("dnone");
    document.getElementById("subtaskInputCheckIcon").classList.toggle("dnone");
    document.getElementById("subtaskInputIconSpacer").classList.toggle("dnone");
    document.getElementById("subtaskPlusIcon").classList.toggle("dnone");
}

function clearSubtaskInput() {
    document.getElementById("subtaskInput").value = "";
    toggleSubtaskInputIcons();
}

function addSubtask() {
    subtasks.push(document.getElementById("subtaskInput").value);
    clearSubtaskInput();
    renderSubtaskList();
}

function renderSubtaskList() {
    const listRef = document.getElementById("subtaskListContainer");
    listRef.innerHTML = "";
    subtasks.forEach(subtask => listRef.innerHTML += getSubtaskListTemplate(subtask));
}

function getSubtaskListTemplate(subtask) {
    return `
        <div class="subtaskListElement"><li>${subtask}</li><p>test</p>
    `
}