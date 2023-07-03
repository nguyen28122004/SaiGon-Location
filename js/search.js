body = document.getElementsByTagName("body")[0]

body.setAttribute("style", "background-image: linear-gradient(black, rgba(0,0,0,0.6)), url(https://divui.com/blog/wp-content/uploads/2018/10/saigon.jpg); background-size: cover;background-repeat: no-repeat;background-attachment:fixed;")


function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    return result;
}

dataString = loadFile('../json/database.json')
searchContainer = document.getElementsByClassName('search-container')[0]

database  = JSON.parse(dataString)

for (let i = 0; i < database.length; i++) {
    const element = database[i];
    newInfoBox = document.createElement("div")
    newInfoBox.setAttribute("class","info-box")
    newInfoBox.setAttribute("data-id", "data" + database[i].id)

    newImg = document.createElement("img")
    newImg.setAttribute("src", database[i].bgLink)
    newImg.setAttribute("class", "checkin")

    newTextInfo = document.createElement("div")
    newTextInfo.setAttribute("class", "text-info")

    newDestination = document.createElement("div")
    newDestination.setAttribute("class", "destination")
    newDestination.innerText = database[i].name

    newAddress = document.createElement("div")
    newAddress.setAttribute("class", "address")
    newAddress.innerText = database[i].newAddress

    newSearchDescription = document.createElement("div")
    newSearchDescription.setAttribute("class", "search-description")
    newSearchDescription.innerText = database[i].description

    newTextInfo.appendChild(newDestination)
    newTextInfo.appendChild(newAddress)
    newTextInfo.appendChild(newSearchDescription)
    
    

    newInfoBox.appendChild(newImg)
    newInfoBox.appendChild(newTextInfo)

    searchContainer.appendChild(newInfoBox)
}

searchBar = document.getElementsByTagName("input")[0]
infoBox = document.getElementsByClassName("info-box")

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
      window.location.replace(".././index.html?id=" + (i + 1))
    else if(database[i].category == "food")
    {
      window.location.replace("../html/food.html?id=" + (i + 1))
    }
  }
  
}

