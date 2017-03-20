import Block from '../block'

export default function (Tetris) {
  const proto = Tetris.prototype

  proto.down = function () {
    this.block.down()
  }

  proto.left = function () {
    this.block.left()
  }

  proto.right = function () {
    this.block.right()
  }

  proto.rotate = function () {
    this.block.rotate()
  }

  proto.addBlock = function (block) {
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
