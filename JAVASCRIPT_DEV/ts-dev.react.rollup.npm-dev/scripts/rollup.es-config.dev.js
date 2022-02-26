import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import sass from 'sass';
import DefaultConfig from '../rollup.config';
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
			sourcemap: true,
		},
		plugins: handleUtilsCoverPlugins({
			oldPlugins: plugins,
			newPlugins: [
				scss({
					exclude: ['node_modules/**'],
					failOnError: true,
					runtime: sass,
					sourceMap: true,
					output: 'lib/index.css',
					outputStyle: 'expanded',
				}),
				typescript({
					tsconfig: './tsconfig.base.json',
					declaration: true,
					declarationDir: 'lib',
				}),
			],
		}),
	},
];
