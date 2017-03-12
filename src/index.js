import Shape from './shape'
import Grid from './grid'
import Draw from './util/draw'
import { times } from './util/char'
var keypress = require('keypress')

const grid = new Grid()
const draw = new Draw()

const w = graph => {
  const top = draw.block(12, 'cyan')
  const content = graph.split('\n').map(a => draw.block(1, 'cyan') + a + draw.block(1, 'cyan')).join('\n')
  const bottom = draw.block(12, 'cyan')
  return `
${top}
${content}
${bottom}
`.replace(/0/g, draw.block(1, 'default')).replace(/1/g, draw.block())
}

grid.addShape(new Shape())
draw.clear().write(w(grid.graph))
keypress(process.stdin)

process.stdin.on('keypress', (ch, key) => {
  if (!key) return
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
