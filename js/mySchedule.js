
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
    fillBlocks("mon");
    $(document).on( 'shown.bs.tab', 'a[data-toggle="pill"]', function (e) {
    console.log(e.target.id);
    showTab(e);
    });
    
});



function initializePage() {
	console.log("Javascript connected!");
    //$("#tuesday").html(timeHtml);
    $("#wednesday").html(timeHtml);
    }
    

function showTab(e){
    
    var daytab = e.target.id;
    console.log(daytab);
    if(daytab == "mon-tab"){
        fillBlocks("mon");
    }
    if(daytab == "tue-tab"){
        if( $(".tab-content .active").html() == '0'){
            console.log("filling table");
            $("#tuesday").html(timeHtml);
        }
        fillBlocks("tue");
    }
    if(daytab == "wed-tab"){
        if( $(".tab-content .active").html() == '0'){
            console.log("filling table");
            $("#wednesday").html(timeHtml);
        }
        fillBlocks("wed");
    }
    if(daytab == "thu-tab"){
        if( $(".tab-content .active").html() == '0'){
            console.log("filling table");
            $("#thursday").html(timeHtml);
        }
        fillBlocks("thu");
    }
    if(daytab == "fri-tab"){
        if( $(".tab-content .active").html() == '0'){
            console.log("filling table");
            $("#friday").html(timeHtml);
        }
        fillBlocks("fri");
    }
    
    if(daytab == "sat-tab"){
        if( $(".tab-content .active").html() == '0'){
            console.log("filling table");
            $("#saturday").html(timeHtml);
        }
        fillBlocks("sat");
    }
    
    if(daytab == "sun-tab"){
        if( $(".tab-content .active").html() == '0'){
            console.log("filling table");
            $("#sunday").html(timeHtml);
        }
        fillBlocks("sun");
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
var jsonObject = '{ "friend" : { \
                "mon" : [0,1,2,5,9,10], \
                "tue" : [0,3,4,5], \
                "wed" : [1,4,4,2], \
                "thu" : [8], \
                "fri" : [7], \
                "sat" : [6], \
                "sun" : [5] } \
                }';


function parseSchedules(day){
    //extracts all json objects from session.
    var obj = JSON.parse(jsonObject);
    if(day === "mon"){
        console.log(obj.friend.mon);
        return obj.friend.mon;
    }
    else if (day === "tue"){
        return obj.friend.tue;
    }
    //var array = [obj.friend.mon, obj.friend.tue, obj.friend.wed]; //TODO: expand
    else if (day === "wed"){
        return obj.friend.wed;
    }
    else if (day === "thu"){
        return obj.friend.thu;
    }
    else if (day === "fri"){
        return obj.friend.fri;
    }
    else if (day === "sat"){
        return obj.friend.sat;
    }
    else if (day === "sun"){
        return obj.friend.sun;
    }
    return -1;
}


function fillBlocks(day){
    //sample array:
    //var array = [0,1,3,5];
    console.log("in fillblocks");
    var array = parseSchedules(day);
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

document.getElementById('eventblock').appendChild(table);
function clickfunction(e){
    e.preventDefault();
    console.log("clicked");
}
