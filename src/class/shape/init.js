import types from './types'

export default function initShapes (instance) {
  instance.shapes = instance._options.shapes || types
}
