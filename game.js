var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var level = 0;
var started = false;

$('body').keydown(function() {
    if (!started) {
        nextSequence();
        $('h1').text('Level ' + level);
        started = true;
        
    }
});

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $('h1').text('Level ' + level);

    //animation
    $('body').ready(function() {
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    });

    playSound(randomChosenColor);
}

$('.btn').click(function(event) {
    var userChosenColor = event.currentTarget.id
    
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


//play sound
function playSound(name) {
    $('document').ready(function() {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    });
}

//pressed button animation
function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');

        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $('h1').text('Game Over, Press Any Key to Restart');
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        playSound('wrong');
        startOver();
        console.log('wrong');
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

