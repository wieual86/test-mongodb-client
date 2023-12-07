require("dotenv").config();
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  webpack: config => {
    config.optimization = config.optimization || {};
    config.optimization.minimizer = config.optimization.minimizer || [];
    config.optimization = {
      ...config.optimization,
      minimizer: [
        ...config.optimization.minimizer,
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            output: { comments: false },
            mangle: true,
            compress: true
          },
          extractComments: false
        })
      ]
    };

    return config;
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  }
};
