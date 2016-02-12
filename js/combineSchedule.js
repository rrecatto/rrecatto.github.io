$(document).ready(function() {
    
})

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

function combineFunction() {
    //this is hardcoded, make this not hardcoded later
    if(sessionStorage.getItem('example') === null){
    console.log("no data in session storage");
    var jsonObject = '{ "friend1" : { \
                            "mon" : [], \
                            "tue" : [], \
                            "wed" : [], \
                            "thu" : [], \
                            "fri" : [], \
                            "sat" : [], \
                            "sun" : []  \
                             } \
                       }'
    console.log("created new jsonObject");
    sessionStorage.setItem('example',jsonObject)
    var exampleData = sessionStorage.getItem('example',jsonObject);
    }
    else{
        var exampleData = sessionStorage.getItem('example');
    }
    console.log("exampleData = " + exampleData);
    console.log(typeof(exampleData));
    var friendToCombineWith = ' , "friend2" : { \
                                "mon" : [0,1,2,5,6,7,10,11,12,13], \
                                "tue" : [0,3,4,5], \
                                "wed" : [1,4,2], \
                                "thu" : [8], \
                                "fri" : [7], \
                                "sat" : [6], \
                                "sun" : [5]  \
                                }';
    var newData = exampleData.substring(0, exampleData.length - 1) + friendToCombineWith + '}'; //appending strings
    console.log(newData);
    
    sessionStorage.setItem('example' , newData);
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
                
    //sessionStorage.setItem('example', newData);
}
