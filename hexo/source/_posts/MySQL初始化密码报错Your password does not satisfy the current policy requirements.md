---
title: MySQL初始化密码报错Your password does not satisfy the current policy requirements
date: 2019-09-07 08:24:42
tags: MySQL
categories: 
- 数据库
---

安装好MySQL初始化，报错：
```sql
mysql> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('123');
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
```
是因为新版本mysql不允许安全等级低的密码了，生活已经太艰难了，那么，为了强行设置简单密码，我们这样做：
<!--more-->
```sql
mysql> set global validate_password_policy=0;
Query OK, 0 rows affected (0.05 sec)
 
mysql> set global validate_password_mixed_case_count=0;
Query OK, 0 rows affected (0.00 sec)
 
mysql> set global validate_password_number_count=3;
Query OK, 0 rows affected (0.00 sec)
 
mysql> set global validate_password_special_char_count=0;
Query OK, 0 rows affected (0.00 sec)
 
mysql> set global validate_password_length=3;
Query OK, 0 rows affected (0.00 sec)
 
mysql> SHOW VARIABLES LIKE 'validate_password%';
+--------------------------------------+-------+
| Variable_name                        | Value |
+--------------------------------------+-------+
| validate_password_dictionary_file    |       |
| validate_password_length             | 3     |
| validate_password_mixed_case_count   | 0     |
| validate_password_number_count       | 3     |
| validate_password_policy             | LOW   |
| validate_password_special_char_count | 0     |
+--------------------------------------+-------+
6 rows in set (0.00 sec)

# 最后：
mysql> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('123');
Query OK, 0 rows affected, 1 warning (0.00 sec)
```