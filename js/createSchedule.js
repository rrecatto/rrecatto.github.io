'use strict';
//GLOBALS


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    
	initializePageForCS();

    
});

function getUserData(){

}

var day;
function initializePageForCS() {
	$('#submitButn').click(inputTime);
	$('.dropdown-toggle').dropdown();

	$('#divNewNotifications li').on('click', function() {
   		$('#dropdown_title').html($(this).find('a').html());
   		day=$(this).find('a').html();
    });

}

function validateForm(){
    var day = $("form #selectDay").val();
    var start = $("form #startTime").val();
    var end = $("form #endTime").val();
    console.log("day selected: " + day);
    console.log("start at: " + start);
    console.log("end at: " + end);
    var start_digit = translateTime(start);
    var end_digit = translateTime(end);
    console.log( start_digit + " , " + end_digit );
    
    var current_username = sessionStorage.getItem('currUser');
    inputTime(current_username, day, start_digit, end_digit);
    $('#createFeedback').html('<p style="color:green;text-align:center;">Successfully Added Event!</p>');
}


/*translate time to 0-30 number*/
function translateTime(timeString){
    var times = timeString.split(":");
    var hour = times[0];
    var minute = times[1];
    //console.log("hour: " + hour + " , minute: " + minute );
    var digit = (hour - 7 ) * 2 
    if(minute == 30){
        digit +=1;
    }
    return digit;
}

function inputTime(name,day,start,end){

    if(sessionStorage.getItem(name + '-data') === null){ //this will never happen
        console.log("no data in session storage");
        var jsonObject = '{ "friend1" : { \
                                "mon" : [], \
                                "tue" : [], \
                                "wed" : [], \
                                "thu" : [], \
                                "fri" : [], \
                                "sat" : [], \
                                "sun" : []  \
                                 } \
                           }';
        console.log("created new jsonObject");
    }
    else{
        var jsonObject = sessionStorage.getItem(name + '-data');
    }
    var data = JSON.parse(jsonObject);
    console.log("data[name] is "+ data[name]);
    console.log("data[name][day] is "+ data[name][day]);
    var newArray = data[name][day];

    
    var i = start;
    for (var i = start; i < end; i++ ){
          newArray.push(i);
    }
    newArray = removeDuplicates(newArray);
    console.log("newArray before sort");
    console.log(newArray);
    newArray = newArray.sort(function(a, b){return a-b});
    console.log("newArray after sort");
    console.log(newArray);
    data[name][day] = newArray;
    
    sessionStorage.setItem(name + '-data',  JSON.stringify(data));
    window.location.href = 'mySchedule.html';
}

function removeDuplicates(duplicatesArray){
    var uniqueArray = duplicatesArray.filter(function(elem, pos) {
    return duplicatesArray.indexOf(elem) == pos;
    });
    return uniqueArray;
}
function cancel(){

    window.location.href = 'mySchedule.html';
}