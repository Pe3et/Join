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
        <div class="personInContactList">
            <div class="personInContactListIcon" style='background: ${contactWithSpecificLetter.color}'><p>${contactWithSpecificLetter.name[0]}${contactWithSpecificLetter.name.split(" ")[1][0]}</p></div>
            <div class="personInContactListData">
                <b class="personInContactListName">${contactWithSpecificLetter.name}</b>
                <a href='mailto:${contactWithSpecificLetter.email}' class="personInContactListMail">${contactWithSpecificLetter.email}</a>
            </div>
        </div>
    `
}