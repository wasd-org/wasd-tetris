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
  ],
  [
    0b0000,
    0b0000,
    0b1111,
    0b0000
  ],
  [
    0b0100,
    0b0100,
    0b0100,
    0b0100
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
    this.maxRow = this.shape.length
    this.maxCol = this
      .shapes
      .map(s => s.reduce((p, c) => p | c, 0).toString(2).length)
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

  get margin() {
    const { shape } = this
    let horizontalGutter = false
    let top = 0
    let bottom = 0
    shape.forEach(r => {
      if (r) {
        horizontalGutter = true
      } else {
        if (horizontalGutter) {
          bottom++
        } else {
          top++
        }
      }
    })

    let union = shape.reduce((p, c) => p | c, 0)
    union = padStart(union.toString(2), this.maxCol, '0')

    let verticalGutter = false
    let left = 0
    let right = 0
    union.split('').forEach(c => {
      if (c === '1') {
        verticalGutter = true
      } else {
        if (verticalGutter) {
          right++
        } else {
          left++
        }
      }
    })

    return {
      top,
      bottom,
      left,
      right
    }
  }

  get row() {
    return this.maxRow - this.margin.top - this.margin.bottom
  }

  get col() {
    return this.shape.reduce((p, c) => p | c, 0).toString(2).length
  }

  rotate(clockwise = true) {
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
