import Block from '../block'

export default function (Tetris) {
  const proto = Tetris.prototype

  proto.down = function () {
    if (this._failed) return false
    this.save()
    this.block.moveBy(0, 1)
    if (this._detectCollision()) {
      this.restore()
      this.emit('hit')
      return false
    } else {
      this.emit('repaint', this.graph)
      return true
    }
  }

  proto.left = function () {
    if (this._failed) return false
    this.save()
    this.block.moveBy(-1, 0)
    if (this._detectCollision()) {
      this.restore()
      this.emit('overflow:left')
      return false
    } else {
      this.emit('repaint', this.graph)
      return true
    }
  }

  proto.right = function () {
    if (this._failed) return false
    this.save()
    this.block.moveBy(1, 0)
    if (this._detectCollision()) {
      this.restore()
      this.emit('overflow:right')
      return false
    } else {
      this.emit('repaint', this.graph)
      return true
    }
  }

  proto.rotate = function () {
    if (this._failed) return false
    this.save()
    this.block.rotate()
    if (this._detectCollision()) {
      this.restore()
      this.emit('hit:rotate')
      return false
    } else {
      this.emit('repaint', this.graph)
      return true
    }
  }

  proto.addBlock = function (block) {
    if (this._failed) return false

    if (!block) {
      block = new Block()
    }

    const { col, row } = this.matrix
    const { margin } = block.shape

    const x = Math.floor((col - margin.col) / 2) - margin.left
    const y = 0 - margin.row - margin.top

    block.moveTo(x, y)

    this.block = block
  }
}
