var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var Level = 0;


$(document).keypress(function () {
    if (!started) {
        $("#Level-Title").text("Level " + Level);
        nextSequence();
        started = true;
    }

})




function nextSequence() {

    userClickedPattern = [];

    Level++;
    $("#Level-Title").text("Level " + Level);

    var num = Math.random();
    num *= 4;
    num = Math.floor(num);
    var randomChosenColour = buttonColours[num];
    gamePattern.push(randomChosenColour);

    $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}






$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);


    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})




function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);

        $("#Level-Title").text("Game Over! Press any Key to Restart!");
        StartOver();
    }

}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}
function StartOver() {
Level=0;
gamePattern=[];
userClickedPattern=[];
started=false;
}