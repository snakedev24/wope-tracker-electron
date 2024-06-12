const webpack = require('webpack');

module.exports = function override(config, env) {
  config.externals = {
    ...config.externals,
    'electron': 'electron',
    
  };

  return config;
};