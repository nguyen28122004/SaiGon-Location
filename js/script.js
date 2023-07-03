var curURL = document.URL
var idPos = curURL.search("id=")
console.log(idPos)
var tmp = Number(curURL.slice(idPos + 3, curURL.length))
var count = 0
if (!isNaN(tmp))
    count = tmp - 1;


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

var dataString = loadFile("./json/database.json")

var database = JSON.parse(dataString)

database = database.filter((el) => {
    return (el.category == "place")
})

console.log(database)
var num = document.getElementsByClassName("number")[0]
var name1 = document.getElementsByClassName("place_name")[0]
var des = document.getElementsByClassName("description")[0]
var body = document.getElementsByTagName("body")[0]
var defaultBg = "https://icdn.dantri.com.vn/2021/04/28/ubnd-tp-1619582754877.jpg"

function changeData(i){
    
    num.innerText = "#" + database[i].id
    name1.innerText = database[i].name
    des.innerText = database[i].description
    body.setAttribute("style", "  background: linear-gradient(black, rgba(0,0,0,0.6)), url(" + database[i].bgLink +");background-size: cover;background-repeat: no-repeat;background-attachment:fixed;")


    name1.setAttribute("style", "font-size:calc(100vw/" + Math.max(database[i].name.length, 15)+ ");width:100vw")
    des.setAttribute("style", "top: calc(" + (name1.offsetHeight + name1.offsetTop) + "px);")
}

if(document.title == "PLACE - SAIGON LOCATION")
    changeData(count)
else
    body.setAttribute("style", "  background: linear-gradient(black, rgba(0,0,0,0.6)), url(" + defaultBg +");background-size: cover;background-repeat: no-repeat;background-attachment:fixed;")
// ========================Khoảng cách giữa description và place name on resize event======================
addEventListener("resize", (event) => {des.setAttribute("style", "top: calc(" + (name1.offsetHeight + name1.offsetTop) + "px);")});


// ==================== CLICK CHUYỂN DATA================
var nextButton = document.getElementsByClassName("fa-solid fa-angle-right")[0]

nextButton.onclick = () =>{
    if(count == database.length - 1)
        count = 0
    else
        count = count + 1
    changeData(count)
}

var prevButton = document.getElementsByClassName("fa-solid fa-angle-left")[0]

prevButton.onclick = () =>{
    if(count == 0)
        count = database.length - 1
    else
        count = count - 1
    changeData(count)
}
// =====================================================================