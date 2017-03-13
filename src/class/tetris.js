import { initEvents, mixinEvents } from '../mixinxs/events'
import initShapes from './shape/init'
import Grid from './grid'
import { extend } from '../utils'
import types from  './shape/types'

class Tetris {
  constructor(options) {
    this._options = extend({
      row: 20,
      col: 10,
      speed: 1,
      shapes: types
    }, options)

    initEvents(this)
    initShapes(this)

    this._grid = new Grid(this._options)
    this._interval = null
    this._speed = this._options.speed

    setTimeout(() => {
      this.emit('init', {
        grid: this._grid,
        shapes: this._shapes
      })
    })
  }

  start () {
    this.addShape()
  }

  process () {
    this.interval = (() => {
    }, this._speed)
  }

  pause () {
    this._interval = null
  }

  resume () {
    this.process()
  }

  addShape (options) {
    this._shape = this._generateShape(options)
  }

  _move (x = 0, y = 0) {
    this._shape.move(x, y)
    if (!this._detect()) {
      this._shape.move(-x, -y)
    }
  }

  _detect () {
    // left overflow
    // right overflow
    // hit bottom
  }
}

mixinEvents(Tetris)

export default Tetris
