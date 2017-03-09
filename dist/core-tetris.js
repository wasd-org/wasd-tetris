(function () {
'use strict';

function padStart(str, length, place) {
  while (str.length < length) {
    str = place + str;
  }
  return str
}

var I = [
  [
    0,
    15,
    0,
    0
  ],
  [
    2,
    2,
    2,
    2
  ]
];

var J = [
  [
    0,
    7,
    1 ],
  [
    2,
    2,
    6
  ],
  [
    4,
    7,
    0
  ],
  [
    3,
    2,
    2
  ]
];

var L = [
  [
    0,
    7,
    4
  ],
  [
    6,
    2,
    2
  ],
  [
    1,
    7,
    0
  ],
  [
    2,
    2,
    3
  ]
];

var O = [
  [
    3,
    3
  ]
];

var S = [
  [
    0,
    3,
    6
  ],
  [
    4,
    6,
    2
  ],
  [
    3,
    6,
    0
  ],
  [
    2,
    3,
    1
  ] ];

var T = [
  [
    0,
    7,
    2
  ],
  [
    2,
    6,
    2
  ],
  [
    2,
    7,
    0
  ],
  [
    2,
    3,
    2
  ]
];

var Z = [
  [
    0,
    6,
    3
  ],
  [
    2,
    6,
    4
  ],
  [
    6,
    3,
    0
  ],
  [
    1,
    3,
    2
  ]
];

var shapes = {
  I: I,
  J: J,
  L: L,
  O: O,
  S: S,
  T: T,
  Z: Z
};

var Shape = function Shape(name) {
  if ( name === void 0 ) name = 'I';

  this.shapes = shapes[name] || I;
  this._sequence = 0;
  this.row = this.shape.length;
  this.col = this
    .shapes
    .map(function (s) {
      return s.reduce(function (p, c) {
        var l = c === 0 ? 0 : c.toString(2).length;
        return l > p ? l : p
      }, 0)
    })
    .sort(function (a, b) { return a < b; })[0];
};

var prototypeAccessors = { sequence: {},shape: {} };

prototypeAccessors.sequence.get = function () {
  return this._sequence
};

prototypeAccessors.sequence.set = function (value) {
  var length = this.shape.length;
  if (value > length) {
    value = 0;
  } else if (value < 0) {
    value = length;
  }
  this._sequence = value;
};

prototypeAccessors.shape.get = function () {
  return this.shapes[this.sequence]
};

Shape.prototype.next = function next (clockwise) {
    if ( clockwise === void 0 ) clockwise = true;

  if (clockwise) {
    this.sequence++;
  } else {
    this.sequence--;
  }
};

Shape.prototype.print = function print () {
    var this$1 = this;

  this.shape.forEach(function (i) {
    console.log(padStart(i.toString(2), this$1.col, '0'));
  });
};

Object.defineProperties( Shape.prototype, prototypeAccessors );

for (var k in shapes) {
  var s = shapes[k];
  var shape = new Shape(k);
  var l = s.length;
  console.log(k);
  for (var i = 0; i < l; i++) {
    console.log('--------------');
    shape.print();
    shape.next();
  }
  console.log();
}

// import Grid from './grid'

// const grid = new Grid(5, 5)

// grid.print()

}());
