import Matrix from '../matrix'
import { extend } from '../../utils/object'

import BlockMixin from './block'
import LoopMixin from './loop'

export default class Tetris {
  constructor (options) {
    this._options = extend({
      matrix: new Matrix(),
      auto: true
    }, options)

    this.matrix = this._options.matrix

    this.reset()
  }

}

LoopMixin(Tetris)
BlockMixin(Tetris)
