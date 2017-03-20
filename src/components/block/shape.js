import { extend } from '../../utils/object'
import { rotate, equal, copy } from '../../utils/array2'

export default class Shape {
  constructor (shape) {
    this._shape = shape
    this._index = 0

    this._init()
  }

  get shape () {
    return this._shapes[this._index]
  }

  rotate (clockwise = true) {
    if (clockwise) {
      this._index++
    } else {
      this._index--
    }

    const length = this._shapes.length
    if (this._index < 0) {
      this._index = length - 1
    }

    if (this._index >= length) {
      this._index = 0
    }

    return this.shape
  }

  _init () {
    const { _shape: shape } = this
    const shapes = [shape]
    let lastShape = shape

    while (true) {
      lastShape = rotate(lastShape)
      if (equal(lastShape, shape)) {
        break
      } else {
        shapes.push(lastShape)
      }
    }

    this._shapes = shapes
  }
}
