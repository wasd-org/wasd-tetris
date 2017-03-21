export default function (Tetris) {
  const proto = Tetris.prototype

  proto._bind = function () {
    const instance = this
    document.addEventListener('keydown', e => {
      if (instance._failed) return false
      let event = ''
      instance.save()
      switch (e.which) {
        case 37:
          instance.left()
          event = 'overflow'
          break
        case 38:
          instance.rotate()
          event = 'rotate'
          break
        case 39:
          instance.right()
          event = 'overflow'
          break
        case 40:
          instance.down()
          event = 'hit'
          break
        default:
          break
      }

      if (!instance._detectCollision()) {
        instance.restore()
        instance.emit(event)
      }

      instance.emit('repaint', instance.graph)
    })

    instance.on('hit', () => {
      const { y } = instance.block
      const { margin } = instance.block.shape

      if ( y + margin.top < instance.matrix.y) {
        instance.fail()
      } else {
        instance._union()
        instance.addBlock()
      }
    })
  }
}
