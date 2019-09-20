// Checks for clicks for the game to start.
document.turn = "X";
document.winner = null;
// Timer variables
var timer;
var timeLeft;
// --------------------------------------------
// Game functions
var vList = document.getElementsByClassName("col s2");
for (var i = 0; i < vList.length; i++) {
  vList[i].addEventListener("click", e => nextMove(e));
}
document.getElementById("restart").addEventListener("click", Game);
// --------------------------------------------
function Game() {
  var vArray = [
    11,
    12,
    13,
    14,
    15,
    21,
    22,
    23,
    24,
    25,
    31,
    32,
    33,
    34,
    35,
    41,
    42,
    43,
    44,
    45,
    51,
    52,
    53,
    54,
    55
  ];

  for (var i = 0; i <= 24; i++) {
    startOver(vArray[i]);
  }

  document.turn = "X";
  document.winner = null;
  setMsg('Player 1 starts "X".');
}
// Changes the header's text
function setMsg(msg) {
  document.getElementById("message").innerText = msg;
}

function nextMove(item) {
  if (document.winner != null) {
    setMsg("Game Over!");
    return "";
  }
  // Else If-statement does not allow overwriting.
  else if (item.target.innerText === "") {
    item.target.innerText = document.turn;
    if (document.turn === "X") {
      item.target.classList.add("classX");
    } else if (document.turn === "O") {
      item.target.classList.add("classO");
    }
    playerTurn(); // Gives other player the turn.
  } else {
    setMsg("Choose a free field.");
  }
}

// Checks turns if X (player 1) or O (player 2)
function playerTurn() {
  var index = 0;

  if (document.turn === "X") {
    index = 1;
  } else {
    index = 2;
  }

  // Checks for a possible winner.
  if (winner(document.turn)) {
    setMsg("Player " + index + " won!");
    alert("Player " + index + " won!");
    document.winner = index;
    clearTimeout(timer);
    return;
  }

  if (document.turn === "X") {
    document.turn = "O";
    index = 2;
  } else {
    document.turn = "X";
    index = 1;
  }
  setMsg("Player " + index + "'s turn.");
  clearTimeout(timer);
  timeLeft = 10;
  countdown();
}
function winner(action) {
  var result = false;

  if (
    checkMark(11, 12, 13, 14, 15, action) || // Horizontal
    checkMark(21, 22, 23, 24, 25, action) ||
    checkMark(31, 32, 33, 34, 35, action) ||
    checkMark(41, 42, 43, 44, 45, action) ||
    checkMark(51, 52, 53, 54, 55, action) ||
    checkMark(11, 21, 31, 41, 51, action) || // Vertical
    checkMark(12, 22, 32, 42, 52, action) ||
    checkMark(13, 23, 33, 43, 53, action) ||
    checkMark(14, 24, 34, 44, 54, action) ||
    checkMark(15, 25, 35, 45, 55, action) ||
    checkMark(11, 22, 33, 44, 55, action) || // Diagonal
    checkMark(15, 24, 33, 42, 51, action)
  ) {
    result = true;
  }
  return result;
}

function checkMark(a, b, c, d, e, action) {
  var result = false;

  if (
    readBox(a) === action &&
    readBox(b) === action &&
    (readBox(c) === action) & (readBox(d) === action) &&
    readBox(e) === action
  ) {
    result = true;
  }
  return result;
}

function readBox(value) {
  return document.getElementById("b" + value).innerText;
}

function startOver(value) {
  document.getElementById("b" + value).innerText = "";
  if (document.getElementById("b" + value).classList.toggle("classX")) {
    document.getElementById("b" + value).classList.remove("classX");
  }
  if (document.getElementById("b" + value).classList.toggle("classO")) {
    document.getElementById("b" + value).classList.remove("classO");
  }
  // Resetting the timer.
  clearTimeout(timer);
  timeLeft = 10;
  document.getElementById("timerText").innerText = timeLeft;
  document.getElementById("timerBar").style.width = timeLeft * 10 + "%";
}
// Timer functions ---------------------------------
function countdown() {
  if (timeLeft) {
    document.getElementById("timerText").innerText = timeLeft;
    document.getElementById("timerBar").style.width = timeLeft * 10 + "%";
    timeLeft--;
    timer = setTimeout(countdown, 1000);
  } else {
    playerTurn();
  }
}
