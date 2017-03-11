import Shape from './shape'
import Grid from './grid'
import Draw from './util/draw'
import { times } from './util/char'
var keypress = require('keypress')

const grid = new Grid()
const draw = new Draw()

const w = graph => {
  const top = '┌' + times('─', 10) + '┐'
  const content = graph.split('\n').map(a => '│' + a + '│').join('\n')
  const bottom = '└' + times('─', 10) + '┘'
  return `
${top}
${content}
${bottom}
`.replace(/0/g, ' ').replace(/1/g, '█')
}

grid.addShape(new Shape())
draw.clear().write(w(grid.graph))
keypress(process.stdin)

process.stdin.on('keypress', (ch, key) => {
  if (key.name === 'c' && key.ctrl) return process.exit(0)
  if (key.name === 'down' || key.name === 'j') {
    grid.down()
  }
  if (key.name === 'right' || key.name === 'l') {
    grid.right()
  }
  if (key.name === 'left' || key.name === 'h') {
    grid.left()
  }
  if (key.name === 'up' || key.name === 'k') {
    grid.up()
  }
  draw.clear().write(w(grid.graph))
})

grid.on('bottom-collide', () => {
  grid.addShape(new Shape())
})

process.stdin.resume()
try {
  process.stdin.setRawMode(true)
} catch (e) {
}
