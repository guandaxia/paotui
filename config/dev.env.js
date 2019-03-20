var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://daike.test/api/"'
  API_ROOT: '"http://bgm-back.51xiaolian.cn/api/"'
})
