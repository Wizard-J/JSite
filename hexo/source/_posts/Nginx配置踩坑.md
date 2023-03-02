---
title: Nginx配置踩坑
date: 2019-09-07 08:06:34
tags: Nginx
categories: 
- 服务器
- Nginx
---

时间：2019/09/07
---
喜大普奔，小张昨天把服务器玩崩了，重新装的阿里云镜像，数据库、软件全没了。记录重新部署路上各种奇坑：

> 把打包好的项目部署到`nginx`上，一访问各种报`500`错误；

最可恶的是，所有的`conf`文件都是我在服务器崩之前拷下来的原版`conf`文件，让人头秃。
原来，`nginx`不同版本`conf`写法不尽相同，最终：我把所有`conf`里的`server`对象都整理到了一起，才堪堪解决问题。
<!--more-->
融合了全部`server`对象的`default.conf`内容:

```python
server { # 这个是默认自带的
    listen       80;
    server_name  wizardj.cn;

# 内容太多，不展示了
...
}
server { 
           listen 80;
...
}
server {
            listen 80;
...
}

# admin access
server {
...
}
```
> `500`终于解决了，开始`403`了，呵呵。。。

不过小张作为一个后端出身的人才，`403`的规矩还是懂的，权限嘛，把`/etc/nginx/nginx.conf`文件中的`user`改为`root`就万事大吉了。

```python
user  root;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
~
```

> 路径替换问题

这一个小张以前没怎么注意过，`nginx`将`http://blog.wizardj.cn/api`请求转发到本地时并没有替换掉`/api`这个路径，我希望前端请求`http://blog.wizardj.cn/api/login`时，被请求的地址是：`"http://proxyed.XXX/login"`而并非是`http://proxyed.XXX/api/login`;

原来：只要在proxy这个属性后面加上`/`就好了，即`proxy_pass http://proxyed.xxx/;`：
```python
server {
            listen 80;

            server_name blog.wizardj.cn;

            root ...;

            index index.html;

            location / {
                try_files $uri $uri/ /index.html;
            }

            location /api/{
                proxy_pass http://proxyed.xxx/;
            }

           gzip on;
           gzip_buffers 32 4k;
           gzip_comp_level 9;
           gzip_min_length 200;
           gzip_types text/css text/xml application/javascript;
           gzip_vary on;
}
```