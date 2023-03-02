---
title: 关于create-react-app无法使用es7修饰器的问题
date: 2019-09-07 07:25:42
tags: React
categories: 
- 前端
---

> 方式一：暴露 create-react-app 的配置

暴露出`create-react-app` 的所有配置
- 运行命令：
```
$ npm run eject
```
项目中就会展示出各种配置文件。
- 在 babel 中添加 plugins 配置
- 在 package.json 文件中找到 babel 的配置，添加如下代码即可：
```javascript
"babel": {
    "presets": ["react-app"],
    "plugins": [
      ["@babel/plugin-proposal-decorators",{"legacy": true}]
    ]
  },
```
<!--more-->
重新运行项目，即可正常使用装饰器语法。  

`create-react-app` 脚手架中已经安装了 `@babel/plugin-proposal-decorators `插件 ，不需要自己安装。

> 方式二：直接在项目的 node-modules 中添加配置

打开项目的 node_modules 文件夹，找到 babel-preset-react-app 目录。打开目录下 create.js 文件。找到 plugins 属性配置的地方，修改如下配置即可：
```javascript
isTypeScriptEnabled && [
    require('@babel/plugin-proposal-decorators').default,
    false,
],

[
    require('@babel/plugin-proposal-decorators').default,
    { legacy: true },
],
```
不建议使用方式二，因为一旦需要重新安装 node_modules， 就需要再去 babel-preset-react-app 里面添加一次配置。

至此已经可以正常使用各种装饰器了，比如redux中的：
```
@connect(
    state => ({reduxStore:state}),{setState}
)
```
这种“注解”已经可以跑通了，只是，vscode可能会报错，原因是vscode自身不支持这种写法，只需要在项目根目录添加一个文件名叫`jsconfig.json`的文件，并在其中添加这句话，并重启vscode就会消除报错提示了：
```javascript
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```