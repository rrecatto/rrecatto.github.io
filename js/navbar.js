$(document).ready(function() {
	initializeNav();
})

function initializeNav() {
    
    var htmlStr = '<nav class="navbar navbar-default"><div class="container-fluid"><ul class="navUL"><li class="navLI"><a href="createSchedule.html">Create</a></li><li class="navLI"><a href="combineSchedule.html">Combine</a></li><li class="navLI"><a href="mySchedule.html">Name</a></li><li class="navLI"><button onclick="logout()" class="navbar-btn">Log Out</button></li></ul></div></nav>';

    $("#navbar").html(htmlStr);    
}

function logout() {
 
    window.location.href = 'rrecatto.github.io';
    
}