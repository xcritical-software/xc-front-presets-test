# Webpack config

## Обновлено
 - версии пакетов
 - настройки линтирования
 - инициализация

## Добавлено
 - teamcity-bundle-size
 - postcss-flexbugs-fixes
 - postcss-preset-env



### Для использования новой конфигурации необходимо:

- `установить` [cross-env]
- `для добавления babel плагинов в корне проекта создать файл` `babel.config.js`
- `для управления добавляемыми полифилами в корне проекта создать файл .browserslistrc` [browserslist]
- `в точке входа добавить` `import '@babel/polyfill'`

##Пример `babel.config.js`

```js
module.exports = {
  // пресеты и плагины которые будут добавлены для всех окружений
  presets: [],
  plugins: [],
  env: {
    development: {
      // плагины которые будут добавлены для окружения `cross-env NODE_ENV=development`
      plugins: [],
    },
    production: {
      // плагины которые будут добавлены для окружения `cross-env NODE_ENV=production`
      plugins: [],
    },
    test: {
      // плагины которые будут добавлены для окружения `cross-env NODE_ENV=test`
      plugins: ['dynamic-import-node'],
    },
  },
};
```

##Пример `.browserslistrc`

```text
# Browsers that we support

[production]
last 2 version
> 1%
ie 10
not op_mini all

[development]
last 1 chrome version
last 1 firefox version
```

## Пример скриптов в package.json

```json
{
  "scripts": {
    "start": "webpack-dev-server --progress",
    "build": "webpack --progress",
    "build:prod": "cross-env NODE_ENV=production TEAMCITY_BUNDLE_SIZE=true webpack --progress"
  }
}
```
- cross-env NODE_ENV=production - устанавливает окружение в production

## Пример новой конфигурации в проекте

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { configCreator, loaders, paths } = require('@xcritical/xc-front-webpack-proposal');

module.exports = configCreator({
  /**
  * подробный вывод в консоль добавленых полифилов из @babel/polyfill 
  * в зависимости от .browserslistrc конфига
  **/
  isBabelDebug: false,
  loaders: [
    // пример добавлениия лоадера для development и production
    {
      test: /\.(less)$/,
      loader: loaders.generateStyleLoaders({ importLoaders: 2 }, require.resolve('less-loader')),
      sideEffects: true,
    },
  ],
  plugins: {
    common: [
      // пример добавлениия плагина для development и production
      new CleanWebpackPlugin([paths.BUILD_DIR], {
        root: paths.ROOT_DIR,
        verbose: true,
        dry: false,
      }),
    ],
    dev: [
      // добавление плагинов для development
    ],
    prod: [
      // добавление плагинов для production
    ],
  },
  devServer: {
    // настройки webpack-dev-server
    port: 8090,
    host: 'local.umarkets.com',
    entry: 'index.html',
    proxy: {
      '/api/*': {
        target: 'https://qa1-myaccount.umarkets.com',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        xcritical: {
          test: /[\\/]node_modules[\\/](@xcritical)[\\/]/,
          name: 'xcritical',
          chunks: 'all',
        },
        vendor: {
          test(modulePath) {
            return /node_modules/.test(modulePath.context) && !/xcritical/.test(modulePath.context);
          },
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
});
```

- configCreator - функция принимающая объект конфигурации

- loaders - функция возвращает массив лоадеров

- paths - пути к:

    - ROOT_DIR

    - SRC_DIR
    
    - BUILD_DIR
    
    - PUBLIC_DIR
    
    - babelrc - ссылка на babel.config.js, если он существует
    
    - pathResolve - функция разрешения путей от ROOT_DIR

- env - переменные окружения:

    - isDevMode - process.env.NODE_ENV !== 'production'
    
    - getMode - возвращает строку с текущим окружением 'development' или 'production'
    
    - isNeedSourceMaps - наличие в билд скрипте флага --source-maps, данный флаг активирует создание source-maps
    
    - showState - вывод в консоль выше перечисленных переменных

[cross-env]: https://www.npmjs.com/package/cross-env
[browserslist]: https://github.com/browserslist/browserslist