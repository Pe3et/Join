const BASE_URL = "https://join-37ebb-default-rtdb.europe-west1.firebasedatabase.app/";

async function getFromDB(path="") {
    const fetchdata = await fetch(BASE_URL + path + ".json");
    const result = await fetchdata.json();
    return result
}

async function postToDB(postData, path="") {
    await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });
}

async function putToDB(putData, path="") {
    await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(putData)
    });
}

async function deleteFromDB(path="") {
    await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    }) 
}

// const person = {
//     name: "West Ost",
//     email: "test@mail.com",
//     phone: "133769420",
//     color: "#FF4646"
// };

// filldata();
// async function filldata() {
//     postToDB(person, "contacts");    
// }