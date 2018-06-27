let fileUtil = require('./utils/fileUtil.js');

function read() {
  return fileUtil.treeReadFile('.xhhlintrc', 'json') || {};
}

async function create(content, pathStr, force) {
  pathStr = pathStr || `${process.cwd()}/.xhhlintrc`;
  if (force) {
    fileUtil.createFileSync(pathStr, content, 'json');
  } else {
    let override = await fileUtil.checkOverride(pathStr);
    if (override) {
      fileUtil.createFileSync(pathStr, content, 'json');
    }
  }
}

async function local() {
  await set({
    local: true
  });
}

function isLocal() {
  let xhhlintrcFile = read() || {};
  return !!xhhlintrcFile.local;
}

async function set(value) {
  let xhhlintrcFile = read();
  xhhlintrcFile = xhhlintrcFile || {};
  Object.assign(xhhlintrcFile, value);
  await create(xhhlintrcFile, null, true);
}

function getPlan() {
  return read().plan;
}

module.exports = {
  read,
  create,
  local,
  set,
  isLocal,
  getPlan
};
