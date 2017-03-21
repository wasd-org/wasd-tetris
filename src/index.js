import Tetris from './components/tetris'

const tetris = new Tetris()

import { intersect } from './utils/game'

const p = (a) => {
  let str = ''
  a.forEach(s => {
    str = str + s.join('') + '\n'
  })
  console.log(str)
}

tetris.on('repaint', graph => {
  p(graph.array)
})

tetris.on('failed', () => {
  console.log('failed')
})
