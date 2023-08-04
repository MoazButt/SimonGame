// Create the buttonColours array and set it to hold the sequence "red", "blue", "green", "yellow"
var buttonColours = ["red", "blue", "green", "yellow"];

// Create an empty array to hold the game pattern
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = []; // Reset userClickedPattern for the next level
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  console.log("Generated random colour: " + randomChosenColour);

  // Add the randomChosenColour to the end of the gamePattern array
  gamePattern.push(randomChosenColour);
  console.log("Updated game pattern: " + gamePattern);

  // Select the button with the same id as the randomChosenColour using jQuery
  var $selectedButton = $("#" + randomChosenColour);

  // Add flash effect to the selected button
  $selectedButton.fadeOut(100).fadeIn(100);

  // Play the sound for the selected button color
  playSound(randomChosenColour);

  // Add your logic here to use the randomChosenColour and $selectedButton as needed
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  // Use setTimeout to remove the "pressed" class after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      // User's answer is correct
      console.log("Success");
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    } else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        started = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
      }
    }


    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
      }
      
      // Detect keyboard keypress
      $(document).on("keydown", function() {
        if (!started) {
          started = true;
          $("#level-title").text("Level " + level);
          nextSequence();
        }
      });


// Attach a click event listener to all the buttons using jQuery
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  console.log("User chosen colour: " + userChosenColour);

  // Add the user's clicked color to the userClickedPattern array
  userClickedPattern.push(userChosenColour);
  console.log("Updated userClickedPattern: " + userClickedPattern);

  // Play the sound for the clicked button color
  playSound(userChosenColour);

  // Add the pressed effect to the clicked button
  animatePress(userChosenColour);

  // Check user's answer after clicking a button
  checkAnswer(userClickedPattern.length - 1);
});
