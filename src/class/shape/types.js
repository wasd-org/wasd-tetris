import create from './create'

const I = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0]
]

const J = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 0, 1]
]

const L = [
  [0, 0, 0],
  [1, 1, 1],
  [1, 0, 0]
]

const O = [
  [1, 1],
  [1, 1]
]

const S = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 1, 0]
]

const T = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
]

const Z = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 1, 1]
]

const shapes = [I, J, L, O, S, T, Z].map(s => create(s))

export default shapes
