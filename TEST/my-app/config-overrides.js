require('dotenv');
const { aliasJest, configPaths, alias } = require('react-app-rewire-alias');

// 导入tsconfig配置,保证别名功能正常
const aliasExp = configPaths('./tsconfig.base.json');

module.exports = function override(config, env) {
	const newConfig = alias(aliasExp)(config, env);
	newConfig.output.publicPath = process.env.PUBLIC_URL;
	return newConfig;
};

module.exports.jest = aliasJest(aliasExp);
