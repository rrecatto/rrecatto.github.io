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

function inputTime(){
	var i;
	convertTimeToJson();
	switch(day){
		case "Monday":
			 	i=bIndex;
				while (i<=eIndex){
				jsonObject.friend1.mon.push(i);
				i++;
			}
		break;
		case "Tuesday":
			i=bIndex;
				while (i<=eIndex){
				jsonObject.friend1.tue.push(i);
				i++;
			}
		break;
		case "Wednesday":
			i=bIndex;
				while (i<=eIndex){
				jsonObject.friend1.wed.push(i);
				i++;
			}
		break;
		case "Thursday":
			i=bIndex;
				while (i<=eIndex){
				jsonObject.friend1.thu.push(i);
				i++;
			}
		break;
		case "Friday":
			i=bIndex;
				while (i<=eIndex){
				jsonObject.friend1.fri.push(i);
				i++;
			}
		break;
		case "Saturday":
			i=bIndex;
			while (i<=eIndex){
				jsonObject.friend1.sat.push(i);
				i++;
			}
		break;
		case "Sunday":
			i=bIndex;
			while (i<=eIndex){
				jsonObject.friend1.sun.push(i);
				i++;
			}
		break;

	}
	
}
function convertTimeToJson(){

	var bTime = document.getElementById('inputBTime').value;
	var bHour = (bTime).toString().substr(0, 2);
	var bMinute = bTime.toString().substr(3,5);
	var eTime = document.getElementById('inputETime').value;
	var eHour = (eTime).toString().substr(0, 2);
	var eMinute = eTime.toString().substr(3,5);
	
	switch(bHour) {
    case '07':
        if (bMinute < 30){
        	bIndex=0;
        }else{
        	bIndex=1;
        }
        break;
    case '08':
        if (bMinute < 30){
        	bIndex=2;
        }else{
        	bIndex=3;
        }
        break;
    case '09':
        if (bMinute < 30){
        	bIndex=4;
        }else{
        	bIndex=5;
        }
        break;
    case '10':
        if (bMinute < 30){
        	bIndex=6;
        }else{
        	bIndex=7;
        }
        break;
    case '11':
        if (bMinute < 30){
        	bIndex=8;
        }else{
        	bIndex=9;
        }
        break;
    case '12':
        if (bMinute < 30){
        	bIndex=10;
        }else{
        	bIndex=11;
        }
        break;
    case '13':
        if (bMinute < 30){
        	bIndex=12;
        }else{
        	bIndex=13;
        }
        break;
    case '14':
        if (bMinute < 30){
        	bIndex=14;
        }else{
        	bIndex=15;
        }
        break;

    case '15':
        if (bMinute < 30){
        	bIndex=16;
        }else{
        	bIndex=17;
        }
        break;

    case '16':
        if (bMinute < 30){
        	bIndex=18;
        }else{
        	bIndex=19;
        }
        break;
    case '17':
        if (bMinute < 30){
        	bIndex=20;
        }else{
        	bIndex=21;
        }
        break;
    case '18':
        if (bMinute < 30){
        	bIndex=22;
        }else{
        	bIndex=23;
        }
        break;
    case '19':
        if (bMinute < 30){
        	bIndex=24;
        }else{
        	bIndex=25;
        }
        break;
    default:
    	bIndex=0;
   
}

	switch(eHour) {
    case '07':
        if (eMinute < 30){
        	eIndex=0;
        }else{
        	eIndex=1;
        }
        break;
    case '08':
        if (eMinute < 30){
        	eIndex=2;
        }else{
        	eIndex=3;
        }
        break;
    case '09':
        if (eMinute < 30){
        	eIndex=4;
        }else{
        	eIndex=5;
        }
        break;
    case '10':
        if (eMinute < 30){
        	eIndex=6;
        }else{
        	eIndex=7;
        }
        break;
    case '11':
        if (eMinute < 30){
        	eIndex=8;
        }else{
        	eIndex=9;
        }
        break;
    case '12':
        if (eMinute < 30){
        	eIndex=10;
        }else{
        	eIndex=11;
        }
        break;
    case '13':
        if (eMinute < 30){
        	eIndex=12;
        }else{
        	eIndex=13;
        }
        break;
    case '14':
        if (eMinute < 30){
        	eIndex=14;
        }else{
        	eIndex=15;
        }
        break;

    case '15':
        if (eMinute < 30){
        	eIndex=16;
        }else{
        	eIndex=17;
        }
        break;

    case '16':
        if (eMinute < 30){
        	eIndex=18;
        }else{
        	eIndex=19;
        }
        break;
    case '17':
        if (eMinute < 30){
        	eIndex=20;
        }else{
        	eIndex=21;
        }
        break;
    case '18':
        if (eMinute < 30){
        	eIndex=22;
        }else{
        	eIndex=23;
        }
        break;
    case '19':
        if (eMinute < 30){
        	eIndex=24;
        }else{
        	eIndex=25;
        }
        break;
    default:
    	eIndex='0';
       
   
}
	


}