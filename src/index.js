// import Shape from './shape'
// import { shapes } from './shape'

// for (const k in shapes) {
//   const s = shapes[k]
//   const shape = new Shape(k)
//   const l = s.length
//   console.log(k)
//   for (let i = 0; i < l; i++) {
//     console.log('--------------')
//     shape.print()
//     shape.next()
//   }
//   console.log()
// }

import Grid from './grid'

const grid = new Grid(5, 5)

grid.print()
