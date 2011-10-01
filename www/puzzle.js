function Word(word, x, y, across) {
  this.word = word;
  this.x = x;
  this.y = y;
  this.across = across;  // true or false
}

function Cell(word, position) {
  this.word = word;
  this.position = position;
}

function Puzzle() {
  this._rows = 11;
  this._columns = 11;
  this._words = [];
}

Puzzle.prototype.init = function() {
  this._draw(target);

  // Add sample words.
  this._words.push(Word('chamber', 0, 0, true));

  // Create puzzle matrix. The puzzle is an array of rows, and each row is an
  // array of Cells.
  this._rows = new Array();
  for (var i = 0; i < this._rows; ++i)
    rows[i] = new Array();  // array of Cells

  function addWord(word) {
    for (var i = 0; i < word.word.length; ++i) {
      var letter = word.word[i];

      if (word.across)
        rows[word.y][x + i] = Cell(word, i);
      else
        rows[word.y + i][x] = Cell(word, i);
    }
  }

  // Add words to puzzle matrix.
  for (var i = 0; i < this._words.length; ++i)
    var word = addWord(this._words[i]);
};

Puzzle.prototype.draw = function(target) {

};