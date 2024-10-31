const activePrioColors = {
    urgent: "#FF3D00",
    medium: "#FFA800",
    low: "#7AE229"
};
let newTask = {
    title: "",
    description: "",
    assignedContacts: [],
    dueDate: "",
    prio: "medium",
    category: "",
    subtasks: [],
    status: "toDo"
};

async function initAddTaskForm() {
    await renderContactsDropdown();
    document.addEventListener("click", (event) => closeDropdownCheck(event.target, "assignedToDropdown"));
    document.addEventListener("click", (event) => closeDropdownCheck(event.target, "categoryDropdown"))
}

async function renderContactsDropdown() {
    const dropdownRef = document.getElementById("assignedToDropdown");
    dropdownRef.innerHTML = "";
    const contactResults = await getFromDB("contacts");
    contactsArray = getContactsArray(contactResults);
    contactsArray.forEach(contact => dropdownRef.innerHTML += getContactDropdownTemplate(contact));
}

function setActivePrio(prio) {
    document.querySelectorAll(".prio").forEach(element => {
        element.classList.remove("activePrio");
        element.style.background = "white";
    });
    const clickedPrioRef = document.getElementById((prio) + "Prio");
    clickedPrioRef.classList.add("activePrio");
    clickedPrioRef.style.background = activePrioColors[prio];
    newTask.prio = prio;
}

function toggleDropdown(dropdownID) {
    const dropdown = document.getElementById(dropdownID);
    const dropdownArrow = document.querySelector(`#${dropdownID}Button svg`);
    dropdown.style.display === "block" ? dropdown.style.display = "none" : dropdown.style.display = "block";
    dropdownArrow.classList.toggle("arrowFlip");
}

function closeDropdownCheck(clickedElement, dropdownID) {
    try {
        if (!document.getElementById(dropdownID).contains(clickedElement) &&
            !document.getElementById(dropdownID + "Button").contains(clickedElement) &&
            window.getComputedStyle(document.getElementById(dropdownID)).display != "none"
            ){
            toggleDropdown(dropdownID);
        }
    } catch (error) {
        //to prevent error messages in console, when navigating overlays on the board without dropdowns
        return 
    }   
}

function assignContact(contact) {
    const idElement = document.getElementById(contact.id);
    const svgElement = document.querySelector(`#${contact.id} svg`);
    idElement.classList.toggle("activeDropdownContact");
    if(idElement.classList.contains("activeDropdownContact")){
        svgElement.innerHTML = getCheckboxSVG("checked");  
        !newTask.assignedContacts.some(c => c.id == contact.id) && newTask.assignedContacts.push(contact); //if contact isn't already assigned to assignedContacts, only then assign contact (to fix icon-duplication bug in board editTask)
    } else {
        svgElement.innerHTML = getCheckboxSVG("unchecked");
        newTask.assignedContacts = newTask.assignedContacts.filter(item => item.id != contact.id);
    }
    renderAssignedContactsIconRow()
}

function renderAssignedContactsIconRow() {
    const rowRef = document.getElementById("assignedContactsIconRow");
    rowRef.innerHTML = "";
    newTask.assignedContacts.forEach(contact => {
        rowRef.innerHTML += `<div class="contactIcon" style='background: ${contact.color}'><p>${contact.name[0]}${contact.name.split(" ")[1][0]}</p></div>`
    });
}

function setCategory(category) {
    document.querySelector("#categoryDropdownButton p").innerHTML = category;
    newTask.category = category;
    toggleDropdown("categoryDropdown");
}

function toggleSubtaskInputIcons() {
    setTimeout( () => {
        document.getElementById("subtaskInputClearIcon").classList.toggle("dnone");
        document.getElementById("subtaskInputCheckIcon").classList.toggle("dnone");
        document.getElementById("subtaskInputIconSpacer").classList.toggle("dnone");
        document.getElementById("subtaskPlusIcon").classList.toggle("dnone");
    }, 100)
}

function clearSubtaskInput() {
    document.getElementById("subtaskInput").value = "";
}

function addSubtask() {
    newTask.subtasks.push({
        text: document.getElementById("subtaskInput").value,
        status: "unchecked"
    });
    clearSubtaskInput();
    renderSubtaskList(newTask.subtasks)
}

function renderSubtaskList(subtasks) {
    const listRef = document.getElementById("subtaskListContainer");
    listRef.innerHTML = "";
    subtasks.forEach((subtask, index) => listRef.innerHTML += getSubtaskListTemplate(subtask.text, index));
}

function deleteSubtask(index) {
    newTask.subtasks.splice(index, 1);
    renderSubtaskList(newTask.subtasks);
}

function editSubtaskMode(index) {
    const liElement = document.getElementById(`subtaskLiElement${index}`);
    liElement.contentEditable = true;
    liElement.focus();
    const subtaskElement = liElement.parentNode;
    subtaskElement.classList.add("subtaskEditMode");
    liElement.addEventListener("focusout", () => setTimeout(() => exitEditSubtaskMode(index), 100) , { once: true });
    swapSubtaskEditIcon(index, true);
}

function swapSubtaskEditIcon(index, editMode = true) {
    const iconRef = document.getElementById(`subtaskEditIcon${index}`);
    if (editMode) {
        iconRef.innerHTML = getSubtaskCheckIcon();
        iconRef.onclick = `exitEditSubtaskMode(${index})`
    } else {
        iconRef.innerHTML = getSubtaskEditIcon();
        iconRef.onclick = `editSubtaskMode(${index})`
    }
}

function exitEditSubtaskMode(index) {
    const liElement = document.getElementById(`subtaskLiElement${index}`)
    try {
        liElement.contentEditable = false;
        const subtaskElement = liElement.parentNode;
        subtaskElement.classList.remove("subtaskEditMode");
        swapSubtaskEditIcon(index, false);
        newTask.subtasks[index].text = liElement.innerText;
    } catch (error) {
        return
    }
}

async function createTask() {
    if(taskValidation()) {
        newTask.title = document.getElementById("titleInput").value;
        newTask.description = document.getElementById("descriptionInput").value;
        newTask.dueDate = document.getElementById("dateInput").value;
        await postToDB(newTask,"tasks");
        location.href = "../board.html";
    }
}

async function clearTask() {
    resetTaskJSON();
    document.getElementById("titleInput").value = "";
    document.getElementById("descriptionInput").value = "";
    await renderContactsDropdown();
    document.getElementById("assignedContactsIconRow").innerHTML = "";  
    document.getElementById("dateInput").value = "";
    setActivePrio("medium");
    document.querySelector("#categoryDropdownButton p").innerText = "Select task category";
    document.getElementById("subtaskInput").value = "";
    document.getElementById("subtaskListContainer").innerHTML = "";
}

function resetTaskJSON(){
    newTask.title = "";
    newTask.description = "";
    newTask.assignedContacts = [];
    newTask.dueDate = "";
    newTask.prio = "medium"
    newTask.category = "";
    newTask.subtasks = [];
    newTask.status = "toDo"
}

function taskValidation(editMode = false) {
    validated = {};
    validateInputNotEmpty(document.getElementById('titleInput'));
    validateInputNotEmpty(document.getElementById('dateInput'));
    !editMode && validateTaskCategory();
    if (validated.title && validated.date && (validated.category || editMode)) {
        return true
    } else {
        return false
    }
}