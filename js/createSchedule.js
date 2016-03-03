'use strict';
//GLOBALS


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    
	initializePageForCS();

    getAllEvents();

    displayEvents();

    
});

function getAllEvents() {
        
    sessionStorage.eventList='';
    var userString = sessionStorage['currUser'];
    var userSched = JSON.parse(sessionStorage[userString+'-data']);
    var userEvents = userSched[userString];
    
    var dayList = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    var dayListTranslate = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var eventList = [];
    
    for (var i=0; i < dayList.length; i++) {
        var dayEvents = userEvents[dayList[i]];
        if (dayEvents.length > 0) {
            dayEvents.sort(sortNumber);
            
            if(dayEvents.length==1) {
                eventList.push([dayListTranslate[i], dayEvents[0], dayEvents[0]+1]);
            }
            else {
                var firstHr = dayEvents[0];
                var last = firstHr;
                var current = firstHr;
                var lastHr = -1;
                var j = 1;

                while (j<dayEvents.length) {
                    if (dayEvents[j]==current+1) {
                        current=dayEvents[j];
                        lastHr=current;
                        j++;
                    }
                    else {
                        if (lastHr == -1) {
                            eventList.push([dayListTranslate[i], dayEvents[j-1], dayEvents[j-1]+1]);
                            firstHr = dayEvents[j];
                        }
                        else {
                            eventList.push([dayListTranslate[i], firstHr, lastHr+1]);
                            firstHr = dayEvents[j];
                            lastHr=-1;
                        }
                        current=dayEvents[j];
                        j++;
                    }
                }
                if (lastHr==-1) { 
                    lastHr = firstHr;
                }
                eventList.push([dayListTranslate[i], firstHr, lastHr+1]);
            }
        }       
        sessionStorage.eventList = eventList;
    }
}

function displayEvents() {
    
    var eventsString = sessionStorage.eventList;
    var eventsArray = eventsString.split(',');
    var translateHours = ['7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'];
    
    var dayList = [];
    var startList = [];
    var endList = [];
    for(var i=0; i<eventsArray.length; i+=3) {
        dayList.push(eventsArray[i]);
        startList.push(parseInt(eventsArray[i+1]));
        endList.push(parseInt(eventsArray[i+2]));
    }
    console.log(dayList);
    console.log(startList);
    console.log(endList);
    
    var indEventList = [];
    for(var i=0; i<dayList.length;i++) {
        var tempIndEvent = new indEvent(dayList[i], startList[i], endList[i]);
        
        indEventList.push(tempIndEvent);
    }
    
    console.log(indEventList);
    
    
    var htmlStr = '';
    var colorArray=['rgba(92, 184, 92, 1);', 'rgba(240, 173, 78, 1);', 'rgba(91, 192, 222, 1);', 'rgba(217, 83, 79, 1);', 'rgba(51, 122, 183, 1);'];
    for(var i=0; i<indEventList.length; i++) {
        var colorInd = i%5;
        var styleStr='background-color:'+colorArray[colorInd]+'; box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px '+colorArray[colorInd];
        var tempStr = '<div class="indEvents" id="indEvent"'+i+'  style="'+styleStr+'"><p>'+indEventList[i].day+': '+translateHours[indEventList[i].start]+' to '+translateHours[indEventList[i].end]+'</p><button class="btn btn-danger btn-sm delEvent" id="indEventDel"'+i+' onclick="deleteEvent('+i+')"">X</button></div>';
        htmlStr = htmlStr+tempStr;
    }
    
    console.log(htmlStr);
    if (!(eventsString==="")) {   
        $('#eventListContainer').html(htmlStr);
    }
    else {
        $('#eventListContainer').html("<p style='text-align:center; color: #ccc'>Empty</p>");
    }
}

function deleteEvent(index) {
    console.log(index);
        
    
    var eventsString = sessionStorage.eventList;
    var eventsArray = eventsString.split(',');
    
    var startInd = index*3;
    var dayToDelete = eventsArray[startInd];
    
    //to delete
    var dayShort = dayToDelete.substring(0,3).toLowerCase();
    var startToDel = parseInt(eventsArray[startInd+1]);
    var EndToDel = (eventsArray[startInd+2]-1);
    
    //process user-data
    var userString = sessionStorage['currUser'];
    var userSched = JSON.parse(sessionStorage[userString+'-data']);
    var userEvents = userSched[userString];
    
    var dayEvents = userEvents[dayShort];
    for (var i=0; i<dayEvents.length; i++) {
        if(dayEvents[i] >= startToDel || dayEvents[i] <= EndToDel) {
            dayEvents.splice(dayEvents.indexOf(startToDel), EndToDel-startToDel+1);
        }
    }
    userSched[userString].dayShort = dayEvents;
    
    sessionStorage[userString+'-data']=JSON.stringify(userSched);
    location.reload();
}

function indEvent(day, start, end) {
    this.day = day;
    this.start = start;
    this.end = end;
}

function sortNumber(a,b) {
    return a - b;
}


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
    var Monday=$('#Monday:checked').val();
    var Tuesday=$('#Tuesday:checked').val();
    var Wednesday=$('#Wednesday:checked').val();
    var Thursday=$('#Thursday:checked').val();
    var Friday=$('#Friday:checked').val();
    var Saturday=$('#Saturday:checked').val();
    var Sunday=$('#Sunday:checked').val();
    console.log("Monday value is "+Monday);

    if($("#scheduleForm input:checkbox:checked").length <= 0){
        $('#createFeedback').html('<p style="color:red;text-align:center;">Day is not selected</p>');
        $("#createFeedback").slideDown();
        $("#createFeedback").delay(1500).slideUp();
    }else{

        var dayArray= [];

        if (Monday!=null){
            dayArray.push(Monday);

        }
        if (Tuesday!=null){
            dayArray.push(Tuesday);
        }
        if (Wednesday!=null){
            dayArray.push(Wednesday);
        }
        if (Thursday!=null){
            dayArray.push(Thursday);
        }
        if (Friday!=null){
            dayArray.push(Friday);
        }
        if (Saturday!=null){
            dayArray.push(Saturday);
        }
        if (Sunday!=null){
            dayArray.push(Sunday);
        }
        var start = $("form #startTime").val();
        var end = $("form #endTime").val();
        console.log("start at: " + start);
        console.log("end at: " + end);
        var start_digit = translateTime(start);
        var end_digit = translateTime(end);
        console.log( start_digit + " , " + end_digit );
        if(start_digit>=end_digit){
            $('#createFeedback').html('<p style="color:red;text-align:center;">Start Time can not be later then or equal to End time</p>');
            $("#createFeedback").slideDown();
            $("#createFeedback").delay(1500).slideUp();

        }else if(start_digit<0 || end_digit >30){

            $('#createFeedback').html('<p style="color:red;text-align:center;">Time should between 07:00 AM to 10:00 PM</p>');
            $("#createFeedback").slideDown();
            $("#createFeedback").delay(1500).slideUp();
        }else{
            console.log("No error");
            var current_username = sessionStorage.getItem('currUser');
            inputTime(current_username, dayArray, start_digit, end_digit);
            getAllEvents();

            displayEvents();
        
            $('#createFeedback').html('<p style="color:green;text-align:center;">Successfully Added Event!</p>');
            $("#createFeedback").slideDown();
            $("#createFeedback").delay(1500).slideUp();
        
        //google analytics
        /* ga("send", "event", "submit", current_username, "testA"); */

    }
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

function inputTime(name,dayArray,start,end){

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
 
    var index;

    for(index=0;index<dayArray.length;index++){
        var day = dayArray[index];
        console.log("day from array is "+day);
        var i = start;
        console.log("data[name][day] is "+ data[name][day]);

        var newArray = data[name][day];
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
    }
    
    sessionStorage.setItem(name + '-data',  JSON.stringify(data));
    //window.location.href = 'mySchedule.html';
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
