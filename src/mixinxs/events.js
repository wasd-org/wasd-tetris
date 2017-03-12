export function initEvent (instance) {
  instance._events = Object.create(null)
}

export function mixinEvent (Class) {
  Class.prototype.on = function (event, cb) {
    const instance = this

    if (!instance._events[event]) {
      instance._events[event] = []
    }
    instance._events[event].push(cb)
    return instance
  }

  Class.prototype.emit = function (event, ...args) {
    const instance = this

    const cbs = instance._events[event]
    if (cbs) {
      cbs.forEach(cb => {
        cb.apply(instance, args)
      })
    }
    return instance
  }
}
