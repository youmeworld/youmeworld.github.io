// https://github.com/tkh44/emotion-create-react-app-example/blob/master/config-overrides.js
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  config = injectBabelPlugin('emotion', config);
  return config;
};
