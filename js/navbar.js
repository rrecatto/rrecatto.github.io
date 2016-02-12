$(document).ready(function() {
	initializePage();
})

function initializePage() {
    
    var htmlStr = '<nav class="navbar navbar-default">\
          <div class="container-fluid">\
              <ul class="navUL">\
                  <li class="navLI"><a href="createSchedule.html">Create</a></li>\
                  <li class="navLI"><a href="combineSchedule.html">Combine</a></li>\
                  <li class="navLI"><a href="mySchedule.html">Name</a></li>\
                  <li class="navLI"><button onclick="window.location="http://rrecatto.github.io;" type="button" class="navbar-btn">Log Out</button></li>\
              </ul>\
          </div>\
      </nav>';

    console.log(htmlStr);
    $("#navbar").html(htmlStr);    
}