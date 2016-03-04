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
    var htmlStr2 = 
    '<nav id= "navbar" class="navbar navbar-default">\
        <div id="navbar-container" class="container-fluid">\
            <ul id="navbar-ul" class="nav navbar-nav">\
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