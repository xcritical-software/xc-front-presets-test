const chalk = require('chalk');


const isDevMode = process.env.NODE_ENV !== 'production';
const getMode = isDevMode ? 'development' : 'production';
const isNeedSourceMaps = !!process.argv.includes('--source-maps');

function showState() {
  console.info(
    chalk.cyan(
      `NODE_ENV: ${chalk.yellow(
        chalk.bold(process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),
      )}`,
    ),
  );
  console.info(chalk.cyan(`isDevMode: ${chalk.yellow(chalk.bold(isDevMode))}`));
  console.info(chalk.cyan(`isNeedSourceMaps: ${chalk.yellow(chalk.bold(isNeedSourceMaps))}`));
}

module.exports = {
  isDevMode,
  getMode,
  isNeedSourceMaps,
  showState,
};
