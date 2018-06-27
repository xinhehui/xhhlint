/* global Promise */

let sh = require('shelljs');
var readline = require('readline');
const semver = require('semver');
require('colors');

let VERSION = require('../../package.json').version;

let isBetaNow = semver.prerelease(VERSION);

function getLatestVersion (isBeta) {
  let remoteVersion
  try {
    remoteVersion = sh.exec(`npm view xhhlint@${isBeta ? 'beta' : 'latest'} version`, {silent: true});
  } catch (e) {
    console.log('检查更新失败');
    remoteVersion = -1
  }
  return remoteVersion
}
/**
 * 判断是否需要更新
 * @param  {[type]} version [description]
 * @return {[type]}         [description]
 */
function checkUpdate () {
  let olVersion;
  let isUpdating = false;
  return new Promise((res) => {
    olVersion = getLatestVersion(isBetaNow)

    if (olVersion === -1) {
      res(isUpdating)
    }

    olVersion = olVersion.toString().replace('\n', '');

    if (semver.lt(VERSION, olVersion)) {
      let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(`发现xhhlint新版本${olVersion.trim().red}，立即更新(Y/n)?`, (ans) => {
        rl.close();
        if (ans !== 'n') {
          isUpdating = true;

          console.log('更新xhhlint版本中...');

          // const updateVersion = semver.prerelease(olVersion) ? 'beta' : 'latest';

          // sh.exec(`npm install -d -g xhhlint@${updateVersion}`);
        }
        res(isUpdating);
      });
    } else {
      res(isUpdating);
    }
  });
}

module.exports = {
  VERSION,
  isBetaNow,
  checkUpdate
};
