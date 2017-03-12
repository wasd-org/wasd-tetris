import Tetris from '../../src'

const tetris = new Tetris()

tetris.on('a', (a, b) => {
  console.log('a', a, b)
})

tetris.emit('a', 3)
