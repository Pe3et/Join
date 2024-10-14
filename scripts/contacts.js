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
    contactContent.innerHTML = getContactDetailsTemplate(contact);
}

//incomplete - TODO: get elements from edit contact Overlay
async function editContact(contact) {
    const nameInput = document.getElementById('XXXXX').value;
    const emailInput = document.getElementById('XXXXX').value;
    const phoneInput = document.getElementById('XXXXX').value;
    putToDB(nameInput, ("contacts/" + contact.key + "/name"));
    putToDB(emailInput, ("contacts/" + contact.key + "/email"));
    putToDB(phoneInput, ("contacts/" + contact.key + "/phone"));
    loadContactList()
}

//incomplete - TODO: get elements from add contact Overlay
async function addContact() {
    const nameInput = document.getElementById('XXXXX').value;
    const emailInput = document.getElementById('XXXXX').value;
    const phoneInput = document.getElementById('XXXXX').value;
    const randomColor = getrandomColor();
    const newContact = {
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        color: randomColor
    }
    postToDB(newContact, "contacts")
    loadContactList();
}

function getrandomColor(){
    const randomColor = colors[(Math.round(Math.random() * colors.length))];
    return randomColor
}