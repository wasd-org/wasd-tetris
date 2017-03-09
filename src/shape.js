import { padStart } from './util'

const I = [
  [0b1111],
  [
    0b1,
    0b1,
    0b1,
    0b1
  ]
]

const J = [
  [
    0b111,
    0b001,
  ],
  [
    0b01,
    0b01,
    0b11
  ],
  [
    0b100,
    0b111
  ],
  [
    0b11,
    0b10,
    0b10
  ]
]

const L = [
  [
    0b111,
    0b100
  ],
  [
    0b11,
    0b01,
    0b01
  ],
  [
    0b001,
    0b111
  ],
  [
    0b10,
    0b10,
    0b11
  ]
]

const O = [
  [
    0b11,
    0b11
  ]
]

const S = [
  [
    0b011,
    0b110
  ],
  [
    0b10,
    0b11,
    0b01
  ]
]

const T = [
  [
    0b111,
    0b010
  ],
  [
    0b01,
    0b11,
    0b01
  ],
  [
    0b010,
    0b111
  ],
  [
    0b10,
    0b11,
    0b10
  ]
]

const Z = [
  [
    0b110,
    0b011
  ],
  [
    0b01,
    0b11,
    0b10
  ]
]

export const shapes = {
  I,
  J,
  L,
  O,
  S,
  T,
  Z
}

const map = [
  0,
  1,
  2,
  2,
  3,
  3,
  3,
  3
]

export default class Shape {
  constructor(name = 'I') {
    this.shapes = shapes[name] || I
    this._sequence = 0
  }

  get sequence() {
    return this._sequence
  }

  set sequence(value) {
    const length = this.shape.length
    if (value > length) {
      value = 0
    } else if (value < 0) {
      value = length
    }
    this._sequence = value
  }

  get shape() {
    return this.shapes[this.sequence]
  }

  get row() {
    return this.shape.length
  }

  get col() {
    return map[this.shape.reduce((c, p) => c > p ? c : p, 0)]
  }

  next(clockwise = true) {
    if (clockwise) {
      this.sequence++
    } else {
      this.sequence--
    }
  }

  print() {
    this.shape.forEach(i => {
      console.log(padStart(i.toString(2), this.col, '0').replace(/0/g, ' '))
    })
  }
}
