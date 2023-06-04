---
title: python获取本地ip的方法
date: 2019-11-12 07:58:10
tags: Python
categories: 
- 工具
- python
- 网络请求
---

搭建websocket的需求

```python
def get_host_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    finally:
        s.close()
    return ip
```
