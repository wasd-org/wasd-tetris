import { padStart } from './util'

export default class Grid {
  constructor(row = 20, col = 10) {
    this.row = row
    this.col = col
    this.grid = new Array(row).fill(0)

    this.gutter = (0b1 << (this.col)) - 1

    this.grid[0] = this.gutter

    this.x = 0
    this.y = 0
  }

  get shift() {
    return this.x - this.col + this.shape.col
  }

  addShape(s) {
    this.shape = s
    const { row, col, maxRow, margin, shape } = s
    this.x = Math.floor((this.col - col) / 2)
    this.y = -maxRow + margin.bottom

    shape.forEach((s, i) => {
      if (i + this.y >= 0) return
      console.log(this.padRow(s), this.padRow(this.moveRow(s, this.shift)))
    })

    console.log('------')

    console.log(this.move(this.x, this.y + 3, s))
  }

  move(x, y, s) {
    const { shape, margin, maxRow, col } = s
    const grid = this.grid.slice()

    // left overflow
    if (x + margin.left < 0) return false
    // right overflow
    if (x + margin.left + col > this.col) return false

    let startY = y + margin.top
    if (startY < 0) startY = 0
    let startIndex = margin.top - 1 - y
    if (startIndex < 0) startIndex = 0

    console.log(startY, startIndex)
    for (let i = startIndex, l = maxRow - margin.bottom; i < l; i++) {
      const shiftedRow = this.moveRow(shape[i], this.shift)
      const gridRow = grid[startY + i - startIndex]
      console.log(this.padRow(shiftedRow), this.padRow(gridRow))
    }

    // this.print()
    return true
  }

  moveRow(num, delta) {
    if (delta > 0) {
      return (num >>> delta) & this.gutter
    } else {
      return (num << -delta) & this.gutter
    }
  }

  padRow(num) {
    return padStart(num.toString(2), this.col, '0')
  }

  print() {
    const { grid } = this
    for (let i = 0; i < this.row; i++) {
      console.log(this.padRow(grid[i]))
    }
  }
}
