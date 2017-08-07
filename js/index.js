var buttonIDs = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var trIDs = ["row_one", "row_two", "row_three"];
var flags = [];
var playerMark = "x";
var opponentMark = "o";
var opponentTurn = false;
var playerTrack = [0, 0, 0, 0, 0, 0, 0, 0]; // row1, row2, row3, col1, col2, col3, diag1, diag2
var opponentTrack = [0, 0, 0, 0, 0, 0, 0, 0];
var gameOver = false;
var playerScore = 0;
var opponentScore = 0;

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
        if(!gameOver){
            if(!opponentTurn){
                placeMarker();
            }
            else{
                aiMove();
            }
        }
    }, 1000);
});

function placeMarker(){
    $("button").click(function(){
       if(!opponentTurn && !gameOver){
           if(buttonIDs.includes(this.id)){
               var index = buttonIDs.indexOf(this.id);
               if(flags[index] === "*"){
                   flags[index] = playerMark;
                   $("#" + this.id).append("<h1>" + playerMark + "</h1>");
                   playerTrack = updateTrack(index, playerMark);
                   opponentTurn = true; 
               }
               checkWin();
               if(!gameOver){
                    isFull();
               }
           }
       }
    });
}

function aiMove(){
    if(opponentTurn){
        var index = 0;
        var curr = opponentTrack[index];
        while(index < opponentTrack.length && opponentTurn){
            if(curr === 2 && playerTrack[index] === 0){
                placeAI(index, opponentMark); 
            }
            index++;
            curr = opponentTrack[index];
        }
        index = 0;
        curr = playerTrack[index];
        while(index < playerTrack.length && opponentTurn){
            if(curr === 2 && opponentTrack[index] === 0){
                placeAI(index, opponentMark);
            }
            index++;
            curr = playerTrack[index];
        }
    }
    if(opponentTurn){
        var rand = Math.floor(Math.random()*9);
        while(flags[rand] !== "*"){
            rand = Math.floor(Math.random()*9);
        }
        flags[rand] = opponentMark;
        $("#" + buttonIDs[rand]).append("<h1>" + opponentMark + "</h1>");
        opponentTrack = updateTrack(rand, opponentMark);
        opponentTurn = !opponentTurn;
    }
    checkWin();
    if(!gameOver){
        isFull();
    }
    
}

function checkWin(){
    for(var i = 0; i < playerTrack.length; i++){
        if(playerTrack[i] === 3){
            playerScore++;
            $("#playerScore").html(playerScore);
            gameOver = true;
            alert("You win!");
        }
        if(opponentTrack[i] === 3){
            opponentScore++;
            console.log(opponentScore);
            $("#opponentScore").html(opponentScore);
            gameOver = true;
            alert("Opponent won!");
        }
    }
}

function isFull(){
    var count = 0;
    for(var i = 0; i < flags.length; i++){
        if(flags[i] !== "*"){
            count++;
        }
    }
    if(count === 9){
        alert("Tie!");
        gameOver = !gameOver;
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

function placeAI(index, mark){    // index which row, col, or dia that has 2 player's marks and 0 AI mark
    if(index === 0 || index === 1 || index === 2){  // the index is either row1, row2, or row3
        for(var i = index*3; i < (index*3)+3; i++){
            if(flags[i] === "*"){
                flags[i] = mark;
                $("#" + buttonIDs[i]).append("<h1>" + mark + "</h1>");
                opponentTrack = updateTrack(i, mark);
                opponentTurn = !opponentTurn; 
            }
        }
    }
    else if(index === 3 || index === 4 || index === 5){
        for(var i = index - 3; i <= index+3; i+=3){
            if(flags[i] === "*"){
                flags[i] = mark;
                $("#" + buttonIDs[i]).append("<h1>" + mark + "</h1>");
                opponentTrack = updateTrack(i, mark);
                opponentTurn = !opponentTurn; 
            }
        }
    }
    else{   // index has to be either 6 or 7 now
        if(index === 6){
            for(var i = 0; i <= 8; i+=4){
                if(flags[i] === "*"){
                    flags[i] = mark;
                    $("#" + buttonIDs[i]).append("<h1>" + mark + "</h1>");
                    opponentTrack = updateTrack(i, mark);
                    opponentTurn = !opponentTurn; 
                }
            }
        }
        else{
            for(var i = 2; i <= 6; i+=2){
                if(flags[i] === "*"){
                    flags[i] = mark;
                    $("#" + buttonIDs[i]).append("<h1>" + mark + "</h1>");
                    opponentTrack = updateTrack(i, mark);
                    opponentTurn = !opponentTurn; 
                }
            }
        }
    }
}