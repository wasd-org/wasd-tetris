export default function (Tetris) {
  const proto = Tetris.prototype

  proto.on = function (event, handler) {
    if (!this._events[event]) {
      this._events[event] = []
    }

    this._events[event].push(handler)
  }

  proto.emit = function (event, ...args) {
    const fns = this._events[event] || []
    const instance = this
    fns.forEach(fn => {
      fn.apply(instance, args)
    })
  }
}
