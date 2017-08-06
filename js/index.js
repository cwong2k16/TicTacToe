var buttonIDs = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var trIDs = ["row_one", "row_two", "row_three"];
var flags = [];
var playerMark = "x";

for(var i = 0; i < 9; i++){
    flags[i] = "*";
}

$(document).ready(function(){    
    $("#myModal").modal({
        backdrop: 'static',
        keyboard: false
    });
    var currTrID;
    for(var i = 0; i < buttonIDs.length; i++){
        if(i%3 === 0){
            $("#layout").append("<tr id = '" + trIDs[i/3] + "'></tr>");
            currTrID = trIDs[i/3];
        }
        $("#" + currTrID).append("<td><button id ='" + buttonIDs[i] + "' class = 'myinvisible'></button></td>");
    }
    $("#myModal").modal('show');
    $("#x").click(function(){
        playerMark = "x";
       $("#x").css({"background-color": "yellow"});
       $("#o").css({"background-color": "#32CD32"});
    });
    $("#o").click(function(){
        playerMark = "o";
       $("#x").css({'background-color': '#32CD32'});
       $("#o").css({'background-color': 'yellow'});
    });
});