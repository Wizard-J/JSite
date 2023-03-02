---
title: 开启gzip打包
date: 2019-10-05 04:51:41
tags: React
categories: 
- 服务器
- Nginx
---

react打包后的js.chunk有2.2M，每次加载需要30+s，这样时间太久了，为了优化加载速度，我开启了gzip。

- 前端配置
- 后端配置

> 前端webpack配置

先要用`npm`安装一个包:`npm install --save-dev compression-webpack-plugin`
根据webpack官方文档，在webpack.config.js中加入:
<!--more-->
```js
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = function (webpackEnv) {
    plugins: [
      // gzip
      isEnvProduction && new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
}
```

> nginx开启后端支持

```python
server {
     listen 80;
     server_name soccer.wizardj.cn;
     root /root/project/SoccerGames/frontend/build;

     index index.html;
     gzip on;
     gzip_buffers 32 4k;
     gzip_comp_level 9;
     gzip_min_length 200;
     gzip_types text/css text/xml application/javascript;
     gzip_vary on;
}
```
然后`nginx -t`,`nginx -s reload`，就发现加载的js大小从原来的2.2M变为了600K，加载时间从原来的30+s变成了4s。