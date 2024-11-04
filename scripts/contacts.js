function init() {
    loadContactList();
}

async function loadContactList() {
    const contactResults = await getFromDB("contacts");
    document.getElementById("contactListContent").innerHTML = "";
    if(contactResults) {
        contactsArray = getContactsArray(contactResults);
        firstLettersArray = getFirstLettersArray(contactsArray);
        firstLettersArray.forEach(letter => {
            renderLetterSection(letter);
            const contactsWithSameFirstLetter = contactsArray.filter(contact => contact.name[0] == letter);
            contactsWithSameFirstLetter.forEach(contact => renderContactInList(contact))
        });
        // Füge Event-Listener hinzu, um den aktiven Kontakt bei Klick zu markieren
        addClickListenersToContacts();
    }
}

function renderContactInList(contact) {
    const contentRef = document.getElementById(contact.name[0]);
    contentRef.innerHTML += getContactListPersonsTemplate(contact);
}

function getContactListPersonsTemplate(contact) {
    return `
        <div class="personInContactList" data-contact-id="${contact.id}">
            <p>${contact.name}</p>
        </div>
    `;
}

function getContactFromElement(contactElement) {
    const contactId = contactElement.getAttribute('data-contact-id');
    const contact = contactsArray.find(contact => contact.id === contactId);
    return contact;
}

function renderLetterSection(letter) {
    const contentRef = document.getElementById("contactListContent");
    contentRef.innerHTML += getContactListLetterSection(letter);
}

function getFirstLettersArray(contactsArray) {
    firstLettersArray = [];
    contactsArray.forEach(contact => {
        const firstLetter = contact.name[0];
        !firstLettersArray.includes(firstLetter) && firstLettersArray.push(firstLetter)
    })
    return firstLettersArray;
}

function getContactsArray(contactRestults) {
    contacts = [];
    Object.keys(contactRestults).forEach(key => {
        contacts.push({
            id: key,
            name: contactRestults[key].name,
            email: contactRestults[key].email,
            phone: contactRestults[key].phone,
            color: contactRestults[key].color
        });
    });
    contacts.sort((a, b) => (a.name).localeCompare(b.name)); // alphabetical order
    return contacts;
}

function renderContactDetails(contact) {
    const contentRef = document.getElementById('contactContent');
    contentRef.style.transition = "none";
    contentRef.style.left = "100vw";
    contentRef.innerHTML = getContactDetailsTemplate(contact);
    window.innerWidth <= 1050 && respContentToggle(contact);
    setTimeout(() => {
        contentRef.style.transition = "all 300ms ease-out";
        contentRef.style.left = "0";
    }, 1);
}

function respContentToggle(contact) {
    const contactContainerRef = document.querySelector('.contactContainer');
    const contactListRef = document.querySelector('.contactList');
    contactListRef.classList.toggle('dnone');
    swapRespBurgerButton(contact);
}

function swapRespBurgerButton(contact) {
    const buttonRef = document.querySelector('.respButton');
    const contactListRef = document.querySelector('.contactList');
    if(contactListRef.classList.contains('dnone')) {
        buttonRef.innerHTML = getRespBurgerButtonSVG();
        buttonRef.onclick = () => toggleRespContextMenu(contact);
    } else {
        buttonRef.innerHTML = getRespAddContactButtonSVG();
        buttonRef.onclick = () => openOverlay('addContactOverlayContainer', 'addContactCardOverlay');
    }
}

function toggleRespContextMenu(contact) {
    const respContactOptionsRef = document.querySelector('.respContactOptions');
    const buttonRef = document.querySelector('.respButton');
    buttonRef.classList.toggle('dnone');
    respContactOptionsRef.classList.toggle('respContactOptionsSlideIn');
    if(buttonRef.classList.contains('dnone')) {
        setTimeout(() => document.addEventListener('click', closeRespContextMenuCheck), 0)
        document.getElementById('respEditButton').onclick = () => openOverlay('editOverlayContainer', 'editContactCardOverlay', contact);
        document.getElementById('respDeleteButton').onclick = () => {deleteContact(contact.id); respContentToggle()};
    } else {
        document.removeEventListener('click', closeRespContextMenuCheck)
    }
}

function closeRespContextMenuCheck(event) {
    const respContactOptionsRef = document.querySelector('.respContactOptions');
    const buttonRef = document.querySelector('.respButton');
    if(event.target != respContactOptionsRef && event.target != buttonRef) {
        toggleRespContextMenu();
    }
}

function openOverlay(containerRefID, cardRefId, contact) {
    document.getElementById(containerRefID).classList.add('overlayAppear');
    document.getElementById(containerRefID).classList.add('overlayBackgroundColor');
    window.innerWidth > 1050 ? document.getElementById(cardRefId).classList.add('slideInRight') : document.getElementById(cardRefId).classList.add('slideInBottom');
    contact != undefined && loadEditContactCard(contact);
}

function closeOverlay(containerRefID, cardRefId) {
    document.getElementById(containerRefID).classList.remove('overlayBackgroundColor');
    document.getElementById(cardRefId).classList.remove('slideInRight');
    document.getElementById(cardRefId).classList.remove('slideInBottom');
    setTimeout(() => {
        document.getElementById(containerRefID).classList.remove('overlayAppear')
    }, 300);
    emptyInputFields();
}

function loadEditContactCard(contact) {
    document.getElementById('editContactInputName').value = contact.name;
    document.getElementById('editContactInputEmail').value = contact.email;
    document.getElementById('editContactInputPhone').value = contact.phone;
    document.getElementById('editContactButton').setAttribute("onclick", `editContact(${JSON.stringify(contact)})`);
    document.getElementById('deleteContactOverlayButton').setAttribute("onclick", `deleteContact("${contact.id}")`);
    const profileIconRef = document.getElementById('editCardProfileIcon');
    profileIconRef.innerHTML = `
        <div class="contactDetailsIcon" style="background: ${contact.color}">
            <p>${contact.name[0]}${contact.name.split(" ")[1][0]}</p>
        </div>
    `;
}

function emptyInputFields() {
    document.getElementById('addContactInputName').value = "";
    document.getElementById('addContactInputEmail').value = "";
    document.getElementById('addContactInputPhone').value = "";
    document.getElementById('editContactInputName').value = "";
    document.getElementById('editContactInputEmail').value = "";
    document.getElementById('editContactInputPhone').value = "";
    document.querySelectorAll('.inputError').forEach(errorRef => removeErrorMessage(errorRef));
}

async function editContact(contact) {
    let nameInput = document.getElementById('editContactInputName').value;
    const emailInput = document.getElementById('editContactInputEmail').value;
    const phoneInput = document.getElementById('editContactInputPhone').value;
    if (validateAddContact('editContactInputName', 'editContactInputEmail')) {
        nameInput = getUpperCaseName(nameInput);
        await putToDB(nameInput, ("contacts/" + contact.id + "/name"));
        await putToDB(emailInput, ("contacts/" + contact.id + "/email"));
        await putToDB(phoneInput, ("contacts/" + contact.id + "/phone"));
        await loadContactList();
        document.querySelector('.contactDetailsName').innerText = nameInput;
        document.querySelector('.contactDetailsEmail').innerText = emailInput;
        document.querySelector('.contactDetailsPhone').innerText = phoneInput;
        hardcloseEditOverlay();
    }
}

function hardcloseEditOverlay() {
    document.getElementById('editOverlayContainer').classList.remove('overlayBackgroundColor');
    document.getElementById('editContactCardOverlay').classList.remove('slideInRight');
    document.getElementById('editOverlayContainer').classList.remove('overlayAppear');
}

async function addContact() {
    let nameInput = document.getElementById('addContactInputName').value;
    const emailInput = document.getElementById('addContactInputEmail').value;
    const phoneInput = document.getElementById('addContactInputPhone').value;
    if (validateAddContact('addContactInputName', 'addContactInputEmail')) {
        nameInput = getUpperCaseName(nameInput);
        const randomColor = getRandomColor();
        const newContact = { name: nameInput, email: emailInput, phone: phoneInput, color: randomColor };
        await postToDB(newContact, "contacts");
        loadContactList();
        closeOverlay("addContactOverlayContainer", "addContactCardOverlay");
        contactCreatedSuccess();
    }
}

async function deleteContact(key) {
    await deleteFromDB("contacts/" + key);
    document.getElementById('contactContent').innerHTML = "";
    loadContactList();
    if (document.getElementById('editOverlayContainer').classList.contains("overlayAppear")) {
        document.getElementById('editOverlayContainer').classList.remove('overlayBackgroundColor');
        document.getElementById('editContactCardOverlay').classList.remove('slideInRight');
        document.getElementById('editOverlayContainer').classList.remove('overlayAppear');
    }
}

function contactCreatedSuccess() {
    const ref = document.getElementById('contactCreateSuccess');
    const slideInDirectionClass = window.innerWidth > 1050 ? 'slideInRight' : 'slideInBottomSuccess';
    document.getElementById('addContactOverlayContainer').classList.remove('overlayBackgroundColor');
    document.getElementById('addContactCardOverlay').classList.remove('slideInRight');
    document.getElementById('addContactOverlayContainer').classList.remove('overlayAppear');
    ref.classList.add(slideInDirectionClass);
    setTimeout(() => { ref.classList.remove(slideInDirectionClass); }, 800);
}

function addClickListenersToContacts() {
    const contactElements = document.querySelectorAll('.personInContactList');
    contactElements.forEach(contact => {
        contact.addEventListener('click', function () {     
            contactElements.forEach(c => c.classList.remove('active'));
            contact.classList.add('active');
        });
    });
}

function validateAddContact(nameInputID, emailInputID) {
    const nameInputRef = document.getElementById(nameInputID);
    const emailInputRef = document.getElementById(emailInputID);
    validateName(nameInputRef, nameInputRef.closest('.inputContainer'));
    validateEmail(emailInputRef, emailInputRef.closest('.inputContainer'));
    if(validated.name && validated.email) {
        return true
    } else {
        return false
    }
}