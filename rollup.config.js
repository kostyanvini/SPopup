import typescript from '@rollup/plugin-typescript';

const cjs = {
	input: 'src/index.ts',
	output: {
		format: 'cjs',
		file: './dist/spopup.cjs.js'
	},
	plugins: [typescript()]
};

const esm = {
	input: 'src/index.ts',
	output: {
		format: 'es',
		file: './dist/spopup.esm.js'
	},
	plugins: [typescript()]
};

const umd = {
	input: 'src/index.ts',
	output: {
		format: 'umd',
		name: 'SPopup',
		file: './dist/spopup.js'
	},
	plugins: [typescript()]
};

export default [umd, esm, cjs];