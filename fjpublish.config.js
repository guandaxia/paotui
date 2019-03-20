module.exports = {
  // modules开始
  modules: [{
    name: '搬瓦工环境',
    env: 'banwagong',
    ssh: {
      host: '162.219.124.97',
      port: 27454,
      user: 'root',
      userName: 'root',
      password: 'iY2wHqDPyovM'
    },
    buildCommand: 'build',
    localPath: 'dist',
    remotePath: '/www/wwwroot/daike',
    tag: '123'
  }],
  // modules结束
  nobuild: true,
  tag: 'v1'
}
