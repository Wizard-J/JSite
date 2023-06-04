---
title: git ignore规则
date: 2019-09-07 07:08:58
tags: Git
categories: 
    - 工具
    - python
---


他主要是分保守原则和开放原则两种写法：

> 保守写法

就是把所有的都忽略，然后其他的都用 `!文件夹名`来设置不忽略的文件。
```python
# Logs
logs
# 修复忽略排除日志视图模块
!/front_end/src/views/Logs 
```
<!--more-->
> 开放写法

就是github自动生成那个的写法，也是常规写法，就是默认都不忽略，只写忽略哪些文件。

如果已经提交过的新设置ignore可能不生效，怎么办呢？

```
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```