const fs = require('fs');
const path = require('path');


const ROOT_DIR = fs.realpathSync(process.cwd());

function pathResolve(...args) {
  return path.resolve(ROOT_DIR, ...args);
}

let babelrc;
try {
  babelrc = require(fs.realpathSync(pathResolve('babel.config.js')));
} catch (e) {
  console.warn('babel.config.js not found');
  babelrc = null;
}

module.exports = {
  ROOT_DIR,
  SRC_DIR: pathResolve('src'),
  BUILD_DIR: pathResolve('dist'),
  PUBLIC_DIR: pathResolve('public'),
  babelrc,
  pathResolve,
};
