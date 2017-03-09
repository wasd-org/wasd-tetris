(function () {
'use strict';

function padStart(str, length, place) {
  while (str.length < length) {
    str = place + str;
  }
  return str
}

var Grid = function Grid(row, col) {
  if ( row === void 0 ) row = 20;
  if ( col === void 0 ) col = 10;

  this.row = row;
  this.col = col;
  this.grid = new Array(row).fill(0);
};

Grid.prototype.print = function print () {
    var this$1 = this;

  for (var i = 0; i < this.row; i++) {
    console.log(padStart(this$1.grid[i].toString(2), this$1.col, '0'));
  }
};

// import Shape from './shape'
// import { shapes } from './shape'

// for (const k in shapes) {
//   const s = shapes[k]
//   const shape = new Shape(k)
//   const l = s.length
//   console.log(k)
//   for (let i = 0; i < l; i++) {
//     console.log('--------------')
//     shape.print()
//     shape.next()
//   }
//   console.log()
// }

var grid = new Grid(5, 5);

grid.print();

}());
