import create from './create'
import types from './types'
import { extend, pickRandomFromArray } from '../../utils'
import Shape from './index'

export default function initShapes (instance) {
  const { shapes } = instance._options.shapes
  if (shapes) {
    instance._shapes = shapes.map(s => create(s))
  } else {
    instance._shapes = types
  }

  instance.generateShape = function (options) {
    return new Shape(extend({
      shapes: pickRandomFromArray(instance._shapes)
    }, options))
  }
}
