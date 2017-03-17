import { initEvents, mixinEvents } from '../mixinxs/events'
import { initStates, mixinStates } from '../mixinxs/state'
import { extend } from '../utils'

import initShapes from './shape/init'
import Grid from './grid'
import types from  './shape/types'

const STATE = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  FAILED: 'FAILED',
  HIT: 'HIT'
}

class Tetris {
  constructor(options) {
    this._options = extend({
      row: 20,
      col: 10,
      speed: 1,
      shapes: types,
      node: 0
    }, options)

    initEvents(this)
    initStates(this, STATE)
    initShapes(this)

    this.grid = this._grid = new Grid(this._options)
    this._interval = null
    this._speed = this._options.speed
    this.row = this._options.row
    this.col = this._options.col

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
      case STATE.HIT:
        this.addShape(this.generateShape())
        break
      default:
        break
    }
  }

  start () {
    this.addShape(this.generateShape())
    console.log(this.graph.map(g => g.join('')).join('\n'))
    this.down()
    console.log(this.graph.map(g => g.join('')).join('\n'))
    // this._action(STATE.PLAYING)
  }

  process () {
    this.emit('process', this.graph, this)
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

  addShape (shape, x, y) {
    const { margin } = shape
    if (x === undefined || y === undefined) {
      x = Math.floor((this.col - margin.col) / 2)
      y = 0 - margin.top
    }
    shape.move(x, y)
    this._grid = this.grid
    this._shape = shape
    this._union()
  }

  left () {
    this._move(-1, 0)
  }

  rihgt () {
    this._move(1, 0)
  }

  down () {
    this._move(0, 1)
  }

  _move (x = 0, y = 0) {
    this._shape.move(x, y)
    if (!this._detect()) {
      if (y > 0) {
        this._action(STATE.HIT)
      } else {
        this._shape.move(-x, -y)
      }
      return false
    }
    this._union()
    return true
  }

  _union () {
    const shape = this._shape.shape.origin
    let grid = this._grid._grid.slice()
    const { x, y, maxCol, margin } = this._shape
    console.log(x, y, maxCol, margin)

    const shift = this.col - maxCol - x

    for (let i = margin.top, rowLength = margin.top + margin.row; i < rowLength; i++) {
      for (let j = margin.left, colLength = margin.left + margin.col; j < colLength; j++) {
        if (shape[i][j]) {
          grid[y + i][x + j] = shape[i][j]
        }
      }
    }

    this.grid._grid = grid
  }

  _detect () {
    const { bitmap: gridBitmap, _gutter: gutter } = this._grid
    const { x, y, margin, bitmap: shapeBitmap, maxCol } = this._shape
    const shape = this._shape.shape.origin

    // left overflow
    if (x + margin.left < 0) {
      this.emit('overflow:left')
      return false
    }
    // right overflow
    if (x + margin.left + margin.col > this.col) {
      this.emit('overflow:right')
      return false
    }

    // hit bottom
    if (y + margin.top + margin.row > this.row) {
      return false
    }

    const shift = this.col - maxCol - x

    // hit existed shape
    for (let i = margin.top, l = margin.top + margin.row; i < l; i++) {
      const g = gridBitmap[y + i]
      let s = shapeBitmap[i]
      if (shift > 0) {
        s = s << shift || gutter
      } else if (shift < 0) {
        s = s >> -shift
      }

      if (g & s) {
        return false
      }
    }

    return true
  }

  get graph () {
    return this.grid._grid
  }

  padRow (num) {
    let str = num.toString(2)
    while (str.length < this.col) str = '0' + str
    return str
  }
}

mixinEvents(Tetris)
mixinStates(Tetris)

export default Tetris
