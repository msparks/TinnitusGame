// If you want to prevent dragging, uncomment this section
/*
 function preventBehavior(e)
 {
 e.preventDefault();
 };
 document.addEventListener("touchmove", preventBehavior, false);
*/

var media;

function onBodyLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  console.log('onDeviceReady');

  // Register other handlers.
  $('.btn').click(buttonClicked);
  $('.kbd-btn').click(keyboardButtonClicked);

  var puzzle = new Puzzle();
  puzzle.init();
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

function mediaSuccess() {
  navigator.notification.alert('success');
}

function mediaError() {
  navigator.notification.alert('error');
}