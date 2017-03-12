import { initEvents, mixinEvents } from '../mixinxs/events'
import initShapes from './shape/init'

class Tetris {
  constructor(options = {
    row: 20,
    col: 10,
    speed: 1,
    shapes: null
  }) {
    this._options = options

    initEvents(this)
    initShapes(this)
  }

  start () {
  }
}

mixinMixins(Tetris)

export default Tetris
