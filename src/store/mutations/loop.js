import * as types from '../types'

const _ = {}

_[types.RESET] = (state) {
  state.block = state.origin.block
  state.matrix = state.origin.matrix
}

export default _
