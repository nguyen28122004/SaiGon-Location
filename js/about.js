
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

var dataString = loadFile("../json/database.json")

var database = JSON.parse(dataString)

var body = document.getElementsByTagName("body")[0]
var defaultBg = "https://icdn.dantri.com.vn/2021/04/28/ubnd-tp-1619582754877.jpg"

body.setAttribute("style", "  background: linear-gradient(black, rgba(0,0,0,0.6)), url(" + defaultBg +");background-size: cover;background-repeat: no-repeat;background-attachment:fixed;")


