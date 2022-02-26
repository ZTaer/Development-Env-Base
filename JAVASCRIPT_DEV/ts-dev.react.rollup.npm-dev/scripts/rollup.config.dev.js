import typescript from '@rollup/plugin-typescript';
import DefaultConfig from '../rollup.config';
import scss from 'rollup-plugin-scss';
import sass from 'sass';
const { handleUtilsCoverPlugins } = require('./utils.script');

const { plugins = [] } = DefaultConfig[0];

export default [
	{
		...DefaultConfig[0],
		output: [
			{
				file: 'dist/index.js',
				sourcemap: true,
				format: 'cjs',
			},
			{
				file: 'dist/index.es.js',
				sourcemap: true,
				format: 'esm',
			},
		],
		plugins: handleUtilsCoverPlugins({
			oldPlugins: plugins,
			newPlugins: [
				scss({
					exclude: ['node_modules/**', 'dist/**'],
					failOnError: true,
					runtime: sass,
					sourceMap: true,
					output: 'dist/index.css',
					outputStyle: 'expanded',
				}),
				typescript({
					tsconfig: './tsconfig.base.json',
				}),
			],
		}),
	},
];
