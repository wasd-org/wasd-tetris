import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/index.js',
  moduleName: 'WASD_Tetris',
  plugins: [
    buble(),
    resolve()
  ],
  banner: '/*!\n' +
  ' * (c) 2016-' + new Date().getFullYear() + ' WASD-ORG\n' +
  ' * Released under the MIT License.\n' +
  ' */',
  targets: [
    { dest: 'dist/tetris.js', format: 'umd' },
    { dest: 'dist/tetris.common.js', format: 'cjs' },
    { dest: 'dist/tetris.esm.js', format: 'es' }
  ]
}
