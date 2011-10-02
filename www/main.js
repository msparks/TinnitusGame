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

  $('.ui-page').css('background', 'url(images/neuron_background.png)');
  //onDeviceReady();
}

function onDeviceReady() {
  // Register other handlers.
  $('#btn').click(playButtonClicked);
  $('.kbd-btn').click(keyboardButtonClicked);

  puzzle = new Puzzle();
  puzzle.init();
  puzzle.draw('.crossword');
  $('.cell').click(cellClicked);
}

function keyboardButtonClicked() {
  var btn = $(this);
  var letter = btn.html().toLowerCase();
  var active_cell = puzzle.activeCell();
  if (!active_cell)
    return;

  var active_correct_letter = active_cell.word.word[active_cell.position];
  active_correct_letter = active_correct_letter.toLowerCase();

  if (letter.length == 1) {
    // Letter.
    if (letter == active_correct_letter) {
      showCorrectLetter(active_cell, letter);
    } else {
      showIncorrectLetter(active_cell, letter);
    }
    selectNextCell(active_cell);
  } else {
    // Backspace.
  }
}

function showCorrectLetter(cell, letter) {
  var cls = 'td.cell[x="' + cell.x + '"][y="' + cell.y + '"]';
  console.log(cls);
  var td = $(cls);
  td.html(letter);
  td.removeClass('incorrect');
  td.addClass('correct');
}

function showIncorrectLetter(cell, letter) {
  var cls = 'td.cell[x="' + cell.x + '"][y="' + cell.y + '"]';
  var td = $(cls);
  td.html(letter);
  td.removeClass('correct');
  td.addClass('incorrect');
}

function cellClicked() {
  var cellTd = $(this);
  // Ignore unused cells.
  if (cellTd.hasClass('black'))
    return;

  var x = cellTd.attr('x');
  var y = cellTd.attr('y');
  var cell = puzzle.cell(x, y);

  // Highlight cells.
  puzzle.highlightCellAndWord(cell);

  // Show play button.
  showPlayClipButton(cell.word);
}

function selectNextCell() {

}

function showPlayClipButton(word) {
  $('#btn').css('visibility', 'visible');
  $('#btn').html('Play clip');
}

function playButtonClicked() {
  var cell = puzzle.activeCell();
  var word_str = cell.word.word;

  var src = word_str + '.wav';
  media = new Media(src, mediaSuccess, mediaError);

  $('#btn').html('Playing...');
  media.play();
}

function mediaSuccess() {
  $('#btn').html('Play clip');
}

function mediaError() {
  $('#btn').html('Play clip');
}