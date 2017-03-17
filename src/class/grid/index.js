import { extend, generateBitmap, err } from '../../utils'

class Grid {
  constructor (options) {
    this._options = extend({
      row: 20,
      col: 10,
      node: 0
    }, options)

    const { row, col, node } = this._options

    this._grid = []
    for (let i = 0; i < row; i++) {
      const g = this._grid[i] = []
      for (let j = 0; j < col; j++) {
        g.push(node)
      }
    }

    this._gutter = (0b1 << col) - 1
  }

  get bitmap () {
    return generateBitmap(this._grid)
  }
}

export default Grid
