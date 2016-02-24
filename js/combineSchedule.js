$(document).ready(function() {
    //display friend list
    displayFriendList();



    $('table').on('click','button' , function(el){
        var row = document.getElementById(this.id);
        row.parentNode.removeChild(row);
        var currentUser = sessionStorage.getItem("currUser");
        var userJData =JSON.parse(sessionStorage.getItem(currentUser + '-data'));
        var key = this.id;
        console.log("key is"+key);
        delete userJData[key];
        var newJData = JSON.stringify(userJData);
        sessionStorage.setItem(currentUser + '-data' , newJData);


    });


    $("#combineButton").click(function(){
        if(combineFunction() === -1){
            alert("combine failed!");

        }
    

    });
});

/*

var jsonObject = '{ "friend1" : { \
                                "mon" : [0,1,2,5,9,10], \
                                "tue" : [0,3,4,5], \
                                "wed" : [1,4,2], \
                                "thu" : [8], \
                                "fri" : [7], \
                                "sat" : [6], \
                                "sun" : [5]  \
                                }, \
                    "friend2" : { \
                                "mon" : [0,1,6], \
                                "tue" : [0,1,2], \
                                "wed" : [1,4,2], \
                                "thu" : [8], \
                                "fri" : [7], \
                                "sat" : [6], \
                                "sun" : [5] \
                                } \
                }';
*/
function firstObj(obj) {
    for (var a in obj) {
        return a;        
    }
}

function combineFunction() {
    //this is hardcoded, make this not hardcoded later
    //get currennt user's  json object name
    
    var current_user = sessionStorage.getItem("currUser");



    var userJson = sessionStorage.getItem(current_user + '-data');
    var userData = JSON.parse(userJson);
    
    console.log("exampleData = " + userData);
    console.log(typeof(userData));
    var friendUsername = $("#friendUsername").val();
    if(sessionStorage.getItem(friendUsername + '-data') != null){
        var friendJson = sessionStorage.getItem(friendUsername+"-data");
        var friendData = JSON.parse(friendJson);
        //console.log(JSON.stringify(friendData));
        userData[friendUsername] = friendData[friendUsername];
        
        /* var friendData = friendData.substring(1,friendData.length-1);
        var newData = userData.substring(0, userData.length - 1) + ',' + friendData + '}'; */
        
        var newData = JSON.stringify(userData);
        sessionStorage.setItem(current_user + '-data' , newData);

    // add friend list
       displayFriendList();

    } else {
        alert("No user found. Please try again.");
    }
    
    
    

    
    
    
    $('#comFeedback').html('<p style="color:green;text-align:center;">Successfully Added Friend!</p>');
    /*var email = $('#combineEmail');
    
    if(email != "friend1") {
        $('#comError').html('<p style="color:red;text-align:center;">ERROR: PLEASE ENTER BOTH EMAIL AND PASSWORD</p>');
        console.log("here");
    }
    else {
        var friendToCombineWith = '{ "friend1" : { \
                                "mon" : [0,1,2,5,9,10], \
                                "tue" : [0,3,4,5], \
                                "wed" : [1,4,2], \
                                "thu" : [8], \
                                "fri" : [7], \
                                "sat" : [6], \
                                "sun" : [5]  \
                                },';
    }*/
    //sessionStorage.setItem('example', newData);
   

}

function displayFriendList(){
 var current_user = sessionStorage.getItem("currUser");

 userData=JSON.parse(sessionStorage.getItem(current_user + '-data'));
 var friendName = $('#friendUsername').val()+' <a href="#">x</a>';

 $.each(userData,function(key,value){
    if(key!=current_user){
        console.log("here");
        var tr;
        tr = $('<tr id='+key+' />');
        tr.append("<td>"+key+"</td>");
        tr.append("<td>"+'<button id="'+key+'">x</button>'+"</td>");
        $('#friendList').append(tr);
    }
});

    //$('#friendList').append('<tr>'+'<td>'+key+'</td><td><button id="'+key+'">x</button>'+'</td></tr>');});

//$('<li />', {html: friendName}).appendTo('ul.friendList');

}
