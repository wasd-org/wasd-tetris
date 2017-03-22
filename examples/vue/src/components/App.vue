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
      <a class="button" @click="start">Start</a>
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
        graph: Array(20).fill(Array(15)),
      }
    },

    mounted () {
      this.init()
    },

    methods: {
      init () {

        this.tetris = new Tetris({
          matrix: new Matrix({
            row: 20,
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
        console.log('start')
        this.tetris.start()
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
    overflow: hidden;
    min-width: 300px;
  }

  a {
    color: #42b983;
    cursor: pointer;
  }

  .game {
    width: 100%;
    max-width: 400px;
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
  }

  a.button {
    padding: 0.75em 2em;
    border-radius: 2em;
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
</style>
