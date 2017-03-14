import Tetris from './class/tetris'

const tetris = new Tetris({
  grid: {
    row: 20,
    col: 10
  },
  speed: 500
})

tetris.start()

tetris.on('left-overflow', () => {
  console.log('left-overflow')
})

tetris.on('right-overflow', () => {
  console.log('right-overflow')
})

tetris._move(10 - tetris._shape.margin.left - tetris._shape.x - tetris._shape.maxCol + 1, 0)
