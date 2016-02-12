/* ------------------global variables (sample json)----------------- */
var jsonObject = '{ "friend1" : { \
                                "mon" : [0,1,2,4,5,8], \
                                "tue" : [0,3,4,5], \
                                "wed" : [1,2,4], \
                                "thu" : [8], \
                                "fri" : [7], \
                                "sat" : [6], \
                                "sun" : [5]  \
                                }, \
                    "friend2" : { \
                                "mon" : [5,6,9], \
                                "tue" : [0,1,2], \
                                "wed" : [1,2,4], \
                                "thu" : [8], \
                                "fri" : [7], \
                                "sat" : [6], \
                                "sun" : [5] \
                                } \
                }';
//var data = JSON.parse(jsonObject);
//sessionStorage.setItem('example', jsonObject);
var exampleData = sessionStorage.getItem('example');
var data = JSON.parse(exampleData);


                
/* ---------- Page Load Function --------------*/
$(document).ready(function() {
	console.log("Javascript connected!");
    
    drawTables();
    //draw all pages simultaneously
    generateBlocks("monday");
    generateBlocks("tuesday");
    generateBlocks("wednesday");
    generateBlocks("thursday");
    generateBlocks("friday");
    generateBlocks("saturday");
    generateBlocks("sunday");
    
    $(".time-table td").append("</br>"); //formatting is hell
    
    //on tab switch, draw according to the day of tab
    $(document).on( 'shown.bs.tab', 'a[data-toggle="pill"]', function (e) {
    console.log(e.target.id);
    });

});

//handlebars stuff
function drawTables(){
    //use handlebars to generate a table
    var source = $("#table-template").html();
    var template = Handlebars.compile(source);
    var context = { //move this to a different file or something.
        timeSlots : timeContent
    }
    var new_html = template(context);
    
    //draw ALL the tables!
    $("#monday").html(new_html);
    $("#tuesday").html(new_html);
    $("#wednesday").html(new_html);
    $("#thursday").html(new_html);
    $("#friday").html(new_html);
    $("#saturday").html(new_html);
    $("#sunday").html(new_html);
}

function fillBlocks(day, stackIndex, times){
    //day is "mon", "tues", "wed", ...
    //stackIndex is 0,1,2
    //times is [0,1,3,4,5]
    
    var prefix = ".tab-content #" + day;
    for(var i = 0 ; i < times.length; i++){
        var id = prefix + " #t" + times[i]; // ".tab-content # #t3"
        /*
            console.log("id = " + id);
            console.log(id);
        */
        //create a div inside
        
        if($(id).html() == "placeholder"){
            $(id).html("");
        };
        $(id).append("<div class='stack" + stackIndex + "'" + "> &nbsp;</div>");
        
        //draw curves on top and bottoms of blocks
        if(i == 0){
            $(id + " .stack" + stackIndex).addClass("top-of-block");
        }
        else if( times[i-1] != times[i] - 1 ){
            $(id + " .stack" + stackIndex).addClass("top-of-block");
        }
        if( i < times.length - 1 && (times[i + 1] != times[i] + 1)){
            $(id + " .stack" + stackIndex).addClass("bottom-of-block");
        }
        if(i == times.length - 1){
            $(id + " .stack" + stackIndex).addClass("bottom-of-block");
        }
        
    }
}

function outlineBlocks(day,times){
    //TBD
}

function generateBlocks(day){
    console.log("generating day: " + day);
    //how many blocks are currently stacked
    var stackCount = 0;
    
    var shortenedDay = day.substring(0,3); // ex: "sunday" -> "sun"
    for(var friend in data){
        if(data[friend][shortenedDay].length == 0){
            console.log("no blocks need coloring");
            stackCount++;
        }
        else{
            fillBlocks(day,stackCount,data[friend][shortenedDay]);
            stackCount++;
        }
    }
}

