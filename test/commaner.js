// var tap = require('tap');
// var test = tap.test;
let program = require('commander');

program
    .version('1.0.0')
    .command('init')
    .option('-p, --plan [value]', '使用指定代码规范方案')
    .description('使用felint初始化项目。更多信息请参考：https://github.com/youzan/felint/blob/master/README.md');

program.parse(process.argv);

process.once('uncaughtException', function() {
    process.exitCode = 1;
});

const args = process.argv.slice(2);

if (!args.length || !program[args[0]]) {
    program.outputHelp();
}
// test('version test', function (t) {
//     t.ok(VERSION === pkgVersion, '比较version的测试');

//     // t.ok(checkUpdate());
//     t.end();
// });