function getContactListLetterSection(letter) {
    return /*html*/`
        <div class="contactListLetterContainer" id="${letter}">
            <p class="contactListLetter">${letter}</p>
            <div class="contactListSpacer"></div>
        </div>
    `
}

function getContactListPersonsTemplate(contactWithSpecificLetter) {
    return /*html*/`
        <div class="personInContactList" onclick='renderContactDetails(${JSON.stringify(contactWithSpecificLetter)})'>
            <div class="personInContactListIcon" style='background: ${contactWithSpecificLetter.color}'><p>${contactWithSpecificLetter.name[0]}${contactWithSpecificLetter.name.split(" ")[1][0]}</p></div>
            <div class="personInContactListData">
                <b class="personInContactListName">${contactWithSpecificLetter.name}</b>
                <a href='mailto:${contactWithSpecificLetter.email}' class="personInContactListMail">${contactWithSpecificLetter.email}</a>
            </div>
        </div>
    `
}

function getContactDetailsTemplate(contact) {
    return /*html*/`
        <div class="iconAndName">
            <div class="contactDetailsIcon"><p>${contact.name[0]}${contact.name.split(" ")[1][0]}</p></div>
            <div class="contactDetailsNameAndOptions">
                <p class="contactDetailsName">${contact.name}</p>
                <div class="contactDetailsOptions">
                    <p class="contactDetailsOption">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/></svg>
                        Edit</p>
                    <p class="contactDetailsOption">
                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 18C2.95 18 2.47917 17.8042 2.0875 17.4125C1.69583 17.0208 1.5 16.55 1.5 16V3C1.21667 3 0.979167 2.90417 0.7875 2.7125C0.595833 2.52083 0.5 2.28333 0.5 2C0.5 1.71667 0.595833 1.47917 0.7875 1.2875C0.979167 1.09583 1.21667 1 1.5 1H5.5C5.5 0.716667 5.59583 0.479167 5.7875 0.2875C5.97917 0.0958333 6.21667 0 6.5 0H10.5C10.7833 0 11.0208 0.0958333 11.2125 0.2875C11.4042 0.479167 11.5 0.716667 11.5 1H15.5C15.7833 1 16.0208 1.09583 16.2125 1.2875C16.4042 1.47917 16.5 1.71667 16.5 2C16.5 2.28333 16.4042 2.52083 16.2125 2.7125C16.0208 2.90417 15.7833 3 15.5 3V16C15.5 16.55 15.3042 17.0208 14.9125 17.4125C14.5208 17.8042 14.05 18 13.5 18H3.5ZM3.5 3V16H13.5V3H3.5ZM5.5 13C5.5 13.2833 5.59583 13.5208 5.7875 13.7125C5.97917 13.9042 6.21667 14 6.5 14C6.78333 14 7.02083 13.9042 7.2125 13.7125C7.40417 13.5208 7.5 13.2833 7.5 13V6C7.5 5.71667 7.40417 5.47917 7.2125 5.2875C7.02083 5.09583 6.78333 5 6.5 5C6.21667 5 5.97917 5.09583 5.7875 5.2875C5.59583 5.47917 5.5 5.71667 5.5 6V13ZM9.5 13C9.5 13.2833 9.59583 13.5208 9.7875 13.7125C9.97917 13.9042 10.2167 14 10.5 14C10.7833 14 11.0208 13.9042 11.2125 13.7125C11.4042 13.5208 11.5 13.2833 11.5 13V6C11.5 5.71667 11.4042 5.47917 11.2125 5.2875C11.0208 5.09583 10.7833 5 10.5 5C10.2167 5 9.97917 5.09583 9.7875 5.2875C9.59583 5.47917 9.5 5.71667 9.5 6V13Z" fill="#2A3647"/></svg>
                        Delete</p>
                </div>
            </div> 
        </div>      
        <div>
                <p class="contactInformation">Contact Information</p>
                <div class="contactSocials">
                <b>Email</b>
                <a href='mailto:${contact.email}'>${contact.email}</a>
                <b>Phone</b>
                <a href='tel:${contact.phone}'>${contact.phone}</a>
                </div>  
            </div>
        </div>
    `
}