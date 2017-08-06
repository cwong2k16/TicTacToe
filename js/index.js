var buttonIDs = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var trIDs = ["row_one", "row_two", "row_three"];
var flags = [];
var playerMark = "x";
var opponentMark = "o";
var opponentTurn = false;
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
    gameLoop = setInterval(function(){
        if(!opponentTurn){
            placeMarker();
        }
        else{
            aiMove();
            checkWin();
        }
    }, 20);
});

function placeMarker(){
    $("button").click(function(){
       if(!opponentTurn){
           if(buttonIDs.includes(this.id)){
               var index = buttonIDs.indexOf(this.id);
               if(flags[index] === "*"){
                   flags[index] = playerMark;
                   $("#" + this.id).text("" + playerMark);
                   playerTrack = updateTrack(index, playerMark);
                   opponentTurn = true; 
               }
            checkWin();
           }
       }
    });
}

function aiMove(){
//     implement later
}

function checkWin(){
    for(var i = 0; i < playerTrack.length; i++){
        if(playerTrack[i] === 3){
            alert("You win!");
        }
        if(opponentTrack[i] === 3){
            alert("Opponent won!");
        }
    }
}

function updateTrack(index, mark){
    var array;
    if(mark === playerMark){
        array = playerTrack;
    }
    else{
        array = opponentTrack;
    }
    if(index === 0){
       array[0]++;
       array[3]++;
       array[6]++;
    }
    if(index === 1){
       array[0]++;
       array[4]++;
    }
    if(index === 2){
       array[0]++;
       array[5]++;
       array[7]++;
    }
    if(index === 3){
       array[1]++;
       array[3]++;
    }
    if(index === 4){
       array[1]++;
       array[4]++;
       array[6]++;
       array[7]++;
    }
    if(index === 5){
       array[1]++;
       array[5]++;
    }
    if(index === 6){
       array[2]++;
       array[3]++;
       array[7]++;
    }
    if(index === 7){
       array[2]++;
       array[4]++;
    }
    if(index === 8){
       array[2]++;
       array[5]++;
       array[6]++;
    }
    return array;
}