import { terser } from "rollup-plugin-terser";

export default {
	input : 'index.mjs',
	output : [
		{
			file : 'dist/peasy.js',
			name : 'html',
			format : 'umd'
		},
		{
			file : 'dist/peasy.min.js',
			name : 'html',
			format : 'umd',
			plugins : [ terser() ]
		}
	]
}