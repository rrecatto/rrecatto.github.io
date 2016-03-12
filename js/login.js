var ref = new Firebase("https://freeup.firebaseio.com/");


$(document).ready(function() {
	initializePage();
})


function initializePage() {
    

}


jsonTemplate = '{ "mon" : [], "tue" : [], "wed" : [], "thu" : [], "fri" : [], "sat" : [], "sun" : [] }'

function signUpUser() {
    var userEmail=$('#regEmail').val();
    var userName = $('#regName').val();
    var passWord = $('#regPassword').val();
    var pwRepeat = $('#regPasswordAgain').val();
    var letters = /^[A-Za-z]+$/;
    var re = /^\w+$/;

   var usersRef = new Firebase("https://freeup.firebaseio.com/users");
   var exists = false;
   usersRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            if(userName === childSnapshot.val().name){
            
              exists = true;
              $('#regError').html('<p style="color:red;text-align:center;">ERROR: The username already exists.</p>');
            }

        });
        if(exists===false){
    if(passWord==='' || pwRepeat==='' || userName==='') {
        $('#regError').html('<p style="color:red;text-align:center;">ERROR: PLEASE FILL OUT ALL FIELDS</p>');
        console.log("here");
    }
    else if(!(pwRepeat === passWord)) {
        console.log("here2");
        $('#regError').html('<p style="color:red;text-align:center;">ERROR: PASSWORDS DO NOT MATCH</p>');
    }else if(!userName.substr(0,1).match(letters)) {
         $('#regError').html('<p style="color:red;text-align:center;">ERROR:FIRST LETTER OF USERNAME CAN ONLY BE LETTERS</p>');
    }else if (!re.test(userName.substr(1))) {
        $('#regError').html('<p style="color:red;text-align:center;">ERROR:Username must contain only letters, numbers and underscores!</p>');  

       
    }else{

        sessionStorage.setItem(userName,passWord); 
        sessionStorage.setItem("firstLogin","true");
        console.log("user name is : " + userName+" passWord is : " + passWord);
        //setup login
        sessionStorage.setItem("currUser",userName);

        ref.createUser({
         email    : userEmail,
         password : passWord,
         userName: userName
        }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
           
             console.log("Successfully created user account with uid:", userData.uid);

             ref.authWithPassword({
                    email: userEmail,
                    password: passWord,
                },signupLoginCallback);

          }
        });
        setStorage(userEmail);
               //window.location.href = 'index.html';
    }
        

        }

    });
  
    
}


function authorizeLogin() {
    var userEmail = $('#inputEmail').val();
    var passWord = $('#inputPassword').val();

    if(userEmail==='' || passWord==='') {
        $('#logError').html('<p style="color:red;text-align:center;">ERROR: PLEASE ENTER BOTH EMAIL AND PASSWORD</p>');
        console.log("here");
    }else{
        ref.authWithPassword({
            email    : userEmail,
            password : passWord
        },setSessionStorage);

    }
    setStorage(userEmail);
      
}

function cancel(){
 window.location.href = 'index.html';

}

var signupLoginCallback = function(error,authData)
  {
    var userEmail=$('#regEmail').val();
    var userName = $('#regName').val();


    if (error) 
    {
      console.log("Login Failed!", error);
    } 
    else 
    {
      console.log("Authenticated successfully with payload:", authData);
      jsonObject = '{ "' + userName + '" : ' + jsonTemplate + '}' ;
      sessionStorage.setItem(userName+"-data", jsonObject);
      var events= jsonObject;
      console.log("upload in sign up" + events);
      ref.child("users").child(authData.uid).set({
             email: userEmail,
             name: userName,
             events:events,
             firstLogin:true


      });
       
      
      window.location.href = 'createSchedule.html';
      
     
    }
  }
var setSessionStorage = function(error, authData) {
            if (error) {
                switch (error.code) {
                case "INVALID_EMAIL":
                    $('#logError').html('<p style="color:red;text-align:center;">ERROR: The user account email is invalid</p>');
                    console.log("The specified user account email is invalid.");
                break;
                case "INVALID_PASSWORD":
                    $('#logError').html('<p style="color:red;text-align:center;">ERROR: The user account password is incorrect.</p>');
                    console.log("The specified user account password is incorrect.");
                break;
                case "INVALID_USER":
                  $('#logError').html('<p style="color:red;text-align:center;">ERROR: The user account does not exist.</p>');
                  console.log("The specified user account does not exist.");
                break;
                default:
                console.log("Error logging user in:", error);
                }
             } else {
                console.log("in login call back");
                sessionStorage.setItem("currUid",authData.uid);
               
                window.location.href = 'mySchedule.html';
                console.log("Authenticated successfully with payload:", authData);
            }
}

function setStorage(userEmail){
    console.log("in 2");
    ref.child('users').on("child_added", function(snapshot) {
        console.log("in 3");   
        console.log(snapshot.val());
        
        var name = snapshot.val().name;
        sessionStorage.setItem(name,"password");
        console.log("userEmail is" + userEmail + "  snap Email is " +snapshot.val().email); 
        if( userEmail === snapshot.val().email){
            
            sessionStorage.setItem("currUser",name);
            console.log("currUser is " + name);
            sessionStorage.setItem(name+"-data",snapshot.val().events);
        }else{
            console.log("otherName"+name);
            sessionStorage.setItem(name,name);
           
            sessionStorage.setItem(name+"-data",snapshot.val().events);


        }
       
        

    });
}
