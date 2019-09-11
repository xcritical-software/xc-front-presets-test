const gulp = require('gulp');
const babel = require('gulp-babel');
const clone = require('gulp-clone');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const rimraf = require('rimraf');
const babelOptions = require('@xcritical/xc-front-babel');
const merge = require('merge2');
const path = require('path');
const fs = require('fs');
const componentPackage = require('./gulp/component-package');


const defaultOptions = {
  publishDir: '.publish',
  componentsGlob: ['src/*/*.{j|t}sx'],
  jsGlob: ['src/**/*.{js,jsx}'],
  tsGlob: ['src/**/*.{ts,tsx}'],
  publishFilesGlob: ['package.json', '*.md', '.npmrc'],
  resourcesGlob: ['src/**/*.{png,gif,jpg,svg,ttf,woff,json,less}'],
  babelOptions: {
    isBabelDebug: false,
    isDevMode: false,
  },
  tsConfig: 'tsconfig.json',
};

function createTasks(packageName, options = {}) {
  options = Object.assign({}, defaultOptions, options);

  const tsProject = ts.createProject(options.tsConfig, { declaration: true });

  const tsConfigPath = path.resolve(process.cwd(), options.tsConfig);
  const isTsEnabled = fs.existsSync(tsConfigPath);

  const tasks = ['clean', 'js', ...(isTsEnabled ? ['ts'] : []), 'resources', 'typings', 'publish-files'];

  gulp.task('clean', cb => rimraf(options.publishDir, cb));

  gulp.task(
    'ts',
    (done) => {
      const tsResult = gulp.src(options.tsGlob)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on('error', done);

      return merge(tsResult.dts, tsResult.js)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(options.publishDir))
        .on('error', done);
    },
  );

  gulp.task(
    'js',
    done => gulp.src(options.jsGlob)
      .pipe(sourcemaps.init())
      .pipe(babel(babelOptions(options.babelOptions)))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(options.publishDir))
      .on('error', done),
  );

  gulp.task(
    'publish-files',
    done => gulp.src(options.publishFilesGlob, { allowEmpty: true })
      .pipe(gulp.dest(options.publishDir))
      .on('error', done),
  );

  gulp.task('typings', (done) => {
    const components = gulp.src(options.componentsGlob);
    const packages = components
      .pipe(clone())
      .pipe(componentPackage())
      .on('error', done);

    return packages
      .pipe(gulp.dest(options.publishDir))
      .on('error', done);
  });

  gulp.task(
    'resources',
    done => gulp.src(options.resourcesGlob, { allowEmpty: true })
      .pipe(gulp.dest(options.publishDir))
      .on('error', done),
  );

  gulp.task(
    'compile', gulp.series(tasks),
  );
}

module.exports = createTasks;
