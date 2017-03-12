import { times } from './char'
const stream = process.stdout

const FOREGROUND = {
  black: '\x1B[30m',
  red: '\x1B[31m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  magenta: '\x1B[35m',
  cyan: '\x1B[36m',
  gray: '\x1B[37m',
  default: '\x1B[39m'
}

const BACKGROUND = {
  black: '\x1B[40m',
  red: '\x1B[41m',
  green: '\x1B[42m',
  yellow: '\x1B[43m',
  blue: '\x1B[44m',
  magenta: '\x1B[45m',
  cyan: '\x1B[46m',
  gray: '\x1B[47m',
  default: '\x1B[49m'
}

export default class Draw {
  constructor(row = 20, col = 10) {
    this.row = row
    this.col = col
    this.flush()
    stream.write('\x1B[?25l')
    process.on('exit', () => {
      stream.write('\x1B[?25h')
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

  block(num = 1, color = 'yellow') {
    const whitespace = Array((num * 2) + 1).join(' ')
    return (BACKGROUND[color] + whitespace + BACKGROUND.default)
  }

  clear() {
    stream.moveCursor(-stream.columns, -stream.rows)
    stream.clearScreenDown()
    return this
  }
}
