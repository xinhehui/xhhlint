let sh = require('shelljs');

let xhhlintConfig = require('./xhhlintConfig.js');

function update() {
  let initHooksFile = xhhlintConfig.read().initHooks;
  if (initHooksFile) {
    sh.exec(`sh ./.xhhlint/${initHooksFile}`);
  }
}

module.exports = {
  update
};
