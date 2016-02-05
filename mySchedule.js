
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
    populateBlocks();
    $("#tabs li a").click(displayTab);
    
});

function initializePage() {
	console.log("Javascript connected!");
    var tabListItems = document.getElementById('tabs').childNodes;
    tabListItems[0]
    }

function displayTab(){
    console.log("hi");
    $(".tabContent").attr('class', 'tabContent hide');
    destroyBlocks();
    populateBlocks();
    $(".tabContent").attr('class', 'tabContent');
}



function destroyBlocks(){
    $("#daytable").remove();
}
function populateBlocks(){
var table = document.createElement('table'), tr, td, row, cell;
table.id = "daytable";
var hour= 7;
var minute = ":00";
var ampm = "am";
for (row = 0; row < 30; row++) {
    tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    //generate times column
    if(hour >= 12){ ampm = "pm";}
    if(hour > 12) {hour = 1;}
    if(row %2 == 0){
        td1.innerHTML = hour + minute + ampm;
        hour++;
    }
    
    td2.innerHTML = "<br/>";
    
    //get JSON data
    var data = localStorage.getItem('testData');
    
    //style, color-in
    td1.classList.add("times");
    if(Math.floor(Math.random() * 2) == 0){
        td2.classList.add("taken");
    }

    
    
    //add to the dom
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
}


document.getElementById('eventblock').appendChild(table);
}
function clickfunction(e){
    e.preventDefault();
    console.log("clicked");
}
