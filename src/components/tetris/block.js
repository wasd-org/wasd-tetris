import Block from '../block'

export default function (Tetris) {
  const proto = Tetris.prototype

  proto.down = function () {
    if (this._failed) return false
    this.save()
    this.block.moveBy(0, 1)
    if (this._detectCollision()) {
      this.emit('hit')
      this.restore()
    } else {
      this.emit('repaint', this.graph)
    }
  }

  proto.left = function () {
    if (this._failed) return false
    this.save()
    this.block.moveBy(-1, 0)
    if (this._detectCollision()) {
      this.emit('overflow:left')
      this.restore()
    } else {
      this.emit('repaint', this.graph)
    }
  }

  proto.right = function () {
    if (this._failed) return false
    this.save()
    this.block.moveBy(1, 0)
    if (this._detectCollision()) {
      this.emit('overflow:right')
      this.restore()
    } else {
      this.emit('repaint', this.graph)
    }
  }

  proto.rotate = function () {
    if (this._failed) return false
    this.save()
    this.block.rotate()
    if (this._detectCollision()) {
      this.emit('hit:rotate')
      this.restore()
    } else {
      this.emit('repaint', this.graph)
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
