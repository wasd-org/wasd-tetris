import { initEvents, mixinEvents } from '../mixinxs/events'
import { initStates, mixinStates } from '../mixinxs/state'
import { extend } from '../utils'

import initShapes from './shape/init'
import Grid from './grid'
import types from  './shape/types'

const STATE = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  FAILED: 'FAILED'
}

class Tetris {
  constructor(options) {
    this._options = extend({
      row: 20,
      col: 10,
      speed: 1,
      shapes: types
    }, options)

    initEvents(this)
    initStates(this, STATE)
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

  _stateHandler (state, ...args) {
    switch (state) {
      case STATE.PLAYING:
        this._paused = false
        this.process()
        break
      case STATE.PAUSED:
        this._paused = true
        if (this._timeout) {
          clearTimeout(this._timeout)
          this._timeout = null
        }
        break
      case STATE.FAILED:
        if (this._timeout) {
          clearTimeout(this._timeout)
          this._timeout = null
        }
        break
      default:
        break
    }
  }

  start (options) {
    this.addShape(this.generateShape(options))
    this._action(STATE.PLAYING)
  }

  process () {
    this.down()
    if (!this._paused) {
      this._timeout = setTimeout(() => {
        this.process()
      }, this._speed)
    }
  }

  pause () {
    this._action(STATE.PAUSED)
  }

  resume () {
    this._action(STATE.PLAYING)
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
    if (x + margin.left + margin.col > this.col) {
      this.emit('right-overflow')
      return false
    }
    // hit bottom
  }
}

mixinEvents(Tetris)
mixinStates(Tetris)

export default Tetris
