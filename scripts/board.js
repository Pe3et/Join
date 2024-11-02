let tasks = [];
const categoryColors = {
    "User Story": "#0038FF",
    "Technical Task": "#1FD7C1"
};

async function initBoard() {
    await getTasksFromDB();
    renderBoardTasks(tasks);
    window.addEventListener('resize', responsiveAddTaskButtonFunctions);
}

async function getTasksFromDB() {
    let fetchResult = await getFromDB("tasks");
    if(fetchResult) {
        Object.keys(fetchResult).forEach(key => {
            tasks.push({
                id: key,
                assignedContacts: fetchResult[key].assignedContacts ?? [],
                category: fetchResult[key].category,
                description: fetchResult[key].description,
                dueDate: fetchResult[key].dueDate,
                prio: fetchResult[key].prio,
                subtasks: fetchResult[key].subtasks ?? [],
                title: fetchResult[key].title,
                status: fetchResult[key].status
            })
        });
    }
}

function renderBoardTasks(renderTasks) {
    renderTasks.forEach(task => {
        const containerRef = document.getElementById(`${task.status}Container`);
        containerRef.innerHTML += getTaskCardTemplate(task);
        calculateProgressBar(task);
        renderContactIconRow(task);
        const prioIconRef = document.getElementById("prioIcon" + task.id);
        prioIconRef.innerHTML = getPrioSVG(task.prio);
    });
    checkNoTaskDisplayNone(renderTasks);
}

function checkNoTaskDisplayNone(tasksToCheck) {
    let noTasks = { toDo: true, inProgress: true, awaitFeedback: true, done: true };
    tasksToCheck.forEach(task => noTasks[task.status] = false);
    Object.keys(noTasks).forEach((noTask) => {
        const containerRef = document.getElementById(noTask + "NoTasks");
        noTasks[noTask] ? containerRef.classList.remove("dnone") : containerRef.classList.add("dnone");
    });
}

function renderContactIconRow(task) {
    const containerRef = document.getElementById("contactIconsArea" + task.id);
    const assignedContacts = task.assignedContacts;
    const iconRenderAmount = assignedContacts.length > 6 ? 5 : assignedContacts.length;
    let rightOffset = 0;
    for (let i = 0; i < iconRenderAmount; i++) {
        const contact = assignedContacts[i];
        const initials = contact.name[0] + contact.name.split(" ")[1][0]; 
        const bgColor = contact.color;
        renderContactIcon(initials, bgColor, containerRef, rightOffset);
        rightOffset += 8;
    };
    (assignedContacts.length > 6) && renderContactIcon(`+${assignedContacts.length-5}`, 'rgba(42, 54, 71, 1)', containerRef, rightOffset);
}

function renderContactIcon(iconText, bgColor, containerRef, rightOffset) {
    const contactIcon = document.createElement("div");
    contactIcon.classList.add("iconWithLetters");
    contactIcon.style.background = bgColor;
    contactIcon.innerText = iconText;
    contactIcon.style.right = rightOffset + "px";
    containerRef.append(contactIcon);
}

function getPrioSVG(prio) {
    let prioSVG = "";
    switch (prio) {
        case "low":
            prioSVG = getPrioLowSVG();
            break;
        case "medium":
            prioSVG = getPrioMediumSVG();
            break;
        case "urgent":
            prioSVG = getPrioUrgentSVG();
            break;
    }
    return prioSVG
}

function openBoardOverlay() {
    document.getElementById("boardOverlayContainer").classList.add('slideInRight');
    document.getElementById("boardOverlayContainer").classList.add('overlayBackgroundColor');
    document.getElementById("boardCardOverlay").classList.add('slideInRight');
}

function closeBoardOverlay() {
    document.getElementById("boardOverlayContainer").classList.remove('overlayBackgroundColor');
    document.getElementById("boardCardOverlay").classList.remove('slideInRight');
    setTimeout(() => {
        document.getElementById("boardOverlayContainer").classList.remove('slideInRight')
    }, 200);
}

function renderOverlayTaskCard(taskID) {
    let task = tasks.find(t => t.id == taskID);
    const containerRef = document.getElementById('boardCardOverlay');
    containerRef.innerHTML = getOverlayTaskCard(task);
    containerRef.style.width = "525px";
    renderOverlayPrio(task);
    renderOverlayAssignedContactsList(task);
    renderOverlaySubtasks(task);
}

function renderOverlayPrio(task) {
    const prioIconRef = document.getElementById('overlayPrio' + task.id);
    prioIconRef.innerHTML = getPrioSVG(task.prio);
}

function renderOverlayAssignedContactsList(task) {
    const contactsListRef = document.getElementById('overlayAssignedContactsList' + task.id);
    task.assignedContacts.forEach(contact => {
        contactsListRef.innerHTML += getOverlayContactTemplate(contact)
    });
}

function renderOverlaySubtasks(task) {
    const subtasksRef = document.getElementById('overlaySubtasks' + task.id);
    subtasksRef.innerHTML = "";
    task.subtasks.forEach((subtask, index) => {
        subtasksRef.innerHTML += getOverlaySubtaskTemplate(subtask.text, index, task);
        const checkBoxRef = document.getElementById("subtaskCheckbox" + index);
        checkBoxRef.innerHTML = getSubtaskCheckboxSVG(subtask.status);
    });
}

function toggleSubtaskCheck(taskID, subtaskIndex) {
    let task = tasks.find(t => t.id == taskID);
    let subtaskStatus = task.subtasks[subtaskIndex].status;
    const checkBoxRef = document.getElementById("subtaskCheckbox" + subtaskIndex);
    if (subtaskStatus == "unchecked") {
        subtaskStatus = "checked";
        checkBoxRef.innerHTML = getSubtaskCheckboxSVG("checked");
    } else if (subtaskStatus == "checked") {
        subtaskStatus = "unchecked";
        checkBoxRef.innerHTML = getSubtaskCheckboxSVG("unchecked")
    }
    task.subtasks[subtaskIndex].status = subtaskStatus;
    putToDB(subtaskStatus, `tasks/${task.id}/subtasks/${subtaskIndex}/status`);
    renderOverlaySubtasks(task);
    calculateProgressBar(task);
}

async function deleteTask(key) {
    await deleteFromDB("tasks/" + key);
    tasks = tasks.filter(task => task.id != key);
    closeBoardOverlay();
    reloadBoard();
}

function reloadBoard(searchReload = false) {
    document.querySelectorAll(".boardTask").forEach(boardTask => boardTask.remove());
    noTasks = { toDo: true, inProgress: true, awaitFeedback: true, done: true };
    !searchReload && renderBoardTasks(tasks);
}

async function renderOverlayAddTaskCard() {
    const containerRef = document.getElementById('boardCardOverlay');
    containerRef.innerHTML = getOverlayAddTaskCard();
    containerRef.style.width = "auto";
    await renderContactsDropdown();
    document.getElementById("boardCardOverlay").addEventListener("click", (event) => closeDropdownCheck(event.target, "assignedToDropdown"));
    document.getElementById("boardCardOverlay").addEventListener("click", (event) => closeDropdownCheck(event.target, "categoryDropdown"))
    resetTaskJSON();
}

function calculateProgressBar(task) {
    const barRef = document.getElementById(`progressBar${task.id}`);
    const counterRef = document.getElementById(`progressCounter${task.id}`);
    const checkedSubtaskCount = task.subtasks.filter(s => s.status == "checked").length;
    const totalSubtaskCount = task.subtasks.length;
    const progressPercentage = (checkedSubtaskCount / totalSubtaskCount) * 100;
    barRef.style.width = `${progressPercentage}%`;
    counterRef.innerText = `${checkedSubtaskCount}/${totalSubtaskCount} Subtasks`;
}

async function renderEditTask(taskID) {
    let task = tasks.find(t => t.id == taskID);
    const containerRef = document.getElementById('boardCardOverlay');
    containerRef.innerHTML = getOverlayEditTaskCard(task);
    setActivePrio(task.prio);
    await renderContactsDropdown();
    newTask.assignedContacts = task.assignedContacts;
    task.assignedContacts.forEach(contact => assignContact(contact));
    document.getElementById("boardCardOverlay").addEventListener("click", (event) => closeDropdownCheck(event.target, "assignedToDropdown"));
    renderSubtaskList(task.subtasks);
    newTask.subtasks = task.subtasks;
}

async function saveEditTask(key) {
    if(taskValidation(editMode = true)) {
        newTask.title = document.getElementById("titleInput").value;
        newTask.description = document.getElementById("descriptionInput").value;
        newTask.dueDate = document.getElementById("dateInput").value;
        newTask.category = tasks.find(t => t.id == key).category;
        newTask.status = tasks.find(t => t.id == key).status;
        await putToDB(newTask, `tasks/${key}`);
        tasks = [];
        await initBoard();
        reloadBoard();
        renderOverlayTaskCard(tasks.find(t => t.id == key).id);
    }
}

function responsiveAddTaskButtonFunctions() {
    const addTaskButtons = document.querySelectorAll('.plusButton');
    if (window.innerWidth > 1050) {
        addTaskButtons.forEach( b => b.setAttribute('onclick', 'redirectToAddTasks()'));
    } else {
        addTaskButtons.forEach( b => b.setAttribute('onclick', 'redirectToAddTasks()'));
    }
}

function redirectToAddTasks() {
    location.href = 'addTasks.html';
}

function searchBoard(searchRef) {
    const searchText = searchRef.value;
    const searchResult = tasks.filter( task => {
        if(task.title.toLowerCase().includes(searchText) || task.description.toLowerCase().includes(searchText)){
            return true
        }
    });
    reloadBoard(searchReload = true);
    renderBoardTasks(searchResult);
    searchResult.length == 0 ? appendErrorMessage(searchRef.parentElement, 'No results found.') : removeErrorMessage(searchRef.parentElement)
    searchRef.focus();
}