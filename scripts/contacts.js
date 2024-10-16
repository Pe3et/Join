colors = [
    "#FF7A00",
    "#9327FF",
    "#6E52FF",
    "#FC71FF",
    "#FFBB2B",
    "#1FD7C1",
    "#462F8A",
    "#FF4646",
    "#00BEE8",
    "#FF7A00"
]

function init(){
    loadContactList();
}

async function loadContactList() {
    const contactRestults = await getFromDB("contacts");
    document.getElementById("contactListContent").innerHTML = "";
    contactsArray = getContactsArray(contactRestults);
    firstLettersArray = getFirstLettersArray(contactsArray);
    firstLettersArray.forEach(letter => {
        renderLetterSection(letter);
        const contactsWithSameFirstLetter = contactsArray.filter(contact => contact.name[0] == letter);
        contactsWithSameFirstLetter.forEach(contact => renderContactInList(contact))
    });
}

function renderContactInList(contact) {
    const contentRef = document.getElementById(contact.name[0]);
    contentRef.innerHTML += getContactListPersonsTemplate(contact);
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
    return firstLettersArray
}

function getContactsArray(contactRestults){
    contacts = [];
    Object.keys(contactRestults).forEach( key => {
        contacts.push({
            id: key,
            name: contactRestults[key].name,
            email: contactRestults[key].email,
            phone: contactRestults[key].phone,
            color: contactRestults[key].color
        })
    });
    contacts.sort( (a,b) => (a.name).localeCompare(b.name)); //das Array alphabetisch sortieren
    return contacts
}

function renderContactDetails(contact) {
    const contentRef = document.getElementById('contactContent');
    contentRef.style.transition = "none"
    contentRef.style.left = "100vw",
    contentRef.innerHTML = getContactDetailsTemplate(contact);
    setTimeout( () => {
        contentRef.style.transition = "all 300ms ease-out";
        contentRef.style.left = "0"
    }, 1);
}

function openOverlay(containerRefID, cardRefId, contact) {
    document.getElementById(containerRefID).classList.add('overlayAppear');
    document.getElementById(containerRefID).classList.add('overlayBackgroundColor');
    document.getElementById(cardRefId).classList.add('slideInRight');
    //if editOverlay is opened, load the contact values and set onclick param for edit button
    contact != undefined && loadEditContactCard(contact);
}

function closeOverlay(containerRefID, cardRefId) {
    document.getElementById(containerRefID).classList.remove('overlayBackgroundColor');
    document.getElementById(cardRefId).classList.remove('slideInRight');
    setTimeout(() => {document.getElementById(containerRefID).classList.remove('overlayAppear')}, 300);
    emptyInputFields();
}

function loadEditContactCard(contact) {
    document.getElementById('editContactInputName').value = contact.name;
    document.getElementById('editContactInputEmail').value = contact.email;
    document.getElementById('editContactInputPhone').value = contact.phone;
    document.getElementById('editContactButton').setAttribute("onclick", `editContact(${JSON.stringify(contact)})`);
    document.getElementById('deleteContactOverlayButton').setAttribute("onclick", `deleteContact("${contact.id}")`);
}
   
function emptyInputFields() {
    document.getElementById('addContactInputName').value = "";
    document.getElementById('addContactInputEmail').value = "";
    document.getElementById('addContactInputPhone').value = "";
}

async function editContact(contact) {
    const nameInput = document.getElementById('editContactInputName').value;
    const emailInput = document.getElementById('editContactInputEmail').value;
    const phoneInput = document.getElementById('editContactInputPhone').value;
    if(checkIfNameInputIsCorrect(nameInput)){
        putToDB(nameInput, ("contacts/" + contact.key + "/name"));
        putToDB(emailInput, ("contacts/" + contact.key + "/email"));
        putToDB(phoneInput, ("contacts/" + contact.key + "/phone"));
        loadContactList()
    }
}

async function addContact() {
    const nameInput = document.getElementById('addContactInputName').value;
    const emailInput = document.getElementById('addContactInputEmail').value;
    const phoneInput = document.getElementById('addContactInputPhone').value;
    if(checkIfNameInputIsCorrect(nameInput)){
        const randomColor = getrandomColor();
        const newContact = { name: nameInput, email: emailInput, phone: phoneInput, color: randomColor };
        await postToDB(newContact, "contacts");
        loadContactList();
        closeOverlay("addContactOverlayContainer", "addContactCardOverlay");
        contactCreatedSuccess();
    }
}

function checkIfNameInputIsCorrect(nameInput) {
    if(nameInput.includes(" ") && nameInput.split(" ")[1][0] && nameInput != "Please enter first and last name.") {
        return true
    } else {
        document.getElementById('addContactInputName').value = "Please enter first and last name.";
        return false
    }
}

async function deleteContact(key) {
    await deleteFromDB("contacts/" + key);
    document.getElementById('contactContent').innerHTML = "";
    loadContactList();
    //id deleted via overlay, close overlay TODO:
    if (document.getElementById('editOverlayContainer').classList.contains("overlayAppear")){
        document.getElementById('editOverlayContainer').classList.remove('overlayBackgroundColor');
        document.getElementById('editContactCardOverlay').classList.remove('slideInRight');
        document.getElementById('editOverlayContainer').classList.remove('overlayAppear');
    }
}

function getrandomColor(){
    const randomColor = colors[(Math.round(Math.random() * colors.length))];
    return randomColor
}

function contactCreatedSuccess() {
    const ref = document.getElementById('contactCreateSuccess');
    document.getElementById('addContactOverlayContainer').classList.remove('overlayBackgroundColor');
    document.getElementById('addContactCardOverlay').classList.remove('slideInRight');
    document.getElementById('addContactOverlayContainer').classList.remove('overlayAppear');
    ref.classList.add("slideInRight");
    setTimeout( () => {ref.classList.remove("slideInRight")}, 800);
}