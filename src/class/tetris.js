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

  start (options) {
    this.addShape(this.generateShape(options))
  }

  process () {
    this.interval = (() => {
      this.down()
    }, this._speed)
  }

  pause () {
    clearInterval(this._interval)
    this._interval = null
  }

  resume () {
    this.process()
  }

  addShape (shape) {
    this._shape = shape
  }

  left () {
    this._move(-1, 0)
  }

  rihgt () {
    this._move(1, 0)
  }

  down () {
    if (!this._move(0, 1)) {
      this.emit('hit')
    }
  }

  _move (x = 0, y = 0) {
    this._shape.move(x, y)
    if (!this._detect()) {
      this._shape.move(-x, -y)
      return false
    }
    return true
  }

  _detect () {
    const { x, y, margin, maxCol } = this._shape
    console.log(x, y, margin, maxCol)
    // left overflow
    if (x + margin.left < 0) {
      this.emit('left-overflow')
      return false
    }
    // right overflow
    if (x + maxCol > this.col) {
      this.emit('right-overflow')
      return false
    }
    // hit bottom
  }
}

mixinEvents(Tetris)

export default Tetris
