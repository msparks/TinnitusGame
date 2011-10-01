function Word(word, x, y, across) {
  this.word = word;
  this.x = x;
  this.y = y;
  this.across = across;  // true or false
}

function Cell(word, position, x, y) {
  this.word = word;
  this.position = position;
  this.x = x;
  this.y = y;
}

function Puzzle() {
  this._rows = 11;
  this._columns = 11;
  this._words = [];
}

Puzzle.prototype.init = function() {
  function addWord(matrix, word) {
    for (var i = 0; i < word.word.length; ++i) {
      var letter = word.word[i];

      var x;
      var y;
      if (word.across) {
        x = word.x + i;
        y = word.y;
      } else {
        x = word.x;
        y = word.y + i;
      }

      var cell = new Cell(word, i, x, y);
      matrix[y][x] = cell;
    }
  }

  // Add sample words.
  var across = true;
  var down = false;

  // Across.
  this._words.push(new Word('chamber', 0, 0, across));  // 1
  this._words.push(new Word('earth', 6, 1, across));    // 7
  this._words.push(new Word('there', 0, 2, across));    // 8
  this._words.push(new Word('eat', 8, 3, across));      // 9
  this._words.push(new Word('zoo', 0, 4, across));      // 11
  this._words.push(new Word('kill', 4, 4, across));     // 13
  this._words.push(new Word('nutty', 0, 6, across));    // 14
  this._words.push(new Word('side', 7, 6, across));     // 16
  this._words.push(new Word('your', 0, 8, across));     // 17
  this._words.push(new Word('two', 5, 8, across));      // 19
  this._words.push(new Word('to', 9, 8, across));       // 20
  this._words.push(new Word('in', 0, 10, across));      // 21
  this._words.push(new Word('everyone', 3, 10, across));  // 22

  // Down.
  this._words.push(new Word('citizen', 0, 0, down));
  this._words.push(new Word('are', 2, 0, down));        // 2
  this._words.push(new Word('break', 4, 0, down));
  this._words.push(new Word('really', 6, 0, down));
  this._words.push(new Word('free', 8, 0, down));
  this._words.push(new Word('that', 10, 0, down));      // 6
  this._words.push(new Word('aged', 9, 3, down));       // 10
  this._words.push(new Word('out', 2, 4, down));
  this._words.push(new Word('three', 3, 6, down));      // 15
  this._words.push(new Word('story', 7, 6, down));      // 16
  this._words.push(new Word('own', 1, 8, down));        // 18
  this._words.push(new Word('the', 5, 8, down));        // 19
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
      td.attr('x', cell.x);
      td.attr('y', cell.y);
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
  return this._matrix[parseInt(y)][parseInt(x)];
};

Puzzle.prototype.clearAllHighlighted = function() {
  $('td.cell').removeClass('selectedword');
  $('td.cell').removeClass('selectedcell');
};

Puzzle.prototype.highlightCellAndWord = function(cell) {
  var word = cell.word;

  for (var i = 0; i < word.word.length; ++i) {
    var letter = word.word[i];

    var x;
    var y;
    if (word.across) {
      x = word.x + i;
      y = word.y;
    } else {
      x = word.x;
      y = word.y + i;
    }

    var cls = 'td.cell[x="' + x + '"][y="' + y + '"]';
    var td = $(cls);
    td.addClass('selectedword');

    if (x == cell.x && y == cell.y) {
      console.log(x);
      td.addClass('selectedcell');
    }
  }
};