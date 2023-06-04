---
title: es9正则
date: 2019-09-07 07:31:07
tags: JavaScript
categories: 
- 前端
---

前阵子面了字节跳动的前端，问了很多正则的问题，我自认为最近刚好用过，没想到回答的并不好，今天看了一篇文章，记录下es9的正则表达式写法。

面试题：对于`"2019-07-28"`，封装一个`date.getYear()`方法。
<!--more-->
// `es9`分组命名功能写法：
```javascript
const date = "2019-07-28";
const reg = /(?<year>\d{2,})-(?<month>\d{2})-(?<day>\d{2})/;
const result = reg.exec(date);
```
只要这样写，就可以得到带有group对象的result了。然后提取日期方法就是:

```javascript
result.groups.year  // 输出2019
```
不分组的话就得：
```javascript
result[1] // 2019,result[0]是2019-07-28
result[2] // 07
result[3] // 28
```
所以这道题这么写就好了：
```javascript
        var date  = "2019-07-28";

        class myDate{
            
            regQ = /(?<year>\d{2,})-(?<month>\d{2})-(?<day>\d{2})/;
            result = this.regQ.exec(date);
            
            getYear = ()=>{
                return this.result.groups.year;
            }
        }

        const today = new myDate(date);
        console.log(today.getYear());
```