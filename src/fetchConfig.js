require('colors');
let rimraf = require('rimraf');
const download = require('download-git-repo');

let versionUtil = require('./utils/versionUtil.js');

let DEFAUTL_CONFIG_URL = 'xinhehui/xhhlint-config';

// 拉取配置
async function fetchConfig(xhhlintrc) {
    let configRepositoryUrl = xhhlintrc.configRep || xhhlintrc.gitHookUrl || DEFAUTL_CONFIG_URL;
    console.log(`xhhlint将拉取位于${configRepositoryUrl}的配置\n`.green);

  rimraf.sync(`${__dirname  }/.xhhlint`);

  return new Promise((resolve, reject) => {
    download(`${configRepositoryUrl}#${versionUtil.isBetaNow ? 'dev' : 'master'}`, '.xhhlint', function(err) {
      if (err) {
        reject()
      }
      console.log('download success!!')
      resolve()
    });
  })
}

module.exports = fetchConfig;
