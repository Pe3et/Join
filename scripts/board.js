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
        renderPrioIcon(task);
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

function renderPrioIcon(task) {
    const prioIconRef = document.getElementById("prioIcon" + task.id);
    switch (task.prio) {
        case "low":
            prioIconRef.innerHTML = getPrioLowSVG();
            break;
        case "medium":
            prioIconRef.innerHTML = getPrioMediumSVG();
            break;
        case "urgent":
            prioIconRef.innerHTML = getPrioUrgentSVG();
            break;
        default:
            break;
    }
}

function openBoardOverlay(task) {
    document.getElementById("boardOverlayContainer").classList.add('overlayAppear');
    document.getElementById("boardOverlayContainer").classList.add('overlayBackgroundColor');
    document.getElementById("boardCardOverlay").classList.add('slideInRight');
    //TODO: Render Overlay card
}

function closeBoardOverlay() {
    document.getElementById("boardOverlayContainer").classList.remove('overlayBackgroundColor');
    document.getElementById("boardCardOverlay").classList.remove('slideInRight');
    setTimeout(() => {
        document.getElementById("boardOverlayContainer").classList.remove('overlayAppear')
    }, 300);
}