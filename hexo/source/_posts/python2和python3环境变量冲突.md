---
title: python2和python3环境变量冲突
date: 2019-09-07 07:27:55
tags: Python
categories: 
- 工具
- python
---


> 时间: 2019/7/19

我发现，我重新安装了python35之后，使用pip命令，调用的还是python37的pip，这就导致了我无法安装tensorflow1.13.1以前的版本，间接地导致了我没办法跑志浩的程序。

经过探索，我发现只要这样写就可以了：
```
python3 -m pip install PIL
```
这样可以指定调用哪个python版本的pip，我事先已经将这个python3重命名成了python35.exe的名字，就可以使用python35的pip了。
<!--more-->

以前安装了python2，现在安装了python3跑Django，尴尬的发现gitbash中的python还是2.7版本的，并没有变更过来，所以就各种“cannot find moduel django.http”云云。。。

> **解决方法**：环境变量不动，把C:\Users\J\Anaconda3 这个目录下的python.exe文件改名成pyhon3，然后cmd中就可以使用python3 --version来验证了。

然后可以使用pip命令，神奇的发现这个错误：

```
J@DESKTOP-QBBPEFE MINGW64 /e/project/DeepLearning/BackEnd/DeepLearning
$ pip
Unable to create process using 'C:\Users\J\Anaconda3\python.exe C:\Users\J\Anaconda3\Scripts\pip-script.py '
```
怎么办呢？

方法是：

> 针对各个版本的解释器执行类似以下操作

```
python3 -m pip install --upgrade pip
python -m pip install --upgrade pip
```
然后就可以输入命令：
```
pip2 -V
pip3 -V
```
来验证了。