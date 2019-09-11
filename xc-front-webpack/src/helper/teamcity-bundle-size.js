const defaultLogger = {
  done: (stats) => {
    // Only run this if on Team City
    if (process.env && !process.env.TEAMCITY_VERSION) {
      return;
    }
    let bundleSize = 0;
    const { assetsByChunkName, assets } = stats.toJson();

    assets.forEach((asset) => {
      const chunkName = asset.chunkNames[0];
      bundleSize += asset.size;

      if (!assetsByChunkName[chunkName]) {
        return;
      }

      const { size: assetSize } = asset;

      console.log("##teamcity[buildStatisticValue key='".concat(chunkName, "' value='").concat(assetSize, "']"));
    });
    console.log("##teamcity[buildStatisticValue key='Webpack Bundle Size' value='".concat(bundleSize, "']"));
  },
};

function TeamcityBundleSizePlugin(callback) {
  this.callback = Object.assign({}, defaultLogger, callback || {});

  this.apply = function apply(compiler) {
    Object.keys(this.callback).forEach((key) => {
      compiler.plugin(key, this.callback[key]);
    });
  };
}

module.exports = TeamcityBundleSizePlugin;
