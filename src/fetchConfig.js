require('colors');
let rimraf = require('rimraf');
const download = require('download-git-repo');

let versionUtil = require('./utils/versionUtil.js');

let DEFAUTL_CONFIG_URL = 'youzan/felint-config';

// 拉取配置
function fetchConfig(felintrc) {
    let configRepositoryUrl = felintrc.configRep || felintrc.gitHookUrl || DEFAUTL_CONFIG_URL;
    console.log(`felint将拉取位于${configRepositoryUrl}的配置\n`.green);

    rimraf(`${__dirname  }/.felint`, () => {

        download(`${configRepositoryUrl}#${versionUtil.isBetaNow ? 'dev' : 'master'}`, '.felint', function(err) {
            console.log(err ? 'Error' : 'Success');
        });
    });
}

module.exports = fetchConfig;
