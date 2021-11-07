require('dotenv');
const { aliasJest, configPaths, alias } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.base.json');

/**
 * 自定义create-react-app webpack配置( 等待笔记 )
 * 		a) 注意: 以下配置, 除基本配置外, 其他皆可根据实际情况修改调整
 */

module.exports = function override(config, env) {
	// ### 基本配置 ###
	const webpackConfig = alias(aliasMap)(config, env);
	webpackConfig.output.publicPath = process.env.PUBLIC_URL;

	// ### 统一文件生成名称 ###
	// js 文件
	webpackConfig.output.filename = 'static/js/index.js';
	// css 文件
	webpackConfig.plugins.forEach((item, index) => {
		if (
			item.options &&
			item.options.filename &&
			item.options.filename.includes('static/css/')
		) {
			webpackConfig.plugins[index].options = {
				...webpackConfig.plugins[index].options,
				filename: 'static/css/index.css',
				chunkFilename: 'static/css/index.css',
			};
		}
	});

	// ### 禁用一些不必要的配置 ###
	// 关闭文件chunk
	webpackConfig.optimization = {
		...webpackConfig.optimization,
		splitChunks: false,
		runtimeChunk: false,
	};
	// 禁止生成版权相关文件
	webpackConfig.optimization.minimizer[0].options.extractComments = false;

	// ### 兼容处理 ###
	// 解决多个第三方库,引起的React版本冲突问题( 等待笔记 - 常见 - 可选配置 )
	//		a) 核心思路:
	//			0. webpack剔除react, react-dom的打包
	//			1. 在html下引用react, react-dom, 的CDN资源
	webpackConfig.externals = {
		react: 'React',
		'react-dom': 'ReactDOM',
	};

	return webpackConfig;
};

module.exports.jest = aliasJest(aliasMap);
