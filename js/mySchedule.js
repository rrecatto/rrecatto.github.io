/* ------------------global variables (sample json)----------------- */
/* var jsonObject = '{ "friend1" : { \
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
                }'; */
//var data = JSON.parse(jsonObject);
//sessionStorage.setItem('example', jsonObject);
var current_username = sessionStorage.getItem("currUser");
var exampleData = sessionStorage.getItem(current_username + '-data');
var scheduleData = JSON.parse(exampleData);


                
/* ---------- Page Load Function --------------*/
$(document).ready(function() {
	console.log("Javascript connected!");
    //for first login, show landing page
      var firstLogin = sessionStorage.getItem("firstLogin");
    console.log ("in function");
    if(firstLogin=="true"){

        $('#landingModal').modal('show');
        sessionStorage.setItem("firstLogin","false");
    }

    
    
    drawFriends();
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
    
    //if($("#friend-0").length != 0) {  //check if id exists
    $('#friend-0').change(function() {
        var friend_checked = $(this).prop('checked');
        if(friend_checked){
            $(".stack0").fadeIn();
        } else {
            $(".stack0").fadeOut();
        }
    });
    
    $('#friend-1').change(function() {
        var friend_checked = $(this).prop('checked');
        if(friend_checked){
            $(".stack1").fadeIn();
        } else {
            $(".stack1").fadeOut();
        }
    });
    
    $('#friend-2').change(function() {
        var friend_checked = $(this).prop('checked');
        if(friend_checked){
            $(".stack2").fadeIn();
        } else {
            $(".stack2").fadeOut();
        }
    });
    
    $('#friend-3').change(function() {
        var friend_checked = $(this).prop('checked');
        if(friend_checked){
            $(".stack3").fadeIn();
        } else {
            $(".stack3").fadeOut();
        }
    });
    
    $('#friend-4').change(function() {
        var friend_checked = $(this).prop('checked');
        if(friend_checked){
            $(".stack4").fadeIn();
        } else {
            $(".stack4").fadeOut();
        }
    });
    
    
    //need this to display tabs on tab-switch
    $(document).on( 'shown.bs.tab', 'a[data-toggle="pill"]', function (e) {
    console.log(e.target.id);
    });

});



function drawFriends(){
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    
    
    
    Handlebars.registerHelper('pairs', function(context, options) {
        var cells = [], html, k;
        for (k in context) {
            if (context.hasOwnProperty(k)) {
                html = options.fn({
                    key: k,
                    value: context[k]
                }); 
                cells.push(html);
            }
        }
        return cells.join('');
    });
    var source = $("#friendlist-template").html();
    var template = Handlebars.compile(source);
    var context = { 
        friends : scheduleData
    }
    var new_html = template(context);
    
    $("#friend-filter").html(new_html);
}

//handlebars stuff
function drawTables(){
    //use handlebars to generate a table
    var source = $("#table-template").html();
    var template = Handlebars.compile(source);
    var context = { 
        timeSlots : MStimeContent
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
    
    
    for(var friend in scheduleData){
        if(scheduleData[friend][shortenedDay].length == 0){
            console.log("no blocks need coloring");
            stackCount++;
        }
        else{
            fillBlocks(day,stackCount,scheduleData[friend][shortenedDay]);
            stackCount++;
        }
    }
}



function toggleFriend(){
    
    
    
    
}



var currentIndex = 0,
  items = $('.slider div'),
  itemAmt = items.length;

function cycleItems() {
  var item = $('.slider div').eq(currentIndex);
  items.hide();
  item.css('display','inline-block');
}



$('.control_next').click(function() {
  
  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
    currentIndex = 0;
  }
  cycleItems();
});

$('.control_prev').click(function() {
 
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = itemAmt - 1;
  }
  cycleItems();
});

