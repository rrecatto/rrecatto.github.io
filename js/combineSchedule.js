
var current_username = sessionStorage.getItem("currUser");
var userJson = sessionStorage.getItem(current_username + '-data');
var userData = JSON.parse(userJson);
var ref = new Firebase("https://freeup.firebaseio.com/");
var authData = ref.getAuth();
$(document).ready(function() {
    //display friend list
    displayFriendList2();

    var buttonid;
    $(document.body).on('click', '.friendBox .delete', function(){
        $('#fullPage').show();
        buttonid = this.id;

        $('#cancel-delete').click(function(){
            $('#fullPage').hide();
        });
        
    });
    $('#confirm-delete').click(function(){
        console.log("button-id = " + buttonid);
        deleteFriend(buttonid);
        $('#fullPage').hide();
    });

    $("#combineButton").click(function(e){
        e.preventDefault();
        if(combineFunction() === -1){
            console.log('error occured when adding friend');
        }
        else{
            $("#successmsg").fadeIn();
            $("#successmsg").delay(1200).fadeOut();
            displayFriendList2();
        }

    });
});
function deleteFriend(btnID){
    current_username = sessionStorage.getItem("currUser");
    userJson = sessionStorage.getItem(current_username + '-data');
    userData = JSON.parse(userJson);
    console.log("userdata before:"); console.log(userData);
    var button_id = btnID; //should be delete-friend1
    var name_to_delete = button_id.split("-").pop();
    console.log("deleting id: " + name_to_delete);
    delete userData[name_to_delete];
    console.log("userdata after:"); console.log(userData);
    var newJData = JSON.stringify(userData);
    sessionStorage.setItem(current_username + '-data' , newJData);

    ref.child('users').child(authData.uid).update({
         events:newJData
     });
    displayFriendList2();
}
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
    current_username = sessionStorage.getItem("currUser");
    userJson = sessionStorage.getItem(current_username + '-data');
    userData = JSON.parse(userJson);
    console.log("exampleData = " + userData);
    console.log(typeof(userData));
    var num_friends = Object.keys(userData).length;
    var friendUsername = $("#friendUsername").val();
    if (friendUsername == current_username){
        console.log("friend "+ friendUsername);
        console.log("current_user"+ current_username);
        $('#error_addCurrUser').slideDown();
        $("#error_addCurrUser").delay(1500).slideUp();
        return -1;

    }
    
    else if(num_friends > 4){
        
        $('#error_toomany').slideDown();
        $("#error_toomany").delay(1500).slideUp();
        return -1;
    }
    else if(sessionStorage.getItem(friendUsername + '-data') != null){
        var friendJson = sessionStorage.getItem(friendUsername+"-data");
        var friendData = JSON.parse(friendJson);
        console.log(JSON.stringify(friendData));

        userData[friendUsername] = friendData[friendUsername];
        console.log("userJson"+userJson);
        /* var friendData = friendData.substring(1,friendData.length-1);
        var newData = userData.substring(0, userData.length - 1) + ',' + friendData + '}'; */
        
        var newData = JSON.stringify(userData);
        sessionStorage.setItem(current_username + '-data' , newData);
        console.log("new data" + newData);

        ref.child('users').child(authData.uid).update({
         events:newData
        });

    } else {
        $('#error_notfound').slideDown();
        $("#error_notfound").delay(1500).slideUp();
        return -1;
    }
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
















