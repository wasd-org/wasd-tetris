import { padStart } from './util'

export default class Grid {
  constructor(row = 20, col = 10) {
    this.row = row
    this.col = col
    this.grid = new Array(row).fill(0)

    this.x = Math.round(col / 2)
    this.y = Math.round(row / 2)
  }

  addShape(s) {
    const { row, col, maxRow, shape } = s
    this.x = Math.round((this.col - col) / 2)
    this.y = -maxRow
    for (let i = maxRow - 1; i >= 0; i--) {
      if (!shape[i]) {
        this.y++
      } else {
        break
      }
    }
    console.log(this.intersect(this.x + 4, this.y + 3, s))
  }

  intersect(x, y, s) {
    console.log(x, y, s.shape)
    // left overflow
    if (x < 0) return false
    // right overflow
    if (s.col + x > this.col + 1) return false

    const { shape } = s
    const { grid, row } = this

    const l = shape.length

    for (let i = l - 1; i >= 0; i--) {
      const currentY = i + y
      if (currentY >= 0) {
        // bottom overflow
        if (currentY > row - 1) return false
        const currentRow = grid[currentY]
        const row = shape[i] << x
        // collide
        if (currentRow | row) return false
      }
    }

    return true
  }


  padRow(num) {
    return padStart(num.toString(2), this.col, '0')
  }

  print() {
    for (let i = 0; i < this.row; i++) {
      console.log(padStart(this.grid[i].toString(2), this.col, '0'))
    }
  }
}
