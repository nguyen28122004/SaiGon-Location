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

    var newDivider = document.createElement('div')
    newDivider.setAttribute("class","divider")

    searchContainer.appendChild(newInfoBox)
    searchContainer.appendChild(newDivider)
}

jQuery('<div>', {
  class: 'fa',
  style: 'font-size:1.9rem; cursor:pointer;z-index:1;height:100%'
}).appendTo('.info-box');


jQuery('<i>', {
  class: 'fa-regular fa-bookmark',
  style: 'font-size:1.9rem; cursor:pointer;z-index:-1'
}).appendTo('.fa');

var searchBar = document.getElementsByTagName("input")[0]
var infoBox = document.querySelectorAll(".info-box")

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
infoBox = document.getElementsByClassName('text-info')
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

infoBox = document.getElementsByClassName('checkin')
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
// =====================================HAV BOOK MARK====================

import * as favLists from '../js/fav.js'
import * as authdata from '../js/authdata.js'

var bookmarkIconList = $('.fa')
var place_name = $('.destination')
infoBox = $('.info-box')

console.log(authdata.user)
if(authdata.user == 'undefined')
{
  bookmarkIconList.toggleClass('hidden', true)
}
else{
  var favList = favLists.fav[authdata.user].fav
  // console.log(favList)
  
  const firebaseConfig1 = {
    apiKey: "AIzaSyB9-jpTaoujMtG_FagHC7iKtANSSFplDyk",
    authDomain: "saigon-travel-aaabc.firebaseapp.com",
    databaseURL: "https://saigon-travel-aaabc-default-rtdb.firebaseio.com",
    projectId: "saigon-travel-aaabc",
    storageBucket: "saigon-travel-aaabc.appspot.com",
    messagingSenderId: "1009873491491",
    appId: "1:1009873491491:web:0c6a5e9bc86484b13a0396"
  };
  
  // Initialize fav Firebase
  const app1 = initializeApp(firebaseConfig1, 'fav_list');
  
  const db1 = getDatabase(app1);
const dbRef1 = ref(db1);

var favList1 = await get(dbRef1).then((snapshot) => {
  return snapshot.val()
})

console.log(favList1)







bookmarkIconList.click( function(e) {
  e = $(e.currentTarget).parent().children('.fa')
  // console.log(e)
  let name = e.parent().children('.text-info').children('.destination')
  // console.log(name.text());
  
  
  if(e.children().hasClass('fa-regular'))
  {
    favList1[authdata.user].fav.push(name.text())
    e.html( "<i class=\"fa-solid fa-bookmark\"></i>")
    console.log(favList1);
  }
  else
  {
    let pos = favList1[authdata.user].fav.indexOf(name.text())
    if(pos > -1)
    {
      favList1[authdata.user].fav.splice(pos, 1)
      e.html("<i class=\"fa-regular fa-bookmark\"></i>")
      console.log(favList1)
    }
  }
  
  set(dbRef1, favList1)
})

function updateBookmark()
{
  for (let i = 0; i < place_name.length; i++) {
    for(let j = 0; j < favList.length; j++)
    {
      if(place_name[i].innerText == favList[j])
      {
        let e = infoBox.children('.fa')
        
        if(e.children()[i].classList.contains('fa-regular'))
        e[i].innerHTML = "<i class=\"fa-solid fa-bookmark\"></i>"
        else
        e[i].innerHTML = "<i class=\"fa-regular fa-bookmark\"></i>"
      }
    }
    
  }
}






updateBookmark()
}


