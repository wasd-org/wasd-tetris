<template>
  <div id="app">
    <div class="game">
      <ul class="row">
        <li v-for="row in graph">
          <ul class="col">
            <li
              v-for="col in row"
              class="rect"
              :class="{ 'filled' : col }">
              <div></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="controls">
      <div class="left">
        <div class="loop">
          <div class="flex-center" @click="pause">
            <a class="button">P</a>
            <span>pause</span>
          </div>
          <div class="flex-center" @click="tetris.reset()">
            <a class="button">R</a>
            <span>Reset</span>
          </div>
        </div>

        <div class="drop" @click="tetris.drop()">
          <a class="button">D</a>
          <span>Drop(space)</span>
        </div>
      </div>

      <div class="right">
        <div>
          <div class="flex-center" @click="tetris.rotate()">
            <a class="button">O</a>
            <span>Rotate(up)</span>
          </div>
        </div>
        <div class="flex-space-around">
          <div class="flex-center" @click="tetris.left()">
            <a class="button">L</a>
            <span>Left(left)</span>
          </div>
          <div class="flex-center" @click="tetris.right()">
            <a class="button">R</a>
            <span>Right(right)</span>
          </div>
        </div>
        <div>
          <div class="flex-center" @click="tetris.down()">
            <a class="button">D</a>
            <span>Down(down)</span>
          </div>
        </div>
      </div>

    </div>

    <p>Powered by <a href="//github.com/wasd-org/wasd-tetris">wasd-tetris</a></p>
  </div>
</template>

<script>
  import { Tetris, Matrix } from '../../../../dist/tetris'

  export default {
    name: 'tetris',

    data () {
      return {
        tetris: null,
        graph: Array(15).fill(Array(15)),
        _pasued: false
      }
    },

    mounted () {
      this.init()
    },

    methods: {
      init () {

        this.tetris = new Tetris({
          matrix: new Matrix({
            row: 15,
            col: 15
          })
        })

        this.tetris.on('repaint', graph => {
          this.graph = graph.array
        })

        this.tetris.on('failed', () => {
          alert('Failed!')
        })
      },

      start () {
        this._pasued = false
        this.tetris.start()
      },

      pause () {
        if (this._pasued) {
          this._pasued = false
          this.tetris.resume()
        } else {
          this._pasued = true
          this.tetris.pause()
        }
      }
    }
  }
</script>

<style>
  body {
    font-family: Avenir,Helvetica,Arial,sans-serif;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;
    margin: 0;
    padding: 0;
    min-width: 300px;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  #app {
    max-width: 420px;
    margin: 0 auto;
    display: flex;
    min-height: 100%;
    flex-direction: column;
    border: 1px solid #4fc08d;
    user-select: none;
  }

  a {
    color: #42b983;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .game {
    width: 100%;
    max-width: 420px;
    overflow: hidden;
    margin: 0 auto;
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0;
  }

  ul.col {
    display: flex;
  }

  li.rect {
    flex: 1;
    border-radius: 2px;
    background-color: #97D5E0;
  }

  li.rect div {
    width: 100%;
    padding-bottom: 100%;
  }

  li.rect.filled {
    background-color: #5587A2;
  }

  ul.col li {
    display: inline-block;
  }

  .controls {
    margin-top: 20px;
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left,
  .right {
    flex: 1;
  }

  .loop {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loop > div {
    flex: 1;
  }

  .flex-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .drop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .drop a.button {
    transform: scale(2);
    margin: 20px;
  }

  a.button {
    width: 3em;
    height: 3em;
    border-radius: 1.5em;
    line-height: 3em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  a.button.white {
    background-color: #fff;
    color: #42b983;
  }

  .flex-space-around {
    display: flex;
    justify-content: space-around;
  }
</style>
