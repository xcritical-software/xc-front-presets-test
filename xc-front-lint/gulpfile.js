const createTasks = require('@xcritical/xc-front-libs-utils/gulp-tasks');


createTasks('@xcritical/xc-front-lint', {
  componentsGlob: [
    'src/**/*.{jsx,js}',
  ],
  publishFilesGlob: ['package.json', '*.md'],
});
