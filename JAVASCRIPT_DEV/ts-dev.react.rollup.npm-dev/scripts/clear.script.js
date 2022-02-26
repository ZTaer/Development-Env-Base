const path = require('path');
const { handleUtilsClearDir } = require('./utils.script');

handleUtilsClearDir(path.resolve(__dirname, '../dist'));
handleUtilsClearDir(path.resolve(__dirname, '../lib'));
