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
  var across = true;
  var down = false;

  // Across.
  this._words.push(new Word('chamber', 0, 0, across));  // 1
  this._words.push(new Word('xxxxx', 6, 1, across));    // 7
  this._words.push(new Word('there', 0, 2, across));    // 8
  this._words.push(new Word('eat', 8, 3, across));      // 9
  this._words.push(new Word('xxx', 0, 4, across));      // 11
  this._words.push(new Word('kill', 4, 4, across));     // 13
  this._words.push(new Word('nutty', 0, 6, across));    // 14
  this._words.push(new Word('xxxx', 7, 6, across));     // 16
  this._words.push(new Word('xxxx', 0, 8, across));     // 17
  this._words.push(new Word('xxx', 5, 8, across));      // 19
  this._words.push(new Word('to', 9, 8, across));       // 20
  this._words.push(new Word('in', 0, 10, across));      // 21
  this._words.push(new Word('xxxxxxxx', 3, 10, across));  // 22

  // Down.
  this._words.push(new Word('citizen', 0, 0, down));
  this._words.push(new Word('xxx', 2, 0, down));
  this._words.push(new Word('break', 4, 0, down));
  this._words.push(new Word('hate', 6, 0, down));
  this._words.push(new Word('free', 8, 0, down));
  this._words.push(new Word('xxxx', 10, 0, down));
  this._words.push(new Word('xxxx', 9, 3, down));
  this._words.push(new Word('out', 2, 4, down));
  this._words.push(new Word('three', 3, 6, down));      // 15
  this._words.push(new Word('xxxxx', 7, 6, down));      // 16
  this._words.push(new Word('own', 1, 8, down));        // 18
  this._words.push(new Word('xxx', 5, 8, down));        // 19
  this._words.push(new Word('ten', 9, 8, down));        // 20

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

  function createCell(cell) {
    var td = $('<td></td>');
    td.addClass('cell');
    if (cell === undefined) {
      td.addClass('black');
    } else {
      var letter = cell.word.word[cell.position];
      td.html(letter);
      td.attr('x', cell.word.x);
      td.attr('y', cell.word.y);
    }
    return td;
  }

  function createRow(row) {
    var tr = $('<tr></tr>');
    tr.addClass('row');
    for (var i = 0; i < row.length; ++i) {
      var cell = createCell(row[i]);
      tr.append(cell);
    }
    return tr;
  }

  for (var i = 0; i < this._rows; ++i) {
    var row = createRow(this._matrix[i]);
    crossword.append(row);
  }
};

Puzzle.prototype.cell = function(x, y) {
  return this._rows[y][x];
}