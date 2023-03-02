---
title: 震惊！React新版本搞事情，proxy没有办法配置多个源了
date: 2019/9/7 8:20:51
tags: React
categories: 
- 前端
---

`When specified, "proxy" in package.json must be a string. Instead, the type of "proxy" was "object". Either remove "proxy" from package.json, or make it a string.`

夭寿！`React`更新总是让老代码出`Bug`，头秃的一匹。

之前：
```json
{
	proxy:{
  "/api":{
  		"target": "http://proxy.XXX.cn:8000"
  	}
  }
}
```
<!--more-->
好好的代码，更新完就不能用了。

怎么解决呢？

`npm install http-proxy-middleware`

然后在`src`目录下新建`src/setupProxy.js`:
```javascript
const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://proxy.XXX.cn:8000' }))
  app.use(proxy('/static', { target: 'http://proxy.XXX.cn:9000/' }))
}
// 或者：
app.use(proxy('/api', { 
target: 'http://proxy.XXX.cn:8000',
changeOrigin:true,
pathRewrite: {
            "^/api": "/"
        }
 }))
```