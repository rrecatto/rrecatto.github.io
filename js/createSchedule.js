'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePageForCS();
})
var day;
var bIndex;
var eIndex;
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
    inputTime('friend1',day,start_digit, end_digit);
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
    if(sessionStorage.getItem('example') === null){
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
                           }'
        console.log("created new jsonObject");
    }
    else{
        var jsonObject = sessionStorage.getItem('example');
    }
    var data = JSON.parse(jsonObject);
    var newArray = data[name][day];
    var i = start;
    for (var i = start; i < end; i++ ){
          newArray.push(i);
    }
    newArray = removeDuplicates(newArray);
    newArray.sort();
    data[name][day] = newArray;
    
    sessionStorage.setItem('example',  JSON.stringify(data));
}

function removeDuplicates(duplicatesArray){
    var uniqueArray = duplicatesArray.filter(function(elem, pos) {
    return duplicatesArray.indexOf(elem) == pos;
    });
    return uniqueArray;
}