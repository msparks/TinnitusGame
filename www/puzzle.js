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
  function addWord(matrix, word) {
    console.log(matrix);

    for (var i = 0; i < word.word.length; ++i) {
      var letter = word.word[i];
      console.log('letter: ' + letter);

      if (word.across)
        matrix[word.y][word.x + i] = new Cell(word, i);
      else
        matrix[word.y + i][word.x] = new Cell(word, i);
    }
  }

  // Add sample words.
  this._words.push(new Word('chamber', 0, 0, true));
  this._words.push(new Word('kill', 4, 4, true));
  this._words.push(new Word('out', 2, 4, false));

  // Create puzzle matrix. The puzzle is an array of rows, and each row is an
  // array of Cells.
  this._matrix = new Array();
  for (var i = 0; i < this._rows; ++i) {
    this._matrix[i] = new Array();  // array of Cells
    for (var j = 0; j < this._columns; ++j) {
      this._matrix[i][j] = undefined;
    }
  }

  // Add words to puzzle matrix.
  for (var i = 0; i < this._words.length; ++i) {
    var word = this._words[i];
    console.log(word);
    addWord(this._matrix, word);
  }
};

Puzzle.prototype.draw = function(target) {
  var crossword = $(target);

  function createCellDiv(cell) {
    var div = $('<div></div');
    if (cell === undefined) {
      div.addClass('black');
    } else {
      var letter = cell.word.word[cell.position];
      div.html(letter);
      div.addClass('cell');
    }
    return div;
  }

  function createRowDiv(row) {
    var div = $('<div></div>');
    for (var i = 0; i < row.length; ++i) {
      var cell = createCellDiv(row[i]);
      div.append(cell);
    }
    return div;
  }

  for (var i = 0; i < this._rows; ++i) {
    var row = createRowDiv(this._matrix[i]);
    crossword.append(row);
  }
};