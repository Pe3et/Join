const BASE_URL = "https://join-37ebb-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Retrieves data from the Firebase Realtime Database.
 * 
 * @async
 * @param {string} [path=""] - The path to the data in the database.
 * @returns {Promise<object>} The data retrieved from the database.
 */
async function getFromDB(path="") {
    const fetchdata = await fetch(BASE_URL + path + ".json");
    const result = await fetchdata.json();
    return result
}

/**
 * Posts data to the Firebase Realtime Database.
 * 
 * @async
 * @param {object} postData - The data to be posted to the database.
 * @param {string} [path=""] - The path to the data in the database.
 * @returns {Promise<void>}
 */
async function postToDB(postData, path="") {
    await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });
}

/**
 * Updates data in the Firebase Realtime Database.
 * 
 * @async
 * @param {object} putData - The data to be updated in the database.
 * @param {string} [path=""] - The path to the data in the database.
 * @returns {Promise<void>}
 */
async function putToDB(putData, path="") {
    await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(putData)
    });
}

/**
 * Deletes data from the Firebase Realtime Database.
 * 
 * @async
 * @param {string} [path=""] - The path to the data in the database.
 * @returns {Promise<void>}
 */
async function deleteFromDB(path="") {
    await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    }) 
}