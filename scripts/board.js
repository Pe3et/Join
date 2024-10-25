let tasks = [];
let noTasks = {toDo: true, inProgress: true, awaitFeedback: true, done: true};

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
    });
    checkNoTaskDisplayNone();
}

function checkNoTaskDisplayNone() {
    Object.keys(noTasks).forEach((noTask) => {
        const containerRef = document.getElementById(noTask + "NoTasks");
        noTasks[noTask] ? containerRef.classList.remove("dnone") : containerRef.classList.add("dnone");
    });
}

function getTaskCardTemplate(task) {
    return `
        <div id="${task.id}" class="taskCardWithProgress">
            <div class="taskCategoryArea">
              <div class="userstory">
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
              <div class="iconsArea">
                <div class="iconWithLetters">
                  <span>AM</span>
                </div>
                <div class="iconWithLetters overlap">
                  <span>BA</span>
                </div>
                <div class="iconWithLetters overlap2">
                  <span>ME</span>
                </div>
              </div>
              <img src="./assets/img/Prio media =.svg" alt="">
            </div>
        </div>
    `
}
