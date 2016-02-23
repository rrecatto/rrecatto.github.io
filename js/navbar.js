$(document).ready(function() {
	initializeNav();
    

   console.log(window.location.href);
   console.log(location.pathname.split('/').pop());
   var current_page = location.pathname.split('/').pop();
   if(current_page == 'mySchedule.html'){
       $(".navbar #nav_schedule").addClass('active');
   }
   else if(current_page == 'combineSchedule.html'){
       $(".navbar #nav_combine").addClass('active');
   }
   else if(current_page == 'createSchedule.html'){
       $(".navbar #nav_create").addClass('active');
   }
   
})

function initializeNav() {
    var htmlStr = '<ul class="navUL"><li class="navLI"><a class="border" href="createSchedule.html">Add Events</a></li><li class="navLI"><a class="border"  href="combineSchedule.html">Add Friends</a></li><li class="navLI" id="lastNav"><a href="mySchedule.html">Schedule</a></li><ul class="navUL" style="float:right;list-style-type:none;"><li class="navLI"><button id="logoutButton" onclick="logout()" style="float:right;" class="navbar-btn">Log Out</button></li></ul></ul><br>';
    var htmlStr2 = 
    '<nav class="navbar navbar-default">\
        <div class="container-fluid">\
            <ul class="nav navbar-nav">\
                <li id="nav_create"><a href="createSchedule.html">Times</a></li>\
                <li id="nav_combine"><a href="combineSchedule.html">Friends</a></li> \
                <li id="nav_schedule"><a href="mySchedule.html">Schedules</a></li> \
            </ul>\
            <ul class="nav navbar-nav navbar-right">\
                <li>\
                    <button class="btn btn-default btn-sm" onclick="logout()">Log Out</button>\
                </li>\
            </ul>\
        </div>\
    </nav>';

    $("#navbar").html(htmlStr2);    
}

function logout() {
    window.location.href = 'index.html';
}