const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(proxy('/api', { 
    target: 'http://admin.wizardj.cn/',
    changeOrigin:true,
    pathRewrite: {
                "^/api": "/"
            }
     }))
}