$(document).ready(function() {
	initializePage();
})


function initializePage() {
    

}


jsonTemplate = '{ "mon" : [], "tue" : [], "wed" : [], "thu" : [], "fri" : [], "sat" : [], "sun" : [] }'

function signUpUser() {

    var userName = $('#regName').val();
    var passWord = $('#regPassword').val();
    var pwRepeat = $('#regPasswordAgain').val();
    var testName = sessionStorage.getItem(userName);
    
    if(passWord==='' || pwRepeat==='' || userName==='') {
        $('#regError').html('<p style="color:red;text-align:center;">ERROR: PLEASE FILL OUT ALL FIELDS</p>');
        console.log("here");
    }
    else if(!(pwRepeat === passWord)) {
        console.log("here2");
        $('#regError').html('<p style="color:red;text-align:center;">ERROR: PASSWORDS DO NOT MATCH</p>');
    }
    else if (testName != null) {   

        $('#regError').html('<p style="color:red;text-align:center;">ERROR: USERNAME ALREADY EXIST</p>');
        
    }else{

        sessionStorage.setItem(userName,passWord); 

        console.log("user name is : " + userName+" passWord is : " + passWord);
        
        window.location.href = 'index.html';
    }
        
}


function authorizeLogin() {
    var userName = $('#inputName').val();
    var passWord = $('#inputPassword').val();
    var pw = sessionStorage.getItem(userName);

    
    
    if(userName==='' || passWord==='') {
        $('#logError').html('<p style="color:red;text-align:center;">ERROR: PLEASE ENTER BOTH EMAIL AND PASSWORD</p>');
        console.log("here");
    }
    else if(pw==null) {
        $('#logError').html('<p style="color:red;text-align:center;">ERROR: USERNAME DOES NOT EXIST(no users)</p>');
    }
    else if(passWord!=pw){
        $('#logError').html('<p style="color:red;text-align:center;">ERROR: EITHER USERNAME OR PASSWORD INCORRECT</p>');
    }
    else {
            console.log("user name is : " + userName+" passWord is : " + pw);
            sessionStorage.setItem("currUser",userName);
            if(sessionStorage[userName+"-data"]){
                window.location.href = 'mySchedule.html';
            }
            else{
                jsonObject = '{ "' + userName + '" : ' + jsonTemplate + '}' ;
                sessionStorage.setItem(userName+"-data", jsonObject);
                sessionStorage.setItem("firstLogin","true");
                window.location.href = "mySchedule.html"; //<--- change this to the landing page
            }
            
    }
    
           
}

function cancel(){
 window.location.href = 'index.html';

}