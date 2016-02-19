$(document).ready(function() {
	initializeNav();
})

function initializeNav() {
    
    var htmlStr = '<ul class="navUL"><li class="navLI"><a class="border" href="createSchedule.html">Add Events</a></li><li class="navLI"><a class="border"  href="combineSchedule.html">Add Friends</a></li><li class="navLI" id="lastNav"><a href="mySchedule.html">Schedule</a></li><ul class="navUL" style="float:right;list-style-type:none;"><li class="navLI"><button id="logoutButton" onclick="logout()" style="float:right;" class="navbar-btn">Log Out</button></li></ul></ul><br>';

    $("#navbar").html(htmlStr);    
}

function logout() {
 
    window.location.href = 'index.html';
    
}