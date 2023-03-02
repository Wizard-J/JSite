---
title: python学习笔记
date: 2019-09-07 07:34:11
tags: Python
categories: 
- 工具
- python
---
### os 模块基操：

> 1、切割文件名：

```python
import os

file_path = "D:/test/test.py"
(filepath,tempfilename) = os.path.split(file_path)
(filename,extension) = os.path.splitext(tempfilename)

#所以，得到文件名的方法就是：

file_path = "D:/project/backend/test.jpg"
file_name = os.path.splitext(os.split(file_path)[1])[0]
```
<!--more-->
> 2、骚气的获取控制台输出 

有时候我们的代码里可能要调用控制台命令，比如我想用Python写一个批量编译 .java 文件的脚本，用到如下代码

常规用法 
```python
os.system

import os,traceback
try:
    p = os.system("javac Test.java")
    print p
except:
    print "\nexcept:\n"
    print traceback.format_exc() // 0
```
如然编译成功会返回一个0，如果错误会返回一个非0的值给p，这种方法可以知道执行结果，但是无法捕获比较重要的提示信息，例如：“错误: 找不到文件: Tst.java”。
```python
(512, '\xe9\x94\x99\xe8\xaf\xaf: \xe6\x89\xbe\xe4\xb8\x8d\xe5\x88\xb0\xe6\x96\x87\xe4\xbb\xb6: Tst.java\n\xe7\x94\xa8\xe6\xb3\x95: javac <\xe9\x80\x89\xe9\xa1\xb9> <\xe6\xba\x90\xe6\x96\x87\xe4\xbb\xb6>\n\xe4\xbd\xbf\xe7\x94\xa8 --help \xe5\x8f\xaf\xe5\x88\x97\xe5\x87\xba\xe5\x8f\xaf\xe8\x83\xbd\xe7\x9a\x84\xe9\x80\x89\xe9\xa1\xb9')
错误:找不到文件: Tst.java
用法: javac <选项> <源文件>
使用 --help 可列出可能的选项
```

接下来我们用 commands.getstatusoutput 来捕获输出流，（python3 中为subprocess命令）

```python
import commands,traceback
try:
    res = commands.getstatusoutput("javac Test.java")
    print res
    print res[1]
except:
    print "\nexcept:\n"
    print traceback.format_exc()
```

成功会返回一个tuple，
例如：(0, '')，第一个元素表示状态，0代表成功，第二个是输出信息，如果错误则返回下面的结果：

```python
(512, '\xe9\x94\x99\xe8\xaf\xaf: \xe6\x89\xbe\xe4\xb8\x8d\xe5\x88\xb0\xe6\x96\x87\xe4\xbb\xb6: Tst.java\n\xe7\x94\xa8\xe6\xb3\x95: javac <\xe9\x80\x89\xe9\xa1\xb9> <\xe6\xba\x90\xe6\x96\x87\xe4\xbb\xb6>\n\xe4\xbd\xbf\xe7\x94\xa8 --help \xe5\x8f\xaf\xe5\x88\x97\xe5\x87\xba\xe5\x8f\xaf\xe8\x83\xbd\xe7\x9a\x84\xe9\x80\x89\xe9\xa1\xb9')
错误: 找不到文件: Tst.java
用法: javac <选项> <源文件>
使用 --help 可列出可能的选项
```
> 3、datetime数据和字符串的转换关系

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import datetime
import time

# 日期时间字符串
st = "2017-11-23 16:10:10"
# 当前日期时间
dt = datetime.datetime.now()
# 当前时间戳
sp = time.time()

# 1.把datetime转成字符串
def datetime_toString(dt):
    print("1.把datetime转成字符串: ", dt.strftime("%Y-%m-%d %H:%M:%S"))


# 2.把字符串转成datetime
def string_toDatetime(st):
    print("2.把字符串转成datetime: ", datetime.datetime.strptime(st, "%Y-%m-%d %H:%M:%S"))


# 3.把字符串转成时间戳形式
def string_toTimestamp(st):
    print("3.把字符串转成时间戳形式:", time.mktime(time.strptime(st, "%Y-%m-%d %H:%M:%S")))


# 4.把时间戳转成字符串形式
def timestamp_toString(sp):
    print("4.把时间戳转成字符串形式: ", time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(sp)))


# 5.把datetime类型转外时间戳形式
def datetime_toTimestamp(dt):
    print("5.把datetime类型转外时间戳形式:", time.mktime(dt.timetuple()))


# 1.把datetime转成字符串
datetime_toString(dt)
# 2.把字符串转成datetime
string_toDatetime(st)
# 3.把字符串转成时间戳形式
string_toTimestamp(st)
# 4.把时间戳转成字符串形式
timestamp_toString(sp)
# 5.把datetime类型转外时间戳形式
datetime_toTimestamp(dt)
```