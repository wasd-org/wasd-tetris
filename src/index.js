import Shape from './shape'
import { shapes } from './shape'

// for (const k in shapes) {
//   const s = shapes[k]
//   const shape = new Shape(k)
//   const l = s.length
//   clivas.clear()
//   console.log(k)
//   for (let i = 0; i < l; i++) {
//     console.log('--------------')
//     shape.print()
//     shape.next()
//   }
//   console.log()
// }

import Grid from './grid'

const grid = new Grid()
const shape = new Shape('S')

grid.addShape(shape)
