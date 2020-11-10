const path = require('path')
function resolve (dir) { // 声明一个函数,调用函数的时候传入相对路径
    return path.join(__dirname, dir) // return绝对路径
}
module.exports = {
    devServer: {
        before: require('./mock/index.js') // 引入mock/index.js
    },
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
          // .set('路径别名', resolve('vue.config文件的相对路径'))
          .set('components', resolve('./src/components'))
          .set('assets', resolve('./src/assets'))
          .set('utils', resolve('./src/utils'))
     }
}
