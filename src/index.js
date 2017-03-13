import Tetris from './class/tetris'

const tetris = new Tetris({
  grid: {
    row: 20,
    col: 10
  },
  speed: 500
})

tetris.start()

tetris.on('init', ({ grid, shapes }) => {
  console.log(grid, shapes)
})
