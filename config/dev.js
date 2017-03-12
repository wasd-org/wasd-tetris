import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  plugins: [
    buble()
  ],
  targets: [
    { dest: 'dist/tetris.js', format: 'umd' },
    { dest: 'dist/tetris.common.js', format: 'cjs' },
    { dest: 'dist/tetris.esm.js', format: 'es' }
  ]
}
