import { padStart } from './util'
import { random } from './util/object'

export default class Shape {
  constructor(name) {
    this.shapes = name ? shapes[name] : random(shapes)
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
    return this.maxCol - this.margin.left - this.margin.right
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
      return padStart(i.toString(2), this.maxCol, '0')
    })
  }
}
