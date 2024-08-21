import type { Options } from 'tsup'

export default <Options>{
  entryPoints: ['src/*.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  cjsInterop: true,
  splitting: true,
}
