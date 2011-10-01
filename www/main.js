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

  //  onDeviceReady();
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

  alert(cellTd.attr('x'));
  alert(cellTd.attr('y'));

  var cell = puzzle.cell(cellTd.attr('x'), cellTd.attr('y'));
  alert(cell.word.word);
}

function mediaSuccess() {
  navigator.notification.alert('success');
}

function mediaError() {
  navigator.notification.alert('error');
}