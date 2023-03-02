---
title: 总结一些比较有趣的js代码
date: 2019-09-07 07:18:25
tags: JavaScript
categories: 
- 前端
---

> 1.使用apply实现拼接

```javascript
var arr=[1,2,3]
var temp=[4,5,6]
arr.push.apply(arr,temp)
```
<!--more-->
> 2.set数组去重

```javascript
[...new Set([1,2,3,1,2,1,1,1,1,1])]
```

> 3.求最大项

```javascript
Math.max(...[1,2,3,1,2,1,1,1,1,1]);
```

> 4.位运算符判断indexOf是否等于-1

```javascript
if(!~arr.indexOf(item)){
 如果ite不存在于数组，就...
}
```

> 5.前端错误记录到后端

```javascript
function logError(sev, msg){
        var img = new Image();
        img.src = "log.php?sev=" + encodeURIComponent(sev) + "&msg=" +
                  encodeURIComponent(msg);
}
```