const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      // Set the custom build output directory
      // paths.appBuild = webpackConfig.output.path = path.resolve(__dirname, 'C:\\Users\\aytys\\NITNC\\5th_grade\\Lab\\juugai\\visualizer-app\\src\\public');
      paths.appBuild = webpackConfig.output.path = path.resolve(__dirname, 'C:\\Users\\aytys\\NITNC\\Lab_ws\\juugai\\visualizer-app\\src\\public');
      return webpackConfig;
    },
  },
};