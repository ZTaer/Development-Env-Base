const fs = require('fs');

/**
 * 融合plugins
 * 		a) 新配置会融合老配置,发生冲突时,会以新配置为主
 * 		b) 目的: 用于加工rollup.config.xxx.js下的plugins
 */
const handleUtilsCoverPlugins = ({ oldPlugins = [], newPlugins = [] }) => {
	try {
		const resultObject = {};
		oldPlugins.forEach((item) => (resultObject[item.name] = item));
		newPlugins.forEach((item) => (resultObject[item.name] = item));

		return Object.values(resultObject);
	} catch {
		console.warn('handleUtilsCoverPlugins error');
		return oldPlugins;
	}
};
exports.handleUtilsCoverPlugins = handleUtilsCoverPlugins;

/**
 * 删除指定路径下的所有空文件
 * @param {*} path
 */
const handleUtilsEmptyDir = (path) => {
	try {
		const files = fs.readdirSync(path);
		files.forEach((file) => {
			const filePath = `${path}/${file}`;
			const stats = fs.statSync(filePath);
			if (stats.isDirectory()) {
				handleUtilsEmptyDir(filePath);
			} else {
				fs.unlinkSync(filePath);
				console.log(`Clear old files "${file}" successfully!`);
			}
		});
	} catch {
		console.warn('handleUtilsEmptyDir error');
		throw new Error('handleUtilsEmptyDir error');
	}
};
exports.handleUtilsEmptyDir = handleUtilsEmptyDir;

/**
 * 删除指定路径下的所有空文件夹
 * @param {*} path
 */
const handleUtilsRmEmptyDir = (path, level = 0) => {
	try {
		const files = fs.readdirSync(path);
		if (files.length > 0) {
			let tempFile = 0;
			files.forEach((file) => {
				tempFile++;
				handleUtilsRmEmptyDir(`${path}/${file}`, 1);
			});
			if (tempFile === files.length && level !== 0) {
				fs.rmdirSync(path);
			}
		} else {
			level !== 0 && fs.rmdirSync(path);
		}
	} catch {
		console.warn('handleUtilsRmEmptyDir error');
		throw new Error('handleUtilsRmEmptyDir error');
	}
};
exports.handleUtilsRmEmptyDir = handleUtilsRmEmptyDir;

/**
 * 清空指定路径下的所有文件及文件夹
 * @param {*} path
 */
const handleUtilsClearDir = (path) => {
	try {
		handleUtilsEmptyDir(path);
		handleUtilsRmEmptyDir(path);
	} catch {
		console.warn('handleUtilsClearDir error');
		throw new Error('handleUtilsClearDir error');
	}
};
exports.handleUtilsClearDir = handleUtilsClearDir;
