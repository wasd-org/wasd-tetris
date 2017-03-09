import { padStart } from './util'

const I = [
  [
    0b0000,
    0b1111,
    0b0000,
    0b0000
  ],
  [
    0b0010,
    0b0010,
    0b0010,
    0b0010
  ]
]

const J = [
  [
    0b000,
    0b111,
    0b001,
  ],
  [
    0b010,
    0b010,
    0b110
  ],
  [
    0b100,
    0b111,
    0b000
  ],
  [
    0b011,
    0b010,
    0b010
  ]
]

const L = [
  [
    0b000,
    0b111,
    0b100
  ],
  [
    0b110,
    0b010,
    0b010
  ],
  [
    0b001,
    0b111,
    0b000
  ],
  [
    0b010,
    0b010,
    0b011
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
    0b000,
    0b011,
    0b110
  ],
  [
    0b100,
    0b110,
    0b010
  ],
  [
    0b011,
    0b110,
    0b000
  ],
  [
    0b010,
    0b011,
    0b001
  ],
]

const T = [
  [
    0b000,
    0b111,
    0b010
  ],
  [
    0b010,
    0b110,
    0b010
  ],
  [
    0b010,
    0b111,
    0b000
  ],
  [
    0b010,
    0b011,
    0b010
  ]
]

const Z = [
  [
    0b000,
    0b110,
    0b011
  ],
  [
    0b010,
    0b110,
    0b100
  ],
  [
    0b110,
    0b011,
    0b000
  ],
  [
    0b001,
    0b011,
    0b010
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

export default class Shape {
  constructor(name = 'I') {
    this.shapes = shapes[name] || I
    this._sequence = 0
    this.row = this.shape.length
    this.col = this
      .shapes
      .map(s => {
        return s.reduce((p, c) => {
          const l = c === 0 ? 0 : c.toString(2).length
          return l > p ? l : p
        }, 0)
      })
      .sort((a, b) => a < b)[0]
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

  next(clockwise = true) {
    if (clockwise) {
      this.sequence++
    } else {
      this.sequence--
    }
  }

  print() {
    this.shape.forEach(i => {
      console.log(padStart(i.toString(2), this.col, '0'))
    })
  }
}
