export default function (Tetris) {
  const proto = Tetris.prototype

  proto._bind = function () {
    const instance = this
    document.addEventListener('keydown', e => {
      switch (e.which) {
        case 32:
          while (instance.down()) {
          }
        case 37:
          instance.left()
          break
        case 38:
          instance.rotate()
          break
        case 39:
          instance.right()
          break
        case 40:
          instance.down()
          break
        default:
          break
      }
    })
  }
}
