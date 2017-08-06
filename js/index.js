var buttonIDs = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var trIDs = ["row_one", "row_two", "row_three"];
var flags = [];
var playerMark = "x";
var opponentMark = "o";
var playersTurn = false;
var playerTrack = [0, 0, 0, 0, 0, 0, 0, 0]; // row1, row2, row3, col1, col2, col3, diag1, diag2
var opponentTrack = [0, 0, 0, 0, 0, 0, 0, 0];

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
        opponentMark = "o";
       $("#x").css({"background-color": "yellow"});
       $("#o").css({"background-color": "#32CD32"});
    });
    $("#o").click(function(){
        playerMark = "o";
        opponentMark = "x";
       $("#x").css({'background-color': '#32CD32'});
       $("#o").css({'background-color': 'yellow'});
    });
    if(!playersTurn){
        placeMarker();
        checkWin();
    }
    else{
        aiMove();
        checkWin();
    }
});

function placeMarker(){
    $("button").click(function(){
       if(buttonIDs.includes(this.id)){
           var index = buttonIDs.indexOf(this.id);
           if(flags[index] === "*"){
               flags[index] = playerMark;
               $("#" + this.id).text("" + playerMark);
               if(index === 0){
                   playerTrack[0]++;
                   playerTrack[3]++;
                   playerTrack[6]++;
               }
               if(index === 1){
                   playerTrack[0]++;
                   playerTrack[4]++;
               }
               if(index === 2){
                   playerTrack[0]++;
                   playerTrack[5]++;
                   playerTrack[7]++;
               }
               if(index === 3){
                   playerTrack[1]++;
                   playerTrack[3]++;
               }
               if(index === 4){
                   playerTrack[1]++;
                   playerTrack[4]++;
                   playerTrack[6]++;
                   playerTrack[7]++;
               }
               if(index === 5){
                   playerTrack[1]++;
                   playerTrack[5]++;
               }
               if(index === 6){
                   playerTrack[2]++;
                   playerTrack[3]++;
                   playerTrack[7]++;
               }
               if(index === 7){
                   playerTrack[2]++;
                   playerTrack[4]++;
               }
               if(index === 8){
                   playerTrack[2]++;
                   playerTrack[6]++;
               }
           }
       } 
    });
}

function aiMove(){
    // implement later
}

function checkWin(){
    for(var i = 0; i < playerTrack.length; i++){
        if(playerTrack[i] === 3){
            alert("You win!");
        }
    }
}