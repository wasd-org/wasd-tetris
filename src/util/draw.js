import { times } from './char'
const stream = process.stdout


export default class Draw {
  constructor(row = 20, col = 10) {
    this.row = row
    this.col = col
    this.flush()
    process.on('exit', () => {
      this.write('\n')
    })
  }

  write() {
    stream.write.apply(stream, arguments)
    return this
  }

  flush() {
    for (let i = 0; i < this.row; i++) {
      this.write(times('', this.col))
      if (i + 1 < this.row) {
        this.write('\n')
      }
    }
    this.clear()
    return this
  }

  clear() {
    stream.moveCursor(-stream.columns, -stream.rows)
    stream.clearScreenDown()
    return this
  }
}
