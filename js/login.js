$(document).ready(function() {
	initializePage();
})


function initializePage() {
    

}


function signUpUser() {

    var userName = $('#regEmail').val();
    var passWord = $('#regPassword').val();
    var pwRepeat = $('#regPasswordAgain').val();
    
    if(passWord==='' || pwRepeat==='' || userName==='') {
        $('#regError').html('<p style="color:red;text-align:center;">ERROR: PLEASE FILL OUT ALL FIELDS</p>');
        console.log("here");
    }
    else if(!(pwRepeat === passWord)) {
        console.log("here2");
        $('#regError').html('<p style="color:red;text-align:center;">ERROR: PASSWORDS DO NOT MATCH</p>');
    }
    else {      
        sessionStorage.user = userName;
        sessionStorage.pw = passWord;
        
        window.location.href = 'rrecatto.github.io';
    }
        
}


function authorizeLogin() {
    
    var userName = $('#inputEmail').val();
    var passWord = $('#inputPassword').val();
    var email = sessionStorage.user;
    var pw = sessionStorage.pw;
    
    if(userName==='' || passWord==='') {
        $('#logError').html('<p style="color:red;text-align:center;">ERROR: PLEASE ENTER BOTH EMAIL AND PASSWORD</p>');
        console.log("here");
    }
    else if(email==null ||pw==null) {
        $('#logError').html('<p style="color:red;text-align:center;">ERROR: EITHER USERNAME OR PASSWORD INCORRECT (no users)</p>');
    }
    else if(userName!=email || passWord!=pw){
        $('#logError').html('<p style="color:red;text-align:center;">ERROR: EITHER USERNAME OR PASSWORD INCORRECT</p>');
    }
    else {
        window.location.href = '/mySchedule';
    }
    
           
}