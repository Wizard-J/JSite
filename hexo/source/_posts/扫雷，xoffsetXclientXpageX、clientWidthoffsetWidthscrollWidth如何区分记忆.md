---
title: 扫雷，x/offsetX/clientX/pageX、clientWidth/offsetWidth/scrollWidth如何区分记忆
date: 2019-09-07 07:17:13
tags: Html
categories: 
- 前端
---

经常被这几个问题搞的晕头转向，趁现在记忆深刻记下来。
> clientX,clientY

表示距离视口`viewPort`边缘的距离。

> offsetX,offsetY

表示距离`父盒子`边缘的距离。

> pageX,pageY

表示距离整个`body`边缘的距离，其中也包括不在视口范围内的部分（如果有的话）。
<!--more-->
> x/screenX,y/screenY

表示目标距离`显示器`的边缘距离，这个比较神奇，往往浏览器相对于显示器的视口的不见得总是重合的吧，对吧。

***一张盗来的图说明问题***：


![](https://user-gold-cdn.xitu.io/2019/8/18/16ca3f5167aa8bfa?w=1000&h=678&f=png&s=69804)

<hr>

> offsetWidth

四个属性中这个是最大的，除了元素的外边距`margin`以外的全部部分，包括了元素的 **宽度**、**内边距**、**边框**。

> clientWidth

除了 **外边距** 和 **边框** 的部分，包括了 **宽度**、**内边距**。

> scrollWidth

这个比较特殊，它在clientWidt基础上包括了 **溢出视口宽度** 的部分，的包括了 **宽度**、**内边距**、**视口外的宽度**。

> width

这个是最小的，它仅仅包括了元素的 **宽度**，并且它是内联属性。

***总结***

正常情况下：

- width < clientWidth = scrollWidth < offsetWidth

```
显然，如果有溢出部分的化，scrollWidth也可能是最大的。
```
- style.width是指`Html`内联属性，并不是在stylesheet中设置的那一个。
- style.width返回的是`String`，比如说`700px`，其他三个返回的是`Number`,比如`700`
- style.width和scrollWidth可读写，而offsetWidth和clientWidth为只读