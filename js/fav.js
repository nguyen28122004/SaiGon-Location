import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";



const firebaseConfig1 = {
    apiKey: "AIzaSyB9-jpTaoujMtG_FagHC7iKtANSSFplDyk",
    authDomain: "saigon-travel-aaabc.firebaseapp.com",
    databaseURL: "https://saigon-travel-aaabc-default-rtdb.firebaseio.com",
    projectId: "saigon-travel-aaabc",
    storageBucket: "saigon-travel-aaabc.appspot.com",
    messagingSenderId: "1009873491491",
    appId: "1:1009873491491:web:0c6a5e9bc86484b13a0396"
  };

// Initialize Firebase
const app1 = initializeApp(firebaseConfig1, 'fav_list');

const db = getDatabase(app1);
const dbRef = ref(db);

var favList = await get(dbRef).then((snapshot) => {
    return snapshot.val()
})

function createList(database, containerName)
{

    
    var favContainer = $(containerName)[0]
    favContainer.innerHTML = ''

    for (let i = 0; i < database.length; i++) {
        const element = database[i];
        var newInfoBox = document.createElement("div")
        newInfoBox.setAttribute("class","new-destination")
        newInfoBox.setAttribute("data-id", "data" + database[i].id)

        
    newInfoBox.style = "background: url(" + database[i].bgLink+ "), rgba(0,0,0,0.8);"
    
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
    
    favContainer.appendChild(newInfoBox)
    }
}



// ========================New fav list===================




export let fav = favList
export {dbRef, createList}