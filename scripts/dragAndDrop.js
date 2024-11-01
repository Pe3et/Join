function allowDrop(ev) {
    ev.preventDefault();
    const highlightRef = ev.target.closest(".taskList");
    highlightRef.classList.add("dragHighlight");
    removeOtherHighlights(highlightRef.id);
}

function removeOtherHighlights(currentHighlightID) {
    document.querySelectorAll('.taskList').forEach( tl => {
        if (tl.id !== currentHighlightID) {
            tl.classList.remove("dragHighlight");
        }
    })
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    document.getElementById(ev.target.id).classList.add("dragRotate");
}

function removeDragRotate(element) {
    element.classList.remove("dragRotate");
}

function drop(ev) {
    ev.preventDefault();
    const taskID = ev.dataTransfer.getData("text");
    const taskIndex = tasks.findIndex(t => t.id == taskID);
    const newStatusRef = ev.target.closest(".taskList");
    const newStatus = newStatusRef.id.slice(0, -9);
    newStatusRef.append(document.getElementById(taskID));
    newStatusRef.classList.remove("dragHighlight");
    document.getElementById(taskID).classList.remove("dragRotate");
    tasks[taskIndex].status = newStatus;
    putToDB(newStatus, `tasks/${taskID}/status`);
    checkNoTaskDisplayNone(tasks);
}