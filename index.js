var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red", "blue", "green", "yellow"];
var level=0;
$(document).keydown(function (_e) { 
    if(level===0)
    nextSequence();
});
$(".btn").click(function (_e) { 
    // e.preventDefault();
    var userchosencolor=$(this).attr("id");
    userClickedPattern.push(userchosencolor);
    playSound(userchosencolor);
    animatePress(userchosencolor);
    
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        playSound("wrong.mp3");
        setTimeout(() => {
            $("body").removeClass("game-over");
            
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
}

function nextSequence(){
    level++;
    userClickedPattern=[];
    $("h1").html("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var chosencolor=buttonColors[randomNumber];
    gamePattern.push(chosencolor);
    $("#"+chosencolor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // var sound=new Audio("sounds/"+chosencolor+".mp3");
    // sound.play();
    playSound(chosencolor);
}

function playSound(name){
    var sound=new Audio(name+".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");

    }, 100);
}