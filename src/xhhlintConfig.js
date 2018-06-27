let fileUtil = require('./utils/fileUtil.js');

function read() {
  let xhhlintDirPath = fPath();
  let xhhlintConfig = {};
  if (xhhlintDirPath && xhhlintDirPath.path) {
    try {
      xhhlintConfig = require(`${xhhlintDirPath.path}/config.js`);
    } catch (e) {
      console.log('无法找到.xhhlint/config.js，你需要先初始化');
    }
  }
  return xhhlintConfig;
}

function fPath() {
  return fileUtil.findUp(process.cwd(), '.xhhlint', 'isDirectory');
}

module.exports = {
  read,
  fPath
};
