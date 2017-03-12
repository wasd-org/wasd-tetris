import { transpose, generateBitmap, equalBitmap, generateAttribute } from '../../utils'

/**
 * Create shapes by provided shape
 * @param  {Array} shape - First array of shape
 * @return {Object}
 */
export default function createShapes (shape) {
  const { length } = shape
  const firstShapeBitmap = generateBitmap(shape)
  let shapes = [{
    origin: shape,
    bitmap: firstShapeBitmap
  }]

  let index = 0
  while(true) {
    const nextShape = transpose(shapes[index++].origin)
    const nextBitmap = generateBitmap(nextShape)
    if (equalBitmap(firstShapeBitmap, nextBitmap)) {
      break
    } else {
      shapes.push({
        origin: nextShape,
        bitmap: nextBitmap
      })
    }
  }

  shapes = shapes.map(shape => generateAttribute(shape))

  return shapes
}
