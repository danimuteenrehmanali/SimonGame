
var buttoncolor = ["red", "blue", "green", "yellow"];

var gamepattren = [];

var userclickedpattern = [];

var started = false;

var level = 0;


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextsequence();
        started = true;
    }
})


$(".btn").click(function () {
    var userchosecolor = $(this).attr("id");

    userclickedpattern.push(userchosecolor);

    // console.log(userclickedpattern);
    playsound(userchosecolor);
    animatepress(userchosecolor);

    checkanswer(userclickedpattern.length - 1);
});

function gameover() {
    level = 0;
    gamepattren = [];
    started = false;
}

function checkanswer(currentlevel) {
    if (gamepattren[currentlevel] === userclickedpattern[currentlevel]) {
        console.log("success");

        if (userclickedpattern.length === gamepattren.length) {

            setTimeout(function () {
                nextsequence();
            }, 1000)

        }
    }
    else {
        console.log("wrong");
        // var audio = new Audio("sounds/wrong.mp3");
        // audio.play();
        playsound("wrong");

        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart");

        gameover();
    }
}


function nextsequence() {
    userclickedpattern = [];
    level++;

    $("#level-title").text("level " + level);


    var ramdonnumber = Math.random();
    ramdonnumber = ramdonnumber * 3;
    ramdonnumber = Math.round(ramdonnumber);

    var ramdomchosecolor = buttoncolor[ramdonnumber];

    gamepattren.push(ramdomchosecolor);

    // $( "#"+ ramdomchosecolor).delay(100).fadeOut().fadeIn('slow');
    $("#" + ramdomchosecolor).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(ramdomchosecolor)

}

function playsound(name) {


    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatepress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentcolor).removeClass('pressed')
    }, 100)


}
