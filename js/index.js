var body = document.getElementsByTagName("body")[0]
var defaultBg = "https://icdn.dantri.com.vn/2021/04/28/ubnd-tp-1619582754877.jpg"

body.setAttribute("style", "  background: linear-gradient(black, rgba(0,0,0,0.6)), url(" + defaultBg +");background-size: cover;background-repeat: no-repeat;background-attachment:fixed;")

///==================================================
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
//==================================================

var searchContainer = document.getElementsByClassName('new-destinations-list')[0]


for (let i = 0; i < database.length; i++) {
    const element = database[i];
    var newInfoBox = document.createElement("div")
    newInfoBox.setAttribute("class","new-destination")
    newInfoBox.setAttribute("data-id", "data" + database[i].id)

    
    newInfoBox.style = "background: url(" + database[i].bgLink+ "), rgba(0,0,0,0.5);"

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
    
    var newOverlay = document.createElement("div")
    newOverlay.setAttribute("class", "overlayBox")
    newInfoBox.appendChild(newOverlay)
    newInfoBox.appendChild(newTextInfo)

    searchContainer.appendChild(newInfoBox)
}
