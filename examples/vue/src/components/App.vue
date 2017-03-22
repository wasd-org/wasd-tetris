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
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="controls">
      <button @click="start">Start</button>
      <button>Pause</button>
    </div>
  </div>
</template>

<script>
  import Tetris from '../../../../dist/tetris'

  export default {
    name: 'tetris',

    data () {
      return {
        tetris: null,
        graph: [[]]
      }
    },

    mounted () {
      this.init()
    },

    methods: {
      init () {
        this.tetris = new Tetris()

        this.tetris.on('repaint', graph => {
          this.graph = graph.array
        })
      },

      start () {
        this.tetris.start()
      }
    }
  }
</script>

<style>
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li.rect {
    width: 30px;
    height: 30px;
    border-radius: 2px;
    background-color: #97D5E0;
  }

  li.rect.filled {
    background-color: #5587A2;
  }

  ul.col li {
    display: inline-block;
  }
</style>
