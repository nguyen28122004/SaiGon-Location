import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, set, onValue, get, child } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyAtwPhCdCQLf2TVE0AmsI6LJA5DOsch8Qo",
    authDomain: "saigon-location.firebaseapp.com",
    projectId: "saigon-location",
    storageBucket: "saigon-location.appspot.com",
    messagingSenderId: "297373622656",
    appId: "1:297373622656:web:ffdc04efb1039220ab2165"
  };

// Initialize Firebase
var app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);



var database = await get(dbRef).then((snapshot) => {
        return snapshot.val()
})

console.log(database)

function getData(dataRef, dataIndex) {
    return tmp = get(child(dataRef, dataIndex)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            return "No data available";
        }
    });
}
//==================================
var body = document.getElementsByTagName("body")[0]
var defaultBg = "https://icdn.dantri.com.vn/2021/04/28/ubnd-tp-1619582754877.jpg"

body.setAttribute("style", "  background: linear-gradient(black, rgba(0,0,0,0.6)), url(" + defaultBg +");background-size: cover;background-repeat: no-repeat;background-attachment:fixed;")
/////////////////////=============================================

var searchContainer = document.getElementsByClassName('search-container')[0]

for (let i = 0; i < database.length; i++) {
    const element = database[i];
    var newInfoBox = document.createElement("div")
    newInfoBox.setAttribute("class","info-box")
    newInfoBox.setAttribute("data-id", "data" + database[i].id)

    var newImg = document.createElement("img")
    newImg.setAttribute("src", database[i].bgLink)
    newImg.setAttribute("class", "checkin")

    var newTextInfo = document.createElement("div")
    newTextInfo.setAttribute("class", "text-info")

    var newDestination = document.createElement("div")
    newDestination.setAttribute("class", "destination")
    newDestination.innerText = database[i].name

    var newAddress = document.createElement("div")
    newAddress.setAttribute("class", "address")
    newAddress.innerText = database[i].newAddress

    var newSearchDescription = document.createElement("div")
    newSearchDescription.setAttribute("class", "search-description")
    newSearchDescription.innerText = database[i].description

    newTextInfo.appendChild(newDestination)
    newTextInfo.appendChild(newAddress)
    newTextInfo.appendChild(newSearchDescription)
    
    
    var newTrashIcon = document.createElement("i")
    newTrashIcon.setAttribute("class", "fa-solid fa-trash")

    newTrashIcon.classList.add("remove")

    newInfoBox.appendChild(newImg)
    newInfoBox.appendChild(newTextInfo)
    newInfoBox.appendChild(newTrashIcon)

    searchContainer.appendChild(newInfoBox)
}
//=================================================





var submit_button = document.getElementsByClassName("submit-box")[0]

submit_button.onclick = () => {

    var data = {
        "id": database.length + 1,
        "category": document.getElementById("category").value,
        "name": document.getElementById("name").value,
        "address": document.getElementById("address").value,
        "rate": document.getElementById("rate").value,
        "description": document.getElementById("description").value,
        "bgLink": document.getElementById("bgLink").value
    };
    

    database.push(data)
    console.log(database)
    database.sort((a, b) => (a.category <= b.category) ? 1: -1)
    for (let i = 0; i < database.length; i++) {
        const el = database[i];
        el.id = i + 1;
    }
    set(dbRef, database)
}



var removeIcon = document.getElementsByClassName("remove")

console.log(removeIcon.length)
for (let i = 0; i < removeIcon.length; i++) {
    const e = removeIcon[i];
    e.onclick = () => {
        database.splice(i, 1);
        console.log(database)
        for (let j = i; j < database.length; j++) {
            const e = database[j];
            database[j].id = database[j].id - 1;
        }
        set(dbRef, database)
        window.location.reload();
    }
    
  }