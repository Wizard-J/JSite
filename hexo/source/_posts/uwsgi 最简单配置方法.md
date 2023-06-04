---
title: uwsgi 最简单配置方法
date: 2019-09-07 08:58:36
tags: uWSGI
categories: 
- 服务器
- uwsgi
---
#### 安装`uwsgi`:

`uwsgi pip install uwsgi`
#### 查看uwsgi版本`

`uwsgi --version`

---
第一个小测试:

-  创建  `frist.py` 内容：

```python
def application(env, start_response):
    start_response('200 OK', [('Content-Type','text/html')])
    return [b"Hello World"]
```
<!--more-->
命令：
`uwsgi --http :8001 --wsgi-file frist.py`
浏览器访问
`127.0.0.1:8001`
看浏览器是否有  “Hello World”   显示则成功

---
#### 项目下配置`uwsgi`:

创建`django`项目之后，在项目根目录下创建`uwsgi.ini`
```python
[uwsgi]
# Django-related settings
socket=0.0.0.0:8000      这个和uwsgi_pass 里面的端口号一致
chdir=/home/fang_yz/lanlanTestEnd1_zml    指定运行目录（改成自己的目录，这是我的）
wsgi-file=lanlanTest6/wsgi.py   载入wsgi-file（load .wsgi file）
master=true  主进程
processe=4   开启的进程数量
daemonize=uwsgi_log.log  /pid文件，用于下面的脚本启动、停止该进程
pidfile=uwsgi_pid.log     日志文件
```

#### 关键配置1：

socket=0.0.0.0:8000 在配置nginx+uwsgi+django 时候 这个8000要和nginx.conf 里面的
location / {
include uwsgi_params;
uwsgi_pass 127.0.0.1:8000; 这个端口号 一致
}
一定不要和 listen 8080 default_server; 搞混
listen 这个端口是外部浏览器访问nginx的端口
uwsgi_pass这个端口是nginx访问uwsgi的端口
然后uwsgi才能根据我们配置uwsgi.ini文件 访问我们的项目

配置完init文件之后
#### 启动
`uwsgi --ini uwsgi.ini` 启动之后会在目录下生成 `uwsgi.pid` 和 `uwsgi.log`文件
#### 查看进程
`cat uwsgi.pid 或 ps -ef | grep uwsgi`
#### 重启进程
`uwsgi --reload uwsgi.pid`
#### 查看uwsgi进程及详细信息
`uwsgi --connect-and-read uwsgi.status`
#### 停止uwsgi进程
`uwsgi --stop uwsgi.pid 或者直接 kill -9 uwsgi进程 杀死`
————————————————
版权声明：本文为CSDN博主「行走在风中」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_36874480/article/details/94012423