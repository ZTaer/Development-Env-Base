import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import sass from 'sass';
import DefaultConfig from '../rollup.config';
import { uglify } from 'rollup-plugin-uglify';
const { handleUtilsCoverPlugins } = require('./utils.script');

const { plugins = [] } = DefaultConfig[0];

export default [
	{
		...DefaultConfig[0],
		output: {
			dir: 'lib',
			format: 'es',
			preserveModules: true,
			preserveModulesRoot: 'src',
			sourcemap: false,
		},
		plugins: handleUtilsCoverPlugins({
			oldPlugins: plugins,
			newPlugins: [
				scss({
					exclude: ['node_modules/**'],
					failOnError: true,
					runtime: sass,
					sourceMap: false,
					output: 'lib/index.css',
					outputStyle: 'compressed',
				}),
				typescript({
					tsconfig: './tsconfig.base.json',
					declaration: true,
					declarationDir: 'lib',
				}),
				uglify(),
			],
		}),

		external: ['react', 'react-dom'],
	},
];
