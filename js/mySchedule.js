/* ------------------global variables (sample json)----------------- */
var jsonObject = '{ "friend1" : { \
                                "mon" : [0,1,2,4,5,8], \
                                "tue" : [0,3,4,5], \
                                "wed" : [1,4,2], \
                                "thu" : [8], \
                                "fri" : [7], \
                                "sat" : [6], \
                                "sun" : [5]  \
                                }, \
                    "friend2" : { \
                                "mon" : [5,6,9], \
                                "tue" : [0,1,2], \
                                "wed" : [1,4,2], \
                                "thu" : [8], \
                                "fri" : [7], \
                                "sat" : [6], \
                                "sun" : [5] \
                                } \
                }';
//var data = JSON.parse(jsonObject);
sessionStorage.setItem('example', jsonObject);
var exampleData = sessionStorage.getItem('example');
var data = JSON.parse(exampleData);


                
/* ---------- Page Load Function --------------*/
$(document).ready(function() {
	console.log("Javascript connected!");
    
    drawTable();
    //first draw monday because default
    generateTab("mon-tab");
    generateTab("tue-tab");
    generateTab("wed-tab");
    generateTab("thu-tab");
    generateTab("fri-tab");
    generateTab("sat-tab");
    generateTab("sun-tab");
    
    console.log("html is:");
    console.log($(".time-table td").html());
    if($(".time-table td").html() == "placeholder"){
       $(".time-table td").empty();
       $(".time-table td").html("</br>");
    }
    else{
        $(".time-table td").append("</br>");
    }
    
    
    //on tab switch, draw according to the day of tab
    $(document).on( 'shown.bs.tab', 'a[data-toggle="pill"]', function (e) {
    console.log(e.target.id);
    });

});

//angular stuff
/* var app = angular.module('schedule', []);
app.directive("scheduleTemplate", function() {
    return {
        template: timeHtml
    }
}); */

//handlebars stuff
function drawTable(){
    //use handlebars to generate a table
    var source = $("#table-template").html();
    var template = Handlebars.compile(source);
    var context = { //move this to a different file or something.
        timeSlots : timeContentDebug
    }
    var new_html = template(context);
    $("#monday").html(new_html);
    $("#tuesday").html(new_html);
    $("#wednesday").html(new_html);
    $("#thursday").html(new_html);
    $("#friday").html(new_html);
    $("#saturday").html(new_html);
    $("#sunday").html(new_html);
}





//keep this for testing
function fillBlocks(day){
    //sample array:
    //var array = [0,1,3,5];
    console.log("in fillblocks");
    
    var prefix = ".tab-content .active "
        /*debug*/ var testname = $(prefix).attr('class'); console.log(testname);
    //fill block by user : start with just 1 schedule
    for(var i = 0 ; i < array.length; i++){
        var id = prefix + "#t" + array[i]; // ".tab-content .active #t3"
        console.log("id = " + id);
            /*debug*/ var name = $(id).attr('id');  console.log(name);
        $(id).css("background-color", "rgba(0,0,255,0.20)");
    }
    
}

function drawBlocks(){
    
}



function fillBlocks(day, color, times){
    //day is "mon", "tues", "wed", ...
    //color is "red", "yellow", "blue", ...
    //times is [0,1,3,4,5]
    
    var prefix = ".tab-content #" + day;
    for(var i = 0 ; i < times.length; i++){
        var id = prefix + " #t" + times[i]; // ".tab-content # #t3"
            //console.log("id = " + id);
            /*debug*/ console.log(id);
            /*debug*/ var name = $(id).attr('id');
        //get current color and turn it into an array
/*         var currentColor = $(id).css("background-color"); //get 'rgba(r,g,b,a)
        var rgba = currentColor.substring(5, currentColor.length-1).split(/(?:,| )+/); //becomes [r,g,b,a]
        console.log(rgba);
        var rgbaValues = [parseInt(rgba[0]),parseInt(rgba[1]),parseInt(rgba[2]),parseFloat(rgba[3])];
        console.log(rgbaValues);
        
        //decide on 2nd color
        var rgbaValues2 = [255,0,0,0.3]
        if(color == 1){ 
            rgbaValues2 = [0,0,255,0.3];
            }
        else if(color == 2){ 
            rgbaValues2 = [0,255,0,0.3];
            }
        
        //plug in 1st and 2nd color to get combined color
        rgbaValues = addColors(rgbaValues, rgbaValues2);
        console.log(rgbaValues);
        
        //make it into a string again
        rgba = "rgba(" + rgbaValues[0] + "," + rgbaValues[1] + "," + rgbaValues[2] + "," + rgbaValues[3] + ")"
        console.log("final rgba = " + rgba);
        
        $(id).css("background-color", rgba); //drawing stuff
         */
        //create a div inside
        
        if($(id).html() == "placeholder"){
            $(id).html("");
        };
        $(id).append("<div class='stack-color" + color + "'> &nbsp;</div>");
        

        
        if(i == 0){
            //draw the top-left and top-right border
            $(id).css("border-top-left-radius", "10px");
            $(id).css("border-top-right-radius", "10px");
        }
        else if( times[i-1] != times[i] - 1 ){
            //draw the top-left and top-right border
            $(id).css("border-top-left-radius", "10px");
            $(id).css("border-top-right-radius", "10px");
        }
        if( i < times.length - 1 && times[i + 1] == times[i] + 1){
            //$(id).css("border-bottom-left-radius", "10px");
            //$(id).css("border-bottom-right-radius", "10px");
        }
        if(i == times.length - 1){
            $(id).css("border-bottom-left-radius", "10px");
            $(id).css("border-bottom-right-radius", "10px");
        }
        
    }
}

function outlineBlocks(day,times){
    
    
}

function generateTab(daytab){
    //TODO: split the data up into friend1, friend2
    
    //use "mon-tab" to get the corresponding day array from JSON object
    //var array = parseSchedules(daytab);
    var day = "mon-tab";
    console.log(data);
    console.log(data["friend1"]);
    console.log(data["friend1"]["mon"]);
    //check if the array from JSON object has blocks

    console.log(daytab);
    
    //call fillBlocks function 
    switch(daytab){
        case "mon-tab" : day = "monday"; break; 
        case "tue-tab" : day = "tuesday"; break;
        case "wed-tab" : day = "wednesday"; break;
        case "thu-tab" : day = "thursday"; break;
        case "fri-tab" : day = "friday"; break;
        case "sat-tab" : day = "saturday"; break;
        case "sun-tab" : day = "sunday"; break;
        default : console.log("error: invalid day");
    }
    var colorNum = 0;
    var shortenedDay = daytab.substring(0,3);
    console.log(shortenedDay);
    for(var friend in data){
        if(data[friend][shortenedDay].length == 0){
            console.log("no blocks need coloring");
            colorNum++;
        }
        else{
            fillBlocks(day,colorNum,data[friend][shortenedDay]);
            colorNum++;
        }
    }
        

    
}

var timeHtml = "<table class = 'time-table'> \
                <tr><td class = 'time' rowspan='2'>7</td> \
                    <td>&nbsp</td></tr> \
                    <tr><td class='line' id='t0'>7</td></tr> \
                <tr><td class = 'time' rowspan='2'>8</td> \
                    <td id='t1'>730</td></tr> \
                    <tr><td class='line' id='t2'>8</td></tr>\
                <tr><td class = 'time' rowspan='2'>9</td>\
                    <td id='t3'>830</td></tr>\
                    <tr><td class='line' id='t4'>9</td></tr>\
                <tr><td class = 'time' rowspan='2'>10</td>\
                    <td id='t5'>930</td></tr>\
                    <tr><td class='line' id='t6'>10</td></tr>\
                <tr><td class = 'time' rowspan='2'>11</td>\
                    <td id='t7'>1030</td></tr>\
                    <tr><td class='line' id='t8'>11</td></tr>\
                <tr><td class = 'time' rowspan='2'>12</td>\
                    <td id='t9'>1130</td></tr>\
                    <tr><td class='line' id='t10'>12</td></tr>\
                <tr><td class = 'time' rowspan='2'>1</td>\
                    <td id='t11'>1230</td></tr>\
                    <tr><td class='line' id='t12' >1</td></tr>\
                <tr><td class = 'time' rowspan='2'>2</td>\
                    <td id='t13'>130</td></tr>\
                    <tr><td class='line' id='t14'>2</td></tr>\
                <tr><td class = 'time' rowspan='2'>3</td>\
                    <td id='t15'>230</td></tr>\
                    <tr><td class='line' id='t16'>3</td></tr>\
                <tr><td class = 'time' rowspan='2'>4</td>\
                    <td id='t17'>330</td></tr>\
                    <tr><td class='line' id='t18'>4</td></tr>\
                <tr><td class = 'time' rowspan='2'>5</td>\
                    <td id='t19'>430</td></tr>\
                    <tr><td class='line' id='t20'>5</td></tr>\
                <tr><td class = 'time' rowspan='2'>6</td>\
                    <td id='t21'>530</td></tr>\
                    <tr><td class='line' id='t22'>6</td></tr>\
                <tr><td class = 'time' rowspan='2'>7</td>\
                    <td id='t23'>630</td></tr>\
                    <tr><td class='line'>&nbsp;</td></tr></table> "

/* mock JSON object */
/* store JSON object into session.
{ "friend" : { 
                "mon" : [0,1,2,5,9,10], 
                "tue" : [0,3,4,5],
                "wed" : [1,4,4,2] ,
                ... , 
                "sun" : []}
}
*/

                
                
function addColors(rgba1,rgba2){ //uses math to overlay 2 colors
    var r1 = rgba1[0];
    var g1 = rgba1[1];
    var b1 = rgba1[2];
    var a1 = rgba1[3];
    var r2 = rgba2[0];
    var g2 = rgba2[1];
    var b2 = rgba2[2];
    var a2 = rgba2[3];
    var aN = (a2 + a1*(1-a2))
    var rN = Math.floor( (r2*a2 + r1*a1*(1-a1)) / aN );
    var gN = Math.floor( (g2*a2 + g1*a1*(1-a1)) / aN );
    var bN = Math.floor( (b2*a2 + b1*a1*(1-a1)) / aN );
    aN = (aN + 0.10).toFixed(2);
    var newRGBA = [rN,gN,bN, aN ];
    return newRGBA;
}



//unused function
function parseSchedules(day){ //should have friend, day as parameters
    //extracts all json objects from session.
    //returns array
    var obj = JSON.parse(jsonObject);
    if(day === "mon-tab"){
        console.log(obj.friend1.mon);
        return obj.friend1.mon;
    }
    else if (day === "tue-tab"){
        return obj.friend.tue;
    }
    //var array = [obj.friend.mon, obj.friend.tue, obj.friend.wed]; //TODO: expand
    else if (day === "wed-tab"){
        return obj.friend.wed;
    }
    else if (day === "thu-tab"){
        return obj.friend.thu;
    }
    else if (day === "fri-tab"){
        return obj.friend.fri;
    }
    else if (day === "sat-tab"){
        return obj.friend.sat;
    }
    else if (day === "sun-tab"){
        return obj.friend.sun;
    }
    return [];
}
//document.getElementById('eventblock').appendChild(table);
function clickfunction(e){
    e.preventDefault();
    console.log("clicked");
}
