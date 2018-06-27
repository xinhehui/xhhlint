#!/usr/bin/env node
require('colors');
let program = require('commander');
let process = require('process');
let path = require('path');
let sh = require('shelljs');
let versionUtil = require('./utils/versionUtil.js');
let fetchConfig = require('./fetchConfig.js');
let dependence = require('./dependence.js');
let updateHooks = require('./updateHooks.js');
let ruleFile = require('./ruleFile.js');
let xhhlintrc = require('./xhhlintrc.js');

program
  .version(versionUtil.VERSION)
  .command('init')
  .option('-p, --plan [value]', '使用指定代码规范方案')
  .description('使用xhhlint初始化项目。')
  .action(async (options) => {
    let isUpdating = await versionUtil.checkUpdate();

    // 不选择更新该 lint
    if (!isUpdating) {
      let xhhlintrcFile = xhhlintrc.read();
      await fetchConfig(xhhlintrcFile || {});
      console.log('开始安装本地依赖...'.green);
      let msgInfo = await dependence.install();
      console.log(msgInfo.join('\n'));
      // updateHooks.update();
      // sh.exec('rm ./.eslintrc ./.scss-lint.yml');
      await ruleFile.createIgnore();
      let plan = options.plan || xhhlintrc.getPlan() || 'default';
      await xhhlintrc.set({
        plan
      });
      ruleFile.create('plan', plan, true);
    }
  });

// 更新配置文件和钩子
program
  .command('update')
  .description('更新xhhlint的配置文件')
  .action(async () => {
    let isUpdating = await versionUtil.checkUpdate();
    if (!isUpdating) {
      let xhhlintrcFile = xhhlintrc.read();
      await fetchConfig(xhhlintrcFile || {});
      console.log('开始更新依赖...'.green);
      let msgInfo = await dependence.install();
      console.log(msgInfo.join('\n'));
      updateHooks.update();
    }
  });

program
  .command('use')
  .description('在当前目录下使用指定代码规范方案或文件')
  .option('-p, --plan [planname]', '使用指定代码规范方案')
  .option('-f, --file [filename]', '使用指定规则文件')
  .action((options) => {
    if (options.plan) {
      ruleFile.create('plan', options.plan, true);
    }
    if (options.file) {
      ruleFile.create('file', options.file, true);
    }
  });


// 调用eslint校验js
program
  .command('lintjs [eslintParams...]')
  .description('使用xhhlint检测js代码')
  .option('--exitcode', '使用exitcode')
  .allowUnknownOption()
  .action(function(eslintParams, options) {
    let eslintPath = `${process.cwd()}/node_modules/eslint/lib/cli.js`;
    let eslintCli;
    try {
      eslintCli = require(eslintPath);
    } catch (e) {
      console.log('你尚未安装eslint');
      process.exitCode = 0;
      return;
    }
    let params = process.argv.slice(0);
    params.splice(2, 1);
    if (options.exitcode) {
      // 处理params
      params.splice(params.indexOf('--exitcode'), 1);
    }
    var exitCode = eslintCli.execute(params);
    if (options.exitcode) {
      process.exitCode = exitCode;
    }
  });

// 调用eslint校验js
program
  .command('lintcss [stylelintParams...]')
  .description('使用stylelint检测css代码')
  .option('--exitcode', '使用exitcode')
  .allowUnknownOption()
  .action((stylelintParams, options) => {
    let stylelintPath = `${process.cwd()}/node_modules/stylelint/bin/stylelint.js`;
    let params = process.argv.slice(0);
    params.splice(0, 3);
    if (options.exitcode) {
      // 处理params
      params.splice(params.indexOf('--exitcode'), 1);
    }
    let child = sh.exec(`${stylelintPath} ${params.join(' ')}`, {async: true});
    child.on('exit', (code) => {
      if (options.exitcode) {
        process.exitCode = code;
      }
    });
  });

// 判断该项目是否是local项目
program
  .command('islocal')
  .description('查看该项目是否是local项目')
  .action(() => {
    console.log(xhhlintrc.isLocal());
  });

// 返回xhhlint base path
program
  .command('where')
  .description('返回xhhlint安装路径')
  .action(() => {
    console.log(path.dirname(__dirname));
  });

// xhhlint挂钩子

program
  .command('hooks')
  .description('挂载钩子')
  .action(() => {
    updateHooks.update();
  });

program.parse(process.argv);

process.once('uncaughtException', function() {
  process.exitCode = 1;
});

const args = process.argv.slice(2);

if (!args.length || program[args[0]]) {
  program.outputHelp();
}