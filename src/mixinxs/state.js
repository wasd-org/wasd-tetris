export function initStates (instance, states) {
  instance._state = states
}

export function mixinStates (Class) {
  Class.prototype._action = function (state, ...args) {
    const instance = this

    if (!instance._state[state]) {
      throw new Erro(`[wasd-state] No state name ${state}`)
    }

    instance._stateHandler(state, ...args)
  }
}
