---
title: pip install package 报错解决
date: 2019-09-07 07:24:32
tags: Python
categories: 
- 工具
- python
---

```
Could not find a version that satisfies the requirement Jinja2==2.6 (from versions: )
No matching distribution found for Jinja2==2.6
```
<!--more-->
总是出现类似于这种的报错，是因为网络的问题，要使用国内的镜像源来加速：
```
pip install pymongo -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com
```
就可以了，如果还是出错，多试几次，已经解决.