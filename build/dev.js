const rollup = require('rollup')
const buble = require('rollup-plugin-buble')
const cjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const globals = require('rollup-plugin-node-globals')
const builtins = require('rollup-plugin-node-builtins')

rollup
  .rollup({
    entry: 'src/index.js',
    plugins: [
      globals(),
      builtins(),
      buble(),
      cjs(),
      resolve()
    ]
  })
  .then(bundle => {
    bundle.write({
      format: 'iife',
      moduleName: 'core-tetris',
      dest: 'dist/core-tetris.js'
    })
  })
  .catch(err => {
    console.error(err)
  })
