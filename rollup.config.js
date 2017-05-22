import rollupNodeResolve from 'rollup-plugin-node-resolve'
import rollupAlias from 'rollup-plugin-alias'
import rollupTS from 'rollup-plugin-ts'
import uglify from 'rollup-plugin-uglify'
import typescript from 'typescript'
const pkg = require('./package.json')
const tsconfig = require('./tsconfig.json')

export default {
  entry: 'src/index.ts',
  context: 'node',
  plugins: [
    rollupAlias({
      tslib: 'node_modules/tslib/tslib.es6.js'
    }),
    rollupNodeResolve(),
    rollupTS({
      typescript: typescript,
      tsconfig: tsconfig.compilerOptions
    }),
    uglify()
  ],
  targets: [
    {
      dest: pkg['main'],
      format: 'umd',
      moduleName: 'MDJ',
      sourceMap: true,
      exports: 'named'
    }
  ]
}