import { padStart } from './util'

export default class Grid {
  constructor(row = 20, col = 10) {
    this.row = row
    this.col = col
    this.grid = new Array(row).fill(0)
  }

  print() {
    for (let i = 0; i < this.row; i++) {
      console.log(padStart(this.grid[i].toString(2), this.col, '0'))
    }
  }
}
