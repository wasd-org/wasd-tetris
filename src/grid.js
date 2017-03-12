import { padStart } from './util'

export default class Grid {
  constructor(row = 20, col = 10) {
    this.row = row
    this.col = col

    this.gutter = (0b1 << (this.col)) - 1

    this.x = 0
    this.y = 0

    this.interval = null
    this.listners = {}

    this.reset()
    this.process()
  }

  process(time = 500) {
    if (!this.shape) return
    this.interval = setInterval(() => {
      this.down()
      this.emit('process')
    }, time)
  }

  fail() {
    clearInterval(this.interval)
    this.interval = null
    this.emit('fail')
  }

  reset() {
    this.shape = null
    this._grid = this.grid = new Array(this.row).fill(0)
  }

  on(name, cb) {
    if (!this.listners[name]) this.listners[name] = []
    this.listners[name].push(cb)
  }

  emit(name, ...args) {
    if (!this.listners[name]) return
    this.listners[name].forEach(cb => cb.apply(this, args))
  }

  get shift() {
    return this.x - this.col + this.shape.col
  }

  addShape(s) {
    this.shape = s
    this._grid = this.grid
    const { row, col, maxRow, margin, shape } = s
    this.x = Math.floor((this.col - col) / 2)
    this.y = -maxRow + margin.bottom

    this.y++
    if (!this.move()) {
      this.fail()
    } else {
      this.y--
      if (!this.interval) this.process()
    }
  }

  bingo() {
    const { row } = this
    const grid = this.grid.filter(i => i !== this.gutter)
    this.grid = new Array(row - grid.length).fill(0).concat(grid)
  }

  down(num = 1) {
    this.y += num
    if (!this.move()) {
      this.y -= num
      this.bingo()
      this.emit('bottom-collide')
    }
    return this
  }

  left(num = 1) {
    this.x -= num
    if (!this.move()) this.x += num
    return this
  }

  right(num = 1) {
    this.x += num
    if (!this.move()) this.x -= num
    return this
  }

  up() {
    this.shape.rotate()
    if (!this.move()) this.shape.rotate(false)
    return this
  }

  fall() {
    do {
      this.y++
    } while (this.move())
    this.down()
  }

  move(x = this.x, y = this.y, s = this.shape) {
    if (!s) return
    const { shape, margin, maxRow, row, col } = s
    const grid = this._grid.slice()

    // left overflow
    if (x + margin.left < 0) return false
    // right overflow
    if (x + margin.left + col > this.col) return false
    // bottom overflow
    if (y + margin.top + row > this.row) return false

    const startY = y + maxRow - margin.bottom - 1
    const startIndex = maxRow - margin.bottom - 1
    let endY = startY - row + 1
    if (endY < 0) endY = 0
    const shift = x - this.col + col + margin.right + margin.left
    for (let i = 0, l = startY - endY; i <= l; i++) {
      const shapeRow = this.moveRow(shape[startIndex - i], shift)
      const gridRow = grid[startY - i]
      if (shapeRow & gridRow) return false
      grid[startY - i] = shapeRow | gridRow
    }
    this.grid = grid
    return true
  }

  moveRow(num, delta) {
    if (delta > 0) {
      return (num >>> delta) & this.gutter
    } else {
      return (num << -delta) & this.gutter
    }
  }

  padRow(num = 0) {
    return padStart(num.toString(2), this.col, '0')
  }

  get graph() {
    const { grid } = this
    let str = ''
    for (let i = 0; i < this.row; i++) {
      str += this.padRow(grid[i])
      if (i + 1 < this.row) {
        str += '\n'
      }
    }
    return str
  }
}
