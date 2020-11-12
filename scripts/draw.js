const canvas = document.getElementById("wave");
const ctx = canvas.getContext("2d");
const cw = canvas.width;
const ch = canvas.height;

const _2pointsWidth = cw * 0.04398;
const _3pointsWidth = cw * 0.04879;
const _4pointsWidth = cw * 0.04677;

const recW = _4pointsWidth;
const recW2 = 2 * _3pointsWidth + recW;
const recW3 = 2 * _2pointsWidth + recW2;

function draw(x) {
  ctx.beginPath();
  ctx.fillStyle = "#d3961f";
  ctx.fillRect(x - recW3 / 2, 0, recW3, ch);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#a4cea3";
  ctx.fillRect(x - recW2 / 2, 0, recW2, ch);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#dd5d3e";
  ctx.fillRect(x - recW / 2, 0, recW, ch);
  ctx.stroke();
}

function drawguess() {
  clearboard();
  draw(randpos);

  var guess = document.getElementById("guesser").value;
  ctx.beginPath();
  ctx.fillStyle = "#d42838";
  ctx.fillRect(guess - 2, 0, 4, ch);
  ctx.stroke();

  score(randpos, guess);
}

var points = 0;

function score(randpos, guess) {
  if (between(guess, randpos - recW / 2, randpos + recW / 2)) {
    document.getElementById("score").innerHTML =
      '<div class="score">4 points!!!</div>';
    points = 4;
  } else if (between(guess, randpos - recW2 / 2, randpos + recW2 / 2)) {
    document.getElementById("score").innerHTML =
      '<div class="score">3 points!!</div>';
    points = 3;
  } else if (between(guess, randpos - recW3 / 2, randpos + recW3 / 2)) {
    document.getElementById("score").innerHTML =
      '<div class="score">2 points!</div>';
    points = 2;
  } else {
    document.getElementById("score").innerHTML =
      '<div class="score">0 points</div>';
    points = 0;
  }
}

function between(x, min, max) {
  return x >= min && x <= max;
}

function button_peek() {
  if (window.confirm("Are you sure you want to peek?")) {
    draw(randpos);
  }
}

function button_guess() {
  if (window.confirm("Is this your final guess?")) {
    drawguess();
  }
}

function update_seed() {
  Math.seedrandom();
  $("#seed").val(Math.floor(Math.random() * 10000));
  fire();
}

function update_percentages() {
  var checkbox = document.getElementById("percentages");
  var text = document.getElementById("guessdisp");
  if (checkbox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function button_clear() {
  clearboard();
}
