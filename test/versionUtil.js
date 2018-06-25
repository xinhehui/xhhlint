var tap = require('tap');
var test = tap.test;
var versionUtil = require('../src/utils/versionUtil');

let pkgVersion = require('../package.json').version;

var { VERSION } = versionUtil;

test('version test', function (t) {
    t.ok(VERSION === pkgVersion, '比较version的测试');

    // t.ok(checkUpdate());
    t.end();
});