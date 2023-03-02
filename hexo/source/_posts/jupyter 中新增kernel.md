---
title: jupyter 中新增kernel
date: 2019-09-07 07:33:39
tags: Python
categories: 
- 算法
---

`Anaconda` 中默认使用了`python37`（默认只支持`tensorflow13.1`以上版本那位），环境显然不能满足我的需求，然后，我的jupyter也没办法用了，百度了下，只能增加内核的方法来解决，常识了几种方法后，这样是有效的：
<!--more-->
- 首先，在`myPython2`环境下确认是否安装了`ipykernel`这个包，如果没有则安装。`pip install ipykernel`
- 然后，在这个环境下输入`python -m ipykernel install --name XXXX`后边的名字可以自己定义，可以和环境一样，也可以随便起，是显示在`jupyter notebook`中的，这里我依然使用`myPyhon2`这个名字。
- 然后启动`jupyter`，会发现现在有了`myPython2`这个选项了！

记下来，备用