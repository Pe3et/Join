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

function getTaskCardTemplate(task) {
    return `
        <div id="${task.id}" class="taskCardWithProgress">
            <div class="taskCategoryArea">
              <div class="userstory" style="background: ${categoryColors[task.category]}">
                <p>${task.category}</p>
              </div>
            </div>
            <div class="taskTitle">
              <h3>${task.title}</h3>
            </div>
            <div class="shortDescription">
                ${task.description}...
            </div>
            <div class="progressArea">
              <div class="progressBarContainer">
                <div class="progressBar"></div>
              </div>
              <p>0/${task.subtasks.length} Subtasks</p>
            </div>
            <div class="iconsAndPrioArea">
              <div id="contactIconsArea${task.id}" class="contactIconsArea">
              </div>
              <img src="./assets/img/Prio media =.svg" alt="">
            </div>
        </div>
    `
}
