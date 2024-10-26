let tasks = [];
let noTasks = {toDo: true, inProgress: true, awaitFeedback: true, done: true};
const categoryColors = {
    "User Story": "#0038FF",
    "Technical Task": "#1FD7C1"
};

async function initBoard() {
    await getTasksFromDB();
    renderTasks();
}

async function getTasksFromDB() {
    let fetchResult = await getFromDB("tasks");
    Object.keys(fetchResult).forEach(key => {
        tasks.push({
            id: key,
            assignedContacts: fetchResult[key].assignedContacts,
            category: fetchResult[key].category,
            description: fetchResult[key].description,
            dueDate: fetchResult[key].dueDate,
            prio: fetchResult[key].prio,
            subtasks: fetchResult[key].subtasks,
            title: fetchResult[key].title,
            status: fetchResult[key].status
        })
    });
}

function renderTasks() {
    tasks.forEach(task => {
        const containerRef = document.getElementById(`${task.status}Container`);
        containerRef.innerHTML += getTaskCardTemplate(task);
        noTasks[task.status] = false; //to give dnone to the noTask-div's after checkNoTaskDisplayNone()
        renderContactIcons(task);
        const prioIconRef = document.getElementById("prioIcon" + task.id);
        prioIconRef.innerHTML = getPrioSVG(task.prio);
    });
    checkNoTaskDisplayNone();
}

function checkNoTaskDisplayNone() {
    Object.keys(noTasks).forEach((noTask) => {
        const containerRef = document.getElementById(noTask + "NoTasks");
        noTasks[noTask] ? containerRef.classList.remove("dnone") : containerRef.classList.add("dnone");
    });
}

function renderContactIcons(task) {
    const containerRef = document.getElementById("contactIconsArea" + task.id);
    let rightOffset = 0;
    task.assignedContacts.forEach( (contact) => {
        const contactIcon = document.createElement("div");
        contactIcon.classList.add("iconWithLetters");
        contactIcon.style.background = contact.color;
        contactIcon.innerText = contact.name[0] + contact.name.split(" ")[1][0];
        contactIcon.style.right = rightOffset + "px";
        containerRef.append(contactIcon);
        rightOffset += 8;
    });
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

function openBoardOverlay(task) {
    renderOverlayTask(task);
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

function renderOverlayTask(task) {
    const containerRef = document.getElementById('boardCardOverlay');
    containerRef.innerHTML = getOverlayTaskCard(task);
    const prioIconRef = document.getElementById('overlayPrio' + task.id);
    prioIconRef.innerHTML = getPrioSVG(task.prio);
    const contactsListRef = document.getElementById('overlayAssignedContactsList' + task.id);
    task.assignedContacts.forEach(contact => contactsListRef.innerHTML += getOverlayContactTemplate(contact));
    const subtasksRef = document.getElementById('overlaySubtasks' + task.id);
    task.subtasks.forEach( (subtask, index) => {
        subtasksRef.innerHTML += getOverlaySubtaskTemplate(subtask.text, index);
        document.getElementById("subtaskCheckbox" + index).innerHTML = getSubtaskCheckboxSVG(subtask.status);
    });
}
