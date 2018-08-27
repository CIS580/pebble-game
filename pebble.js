/* constants */
const colors = ["green", "red"];

/* globals */
var turn = 0;

var board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

var scores = [0, 0]

/** @function displayTurn
  * Displays the current player's turn
  * in the user interface.
  */
function displayTurn() {
  displayMessage("It is <div class='pebble " + colors[turn] + "'></div>'s turn")
}

/** @function displayMessage
  * Displays the provided message in the
  * user interface.  The message is HTML text.
  * @param {string} message - the message to display
  */
function displayMessage(message) {
  document.getElementById('ui').innerHTML = message;
}

/** @function displayPebble
  * Displays a pebble in the provided column and row
  * of the game board.
  * @param {integer} column - the column to place the pebble in
  * @param {integer} row - the row to place the pebble in
  */
function displayPebble(column, row) {
  // create <div class="pebble green"></div>
  var pebble = document.createElement('div');
  pebble.classList.add("pebble");
  pebble.classList.add(colors[turn]);
  var columnElement = document.getElementById("column-" + column);
  columnElement.appendChild(pebble);
}

/** @function checkForScore
  * Checks to see if any points have been earned
  * after the specified move.
  * @param {integer} column - the column index of the move
  * @param {integer} row - the row index of the move
  */
function checkForScore(column, row) {
  var x, y, flag;
  // check for horizontal score
  flag = true;
  for(x = 0; x < 3; x++) {
    flag &= board[x][row] === turn
  }
  if(flag) score[turn] += 10;
  // TODO: Check for veritical score
  // TODO: Check for horizontal score
}

/** @function dropPebble
  * Attempts to place a pebble at the
  * specified column; if full warns the
  * user in the ui that the move is not
  * possible.
  * @param {integer} columnIndex - the column to try
  */
function dropPebble(columnIndex) {
  for(var i = 2; i > -1; i--) {
    if(board[columnIndex][i] === null) {
      // drop pebble here
      board[columnIndex][i] = turn;
      displayPebble(columnIndex, i);
      turn = (turn + 1) % 2;
      displayTurn();
      return;
    }
  }
  // can't make the move
  displayMessage("You cannot put a pebble there - the column is full.");
  setTimeout(displayTurn, 2000);
}s

// Attach click listeners to all 3 columns
for(var i = 0; i < 3; i++) {
  const col = i;
  document.getElementById('column-' + col)
    .addEventListener('click', function(event) {
      event.preventDefault();
      dropPebble(col);
    });
}
