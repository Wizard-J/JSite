---
title: centOS下部署mysql（保存备用）
date: 2019-09-07 08:29:04
tags: MySQL
categories: 
- 数据库
---

1.下载`mysql`源安装包

`$ wget http://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm`

2.安装`mysql`源
`$ yum localinstall mysql57-community-release-el7-8.noarch.rpm `

3.检查`mysql`源是否安装成功
`$ yum repolist enabled | grep "mysql.*-community.*"`

4.修改`yum`源 【可跳过】
`$ vim /etc/yum.repos.d/mysql-community.repo`

<!--more-->
改变默认安装的`mysql`版本。比如要安装`5.6`版本，将`5.7`源的`enabled=1`改成`enabled=0`。然后再将`5.6`源的`enabled=0`改成`enabled=1`即可。
备注：`enabled=1`表示即将要安装的`mysql`版本，这个文件也可以不修改，默认安装`mysql`最高版本

5.安装`MySQL `
这一步才是真正安装mysql
`$ yum install mysql-community-server`

6.启动`MySQL`服务并设置开机启动
```cmd
$ systemctl start mysqld
$ systemctl enable mysqld
$ systemctl daemon-reload
```

7.端口开放
```
$ firewall-cmd --zone=public --add-port=3306/tcp --permanent
$ firewall-cmd --reload
```
8.修改root本地登录密码
 1）查看mysql密码
`$ grep 'temporary password' /var/log/mysqld.log`

2）连接`mysql`
`$ mysql -uroot -p`
3）修改密码【注意：后面的分号一定要跟上】
`mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';`
或者：
```sql
mysql> set password for 'root'@'localhost'=password('MyNewPass4!'); 
mysql> show variables like '%password%';
```
9.添加远程登录用户
`mysql> GRANT ALL PRIVILEGES ON *.* TO 'caoxiaobo'@'%' IDENTIFIED BY 'Caoxiaobo0917!' WITH GRANT OPTION;`