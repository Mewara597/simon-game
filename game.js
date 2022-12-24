const colors = ["red", "green", "blue", "yellow"]
let gameOver = false;
let level = 0;
let gameSequence = [];
let userSequence = [];

$(document).on("keypress", () => {
  if (!gameOver) {
    if (!level) {
      nextSequence()
    }
  } else rl()
})

function nextSequence() {
  userSequence = []
  ++level

  $("#level-title").text("Level " + level)


  const nextRandomColor = colors[Math.floor(Math.random() * 4)]

  playSound(nextRandomColor)
  animate(nextRandomColor)
  gameSequence.push(nextRandomColor)

}

function playSound(name) {
  new Audio("./sounds/" + name + ".mp3").play()
}
function animate(name) {
  $("#" + name).fadeOut().fadeIn()
}

// function listenForUserInput() {
$(".btn").click((e) => {
  if (level) {
    const color = e.target.id

    $("#" + color).addClass("pressed")
    setTimeout(() => {
      $("#" + color).removeClass("pressed")
    }, 100)

    userSequence.push(color)

    if (level == userSequence.length) {
      checkAnswer()
    }
  }
})
// }

function checkAnswer() {
  if (userSequence.toString() == gameSequence.toString()) {
    console.log("matched")
    setTimeout(() => {
      nextSequence()
    }, 1000);
  } else {
    console.log("failed to match")
    $("#level-title").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over")
    playSound("wrong")
    setTimeout(() => {
      $("body").removeClass("game-over")
    }, 300)
    gameOver = true
  }
}

function rl() {
  gameOver = false;
  level = 0;
  gameSequence = [];
  userSequence = [];
}