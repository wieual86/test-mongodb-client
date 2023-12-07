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
    ...process.env,
    NODE_ENV: undefined,
    __NEXT_PROCESSED_ENV: undefined,
    NODE_VERSION: undefined
  },
  future: {
    webpack5: true
  }
};
