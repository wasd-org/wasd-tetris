import { create } from '../shape/default'
import { extend } from '../../utils/object'

export default class Block {
  constructor (options) {
    this._options = extend({
      x: 0,
      y: 0,
      shape: create()
    }, options)

    this.x = this._options.x
    this.y = this._options.y
    this.shape = this._options.shape
  }

  get coordinate () {
    return {
      x: this.x,
      y: this.y,
      array: this.shape.shape
    }
  }

  moveBy (x = 0, y = 0) {
    this.x += x
    this.y += y
  }

  moveTo (x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  rotate (clockwise = true) {
    this.shape.rotate(clockwise)
  }
}
