import Tetris from './class/tetris'

const tetris = new Tetris({
  grid: {
    row: 20,
    col: 10
  },
  speed: 1000
})

tetris.start()

tetris.on('overflow:left', () => {
  console.log('overflow:left')
})

tetris.on('overflow:right', () => {
  console.log('overflow:right')
})

tetris.on('hit', () => {
  console.log('hit')
})

tetris.on('failed', () => {
  console.log('failed')
})

tetris.on('repaint', graph => {
  console.log(graph.map(g => g.join('')).join('\n'))
})
