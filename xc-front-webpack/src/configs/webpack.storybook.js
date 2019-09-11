const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: '[local]__[hash:base64:5]',
  },
};

module.exports = options => ({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
    alias: options.alias,
  },
  plugins: options.plugins,
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            exclude: [/node_modules/],
            use: [
              {
                loader: 'ts-loader',
                options: options.typescript || {},
              },
            ],
          },
          {
            test: /\.stories\.jsx?$/,
            loaders: [require.resolve('@storybook/addon-storysource/loader')],
            enforce: 'pre',
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 1,
                },
              },
            ],
          },
          {
            test: /\.scss$/,
            use: ['style-loader', CSSModuleLoader],
          },
        ].concat(options.loaders || []),
      },
    ],
  },
});
