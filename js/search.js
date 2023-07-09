var body = document.getElementsByTagName("body")[0]

body.setAttribute("style", "background-image: linear-gradient(black, rgba(0,0,0,0.6)), url(https://divui.com/blog/wp-content/uploads/2018/10/saigon.jpg); background-size: cover;background-repeat: no-repeat;background-attachment:fixed;")


// function loadFile(filePath) {
//     var result = null;
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("GET", filePath, false);
//     xmlhttp.send();
//     if (xmlhttp.status==200) {
//       result = xmlhttp.responseText;
//     }
//     return result;
// }

// dataString = loadFile('../json/database.json')
var searchContainer = document.getElementsByClassName('search-container')[0]

// database  = JSON.parse(dataString)

//================================================
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
    
    

    newInfoBox.appendChild(newImg)
    newInfoBox.appendChild(newTextInfo)

    searchContainer.appendChild(newInfoBox)
}

var searchBar = document.getElementsByTagName("input")[0]
var infoBox = document.getElementsByClassName("info-box")

searchBar.oninput = () => {
  console.log(searchBar.value)
  for (let i = 0; i < database.length; i++) {
    console.log(database[i].name.includes(searchBar.value))
    if (!database[i].name.toLowerCase().includes(searchBar.value.toLowerCase()) && !infoBox[i].classList.contains('hidden')) {
      infoBox[i].classList.toggle("hidden")
    }
    else if(infoBox[i].classList.contains('hidden') && database[i].name.toLowerCase().includes(searchBar.value.toLowerCase()))
    {
      infoBox[i].classList.toggle("hidden")
    }
  }
}

var id_page = 0

for (let i = 0; i < infoBox.length; i++) {
  const e = infoBox[i];
  e.onclick = () => {
    if(database[i].category == "place")
      window.location.replace("../html/place.html?id=" + (i + 1))
    else if(database[i].category == "food")
    {
      window.location.replace("../html/food.html?id=" + (i + 1))
    }
  }
  
}

