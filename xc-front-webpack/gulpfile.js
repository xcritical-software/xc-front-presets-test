const createTasks = require('@xcritical/xc-front-libs-utils/gulp-tasks');


createTasks('@xcritical/xc-front-webpack', {
  componentsGlob: [
    'src/**/*.{jsx,js}',
  ],
  publishFilesGlob: ['package.json', '*.md'],
});
