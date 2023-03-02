---
title: shootback --一个实用的内网穿透软件
date: 2019-09-07 07:27:01
tags: NAT
categories: 
- 工具
- python
- 内网穿透
---

> 为实验室服务器准备的外网穿透工具(很方便实用)
```python
# ---- master ----
python3 master.py -m 0.0.0.0:10000 -c 0.0.0.0:10022 --ssl

# ---- slaver ----
# ps: the `--ssl` option is for slaver-master encryption, not for SSH
python(or python3) slaver.py -m dp.wizardj.cn:10000 -t 127.0.0.1:22 --ssl -q &
```