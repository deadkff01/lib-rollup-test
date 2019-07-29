import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const RESOLVE_COMMON = resolve({
  module: true,
  jsnext: true,
  main: true,
  browser: true,
  preferBuiltins: false,
})

export default {
  input: 'src/App.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/bundle.es.js',
      format: 'es',
    },
  ],
  external: ['react', 'react-dom', 'prop-types'],
  plugins: [RESOLVE_COMMON, babel()],
}
