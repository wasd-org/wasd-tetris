const path = require('path');
const OfflinePlugin = require('offline-plugin');

module.exports = options => ({
  entry: 'src/index.js',
  dist: '../dist/vue',
  homepage: '/wasd-tetris/vue',
  postcss: [
    // add more postcss plugins here
    // by default we have autoprefixer pre added
  ],
  webpack(config) {
    // inject offline-plugin in production build
    if (!options.dev) {
      config.plugins.push(
        new OfflinePlugin({
          ServiceWorker: {
            events: true
          }
        })
      );
    }

    return config;
  }
});
