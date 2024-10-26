function getTaskCardTemplate(task) {
    return `
        <div id="${task.id}" class="boardTask" onclick='openBoardOverlay(${JSON.stringify(task)})'>
            <div class="taskCategoryArea">
              <div class="taskCategory" style="background:${categoryColors[task.category]}">
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
              <p>X/X Subtasks</p>
            </div>
            <div class="iconsAndPrioArea">
              <div id="contactIconsArea${task.id}" class="contactIconsArea">
              </div>
              <div id="prioIcon${task.id}">
              </div>
            </div>
        </div>
    `
}

function getOverlayTaskCard(task) {
    return `
        <div class="overlayCategoryAndCloseButtonContainer">
            <div class="overlayTaskCategory" style="background:${categoryColors[task.category]}; font-size: 23px">
              <p>${task.category}</p>
            </div>
            <div class="overlayCloseButton" onclick="closeBoardOverlay()">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99999 8.40005L2.09999 13.3C1.91665 13.4834 1.68332 13.575 1.39999 13.575C1.11665 13.575 0.883321 13.4834 0.699988 13.3C0.516654 13.1167 0.424988 12.8834 0.424988 12.6C0.424988 12.3167 0.516654 12.0834 0.699988 11.9L5.59999 7.00005L0.699988 2.10005C0.516654 1.91672 0.424988 1.68338 0.424988 1.40005C0.424988 1.11672 0.516654 0.883382 0.699988 0.700049C0.883321 0.516715 1.11665 0.425049 1.39999 0.425049C1.68332 0.425049 1.91665 0.516715 2.09999 0.700049L6.99999 5.60005L11.9 0.700049C12.0833 0.516715 12.3167 0.425049 12.6 0.425049C12.8833 0.425049 13.1167 0.516715 13.3 0.700049C13.4833 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4833 1.91672 13.3 2.10005L8.39999 7.00005L13.3 11.9C13.4833 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4833 13.1167 13.3 13.3C13.1167 13.4834 12.8833 13.575 12.6 13.575C12.3167 13.575 12.0833 13.4834 11.9 13.3L6.99999 8.40005Z" fill="#2A3647"/>
                </svg>
            </div>
        </div>
        <div class="overlayTaskTitle">
          <h3>${task.title}</h3>
        </div>
        <div class="overlayTaskDescription">
            ${task.description}
        </div>
        <div class="overlayDueDateArea">
          <span class="overlayDueDateText">Due date:</span> <span class="overlayDueDate">${task.dueDate}</span>
        </div>
        <div class="overlayPrioArea">
            <span class="overlayPrioText">Priority:</span>
            <span class="overlayPrio">
                ${task.prio.charAt(0).toUpperCase() + task.prio.slice(1)}
                <div id="overlayPrio${task.id}"></div>
            </span>
        </div>
        <div class="assignedToArea">
            <p>Assigned To:</p>
            <div class="assignedContacts" id="overlayAssignedContactsList${task.id}">
            </div>
        </div>
        <div class="overlaySubtasksArea">
            <p>Subtasks</p>
            <div class="overlaySubtasks" id="overlaySubtasks${task.id}">
            </div>
        </div>
        <div class="overlayTaskButtonContainer">
            <p class="overlayTaskButton" onclick="deleteTask('${task.id}')">
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 18C2.95 18 2.47917 17.8042 2.0875 17.4125C1.69583 17.0208 1.5 16.55 1.5 16V3C1.21667 3 0.979167 2.90417 0.7875 2.7125C0.595833 2.52083 0.5 2.28333 0.5 2C0.5 1.71667 0.595833 1.47917 0.7875 1.2875C0.979167 1.09583 1.21667 1 1.5 1H5.5C5.5 0.716667 5.59583 0.479167 5.7875 0.2875C5.97917 0.0958333 6.21667 0 6.5 0H10.5C10.7833 0 11.0208 0.0958333 11.2125 0.2875C11.4042 0.479167 11.5 0.716667 11.5 1H15.5C15.7833 1 16.0208 1.09583 16.2125 1.2875C16.4042 1.47917 16.5 1.71667 16.5 2C16.5 2.28333 16.4042 2.52083 16.2125 2.7125C16.0208 2.90417 15.7833 3 15.5 3V16C15.5 16.55 15.3042 17.0208 14.9125 17.4125C14.5208 17.8042 14.05 18 13.5 18H3.5ZM3.5 3V16H13.5V3H3.5ZM5.5 13C5.5 13.2833 5.59583 13.5208 5.7875 13.7125C5.97917 13.9042 6.21667 14 6.5 14C6.78333 14 7.02083 13.9042 7.2125 13.7125C7.40417 13.5208 7.5 13.2833 7.5 13V6C7.5 5.71667 7.40417 5.47917 7.2125 5.2875C7.02083 5.09583 6.78333 5 6.5 5C6.21667 5 5.97917 5.09583 5.7875 5.2875C5.59583 5.47917 5.5 5.71667 5.5 6V13ZM9.5 13C9.5 13.2833 9.59583 13.5208 9.7875 13.7125C9.97917 13.9042 10.2167 14 10.5 14C10.7833 14 11.0208 13.9042 11.2125 13.7125C11.4042 13.5208 11.5 13.2833 11.5 13V6C11.5 5.71667 11.4042 5.47917 11.2125 5.2875C11.0208 5.09583 10.7833 5 10.5 5C10.2167 5 9.97917 5.09583 9.7875 5.2875C9.59583 5.47917 9.5 5.71667 9.5 6V13Z" fill="#2A3647"/></svg>
                Delete
            </p>
            <div class="overlayTaskButtonSpacer"></div>
            <p class="overlayTaskButton" onclick="TODO:">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/></svg>
                Edit
            </p>
        </div>
    `
}

function getOverlayContactTemplate(contact) {
    return `
        <div class="singleAssignedContact">
            <div class="iconWithLetters" style="background: ${contact.color}">
                ${contact.name[0] + contact.name.split(" ")[1][0]}
            </div>
            <span>${contact.name}</span>
        </div>
    `
}

function getOverlaySubtaskTemplate(subtaskText, subtaskIndex, task) {
    return `
        <div class="singleSubtask">
            <div id="subtaskCheckbox${subtaskIndex}" class="subtaskCheckbox" onclick='toggleSubtaskCheck(${JSON.stringify(task)}, ${subtaskIndex})'>
            </div>
            <p>${subtaskText}</p>
        </div>
    `
}

function getPrioLowSVG() {
    return `
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.99998 7.24524C8.80055 7.24557 8.60628 7.18367 8.44574 7.06863L0.877242 1.63467C0.778768 1.56391 0.695595 1.47498 0.632471 1.37296C0.569347 1.27094 0.527508 1.15784 0.509344 1.0401C0.472658 0.802317 0.53463 0.560105 0.681625 0.366747C0.828621 0.17339 1.0486 0.0447247 1.29317 0.00905743C1.53773 -0.0266099 1.78686 0.0336422 1.98574 0.176559L8.99998 5.2075L16.0142 0.17656C16.1127 0.105795 16.2245 0.0545799 16.3434 0.02584C16.4622 -0.00289994 16.5857 -0.00860237 16.7068 0.00905829C16.8279 0.0267189 16.9442 0.0673968 17.0492 0.128769C17.1541 0.190142 17.2456 0.271007 17.3183 0.366748C17.3911 0.462489 17.4438 0.571231 17.4734 0.686765C17.5029 0.802299 17.5088 0.922362 17.4906 1.0401C17.4725 1.15784 17.4306 1.27094 17.3675 1.37296C17.3044 1.47498 17.2212 1.56391 17.1227 1.63467L9.55423 7.06863C9.39369 7.18367 9.19941 7.24557 8.99998 7.24524Z" fill="#7AE229"/>
            <path d="M8.99998 12.0001C8.80055 12.0005 8.60628 11.9386 8.44574 11.8235L0.877242 6.38955C0.678366 6.24664 0.546029 6.03276 0.509344 5.79498C0.472658 5.5572 0.53463 5.31499 0.681625 5.12163C0.828621 4.92827 1.0486 4.79961 1.29317 4.76394C1.53773 4.72827 1.78686 4.78853 1.98574 4.93144L8.99998 9.96239L16.0142 4.93144C16.2131 4.78853 16.4622 4.72827 16.7068 4.76394C16.9514 4.79961 17.1713 4.92827 17.3183 5.12163C17.4653 5.31499 17.5273 5.5572 17.4906 5.79498C17.4539 6.03276 17.3216 6.24664 17.1227 6.38956L9.55423 11.8235C9.39369 11.9386 9.19941 12.0005 8.99998 12.0001Z" fill="#7AE229"/>
        </svg>
    `
}

function getPrioMediumSVG() {
    return `
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5685 7.16658L1.43151 7.16658C1.18446 7.16658 0.947523 7.06773 0.772832 6.89177C0.598141 6.71581 0.5 6.47716 0.5 6.22831C0.5 5.97947 0.598141 5.74081 0.772832 5.56485C0.947523 5.38889 1.18446 5.29004 1.43151 5.29004L16.5685 5.29004C16.8155 5.29004 17.0525 5.38889 17.2272 5.56485C17.4019 5.74081 17.5 5.97947 17.5 6.22831C17.5 6.47716 17.4019 6.71581 17.2272 6.89177C17.0525 7.06773 16.8155 7.16658 16.5685 7.16658Z" fill="#FFA800"/>
            <path d="M16.5685 2.7098L1.43151 2.7098C1.18446 2.7098 0.947523 2.61094 0.772832 2.43498C0.598141 2.25902 0.5 2.02037 0.5 1.77152C0.5 1.52268 0.598141 1.28403 0.772832 1.10807C0.947523 0.932105 1.18446 0.833252 1.43151 0.833252L16.5685 0.833252C16.8155 0.833252 17.0525 0.932105 17.2272 1.10807C17.4019 1.28403 17.5 1.52268 17.5 1.77152C17.5 2.02037 17.4019 2.25902 17.2272 2.43498C17.0525 2.61094 16.8155 2.7098 16.5685 2.7098Z" fill="#FFA800"/>
        </svg>
    `
}

function getPrioUrgentSVG() {
    return `
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.00002 4.75476C9.19945 4.75443 9.39372 4.81633 9.55427 4.93137L17.1228 10.3653C17.2212 10.4361 17.3044 10.525 17.3675 10.627C17.4307 10.7291 17.4725 10.8422 17.4907 10.9599C17.5273 11.1977 17.4654 11.4399 17.3184 11.6333C17.1714 11.8266 16.9514 11.9553 16.7068 11.9909C16.4623 12.0266 16.2131 11.9664 16.0143 11.8234L9.00002 6.7925L1.98577 11.8234C1.8873 11.8942 1.77545 11.9454 1.65662 11.9742C1.53779 12.0029 1.4143 12.0086 1.2932 11.9909C1.1721 11.9733 1.05577 11.9326 0.950844 11.8712C0.845915 11.8099 0.754446 11.729 0.681662 11.6333C0.608878 11.5375 0.556201 11.4288 0.52664 11.3132C0.49708 11.1977 0.491215 11.0776 0.509379 10.9599C0.527545 10.8422 0.569382 10.7291 0.632508 10.627C0.695632 10.525 0.778805 10.4361 0.87728 10.3653L8.44577 4.93137C8.60631 4.81633 8.80059 4.75443 9.00002 4.75476Z" fill="#FF3D00"/>
            <path d="M9.00002 -0.000121266C9.19945 -0.000455511 9.39372 0.0614475 9.55427 0.176482L17.1228 5.61045C17.3216 5.75336 17.454 5.96724 17.4907 6.20502C17.5273 6.4428 17.4654 6.68501 17.3184 6.87837C17.1714 7.07173 16.9514 7.20039 16.7068 7.23606C16.4623 7.27173 16.2131 7.21147 16.0143 7.06856L9.00002 2.03761L1.98577 7.06856C1.78689 7.21147 1.53777 7.27173 1.2932 7.23606C1.04863 7.20039 0.828657 7.07173 0.681662 6.87837C0.534667 6.68501 0.472695 6.4428 0.509379 6.20502C0.546065 5.96723 0.678402 5.75336 0.87728 5.61044L8.44577 0.176482C8.60631 0.0614474 8.80059 -0.000455546 9.00002 -0.000121266Z" fill="#FF3D00"/>
        </svg>

    `
}

function getSubtaskCheckboxSVG(status) {
    switch (status) {
        case "checked":
            return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                        <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`;
        case "unchecked":
            return  `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                    </svg>`;
        default:
            break;
    }
}
