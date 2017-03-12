import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/index.js',
  plugins: [
    buble(),
    resolve()
  ],
  targets: [
    { dest: 'dist/tetris.js', format: 'umd' },
    { dest: 'dist/tetris.common.js', format: 'cjs' },
    { dest: 'dist/tetris.esm.js', format: 'es' }
  ]
}
