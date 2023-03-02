---
title: python 源的设置方法
date: 2020-05-03 12:28:00
tags: Python
categories: 
- 工具
- python
---

[1] 在我的电脑上的地址栏输入：`%appdata%` ，然后回车。
[2] 在里面新建一个名为 pip 的文件夹。
[3] 在 pip 文件夹里面新建一个文件叫做 pip.ini ,内容写如下即可。实际就是这么一个文件 :`%appdata%\pip\pip.ini`
<!--more-->
```css
[global]
timeout = 6000
index-url = https://mirrors.aliyun.com/pypi/simple/
trusted-host = mirrors.aliyun.com
```
[4] 接下来，用 pip 试试安装各种库.
[5] 使用pyreadline库，可实现Windows中python的tab键补全，安装如下：

```python
pip  install pyreadline
```
[6] 其他使用示例

- 升级pip

```python
python -m pip install -U pip
```

- 安装相关库

```python
python -m pip install psutil
```

- 卸载相关库

```python
python -m pip uninstall psutil
```

- 查看已安装的库

```python
python -m pip freeze
```

[7] pip安装

```python
python pip-19.0.3-py2.py3-none-any.whl/pip install --no-index pip-19.0.3-py2.py3-none-any.whl

python pip-19.2.1-py2.py3-none-any.whl/pip install --no-index pip-19.2.1-py2.py3-none-any.whl

python pip-19.3.1-py2.py3-none-any.whl/pip install --no-index pip-19.3.1-py2.py3-none-any.whl
```