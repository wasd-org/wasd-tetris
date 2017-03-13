import { extend, pickRandomFromArray } from '../../utils'
import types from './types'
import createShapes from './create'

class Shape {
  constructor (options) {
    this._options = extend({
      shapes: null,
      x: 0,
      y: 0
    }, options)

    this._index = 0

    this.x = this._options.x
    this.y = this._options.y

    return this
  }

  get shape () {
    return this._options.shapes[this._index]
  }

  get bitmap () {
    return this.shape.bitmap
  }

  /**
   * Move shape
   * @param  {Number} x - horizontal move
   * @param  {Number} y - vertical move
   * @return {[type]}
   */
  move (x = 0, y = 0) {
    this.x += x
    this.y += y

    return this
  }

  /**
   * Rotate shape
   * @paramm {Boolean} clockwise - rotate direction
   * @return {shape}
   */
  rotate (clockwise = true) {
    const length = this._options.shapes.length

    if (clockwise) {
      this._index++
    } else {
      this._index--
    }

    if (this._index < 0) {
      this._index = length - 1
    } else if (this._index > length) {
      this._index = 0
    }

    return this
  }

}

export default Shape
