---
title: HashRouter 和 window.location.hash
date: 2019-09-07 07:19:14
tags: React
categories: 
- 前端
---

> 时间: 2019/8/15

还有window.location有push方法可用，后来我在项目中遇到了，属基本操作，回头再补充
<!--more-->
<hr>

`react-router-dom`中有两个Router（其实有三个）：`HashRouter`和`BrowserRouter`.

使用BrowserRouter浏览器会在匹配的时候总是刷新页面。而HashRouter就不会。

但当多个页面共用路由的时候，HashRouter就会弹出警告，甚至页面无法刷新，以及出现其他bug.

我发现只要手动设置Hash就可以了：
```
window.location.hash="locationA";
```