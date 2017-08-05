var buttonIDs = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var trIDs = ["row_one", "row_two", "row_three"];

$(document).ready(function(){
    var currTrID;
    for(var i = 0; i < buttonIDs.length; i++){
        if(i%3 === 0){
            $("#layout").append("<tr id = '" + trIDs[i/3] + "'></tr>");
            currTrID = trIDs[i/3];
        }
        $("#" + currTrID).append("<td><button id ='" + buttonIDs[i] + "' class = 'myinvisible'></button></td>");
    }
});