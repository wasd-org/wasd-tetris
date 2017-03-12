import { extend, generateBitmap, err } from '../../utils'

class Grid {
  constructor (options) {
    this._options = extend({
      row: 20,
      col: 10,
      node: 0
    }, options)

    const { row, col, node } = this._options

    const gridRow = Array(col).fill(node)
    this._grid = Array(row).fill(gridRow)
  }

  addShape (shape) {
    if (!shape) {
      err('A shape is needed.')
    }
  }

  get bitmap () {
    return generateBitmap(this._grid)
  }
}

export default Grid