
var current_username = sessionStorage.getItem("currUser");
var userJson = sessionStorage.getItem(current_username + '-data');
var userData = JSON.parse(userJson);

$(document).ready(function() {
    //display friend list
    displayFriendList2();


    $(document.body).on('click', '.friendBox .delete', function(){
        //turn the button into a sure delete button
        var delete_id = this.id; //should be delete-friend1
        var name_to_delete = delete_id.split("-").pop(); //friend1
        console.log("name to delete: " + name_to_delete);
        $(".friendBox #confirmation-message-" + name_to_delete).slideToggle();
        $(".friendBox #delete-" + name_to_delete).addClass("confirm-delete");
        $(".friendBox #delete-" + name_to_delete).removeClass("delete");
        
    });
    $(document.body).on('click', '.friendBox .confirm-delete', function(){
        /*
        var row = document.getElementById(this.id);
        row.parentNode.removeChild(row);
        var currentUser = sessionStorage.getItem("currUser");
        var userJData =JSON.parse(sessionStorage.getItem(currentUser + '-data'));
        */
        var button_id = this.id; //should be delete-friend1
        var name_to_delete = button_id.split("-").pop();
        console.log("deleting id: " + name_to_delete);
        delete userData[name_to_delete];
        var newJData = JSON.stringify(userData);
        sessionStorage.setItem(current_username + '-data' , newJData);
        displayFriendList2();
    });


    $("#combineButton").click(function(e){
        e.preventDefault();
        if(combineFunction() === -1){
            console.log('error occured when adding friend');
        }
        else{
            $("#successMsg").slideDown();
            $("#successMsg").delay(1500).slideUp();
            displayFriendList2();
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
    //get currennt user's  json object name
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
        sessionStorage.setItem(current_username + '-data' , newData);
    // add friend list
       //displayFriendList();

    } else {
        $('#error_notfound').slideDown();
        $("#error_notfound").delay(1500).slideUp();
        return -1;
    }
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
 userData = JSON.parse(sessionStorage.getItem(current_user + '-data'));
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

function displayFriendList2(){
    var source = $("#friends-template").html();
    var template = Handlebars.compile(source);
    var context = {
        friends : userData
    }
    var new_html = template(context);
    $("#friendlistContainer").html(new_html);
    
    var num_friends = Object.keys(userData).length;
    console.log("num_friends = " + num_friends);
    if(num_friends < 2){ //num_friends includes yourself
        $("#friendlistContainer").html("<p style='text-align:center; color: #ccc'>Empty</p>");
    }
    
}
















