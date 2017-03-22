export default function(Tetris) {
  const proto = Tetris.prototype;

  proto.reset = function() {
    this.auto = this._options.auto;
    this.speed = this._options.speed;
    this.matrix = this._options.matrix;
    this.matrix.reset();

    this._paused = false;
    this._failed = false;

    this.addBlock();
    this.resume();
  };

  proto.pause = function() {
    this._paused = true;
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  };

  proto.resume = function() {
    this._paused = false;
    if (!this._timeout) {
      this._process();
    }
  };

  proto.fail = function() {
    this._failed = true;
    this._paused = true;

    this.emit("failed");
  };

  proto.start = proto.reset;

  proto._process = function() {
    const instance = this;
    const { auto, speed } = this;
    const loop = () => {
      if (auto && speed && !instance._paused) {
        instance._timeout = setTimeout(
          () => {
            instance.down();
            loop();
          },
          speed
        );
      }
    };

    loop();
  };

  proto._next = function() {
    this._union();
    this._clearLines();
    this.addBlock();
  };
}
