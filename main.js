// IF LOCAL RECORDS EXISTS
// get storedname from local storage
let storedName = localStorage.getItem("name");
let storedZipcode = localStorage.getItem("zipcode");
let storedReturning = localStorage.getItem("returning");

if(storedReturning){
    hideForm();
}
else{
    showForm();
}


// fill in stored values
if(storedName){
    document.querySelector("#name-display").innerHTML = storedName;
}
if(storedZipcode){
    changeLocation(storedZipcode);
}

// NEW USER OR USER CHANGES LOCATION
document.querySelector("#form").onsubmit = function(event){
    event.preventDefault();

    // grab user input
    let nameInput = document.querySelector("#name").value;
    let zipcodeInput = document.querySelector("#zipcode").value;

    // clear input
    document.querySelector("#name").value = "";
    document.querySelector("#zipcode").value = "";

    // check valid input
    if(nameInput.length < 1){
        // alert("We want to know your name!");
        document.querySelector("#error-msg").innerHTML = "We want to know your name!";
        return false;
    }
    if(zipcodeInput.length < 5){
        document.querySelector("#error-msg").innerHTML = "Please type in your zipcode!";
        return false;
    }

    // Store/change name and location info
    localStorage.setItem("name", nameInput);
    localStorage.setItem("zipcode", zipcodeInput);
    localStorage.setItem("returning", true);

    // Update Display Info
    document.querySelector("#name-display").innerHTML = nameInput;
    changeLocation(zipcodeInput);
    

    //Hide top part of page
    hideForm();
}


// Helper Functions

function changeLocation(locationCode){
    let endpoint = "https://api.openweathermap.org/data/2.5/weather?zip=" + locationCode + ",us&units=imperial&appid=d24ba86961f23fa9b0887ae09ed536ad";
    // make HTTP request
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", endpoint);
    httpRequest.send()

    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState == 4){
            if(httpRequest.status == 200){
                displayHelper(httpRequest.responseText);
            } else {
                alert("error");
            }
        }
    }
}

function displayHelper(resultsString){
    let resultsJS = JSON.parse(resultsString);
    document.querySelector("#user-zipcode").innerHTML = resultsJS.name;
    document.querySelector("#temperature").innerHTML = Math.round(resultsJS.main.temp);
}

function showForm(){
    var top = document.getElementById("initial");
    var bottom = document.getElementById("main");
    top.style.display = "block";
    bottom.style.display = "none";
    localStorage.setItem("returning", false);
}

function hideForm(){
    var top = document.getElementById("initial");
    var bottom = document.getElementById("main");
    top.style.display = "none";
    bottom.style.display = "block";
}

function getTempRange(temp){
    if (temp<=15){return 15;}
    else if (temp<=30){return 30;}
    else if (temp<=45){return 45;}
    else if (temp<=60){return 60;}
    else if (temp<=75){return 75;}
    else if (temp<=90){return 90;}
    else {return 105;}
  }
  
function randNum(){
    return Math.floor(Math.random() * 5);
}


