// alert("Active");
// $("div").on("click", function(){nextSequence()})

let buttonColours=["red", "blue", "green", "yellow"]
let gamePattern=[];
let userClickedPattern=[];
var started=false;
let level=0;
$(document).on('keypress',function(){
    if(!started){
        $('#level-title').text("Level "+ level);
        started=true;
        nextSequence();
    }
});

$(".btn").on('click',function(){
      var userChosenColour=$(this).attr("id");
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);

      checkAnswer(userClickedPattern.length-1);
    }
)


function nextSequence(){
    
  if(started===true){  userClickedPattern = [];

    var randomNumber=Math.floor(Math.random() * 4);
    let randomChosenColour=buttonColours[randomNumber];
    $('#level-title').text("Level "+ ++level);
    gamePattern.push(randomChosenColour);
    
    for(let i=0;i<gamePattern.length;i++){
        
        setTimeout(function(){
            playSound(gamePattern[i]);
            animatePress(gamePattern[i]);
        },i*500);
    }
    }
}


function checkAnswer(currentlevel){
  if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
    console.log('success');
    if(gamePattern.length===userClickedPattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);
    }
  }
  else{
    console.log('wrong')
    startOver();
  }
}

function startOver(){
    playSound("wrong");
    $('body').addClass('game-over');
    setTimeout(function(){
        $('body').removeClass('game-over');
    },350)
    $('#level-title').text('Game Over! Press any key to restart');
    started=false;
    gamePattern=[];
    userClickedPattern=[];
    level=0;
}

function playSound(colour){
    var audio = new Audio(`sounds/${colour}.mp3`);
    audio.play();
}

function animatePress(colour){
    $("#"+colour).fadeIn(33).fadeOut(33).fadeIn(33);
    $("#"+colour).addClass("pressed");

    setTimeout(function(){
        $("#"+colour).removeClass("pressed");
    },100)
}


