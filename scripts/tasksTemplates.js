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

function getSubtaskListTemplate(subtask, index) {
    return `
        <div class="subtaskListElement"><li id="subtaskLiElement${index}" onclick="editSubtaskMode(${index})" contenteditable=true>${subtask}</li>
        <div class="subtaskListIcons">
            <div id="subtaskEditIcon${index}" class="subtaskInputIcon" onclick="editSubtaskMode(${index})">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.00098 17H3.40098L12.026 8.375L10.626 6.975L2.00098 15.6V17ZM16.301 6.925L12.051 2.725L13.451 1.325C13.8343 0.941667 14.3051 0.75 14.8635 0.75C15.4218 0.75 15.8926 0.941667 16.276 1.325L17.676 2.725C18.0593 3.10833 18.2593 3.57083 18.276 4.1125C18.2926 4.65417 18.1093 5.11667 17.726 5.5L16.301 6.925ZM14.851 8.4L4.25098 19H0.000976562V14.75L10.601 4.15L14.851 8.4Z" fill="#2A3647"/>
                </svg>
            </div>
            <div class="subtaskListSpacer"></div>
            <div class="subtaskInputIcon" onclick="deleteSubtask(${index})">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.00098 18C2.45098 18 1.98014 17.8042 1.58848 17.4125C1.19681 17.0208 1.00098 16.55 1.00098 16V3C0.717643 3 0.480143 2.90417 0.288477 2.7125C0.0968099 2.52083 0.000976562 2.28333 0.000976562 2C0.000976562 1.71667 0.0968099 1.47917 0.288477 1.2875C0.480143 1.09583 0.717643 1 1.00098 1H5.00098C5.00098 0.716667 5.09681 0.479167 5.28848 0.2875C5.48014 0.0958333 5.71764 0 6.00098 0H10.001C10.2843 0 10.5218 0.0958333 10.7135 0.2875C10.9051 0.479167 11.001 0.716667 11.001 1H15.001C15.2843 1 15.5218 1.09583 15.7135 1.2875C15.9051 1.47917 16.001 1.71667 16.001 2C16.001 2.28333 15.9051 2.52083 15.7135 2.7125C15.5218 2.90417 15.2843 3 15.001 3V16C15.001 16.55 14.8051 17.0208 14.4135 17.4125C14.0218 17.8042 13.551 18 13.001 18H3.00098ZM3.00098 3V16H13.001V3H3.00098ZM5.00098 13C5.00098 13.2833 5.09681 13.5208 5.28848 13.7125C5.48014 13.9042 5.71764 14 6.00098 14C6.28431 14 6.52181 13.9042 6.71348 13.7125C6.90514 13.5208 7.00098 13.2833 7.00098 13V6C7.00098 5.71667 6.90514 5.47917 6.71348 5.2875C6.52181 5.09583 6.28431 5 6.00098 5C5.71764 5 5.48014 5.09583 5.28848 5.2875C5.09681 5.47917 5.00098 5.71667 5.00098 6V13ZM9.00098 13C9.00098 13.2833 9.09681 13.5208 9.28848 13.7125C9.48014 13.9042 9.71764 14 10.001 14C10.2843 14 10.5218 13.9042 10.7135 13.7125C10.9051 13.5208 11.001 13.2833 11.001 13V6C11.001 5.71667 10.9051 5.47917 10.7135 5.2875C10.5218 5.09583 10.2843 5 10.001 5C9.71764 5 9.48014 5.09583 9.28848 5.2875C9.09681 5.47917 9.00098 5.71667 9.00098 6V13Z" fill="#2A3647"/>
                </svg>
            </div>
        </div>
    `
}

function getSubtaskCheckIcon() {
    return `<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.69474 9.15L14.1697 0.675C14.3697 0.475 14.6072 0.375 14.8822 0.375C15.1572 0.375 15.3947 0.475 15.5947 0.675C15.7947 0.875 15.8947 1.1125 15.8947 1.3875C15.8947 1.6625 15.7947 1.9 15.5947 2.1L6.39474 11.3C6.19474 11.5 5.96141 11.6 5.69474 11.6C5.42807 11.6 5.19474 11.5 4.99474 11.3L0.694738 7C0.494738 6.8 0.398905 6.5625 0.407238 6.2875C0.415572 6.0125 0.519738 5.775 0.719738 5.575C0.919738 5.375 1.15724 5.275 1.43224 5.275C1.70724 5.275 1.94474 5.375 2.14474 5.575L5.69474 9.15Z" fill="#2A3647"/>
            </svg>`
}

function getSubtaskEditIcon() {
    return `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00098 17H3.40098L12.026 8.375L10.626 6.975L2.00098 15.6V17ZM16.301 6.925L12.051 2.725L13.451 1.325C13.8343 0.941667 14.3051 0.75 14.8635 0.75C15.4218 0.75 15.8926 0.941667 16.276 1.325L17.676 2.725C18.0593 3.10833 18.2593 3.57083 18.276 4.1125C18.2926 4.65417 18.1093 5.11667 17.726 5.5L16.301 6.925ZM14.851 8.4L4.25098 19H0.000976562V14.75L10.601 4.15L14.851 8.4Z" fill="#2A3647"/>
            </svg>`
}

