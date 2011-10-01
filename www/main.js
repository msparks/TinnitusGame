// If you want to prevent dragging, uncomment this section
/*
 function preventBehavior(e)
 {
 e.preventDefault();
 };
 document.addEventListener("touchmove", preventBehavior, false);
*/

var media;
var puzzle;

function onBodyLoad() {
  document.addEventListener('deviceready', onDeviceReady, false);

  onDeviceReady();
}

function onDeviceReady() {
  // Register other handlers.
  $('.btn').click(buttonClicked);
  $('.kbd-btn').click(keyboardButtonClicked);

  puzzle = new Puzzle();
  puzzle.init();
  puzzle.draw('.crossword');
  $('.cell').click(cellClicked);
}

function buttonClicked() {
  navigator.notification.alert('loading');
  var src = 'http://dl.dropbox.com/u/740378/goodlook.wav';
  media = new Media(src, mediaSuccess, mediaError);
  media.play();
}

function keyboardButtonClicked() {
  var btn = $(this);
  var letter = btn.html();

  if (letter.length == 1) {
    // Letter.
  } else {
    // Backspace.
  }
}

function cellClicked() {
  var cellTd = $(this);
  // Ignore unused cells.
  if (cellTd.hasClass('black'))
    return;

  var x = cellTd.attr('x');
  var y = cellTd.attr('y');
  var cell = puzzle.cell(x, y);

  puzzle.clearAllHighlighted();
  puzzle.highlightCellAndWord(cell);
}

function mediaSuccess() {
  navigator.notification.alert('success');
}

function mediaError() {
  navigator.notification.alert('error');
}